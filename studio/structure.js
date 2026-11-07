import {
  AddIcon,
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
  BellIcon,
  DocumentIcon,
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
      .title(`${batchName} Students`)
      .icon(UsersIcon)
      .child(
        S.documentList()
          .title(`${batchName} Students`)
          .schemaType('student')
          .filter('_type == "student" && (batch == $batch || (!defined(batch) && $batch == "HSC-27"))')
          .params({ batch: batchName })
          .initialValueTemplates([
            S.initialValueTemplateItem(`student-${cleanBatchKey}`),
          ])
          .menuItems([
            S.menuItem()
              .title(`Add ${batchName} Student`)
              .icon(AddIcon)
              .intent({
                type: 'create',
                params: {
                  type: 'student',
                  template: `student-${cleanBatchKey}`,
                },
              })
              .showAsAction(true),
          ])
          .canHandleIntent((intentName, params) => {
            return intentName === 'create';
          })
          .defaultOrdering([
            { field: 'position', direction: 'asc' },
            { field: 'short_roll', direction: 'asc' },
          ])
      ),

    S.listItem()
      .title(`${batchName} Rooms & Roommates`)
      .icon(PackageIcon)
      .child(
        S.documentList()
          .title(`${batchName} Rooms & Roommates`)
          .schemaType('room')
          .filter('_type == "room" && (batch == $batch || (!defined(batch) && $batch == "HSC-27"))')
          .params({ batch: batchName })
          .initialValueTemplates([
            S.initialValueTemplateItem(`room-${cleanBatchKey}`),
          ])
          .menuItems([
            S.menuItem()
              .title(`Add ${batchName} Room`)
              .icon(AddIcon)
              .intent({
                type: 'create',
                params: {
                  type: 'room',
                  template: `room-${cleanBatchKey}`,
                },
              })
              .showAsAction(true),
          ])
          .canHandleIntent((intentName, params) => {
            return intentName === 'create';
          })
          .defaultOrdering([{ field: 'room_no', direction: 'asc' }])
      ),

    S.listItem()
      .title(`${batchName} Photo Collection`)
      .icon(ImageIcon)
      .child(
        S.document()
          .schemaType('galleryItem')
          .documentId(batchName === 'HSC-27' ? 'gallery-item-2' : `galleryItem-${cleanBatchKey}`)
          .title(`${batchName} Photo Collection`)
      ),

    S.listItem()
      .title(`${batchName} Events & Programs`)
      .icon(CalendarIcon)
      .child(
        S.documentTypeList('galleryEvent')
          .title(`${batchName} Events`)
          .filter('_type == "galleryEvent" && ($batch in batches || "all" in batches || (!defined(batches) && $batch == "HSC-27"))')
          .params({ batch: batchName })
          .defaultOrdering([{ field: 'date', direction: 'desc' }])
      ),

    S.listItem()
      .title(`${batchName} Google Forms`)
      .icon(DocumentIcon)
      .child(
        S.documentTypeList('hallForm')
          .title(`${batchName} Google Forms & Surveys`)
          .filter('_type == "hallForm" && (batch == $batch || batch == "all")')
          .params({ batch: batchName })
          .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
      ),
  ]
}

/**
 * Build complete Portal item for a batch
 */
function createBatchPortalItem(S, batchName, isFounder = false) {
  const cleanBatchKey = batchName.toLowerCase().replace(/[^a-z0-9]/g, '')
  return S.listItem()
    .title(`${batchName} Portal${isFounder ? ' (Founder)' : ''}`)
    .icon(isFounder ? StarIcon : FolderIcon)
    .child(
      S.list()
        .title(`${batchName}${isFounder ? ' (Founder)' : ''} Management`)
        .items([
          ...createBatchContentItems(S, batchName),
          S.listItem()
            .title(`${batchName} Website Password`)
            .icon(LockIcon)
            .child(
              S.document()
                .schemaType('batchConfig')
                .documentId(`batchConfig-${cleanBatchKey}`)
                .title(`${batchName} Configuration`)
            ),
        ])
    )
}

export const structure = async (S, context) => {
  const { currentUser, getClient } = context
  const client = getClient({ apiVersion: '2024-01-01' })

  const userEmail = (currentUser?.email || '').toLowerCase().trim()
  const isSuperAdmin = SUPER_ADMIN_EMAILS.includes(userEmail)

  let userRole = isSuperAdmin ? 'super_admin' : 'viewer'
  let userBatch = null

  if (!isSuperAdmin && userEmail) {
    try {
      const allConfigs = await client.fetch(
        `*[_type == "batchConfig"]{
          batch,
          batch_admin_emails,
          moderator_emails
        }`
      )

      for (const cfg of allConfigs) {
        const admins = (cfg.batch_admin_emails || []).map((e) => e.toLowerCase().trim())
        const mods = (cfg.moderator_emails || []).map((e) => e.toLowerCase().trim())

        if (admins.includes(userEmail)) {
          userRole = 'batch_admin'
          userBatch = cfg.batch
          break
        } else if (mods.includes(userEmail)) {
          userRole = 'moderator'
          userBatch = cfg.batch
          break
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
          .title('New Edit Request')
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
          .title('My Requests')
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
          .title(`${userBatch} Password & Moderator`)
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
          .title('Incoming Edit Requests')
          .icon(EnvelopeIcon)
          .child(
            S.list()
              .title('Edit Requests')
              .items([
                S.listItem()
                  .title('Pending Requests')
                  .icon(EditIcon)
                  .child(
                    S.documentTypeList('editRequest')
                      .title('Pending Requests')
                      .filter('_type == "editRequest" && batch == $batch && status == "pending"')
                      .params({ batch: userBatch })
                      .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                  ),
                S.listItem()
                  .title('All Requests')
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
      // ─── Root Administration ─────────────────────────────────────
      S.listItem()
        .title('Security & Visibility')
        .icon(LockIcon)
        .child(
          S.document()
            .schemaType('adminSettings')
            .documentId('adminSettings')
            .title('Security & Visibility Controls')
        ),

      S.listItem()
        .title('Batch Admin & Moderator')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('batchConfig')
            .title('Batch Configurations')
            .defaultOrdering([{ field: 'batch', direction: 'asc' }])
        ),

      S.listItem()
        .title('All Edit Requests')
        .icon(EnvelopeIcon)
        .child(
          S.documentTypeList('editRequest')
            .title('All Edit Requests')
            .defaultOrdering([
              { field: 'status', direction: 'asc' },
              { field: '_createdAt', direction: 'desc' },
            ])
        ),

      S.divider(),

      // ─── Website Content ─────────────────────────────────────────
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Website Settings')
        ),
      S.listItem()
        .title('Notices & Announcements')
        .icon(BellIcon)
        .child(
          S.documentTypeList('notice')
            .title('All Notices & Announcements')
            .defaultOrdering([{ field: 'date', direction: 'desc' }])
        ),
      S.listItem()
        .title('Home Page Content')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home Page Content')
        ),
      S.listItem()
        .title('Hall History & Super')
        .icon(CaseIcon)
        .child(
          S.document()
            .schemaType('hallInfo')
            .documentId('hallInfo')
            .title('Hall History & Super')
        ),
      S.listItem()
        .title('Developer Profile')
        .icon(CodeIcon)
        .child(
          S.document()
            .schemaType('developerProfile')
            .documentId('developerProfile')
            .title('Developer Profile')
        ),

      S.divider(),

      // ─── Batch Portals (HSC-27 Founder to HSC-35) ───
      createBatchPortalItem(S, 'HSC-27', true),
      createBatchPortalItem(S, 'HSC-28'),
      createBatchPortalItem(S, 'HSC-29'),
      createBatchPortalItem(S, 'HSC-30'),
      createBatchPortalItem(S, 'HSC-31'),
      createBatchPortalItem(S, 'HSC-32'),
      createBatchPortalItem(S, 'HSC-33'),
      createBatchPortalItem(S, 'HSC-34'),
      createBatchPortalItem(S, 'HSC-35'),

      S.divider(),

      // ─── Master Lists ────────────────────────────────────────────
      S.listItem()
        .title('All Students')
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
        .title('All Rooms')
        .icon(PackageIcon)
        .child(
          S.documentTypeList('room')
            .title('All Rooms')
            .defaultOrdering([{ field: 'room_no', direction: 'asc' }])
        ),
      S.listItem()
        .title('All Photo Collections')
        .icon(ImageIcon)
        .child(
          S.documentTypeList('galleryItem')
            .title('All Photo Collections')
            .defaultOrdering([{ field: 'position', direction: 'asc' }])
        ),
      S.listItem()
        .title('All Events')
        .icon(CalendarIcon)
        .child(
          S.documentTypeList('galleryEvent')
            .title('All Events')
            .defaultOrdering([{ field: 'date', direction: 'desc' }])
        ),
      S.listItem()
        .title('All Custom Forms')
        .icon(DocumentIcon)
        .child(
          S.documentTypeList('hallForm')
            .title('All Custom Forms & Surveys')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),
    ])
}
