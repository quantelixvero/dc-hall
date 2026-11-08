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

// Hardcoded core super admins that ALWAYS have full access (main accounts)
const PERMANENT_SUPER_ADMINS = [
  'quantelixvero@gmail.com',
  'quantalixvero@gmail.com',
  'quantelix@gmail.com',
  'quantalix@gmail.com',
  'drseadib@gmail.com',
  'seadibpc@outlook.com',
]

/**
 * Build batch content folders.
 * Direct '+' create button without multi-batch dropdown!
 */
function createBatchContentItems(S, batchName) {
  const cleanBatchKey = batchName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const studentTpl = `student-${cleanBatchKey}`
  const roomTpl = `room-${cleanBatchKey}`
  const eventTpl = `galleryEvent-${cleanBatchKey}`
  const formTpl = `hallForm-${cleanBatchKey}`

  function createScopedList({ id, title, icon, schemaType, filter, params, defaultOrdering, templateId }) {
    const list = S.documentList()
      .id(id)
      .title(title)
      .schemaType(schemaType)
      .filter(filter)
      .params(params)
      .defaultOrdering(defaultOrdering)
      .canHandleIntent((intentName, p) => intentName === 'create' && p.template === templateId)
      .initialValueTemplates([S.initialValueTemplateItem(templateId)])

    list.initialValueTemplatesSpecified = true
    const origClone = list.clone.bind(list)
    list.clone = function(withSpec = {}) {
      const cloned = origClone(withSpec)
      cloned.initialValueTemplatesSpecified = true
      cloned.spec.initialValueTemplates = [S.initialValueTemplateItem(templateId)]
      return cloned
    }

    const origSerialize = list.serialize.bind(list)
    list.serialize = function(options = { path: [] }) {
      const serialized = origSerialize(options)
      serialized.initialValueTemplates = [
        S.initialValueTemplateItem(templateId).serialize({ path: options.path, index: 0 })
      ]
      return serialized
    }

    return S.listItem()
      .title(title)
      .icon(icon)
      .child(list)
  }

  return [
    createScopedList({
      id: `students-${cleanBatchKey}`,
      title: `${batchName} Students`,
      icon: UsersIcon,
      schemaType: 'student',
      filter: '_type == "student" && (batch == $batch || (!defined(batch) && $batch == "HSC-27"))',
      params: { batch: batchName },
      defaultOrdering: [
        { field: 'position', direction: 'asc' },
        { field: 'short_roll', direction: 'asc' },
      ],
      templateId: studentTpl,
    }),

    createScopedList({
      id: `rooms-${cleanBatchKey}`,
      title: `${batchName} Rooms & Roommates`,
      icon: PackageIcon,
      schemaType: 'room',
      filter: '_type == "room" && (batch == $batch || (!defined(batch) && $batch == "HSC-27"))',
      params: { batch: batchName },
      defaultOrdering: [{ field: 'room_no', direction: 'asc' }],
      templateId: roomTpl,
    }),

    S.listItem()
      .title(`${batchName} Photo Collection`)
      .icon(ImageIcon)
      .child(
        S.document()
          .schemaType('galleryItem')
          .documentId(batchName === 'HSC-27' ? 'gallery-item-2' : `galleryItem-${cleanBatchKey}`)
          .title(`${batchName} Photo Collection`)
      ),

    createScopedList({
      id: `events-${cleanBatchKey}`,
      title: `${batchName} Events & Programs`,
      icon: CalendarIcon,
      schemaType: 'galleryEvent',
      filter: '_type == "galleryEvent" && ($batch in batches || "all" in batches || (!defined(batches) && $batch == "HSC-27"))',
      params: { batch: batchName },
      defaultOrdering: [{ field: 'date', direction: 'desc' }],
      templateId: eventTpl,
    }),

    createScopedList({
      id: `forms-${cleanBatchKey}`,
      title: `${batchName} Google Forms`,
      icon: DocumentIcon,
      schemaType: 'hallForm',
      filter: '_type == "hallForm" && (batch == $batch || batch == "all")',
      params: { batch: batchName },
      defaultOrdering: [{ field: '_createdAt', direction: 'desc' }],
      templateId: formTpl,
    }),
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
            .title(`${batchName} Moderators`)
            .icon(UsersIcon)
            .child(
              S.document()
                .schemaType('batchModerators')
                .documentId(`batchModerators-${cleanBatchKey}`)
                .title(`${batchName} Moderators / মডারেটর নির্বাচন`)
            ),
          S.listItem()
            .title(`${batchName} Website Password`)
            .icon(LockIcon)
            .child(
              S.document()
                .schemaType('batchConfig')
                .documentId(`batchConfig-${cleanBatchKey}`)
                .title(`${batchName} Website Password`)
            ),
        ])
    )
}

export const structure = async (S, context) => {
  const { currentUser, getClient } = context
  const client = getClient({ apiVersion: '2024-01-01' })

  const userEmail = (currentUser?.email || '').toLowerCase().trim()
  const rawName = (currentUser?.name || '').toLowerCase().trim()
  const cleanName = rawName.replace(/[^a-z0-9]/g, '')
  const userId = (currentUser?.id || '').toLowerCase().trim()

  // 1. Check permanent master super admin (quantelixvero accounts ONLY)
  // IMPORTANT: Simply having "administrator" role in Sanity project settings does NOT grant super admin!
  let isSuperAdmin =
    PERMANENT_SUPER_ADMINS.includes(userEmail) ||
    PERMANENT_SUPER_ADMINS.includes(rawName) ||
    PERMANENT_SUPER_ADMINS.includes(cleanName) ||
    userEmail.includes('quantelix') ||
    userEmail.includes('quantalix') ||
    rawName.includes('quantelix') ||
    rawName.includes('quantalix') ||
    cleanName.includes('quantelix') ||
    cleanName.includes('quantalix') ||
    userId.includes('quantelix') ||
    userId === 'gkqhnthtc' ||
    userId === 'p5ycmgpwu'

  // 2. Dynamic Super Admins from adminSettings
  // (Only users explicitly added to super_admin_emails list in adminSettings inside the Studio)
  if (!isSuperAdmin && (userEmail || cleanName)) {
    try {
      const superDoc = await client.fetch(
        '*[_type == "adminSettings"][0]{ super_admin_emails }'
      )
      const dynamicAdmins = (superDoc?.super_admin_emails || []).map((e) => (e || '').toLowerCase().trim())
      if (dynamicAdmins.includes(userEmail) || (cleanName && dynamicAdmins.some((e) => e.includes(cleanName)))) {
        isSuperAdmin = true
      }
    } catch (err) {
      console.warn('Could not fetch dynamic super admin list:', err)
    }
  }

  let userRole = isSuperAdmin ? 'super_admin' : 'viewer'
  let userBatch = null

  if (!isSuperAdmin && userEmail) {
    try {
      // 1. Check adminSettings for dynamic revolving batch email slots and universal / batch moderator access
      const adminDoc = await client.fetch(
        '*[_type == "adminSettings"][0]{ batch_email_slots, batch_rotation_enabled, universal_moderator_emails }'
      )

      // A. Check universal_moderator_emails (supports both new object format with assigned_batch and legacy strings)
      if (adminDoc?.universal_moderator_emails && Array.isArray(adminDoc.universal_moderator_emails)) {
        for (const entry of adminDoc.universal_moderator_emails) {
          if (!entry) continue
          if (typeof entry === 'string') {
            if (entry.toLowerCase().trim() === userEmail) {
              userRole = 'universal_moderator'
              break
            }
          } else if (typeof entry === 'object') {
            const entryEmail = (entry.email || '').toLowerCase().trim()
            if (entryEmail === userEmail && entry.is_active !== false) {
              const batch = entry.assigned_batch || 'all'
              const role = entry.role || 'batch_admin'
              if (batch === 'all') {
                userRole = role === 'moderator' ? 'universal_moderator' : 'universal_admin'
              } else {
                userRole = role === 'moderator' ? 'moderator' : 'batch_admin'
                userBatch = batch
              }
              break
            }
          }
        }
      }

      // B. Check revolving batch email slots if not yet assigned
      if ((!userRole || userRole === 'viewer') && adminDoc?.batch_email_slots && Array.isArray(adminDoc.batch_email_slots)) {
        for (const slot of adminDoc.batch_email_slots) {
          const slotEmail = (slot?.admin_email || '').trim().toLowerCase()
          if (slotEmail === userEmail && slot.is_active !== false) {
            if (slot.expiry_date) {
              const exp = new Date(slot.expiry_date)
              if (!isNaN(exp.getTime()) && new Date() > exp) continue
            }
            userRole = 'batch_admin'
            userBatch = slot.assigned_batch
            break
          }
        }
      }

      // 2. Check batchConfig documents
      if (!userRole || userRole === 'viewer') {
        const allConfigs = await client.fetch(
          `*[_type == "batchConfig"]{
            batch,
            batch_admin_emails,
            moderator_emails
          }`
        )
        if (Array.isArray(allConfigs)) {
          for (const cfg of allConfigs) {
            const admins = (cfg.batch_admin_emails || []).map((e) => (e || '').toLowerCase().trim())
            const mods = (cfg.moderator_emails || []).map((e) => (e || '').toLowerCase().trim())

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
        }
      }

      // 3. Fallback: check legacy siteSettings.batch_administration
      if (!userRole || userRole === 'viewer') {
        const siteDoc = await client.fetch(
          '*[_type == "siteSettings"][0]{ batch_administration }'
        )
        if (siteDoc?.batch_administration && Array.isArray(siteDoc.batch_administration)) {
          for (const item of siteDoc.batch_administration) {
            const admins = (item.batch_admin_emails || []).map((e) => (e || '').toLowerCase().trim())
            const mods = (item.moderator_emails || []).map((e) => (e || '').toLowerCase().trim())
            if (admins.includes(userEmail)) {
              userRole = 'batch_admin'
              userBatch = item.batch
              break
            } else if (mods.includes(userEmail)) {
              userRole = 'moderator'
              userBatch = item.batch
              break
            }
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
          .title('New Edit Request')
          .icon(EditIcon)
          .child(
            S.documentTypeList('editRequest')
              .title('New Edit Request')
              .filter('_type == "editRequest" && batch == $batch && requester_email == $email')
              .params({ batch: userBatch, email: userEmail })
              .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              .initialValueTemplates([
                S.initialValueTemplateItem('editRequest-pending'),
              ])
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
    const cleanBatchKey = userBatch.toLowerCase().replace(/[^a-z0-9]/g, '')
    return S.list()
      .title(`${userBatch} Batch Admin Portal`)
      .items([
        ...createBatchContentItems(S, userBatch),
        S.listItem()
          .title(`${userBatch} Moderators`)
          .icon(UsersIcon)
          .child(
            S.document()
              .schemaType('batchModerators')
              .documentId(`batchModerators-${cleanBatchKey}`)
              .title(`${userBatch} Moderators / মডারেটর নির্বাচন`)
          ),
        S.listItem()
          .title(`${userBatch} Website Password`)
          .icon(LockIcon)
          .child(
            S.document()
              .schemaType('batchConfig')
              .documentId(`batchConfig-${cleanBatchKey}`)
              .title(`${userBatch} Website Password`)
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
  // UNIVERSAL MODERATOR VIEW — Access to all batches + edit requests
  // ═════════════════════════════════════════════════════════════════════
  if ((userRole === 'universal_moderator' || userRole === 'universal_admin') && !isSuperAdmin) {
    const allBatches = [
      'HSC-27', 'HSC-28', 'HSC-29', 'HSC-30',
      'HSC-31', 'HSC-32', 'HSC-33', 'HSC-34', 'HSC-35',
      'HSC-36', 'HSC-37', 'HSC-38', 'HSC-39', 'HSC-40'
    ]
    return S.list()
      .title(userRole === 'universal_admin' ? 'Universal Batch Admin Portal' : 'Universal Moderator Portal')
      .items([
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
        ...allBatches.map((b) => createBatchPortalItem(S, b, b === 'HSC-27')),
      ])
  }

  // ═════════════════════════════════════════════════════════════════════
  // D. RESTRICTED / VIEWER VIEW — Unauthorized email fallback
  // ═════════════════════════════════════════════════════════════════════
  if (!isSuperAdmin) {
    return S.list()
      .title('Access Restricted / প্রবেশাধিকার সীমাবদ্ধ')
      .items([
        S.listItem()
          .title('Restricted Access / প্রবেশাধিকার সীমিত')
          .icon(LockIcon)
          .child(
            S.documentTypeList('notice')
              .title('Official Notices (Read Only)')
              .defaultOrdering([{ field: 'date', direction: 'desc' }])
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
      S.listItem()
        .title('All Batch Moderators')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('batchModerators')
            .title('All Batch Moderators / সকল ব্যাচ মডারেটর')
            .defaultOrdering([{ field: 'batch', direction: 'asc' }])
        ),

      S.divider(),

      // ─── Batch Portals (HSC-27 Founder to HSC-40) ───
      createBatchPortalItem(S, 'HSC-27', true),
      createBatchPortalItem(S, 'HSC-28'),
      createBatchPortalItem(S, 'HSC-29'),
      createBatchPortalItem(S, 'HSC-30'),
      createBatchPortalItem(S, 'HSC-31'),
      createBatchPortalItem(S, 'HSC-32'),
      createBatchPortalItem(S, 'HSC-33'),
      createBatchPortalItem(S, 'HSC-34'),
      createBatchPortalItem(S, 'HSC-35'),
      createBatchPortalItem(S, 'HSC-36'),
      createBatchPortalItem(S, 'HSC-37'),
      createBatchPortalItem(S, 'HSC-38'),
      createBatchPortalItem(S, 'HSC-39'),
      createBatchPortalItem(S, 'HSC-40'),

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
