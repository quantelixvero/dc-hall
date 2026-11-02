import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'adminSettings',
  title: 'Admin Settings & Controls',
  type: 'document',

  groups: [
    { name: 'passwords', title: '🔑 Passwords & Master Key' },
    { name: 'profile_controls', title: '👤 Profile Fields & Locks' },
    { name: 'homepage_vis', title: '🏠 Home Page Sections' },
    { name: 'developer_vis', title: '🧑‍💻 Developer Sections' },
    { name: 'hallinfo_vis', title: '🏛️ Hall Info Sections' },
    { name: 'menu_vis', title: '📱 Menu Items' },
    { name: 'footer_settings', title: '📎 Footer Columns & Links' },
  ],

  fields: [
    // ═══════════════════════════════════════════
    // 1. MASTER PASSWORD
    // ═══════════════════════════════════════════
    defineField({
      name: 'master_password',
      title: 'Master Admin Password',
      type: 'string',
      group: 'passwords',
      description: 'Master password to unlock all batches and all protected data across the website.',
    }),

    defineField({
      name: 'global_visibility',
      title: 'Global Public Visibility',
      type: 'boolean',
      group: 'passwords',
      description: 'When enabled, public visitors can view basic unmasked profiles without logging in.',
      initialValue: true,
    }),

    // ═══════════════════════════════════════════
    // 2. UNIFIED PROFILE FIELDS & LOCKS
    // ═══════════════════════════════════════════
    defineField({
      name: 'profile_field_controls',
      title: 'Profile Field Controls (Visibility, Order & Locks)',
      type: 'array',
      group: 'profile_controls',
      description: 'Drag items to reorder profile fields. Toggle Visibility to completely show/hide. Toggle Public Lock and Batch Lock to protect sensitive data.',
      of: [
        {
          type: 'object',
          name: 'profileFieldControl',
          title: 'Profile Field',
          fields: [
            defineField({
              name: 'label',
              title: 'Field Name',
              type: 'string',
              readOnly: true,
            }),
            defineField({
              name: 'field_id',
              title: 'Field Identifier',
              type: 'string',
              readOnly: true,
            }),
            defineField({
              name: 'visible',
              title: 'Visible on Website',
              type: 'boolean',
              description: 'Turn off to completely hide this field from the website. Lower items will smoothly slide up.',
              initialValue: true,
            }),
            defineField({
              name: 'public_lock',
              title: 'Lock for Public Visitors',
              type: 'boolean',
              description: 'When ON, unauthenticated visitors will see this field locked/masked.',
              initialValue: false,
            }),
            defineField({
              name: 'batch_lock',
              title: 'Lock for Junior Batches (Junior → Senior)',
              type: 'boolean',
              description: 'When ON, junior students will see this field locked when viewing senior batch profiles.',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              label: 'label',
              field_id: 'field_id',
              visible: 'visible',
              public_lock: 'public_lock',
              batch_lock: 'batch_lock',
            },
            prepare({ label, field_id, visible, public_lock, batch_lock }) {
              const isVis = visible !== false
              const icon = isVis ? '🟢' : '⚪'
              const pubStr = public_lock ? '🔒 Locked' : '🔓 Open'
              const batchStr = batch_lock ? '🔒 Locked' : '🔓 Open'
              const name = label || field_id || 'Profile Field'
              return {
                title: `${icon} ${name}`,
                subtitle: isVis
                  ? `Public: ${pubStr}  |  Batch: ${batchStr}`
                  : `Hidden from website (invisible)`,
              }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // 3. HOME PAGE SECTIONS VISIBILITY & ORDER
    // ═══════════════════════════════════════════
    defineField({
      name: 'homepage_sections',
      title: 'Home Page Sections (Order & Visibility)',
      type: 'array',
      group: 'homepage_vis',
      description: 'Drag to reorder sections on the Home Page. Toggle Visible to display or completely remove.',
      of: [
        {
          type: 'object',
          name: 'homepageSection',
          title: 'Home Page Section',
          fields: [
            defineField({
              name: 'label',
              title: 'Section Name',
              type: 'string',
              readOnly: true,
            }),
            defineField({
              name: 'section_id',
              title: 'Section Identifier',
              type: 'string',
              readOnly: true,
            }),
            defineField({
              name: 'visible',
              title: 'Visible on Website',
              type: 'boolean',
              description: 'Turn off to completely hide this section from the Home Page.',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              label: 'label',
              section_id: 'section_id',
              visible: 'visible',
            },
            prepare({ label, section_id, visible }) {
              const isVis = visible !== false
              const icon = isVis ? '🟢' : '⚪'
              const name = label || section_id || 'Section'
              return {
                title: `${icon} ${name}`,
                subtitle: isVis ? 'Visible on Home Page' : 'Hidden from Home Page',
              }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // 4. DEVELOPER PAGE SECTIONS VISIBILITY & ORDER
    // ═══════════════════════════════════════════
    defineField({
      name: 'developer_sections',
      title: 'Developer Page Sections (Order & Visibility)',
      type: 'array',
      group: 'developer_vis',
      description: 'Drag to reorder sections on the Developer Profile page.',
      of: [
        {
          type: 'object',
          name: 'developerSection',
          title: 'Developer Section',
          fields: [
            defineField({
              name: 'label',
              title: 'Section Name',
              type: 'string',
              readOnly: true,
            }),
            defineField({
              name: 'section_id',
              title: 'Section Identifier',
              type: 'string',
              readOnly: true,
            }),
            defineField({
              name: 'visible',
              title: 'Visible on Website',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              label: 'label',
              section_id: 'section_id',
              visible: 'visible',
            },
            prepare({ label, section_id, visible }) {
              const isVis = visible !== false
              const icon = isVis ? '🟢' : '⚪'
              const name = label || section_id || 'Section'
              return {
                title: `${icon} ${name}`,
                subtitle: isVis ? 'Visible on Developer Page' : 'Hidden from Developer Page',
              }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // 5. HALL INFO SECTIONS VISIBILITY & ORDER
    // ═══════════════════════════════════════════
    defineField({
      name: 'hallinfo_sections',
      title: 'Hall Info Page Sections (Order & Visibility)',
      type: 'array',
      group: 'hallinfo_vis',
      description: 'Drag to reorder sections on the Hall Info & Hostel page.',
      of: [
        {
          type: 'object',
          name: 'hallinfoSection',
          title: 'Hall Info Section',
          fields: [
            defineField({
              name: 'label',
              title: 'Section Name',
              type: 'string',
              readOnly: true,
            }),
            defineField({
              name: 'section_id',
              title: 'Section Identifier',
              type: 'string',
              readOnly: true,
            }),
            defineField({
              name: 'visible',
              title: 'Visible on Website',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              label: 'label',
              section_id: 'section_id',
              visible: 'visible',
            },
            prepare({ label, section_id, visible }) {
              const isVis = visible !== false
              const icon = isVis ? '🟢' : '⚪'
              const name = label || section_id || 'Section'
              return {
                title: `${icon} ${name}`,
                subtitle: isVis ? 'Visible on Hall Info Page' : 'Hidden from Hall Info Page',
              }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // 6. MENU VISIBILITY
    // ═══════════════════════════════════════════
    defineField({
      name: 'menu_visibility',
      title: 'Navigation Menu Visibility',
      type: 'object',
      group: 'menu_vis',
      description: 'Toggle which buttons appear in the main navigation bar.',
      fields: [
        { name: 'menu_home', title: 'Home Button', type: 'boolean', initialValue: true },
        { name: 'menu_students', title: 'Students Button', type: 'boolean', initialValue: true },
        { name: 'menu_roommates', title: 'Roommates Button', type: 'boolean', initialValue: true },
        { name: 'menu_results', title: 'Results Button', type: 'boolean', initialValue: true },
        { name: 'menu_gallery', title: 'Gallery Button', type: 'boolean', initialValue: true },
        { name: 'menu_hostel', title: 'Hostel / Hall Info Button', type: 'boolean', initialValue: true },
        { name: 'menu_dc_clubs', title: 'College Clubs Button', type: 'boolean', initialValue: true },
        { name: 'menu_dc_social', title: 'Social Media Button', type: 'boolean', initialValue: true },
        { name: 'menu_developer', title: 'Developer Button', type: 'boolean', initialValue: true },
        { name: 'menu_profile', title: 'Profile / Login Button', type: 'boolean', initialValue: true },
      ],
    }),

    // ═══════════════════════════════════════════
    // 7. FOOTER COLUMNS & LINKS
    // ═══════════════════════════════════════════
    defineField({
      name: 'footer_columns',
      title: 'Footer Columns & Links',
      type: 'array',
      group: 'footer_settings',
      description: 'Manage footer columns, active states, and custom links.',
      of: [
        {
          type: 'object',
          name: 'footerColumn',
          title: 'Footer Column',
          fields: [
            defineField({
              name: 'title_en',
              title: 'Column Title (English)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title_bn',
              title: 'Column Title (Bangla)',
              type: 'string',
            }),
            defineField({
              name: 'is_active',
              title: 'Active (Visible on Site)',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'links',
              title: 'Column Links (Drag to Reorder)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'columnLink',
                  title: 'Link',
                  fields: [
                    defineField({
                      name: 'title_en',
                      title: 'Link Title (English)',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'title_bn',
                      title: 'Link Title (Bangla)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'url',
                      title: 'Target URL',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'is_active',
                      title: 'Active (Visible)',
                      type: 'boolean',
                      initialValue: true,
                    }),
                    defineField({
                      name: 'open_in_new_tab',
                      title: 'Open in New Tab',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: {
                      titleEn: 'title_en',
                      titleBn: 'title_bn',
                      url: 'url',
                      isActive: 'is_active',
                    },
                    prepare({ titleEn, titleBn, url, isActive }) {
                      const status = isActive !== false ? '🟢' : '⚪ Hidden'
                      const label = titleEn || titleBn || 'Link'
                      return {
                        title: `${status} ${label}`,
                        subtitle: url,
                      }
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              titleEn: 'title_en',
              titleBn: 'title_bn',
              links: 'links',
              isActive: 'is_active',
            },
            prepare({ titleEn, titleBn, links, isActive }) {
              const count = Array.isArray(links) ? links.length : 0
              const status = isActive !== false ? '🟢 Active' : '⚪ Hidden'
              const label = titleEn || titleBn || 'Column'
              return {
                title: `${label} (${count} links)`,
                subtitle: status,
              }
            },
          },
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Admin Settings & Controls',
        subtitle: 'Password, Locks, Visibility & Footer Management',
      }
    },
  },
})
