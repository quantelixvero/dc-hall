import {
  CogIcon,
  HomeIcon,
  CaseIcon,
  UsersIcon,
  PackageIcon,
  ImageIcon,
  CodeIcon,
  CalendarIcon,
  LockIcon,
  FolderIcon,
  StarIcon,
  EditIcon,
  EnvelopeIcon,
  DashboardIcon,
  EyeOpenIcon,
} from '@sanity/icons'

// Hardcoded Super Admin emails (always have full access)
const SUPER_ADMIN_EMAILS = [
  'drseadib@gmail.com',
  'seadibpc@outlook.com',
]

/**
 * Build 4 core content folders for a batch.
 */
function createBatchContentItems(S, batchName) {
  const cleanBatchKey = batchName.toLowerCase().replace(/[^a-z0-9]/g, '')

  return [
    S.listItem()
      .title(`📚 ${batchName} Students (শিক্ষার্থী তালিকা)`)
      .icon(UsersIcon)
      .child(
        S.documentTypeList('student')
          .title(`${batchName} Students`)
          .filter('_type == "student" && batch == $batch')
          .params({ batch: batchName })
          .initialValueTemplates([
            S.initialValueTemplateItem(`student-${cleanBatchKey}`),
          ])
          .defaultOrdering([
            { field: 'position', direction: 'asc' },
            { field: 'short_roll', direction: 'asc' },
          ])
      ),

    S.listItem()
      .title(`🏠 ${batchName} Rooms & Roommates (রুম ও সিট বণ্টন)`)
      .icon(PackageIcon)
      .child(
        S.documentTypeList('room')
          .title(`${batchName} Rooms & Roommates`)
          .filter('_type == "room" && (batch == $batch || (!defined(batch) && $batch == "HSC-27"))')
          .params({ batch: batchName })
          .initialValueTemplates([
            S.initialValueTemplateItem(`room-${cleanBatchKey}`),
          ])
          .defaultOrdering([{ field: 'room_no', direction: 'asc' }])
      ),

    S.listItem()
      .title(`🖼️ ${batchName} Photo Collections (ফটো গ্যালারি)`)
      .icon(ImageIcon)
      .child(
        S.documentTypeList('galleryItem')
          .title(`${batchName} Photo Collections`)
          .filter('_type == "galleryItem" && (batch == $batch || heading match $matchHeading)')
          .params({
            batch: batchName,
            matchHeading: `*${batchName.replace('HSC-', '')}*`,
          })
          .initialValueTemplates([
            S.initialValueTemplateItem(`galleryItem-${cleanBatchKey}`),
          ])
          .defaultOrdering([{ field: 'position', direction: 'asc' }])
      ),

    S.listItem()
      .title(`🎪 ${batchName} Events & Programs (ইভেন্ট গ্যালারি)`)
      .icon(CalendarIcon)
      .child(
        S.documentTypeList('galleryEvent')
          .title(`${batchName} Events`)
          .filter('_type == "galleryEvent" && ($batch in batches || "all" in batches)')
          .params({ batch: batchName })
          .defaultOrdering([{ field: 'date', direction: 'desc' }])
      ),
  ]
}

export const structure = async (S, context) => {
  const { currentUser, getClient } = context
  const userEmail = (currentUser?.email || '').trim().toLowerCase()
  const userRoles = (currentUser?.roles || []).map((r) => r.name)

  // 1. Determine if current user is Super Admin
  const isSuperAdmin =
    SUPER_ADMIN_EMAILS.includes(userEmail) ||
    userRoles.includes('administrator') ||
    userRoles.includes('developer')

  // 2. If NOT Super Admin, check role from batchConfig documents
  let userRole = null // 'batch_admin' or 'moderator'
  let userBatch = null // e.g. 'HSC-28'

  if (!isSuperAdmin) {
    try {
      const client = getClient({ apiVersion: '2023-08-01' })
      const configs = await client.fetch(
        '*[_type == "batchConfig"]{ batch, batch_admin_emails, moderator_emails }'
      )

      for (const cfg of configs) {
        const adminEmails = (cfg?.batch_admin_emails || []).map((e) => (e || '').trim().toLowerCase())
        const modEmails = (cfg?.moderator_emails || []).map((e) => (e || '').trim().toLowerCase())

        if (adminEmails.includes(userEmail)) {
          userRole = 'batch_admin'
          userBatch = cfg.batch
          break
        }
        if (modEmails.includes(userEmail)) {
          userRole = 'moderator'
          userBatch = cfg.batch
          break
        }
      }

      // Fallback: check old siteSettings.batch_administration / batch_moderators
      if (!userRole) {
        const settings = await client.fetch(
          '*[_type == "siteSettings"][0]{ batch_administration, batch_moderators }'
        )
        const batchAdmin = settings?.batch_administration || []
        for (const entry of batchAdmin) {
          const adminEmails = (entry?.batch_admin_emails || []).map((e) => (e || '').trim().toLowerCase())
          const modEmails = (entry?.moderator_emails || []).map((e) => (e || '').trim().toLowerCase())
          if (adminEmails.includes(userEmail)) { userRole = 'batch_admin'; userBatch = entry.batch; break }
          if (modEmails.includes(userEmail)) { userRole = 'moderator'; userBatch = entry.batch; break }
        }
        if (!userRole) {
          const batchMods = settings?.batch_moderators || []
          for (const entry of batchMods) {
            const emails = (entry?.emails || []).map((e) => (e || '').trim().toLowerCase())
            if (emails.includes(userEmail)) { userRole = 'batch_admin'; userBatch = entry.batch; break }
          }
        }
      }
    } catch (err) {
      console.warn('Could not fetch batch config:', err)
    }
  }

  const batchConfigDocId = userBatch
    ? `batchConfig-${userBatch.toLowerCase().replace(/[^a-z0-9]/g, '')}`
    : null

  // ═════════════════════════════════════════════════════════════════════
  // C. MODERATOR VIEW — Only edit request submission
  // ═════════════════════════════════════════════════════════════════════
  if (userRole === 'moderator' && userBatch && !isSuperAdmin) {
    return S.list()
      .title(`${userBatch} Moderator Portal`)
      .items([
        S.listItem()
          .title('📬 নতুন Edit Request পাঠান')
          .icon(EditIcon)
          .child(
            S.documentTypeList('editRequest')
              .title('New Edit Request')
              .filter('_type == "editRequest" && batch == $batch && requester_email == $email')
              .params({ batch: userBatch, email: userEmail })
              .initialValueTemplates([
                S.initialValueTemplateItem('editRequest-pending'),
              ])
              .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
          ),

        S.listItem()
          .title('📋 আমার সকল Request')
          .icon(EnvelopeIcon)
          .child(
            S.documentTypeList('editRequest')
              .title('My Requests')
              .filter('_type == "editRequest" && requester_email == $email')
              .params({ email: userEmail })
              .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
          ),
      ])
  }

  // ═════════════════════════════════════════════════════════════════════
  // B. BATCH ADMIN VIEW — 5 folders + incoming edit requests
  // ═════════════════════════════════════════════════════════════════════
  if (userRole === 'batch_admin' && userBatch && !isSuperAdmin) {
    return S.list()
      .title(`${userBatch} Batch Admin Portal`)
      .items([
        ...createBatchContentItems(S, userBatch),

        // 5th folder: ONLY this batch's password & moderator config
        S.listItem()
          .title(`🔑 ${userBatch} Password & Moderator`)
          .icon(LockIcon)
          .child(
            S.document()
              .schemaType('batchConfig')
              .documentId(batchConfigDocId)
              .title(`${userBatch} Password & Moderator Management`)
          ),

        S.divider(),

        // Incoming edit requests
        S.listItem()
          .title('📬 Incoming Edit Requests (আগত অনুরোধসমূহ)')
          .icon(EnvelopeIcon)
          .child(
            S.list()
              .title('Edit Requests')
              .items([
                S.listItem()
                  .title('⏳ Pending Requests')
                  .icon(EditIcon)
                  .child(
                    S.documentTypeList('editRequest')
                      .title('Pending Requests')
                      .filter('_type == "editRequest" && batch == $batch && status == "pending"')
                      .params({ batch: userBatch })
                      .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                  ),
                S.listItem()
                  .title('📋 All Requests')
                  .icon(EnvelopeIcon)
                  .child(
                    S.documentTypeList('editRequest')
                      .title('All Requests')
                      .filter('_type == "editRequest" && batch == $batch')
                      .params({ batch: userBatch })
                      .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                  ),
              ])
          ),
      ])
  }

  // ═════════════════════════════════════════════════════════════════════
  // A. SUPER ADMIN FULL VIEW
  // ═════════════════════════════════════════════════════════════════════
  return S.list()
    .title('DC Hall Administration')
    .items([
      // ─── Dashboard ───────────────────────────────────────────────
      S.listItem()
        .title('📊 Dashboard (অ্যাডমিন ড্যাশবোর্ড)')
        .icon(DashboardIcon)
        .child(
          S.list()
            .title('Admin Dashboard')
            .items([
              // 1. Unified Security & Visibility Controls
              S.listItem()
                .title('🛡️ Security & Visibility (সিকিউরিটি ও ভিজিবিলিটি)')
                .icon(LockIcon)
                .child(
                  S.document()
                    .schemaType('adminSettings')
                    .documentId('adminSettings')
                    .title('Security & Visibility Controls (সিকিউরিটি ও ভিজিবিলিটি)')
                ),

              // 2. Batch Admin & Moderator Management
              S.listItem()
                .title('👥 Batch Admin & Moderator Management')
                .icon(UsersIcon)
                .child(
                  S.documentTypeList('batchConfig')
                    .title('Batch Configurations')
                    .defaultOrdering([{ field: 'batch', direction: 'asc' }])
                ),

              // 4. All Edit Requests
              S.listItem()
                .title('📬 All Edit Requests (সকল অনুরোধ)')
                .icon(EnvelopeIcon)
                .child(
                  S.documentTypeList('editRequest')
                    .title('All Edit Requests')
                    .defaultOrdering([
                      { field: 'status', direction: 'asc' },
                      { field: '_createdAt', direction: 'desc' },
                    ])
                ),
            ])
        ),

      S.divider(),

      // ─── Website Content ─────────────────────────────────────────
      S.listItem()
        .title('⚙️ Site Settings (ওয়েবসাইট সেটিংস)')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Website Settings')
        ),
      S.listItem()
        .title('Home Page Content (হোম পেজ)')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home Page Content')
        ),
      S.listItem()
        .title('Hall History & Super (হল তথ্য ও সুপার বাণী)')
        .icon(CaseIcon)
        .child(
          S.document()
            .schemaType('hallInfo')
            .documentId('hallInfo')
            .title('Hall History & Super')
        ),
      S.listItem()
        .title('Developer Profile (ডেভেলপার প্রোফাইল)')
        .icon(CodeIcon)
        .child(
          S.document()
            .schemaType('developerProfile')
            .documentId('developerProfile')
            .title('Developer Profile')
        ),

      S.divider(),

      // ─── Batch Portals ───────────────────────────────────────────
      S.listItem()
        .title('📁 HSC-28 Portal')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('HSC-28 Management')
            .items([
              ...createBatchContentItems(S, 'HSC-28'),
              S.listItem()
                .title('🔑 HSC-28 Password & Moderator')
                .icon(LockIcon)
                .child(
                  S.document()
                    .schemaType('batchConfig')
                    .documentId('batchConfig-hsc28')
                    .title('HSC-28 Configuration')
                ),
            ])
        ),

      S.listItem()
        .title('⭐ HSC-27 Portal (Founder)')
        .icon(StarIcon)
        .child(
          S.list()
            .title('HSC-27 (Founder) Management')
            .items([
              ...createBatchContentItems(S, 'HSC-27'),
              S.listItem()
                .title('🔑 HSC-27 Password & Moderator')
                .icon(LockIcon)
                .child(
                  S.document()
                    .schemaType('batchConfig')
                    .documentId('batchConfig-hsc27')
                    .title('HSC-27 Configuration')
                ),
            ])
        ),

      S.listItem()
        .title('📁 HSC-29 Portal')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('HSC-29 Management')
            .items([
              ...createBatchContentItems(S, 'HSC-29'),
              S.listItem()
                .title('🔑 HSC-29 Password & Moderator')
                .icon(LockIcon)
                .child(
                  S.document()
                    .schemaType('batchConfig')
                    .documentId('batchConfig-hsc29')
                    .title('HSC-29 Configuration')
                ),
            ])
        ),

      S.divider(),

      // ─── Master Lists ────────────────────────────────────────────
      S.listItem()
        .title('All Students (সকল শিক্ষার্থী)')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('student')
            .title('All Students')
            .defaultOrdering([
              { field: 'batch', direction: 'desc' },
              { field: 'position', direction: 'asc' },
            ])
        ),
      S.listItem()
        .title('All Rooms (সকল রুম)')
        .icon(PackageIcon)
        .child(
          S.documentTypeList('room')
            .title('All Rooms')
            .defaultOrdering([{ field: 'room_no', direction: 'asc' }])
        ),
      S.listItem()
        .title('All Photo Collections (সকল ফটো)')
        .icon(ImageIcon)
        .child(
          S.documentTypeList('galleryItem')
            .title('All Photo Collections')
            .defaultOrdering([{ field: 'position', direction: 'asc' }])
        ),
      S.listItem()
        .title('All Events (সকল ইভেন্ট)')
        .icon(CalendarIcon)
        .child(
          S.documentTypeList('galleryEvent')
            .title('All Events')
            .defaultOrdering([{ field: 'date', direction: 'desc' }])
        ),
    ])
}
