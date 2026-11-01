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
} from '@sanity/icons'

// Hardcoded Super Admin emails (always have full access)
const SUPER_ADMIN_EMAILS = [
  'drseadib@gmail.com',
  'seadibpc@outlook.com',
]

/**
 * Helper to build the 4 core management items for a specific batch:
 * 1. Students (with initialValue prefilled for this batch)
 * 2. Roommates / Rooms
 * 3. Photo Collections (Gallery Items)
 * 4. Events Gallery
 */
function createBatchSection(S, batchName, isFounder = false) {
  const cleanBatchKey = batchName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const titleBadge = isFounder ? `${batchName} (Founder Batch)` : batchName

  return S.list()
    .title(`${titleBadge} Management`)
    .items([
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
    ])
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

  // 2. If NOT Super Admin, check if user is a designated Batch Moderator
  let userModeratorBatch = null

  if (!isSuperAdmin) {
    try {
      const client = getClient({ apiVersion: '2023-08-01' })
      const settings = await client.fetch(
        '*[_type == "siteSettings"][0]{ batch_moderators }'
      )
      const batchMods = settings?.batch_moderators || []

      for (const entry of batchMods) {
        const emails = (entry?.emails || []).map((e) => (e || '').trim().toLowerCase())
        if (emails.includes(userEmail)) {
          userModeratorBatch = entry.batch // e.g. "HSC-28"
          break
        }
      }
    } catch (err) {
      console.warn('Could not fetch batch moderator settings:', err)
    }
  }

  // ═════════════════════════════════════════════════════════════════════
  // A. RESTRICTED BATCH MODERATOR VIEW (Only their 4 batch folders!)
  // ═════════════════════════════════════════════════════════════════════
  if (userModeratorBatch && !isSuperAdmin) {
    const isFounder = userModeratorBatch === 'HSC-27'
    const batchSection = createBatchSection(S, userModeratorBatch, isFounder)

    return S.list()
      .title(`${userModeratorBatch} Moderator Portal`)
      .items(batchSection.getItems())
  }

  // ═════════════════════════════════════════════════════════════════════
  // B. SUPER ADMIN FULL VIEW (All Batches, Settings & Controls)
  // ═════════════════════════════════════════════════════════════════════
  return S.list()
    .title('DC Hall Administration')
    .items([
      // 1. Site Settings, Singletons & Access Control
      S.listItem()
        .title('Site Settings & Privacy (সাইট সেটিংস ও অ্যাক্সেস কন্ট্রোল)')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings & Privacy')
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

      // 2. Active Batches — Dedicated Batch Portals
      S.listItem()
        .title('📁 HSC-28 Portal (Active Batch)')
        .icon(FolderIcon)
        .child(createBatchSection(S, 'HSC-28', false)),

      S.listItem()
        .title('⭐ HSC-27 Portal (Founder Legacy Batch)')
        .icon(StarIcon)
        .child(createBatchSection(S, 'HSC-27', true)),

      S.listItem()
        .title('📁 HSC-29 Portal (Upcoming Batch)')
        .icon(FolderIcon)
        .child(createBatchSection(S, 'HSC-29', false)),

      S.divider(),

      // 3. Master Document Lists (All Batches Combined)
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
