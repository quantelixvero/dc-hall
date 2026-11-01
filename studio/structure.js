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
} from '@sanity/icons'

// Hardcoded Super Admin emails (always have full access)
const SUPER_ADMIN_EMAILS = [
  'drseadib@gmail.com',
  'seadibpc@outlook.com',
]

/**
 * Helper to build the 5 core management items for a Batch Admin:
 * 1. Students
 * 2. Roommates / Rooms
 * 3. Photo Collections (Gallery Items)
 * 4. Events Gallery
 * 5. Password & Moderator Management
 */
function createBatchSection(S, batchName, isFounder = false, includeModerator = false) {
  const cleanBatchKey = batchName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const titleBadge = isFounder ? `${batchName} (Founder Batch)` : batchName

  const items = [
    // 1. Students Directory for this batch
    S.listItem()
      .title(`${batchName} Students (শিক্ষার্থী তালিকা)`)
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

    // 2. Room Allocations
    S.listItem()
      .title(`${batchName} Rooms & Roommates (রুম ও সিট বণ্টন)`)
      .icon(PackageIcon)
      .child(
        S.documentTypeList('room')
          .title(`${batchName} Rooms & Roommates`)
          .defaultOrdering([{ field: 'room_no', direction: 'asc' }])
      ),

    // 3. Photo Collections (Gallery Items)
    S.listItem()
      .title(`${batchName} Photo Collections (ফটো গ্যালারি)`)
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

    // 4. Events Gallery
    S.listItem()
      .title(`${batchName} Events & Programs (ইভেন্ট গ্যালারি)`)
      .icon(CalendarIcon)
      .child(
        S.documentTypeList('galleryEvent')
          .title(`${batchName} Events`)
          .filter('_type == "galleryEvent" && ($batch in batches || "all" in batches)')
          .params({ batch: batchName })
          .defaultOrdering([{ field: 'date', direction: 'desc' }])
      ),
  ]

  // 5. Password & Moderator Management (only for Batch Admin)
  if (includeModerator) {
    items.push(
      S.listItem()
        .title(`🔑 ${batchName} Password & Moderator`)
        .icon(LockIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title(`${batchName} Password & Moderator Management`)
            .views([
              S.view.form()
                .title('Password & Access')
            ])
        )
    )
  }

  return S.list()
    .title(`${titleBadge} Management`)
    .items(items)
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

  // 2. If NOT Super Admin, check role from batch_administration
  let userRole = null // 'batch_admin' or 'moderator'
  let userBatch = null // e.g. 'HSC-28'

  if (!isSuperAdmin) {
    try {
      const client = getClient({ apiVersion: '2023-08-01' })
      const settings = await client.fetch(
        '*[_type == "siteSettings"][0]{ batch_administration, batch_moderators }'
      )

      // Check new batch_administration field first
      const batchAdmin = settings?.batch_administration || []
      for (const entry of batchAdmin) {
        const adminEmails = (entry?.batch_admin_emails || []).map((e) => (e || '').trim().toLowerCase())
        const modEmails = (entry?.moderator_emails || []).map((e) => (e || '').trim().toLowerCase())
        
        if (adminEmails.includes(userEmail)) {
          userRole = 'batch_admin'
          userBatch = entry.batch
          break
        }
        if (modEmails.includes(userEmail)) {
          userRole = 'moderator'
          userBatch = entry.batch
          break
        }
      }

      // Fallback: check old batch_moderators field (backward compat)
      if (!userRole && settings?.batch_moderators) {
        const batchMods = settings.batch_moderators || []
        for (const entry of batchMods) {
          const emails = (entry?.emails || []).map((e) => (e || '').trim().toLowerCase())
          if (emails.includes(userEmail)) {
            userRole = 'batch_admin' // old moderators become batch_admin
            userBatch = entry.batch
            break
          }
        }
      }
    } catch (err) {
      console.warn('Could not fetch batch administration settings:', err)
    }
  }

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
    const isFounder = userBatch === 'HSC-27'
    const batchSection = createBatchSection(S, userBatch, isFounder, true)

    return S.list()
      .title(`${userBatch} Batch Admin Portal`)
      .items([
        ...batchSection.getItems(),
        
        S.divider(),

        // Incoming edit requests for this batch
        S.listItem()
          .title('📬 Incoming Edit Requests (আগত অনুরোধসমূহ)')
          .icon(EnvelopeIcon)
          .child(
            S.list()
              .title('Edit Requests')
              .items([
                S.listItem()
                  .title('⏳ Pending Requests (অপেক্ষমান)')
                  .icon(EditIcon)
                  .child(
                    S.documentTypeList('editRequest')
                      .title('Pending Requests')
                      .filter('_type == "editRequest" && batch == $batch && status == "pending"')
                      .params({ batch: userBatch })
                      .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                  ),
                S.listItem()
                  .title('📋 All Requests (সকল অনুরোধ)')
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
      // Dashboard — Admin-only controls
      S.listItem()
        .title('📊 Dashboard (অ্যাডমিন ড্যাশবোর্ড)')
        .icon(DashboardIcon)
        .child(
          S.list()
            .title('Admin Dashboard')
            .items([
              S.listItem()
                .title('🔒 Site Passwords & Batch Administration')
                .icon(LockIcon)
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                    .title('Passwords & Batch Admin')
                ),
              S.listItem()
                .title('📬 All Edit Requests')
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

      // Site Settings (general, hero, footer, clubs — no privacy)
      S.listItem()
        .title('⚙️ Site Settings (সাইট সেটিংস)')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
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

      // Active Batches — Dedicated Batch Portals
      S.listItem()
        .title('📁 HSC-28 Portal (Active Batch)')
        .icon(FolderIcon)
        .child(createBatchSection(S, 'HSC-28', false, true)),

      S.listItem()
        .title('⭐ HSC-27 Portal (Founder Legacy Batch)')
        .icon(StarIcon)
        .child(createBatchSection(S, 'HSC-27', true, true)),

      S.listItem()
        .title('📁 HSC-29 Portal (Upcoming Batch)')
        .icon(FolderIcon)
        .child(createBatchSection(S, 'HSC-29', false, true)),

      S.divider(),

      // Master Document Lists (All Batches Combined)
      S.listItem()
        .title('All Students — Master List (সকল শিক্ষার্থী)')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('student')
            .title('All Students')
            .defaultOrdering([
              { field: 'batch', direction: 'desc' },
              { field: 'position', direction: 'asc' },
              { field: 'short_roll', direction: 'asc' },
            ])
        ),
      S.listItem()
        .title('All Rooms & Capacities (সকল রুম)')
        .icon(PackageIcon)
        .child(
          S.documentTypeList('room')
            .title('All Rooms')
            .defaultOrdering([{ field: 'room_no', direction: 'asc' }])
        ),
      S.listItem()
        .title('All Photo Collections (সকল ফটো গ্যালারি)')
        .icon(ImageIcon)
        .child(
          S.documentTypeList('galleryItem')
            .title('All Photo Collections')
            .defaultOrdering([{ field: 'position', direction: 'asc' }])
        ),
      S.listItem()
        .title('All Gallery Events (সকল ইভেন্ট)')
        .icon(CalendarIcon)
        .child(
          S.documentTypeList('galleryEvent')
            .title('All Events')
            .defaultOrdering([{ field: 'date', direction: 'desc' }])
        ),
    ])
}
