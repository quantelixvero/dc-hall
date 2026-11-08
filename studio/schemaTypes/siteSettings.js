import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General Settings', default: true },
    { name: 'card_badges', title: 'Card Meta Badges & Display' },
    { name: 'hero', title: 'Hero Banner Settings' },
    { name: 'dhaka_college', title: 'Dhaka College Official Resources & Clubs' },
  ],
  fields: [
    // ═══════════════════════════════════════════
    // General
    // ═══════════════════════════════════════════
    defineField({
      name: 'site_title_en',
      title: 'Website Title (English)',
      type: 'string',
      group: 'general',
      description: 'ওয়েবসাইটের মূল নাম (ইংরেজি)। যেমন: "Dhaka College International Hall"',
    }),
    defineField({
      name: 'site_title_bn',
      title: 'Website Title (Bangla)',
      type: 'string',
      group: 'general',
      description: 'ওয়েবসাইটের মূল নাম (বাংলা)। যেমন: "ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস"',
    }),
    defineField({
      name: 'logo',
      title: 'Header Logo Image',
      type: 'image',
      group: 'general',
      description: 'ওয়েবসাইটের নেভিগেশন বারের অফিশিয়াল লোগো (স্বচ্ছ ব্যাকগ্রাউন্ড পিএনজি বাঞ্ছনীয়)।',
    }),
    defineField({
      name: 'hero_image',
      title: 'Hero Banner Background Image',
      type: 'image',
      group: 'general',
      description: 'হোম পেজের প্রধান ব্যানার বা হিরো সেকশনের ব্যাকগ্রাউন্ড ছবি।',
    }),
    defineField({
      name: 'notice_pdf',
      title: 'Notice Board PDF Document',
      type: 'file',
      group: 'general',
      description: 'হোম পেজের নোটিশ বোর্ডের জন্য সর্বশেষ সাধারণ সার্কুলার পিডিএফ ফাইল।',
    }),

    // ═══════════════════════════════════════════
    // Hero
    // ═══════════════════════════════════════════
    defineField({
      name: 'hero_title_en',
      title: 'Hero Title (English)',
      type: 'string',
      group: 'hero',
      description: 'ব্যানারের প্রধান আকর্ষণীয় শিরোনাম (ইংরেজি)।',
    }),
    defineField({
      name: 'hero_title_bn',
      title: 'Hero Title (Bangla)',
      type: 'string',
      group: 'hero',
      description: 'ব্যানারের প্রধান আকর্ষণীয় শিরোনাম (বাংলা)।',
    }),
    defineField({
      name: 'hero_subtitle_en',
      title: 'Hero Subtitle (English)',
      type: 'string',
      group: 'hero',
      description: 'ব্যানার শিরোনামের নিচের সংক্ষিপ্ত পরিচিতি বা বক্তব্য (ইংরেজি)।',
    }),
    defineField({
      name: 'hero_subtitle_bn',
      title: 'Hero Subtitle (Bangla)',
      type: 'string',
      group: 'hero',
      description: 'ব্যানার শিরোনামের নিচের সংক্ষিপ্ত পরিচিতি বা বক্তব্য (বাংলা)।',
    }),

    // ═══════════════════════════════════════════
    // Privacy & Passwords (Hidden / Managed via adminSettings)
    // ═══════════════════════════════════════════
    defineField({
      name: 'master_password',
      title: 'Master Admin Password',
      type: 'string',
      hidden: true,
      description: 'এই পাসওয়ার্ড দিয়ে লগইন করলে সমস্ত ব্যাচের সব লক করা তথ্য আনলক হবে।',
    }),
    defineField({
      name: 'batch_passwords',
      title: 'Batch Specific Passwords',
      type: 'object',
      hidden: true,
      description: 'নির্দিষ্ট ব্যাচের শিক্ষার্থীরা এই পাসওয়ার্ড দিয়ে লগইন করলে শুধুমাত্র তাদের ব্যাচের সংরক্ষিত তথ্য দেখতে পারবে।',
      fields: [
        { name: 'hsc27', title: 'HSC 2027 Password', type: 'string', placeholder: 'dc27hall' },
        { name: 'hsc28', title: 'HSC 2028 Password', type: 'string', placeholder: 'dc28hall' },
        { name: 'hsc29', title: 'HSC 2029 Password', type: 'string', placeholder: 'dc29hall' },
        { name: 'hsc30', title: 'HSC 2030 Password', type: 'string', placeholder: 'dc30hall' },
      ],
    }),
    defineField({
      name: 'batch_administration',
      title: 'Batch Administration',
      type: 'array',
      hidden: true,
      description: 'প্রতিটি ব্যাচের জন্য Batch Admin ও Moderator ইমেইল নির্ধারণ করুন।',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'batch',
              title: 'Batch',
              type: 'string',
              options: {
                list: [
                  { title: 'HSC-27 (Founder Batch)', value: 'HSC-27' },
                  { title: 'HSC-28', value: 'HSC-28' },
                  { title: 'HSC-29', value: 'HSC-29' },
                  { title: 'HSC-30', value: 'HSC-30' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'batch_admin_emails',
              title: 'Batch Admin Emails',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'moderator_emails',
              title: 'Moderator Emails',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: {
              batch: 'batch',
              admins: 'batch_admin_emails',
              mods: 'moderator_emails',
            },
            prepare({ batch, admins, mods }) {
              const adminCount = Array.isArray(admins) ? admins.length : 0;
              const modCount = Array.isArray(mods) ? mods.length : 0;
              return {
                title: `${batch || 'Batch'} Administration`,
                subtitle: `${adminCount} Admin(s), ${modCount} Moderator(s)`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'password',
      title: 'Global Legacy Visibility Password',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'global_visibility',
      title: 'Global Visibility',
      type: 'boolean',
      hidden: true,
      description: 'ON থাকলে পাসওয়ার্ড ছাড়াই সাধারণ ভিজিটররা মৌলিক তথ্য দেখতে পারবে।',
      initialValue: true,
    }),
    defineField({
      name: 'locked_fields',
      title: 'General User Locked Fields',
      type: 'object',
      hidden: true,
      description: 'যে যে ফিল্ডগুলো সাধারণ ভিজিটরদের কাছে লক থাকবে।',
      fields: [
        { name: 'lock_phone', title: 'Lock Student Phone Number', type: 'boolean', initialValue: true },
        { name: 'lock_father_phone', title: 'Lock Guardian Phone', type: 'boolean', initialValue: true },
        { name: 'lock_email', title: 'Lock Email', type: 'boolean', initialValue: true },
        { name: 'lock_address', title: 'Lock Address', type: 'boolean', initialValue: false },
        { name: 'lock_socials', title: 'Lock Social Links', type: 'boolean', initialValue: false },
        { name: 'lock_results', title: 'Lock Academic Results PDFs', type: 'boolean', initialValue: true },
        { name: 'lock_room', title: 'Lock Room Allocation', type: 'boolean', initialValue: false },
      ],
    }),

    // ═══════════════════════════════════════════
    // Dhaka College & Clubs
    // ═══════════════════════════════════════════
    defineField({
      name: 'dhaka_college',
      title: 'Dhaka College Official Resources & Clubs',
      type: 'object',
      group: 'dhaka_college',
      description: 'ঢাকা কলেজের প্রাতিষ্ঠানিক ওয়েবসাইট, অফিশিয়াল নোটিশ বোর্ড ও ক্লাবসমূহের তথ্য।',
      fields: [
        { name: 'official_site_title_en', title: 'Official Website Title (English)', type: 'string', description: 'অফিশিয়াল ওয়েবসাইটের ইংরেজি নাম।' },
        { name: 'official_site_title_bn', title: 'Official Website Title (Bangla)', type: 'string', description: 'অফিশিয়াল ওয়েবসাইটের বাংলা নাম।' },
        { name: 'official_site_url', title: 'Official Website URL', type: 'url', description: 'ঢাকা কলেজের মূল অফিশিয়াল পোর্টাল লিংক।' },
        { name: 'notice_title_en', title: 'Notice Title (English)', type: 'string', description: 'কলেজ নোটিশ বোর্ডের ইংরেজি নাম।' },
        { name: 'notice_title_bn', title: 'Notice Title (Bangla)', type: 'string', description: 'কলেজ নোটিশ বোর্ডের বাংলা নাম।' },
        { name: 'notice_url', title: 'Notice Board URL', type: 'url', description: 'ঢাকা কলেজের অফিশিয়াল নোটিশ বোর্ড লিংক।' },
        { name: 'result_admit_title_en', title: 'Result & Admit Title (English)', type: 'string', description: 'কলেজ রেজাল্ট ও এডমিট কার্ড পোর্টালে নাম (ইংরেজি)।' },
        { name: 'result_admit_title_bn', title: 'Result & Admit Title (Bangla)', type: 'string', description: 'কলেজ রেজাল্ট ও এডমিট কার্ড পোর্টালে নাম (বাংলা)।' },
        { name: 'result_admit_url', title: 'Result & Admit Card URL', type: 'url', description: 'এডমিট কার্ড ও ফলাফল ডাউনলোড পোর্টাল লিংক।' },
        {
          name: 'social_links',
          title: 'Official Social Pages & Groups',
          type: 'array',
          description: 'কলেজের অফিশিয়াল ফেসবুক পেজ বা গ্রুপের লিংকসমূহ।',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title_en', title: 'Title (English)', type: 'string', description: 'গ্রুপ বা পেজের ইংরেজি নাম' },
                { name: 'title_bn', title: 'Title (Bangla)', type: 'string', description: 'গ্রুপ বা পেজের বাংলা নাম' },
                { name: 'url', title: 'Social URL', type: 'url', description: 'ফেসবুক পেজ বা গ্রুপ লিংক' },
                { name: 'is_group', title: 'Is Group (Checked = Group, Unchecked = Page)', type: 'boolean', description: 'গ্রুপ হলে টিক দিন, পেজ হলে খালি রাখুন।' },
              ],
            },
          ],
        },
        {
          name: 'clubs',
          title: 'Dhaka College Clubs',
          type: 'array',
          description: 'ঢাকা কলেজের কো-কারিকুলার ক্লাবসমূহ (যেমন: ডিবেটিং ক্লাব, সায়েন্স ক্লাব, রোভার স্কাউট)।',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name_en', title: 'Club Name (English)', type: 'string', description: 'ক্লাবের নাম (ইংরেজি)' },
                { name: 'name_bn', title: 'Club Name (Bangla)', type: 'string', description: 'ক্লাবের নাম (বাংলা)' },
                { name: 'desc_en', title: 'Description (English)', type: 'text', rows: 2, description: 'ক্লাবের সংক্ষিপ্ত বিবরণ (ইংরেজি)' },
                { name: 'desc_bn', title: 'Description (Bangla)', type: 'text', rows: 2, description: 'ক্লাবের সংক্ষিপ্ত বিবরণ (বাংলা)' },
                { name: 'facebook_url', title: 'Club Facebook Page URL', type: 'url', description: 'ক্লাবের অফিশিয়াল ফেসবুক পেজ লিংক' },
              ],
            },
          ],
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // Footer & Quick Links (Hidden / Managed via adminSettings)
    // ═══════════════════════════════════════════
    defineField({
      name: 'footer_columns',
      hidden: true,
      title: 'Footer Columns & Links',
      type: 'array',
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
              title: 'Show Column on Site',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'links',
              title: 'Column Links',
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
                      title: 'Active',
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
                      const status = isActive !== false ? '[Active]' : '[Hidden]'
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
              const status = isActive !== false ? 'Active' : 'Hidden'
              const label = titleEn || titleBn || 'Column'
              return {
                title: `${label} (${count} links)`,
                subtitle: `Status: ${status}`,
              }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // Card Meta Badges & Display Settings
    // ═══════════════════════════════════════════
    defineField({
      name: 'student_name_case',
      title: 'Student Name Display Case / শিক্ষার্থীর নামের ফরম্যাট',
      type: 'string',
      group: 'card_badges',
      description: 'অ্যাডমিন প্যানেলে যেভাবেই নাম ইনপুট দেওয়া হোক না কেন, ওয়েবসাইটে নাম প্রদর্শনের নির্দিষ্ট নিয়ম।',
      options: {
        list: [
          { title: 'Title Case / Capitalize Each Word (যেমন: Md. Rahim Ali)', value: 'capitalize_each_word' },
          { title: 'ALL UPPERCASE / সব বড় হাতের (যেমন: MD. RAHIM ALI)', value: 'uppercase' },
          { title: 'As Typed / Original (যেমন লেখা হয়েছে তেমনই)', value: 'as_typed' },
        ],
        layout: 'radio',
      },
      initialValue: 'capitalize_each_word',
    }),

    defineField({
      name: 'card_meta_badges',
      title: 'Card Meta Badges Settings / কার্ড মেটা ব্যাজ সেটিংস',
      type: 'object',
      group: 'card_badges',
      description: 'স্টুডেন্ট কার্ড, হোমপেজ কার্ড, রুমমেট ও বার্থডে কার্ডে নামের নিচে কোন কোন ব্যাজ/তথ্য দেখাবে তা এখান থেকে নিয়ন্ত্রণ করুন।',
      fields: [
        defineField({
          name: 'student_page_badges',
          title: 'Student Page Badges / স্টুডেন্ট পেইজ ব্যাজ',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'স্টুডেন্ট পেইজের কার্ডে নামের নিচে কোন কোন ব্যাজ দেখাবে। (ডিফল্ট: Room ও Group)',
          options: {
            list: [
              { title: 'Room No (রুম নম্বর)', value: 'room' },
              { title: 'Group (বিজ্ঞান/মানবিক/ব্যবসায় শিক্ষা)', value: 'group' },
              { title: 'Batch (ব্যাচ)', value: 'batch' },
              { title: 'Section (সেকশন)', value: 'section' },
              { title: 'Blood Group (রক্তের গ্রুপ)', value: 'blood_group' },
              { title: 'College Roll (রোল)', value: 'roll' },
            ],
          },
          initialValue: ['room', 'group'],
        }),
        defineField({
          name: 'home_students_badges',
          title: 'Home Page Students Badges / হোমপেজ স্টুডেন্ট ব্যাজ',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'হোমপেজের নির্বাচিত ৬ জন শিক্ষার্থী কার্ডে কোন কোন ব্যাজ দেখাবে।',
          options: {
            list: [
              { title: 'Room No (রুম নম্বর)', value: 'room' },
              { title: 'Group (গ্রুপ)', value: 'group' },
              { title: 'Batch (ব্যাচ)', value: 'batch' },
              { title: 'Section (সেকশন)', value: 'section' },
              { title: 'Blood Group (রক্তের গ্রুপ)', value: 'blood_group' },
              { title: 'College Roll (রোল)', value: 'roll' },
            ],
          },
          initialValue: ['room', 'group'],
        }),
        defineField({
          name: 'home_roommates_badges',
          title: 'Home Page Roommates Badges / হোমপেজ রুমমেট ব্যাজ',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'হোমপেজের রুমমেট সেকশনের কার্ডে প্রতিটি শিক্ষার্থীর সাথে কোন ব্যাজ দেখাবে।',
          options: {
            list: [
              { title: 'Group (গ্রুপ)', value: 'group' },
              { title: 'Batch (ব্যাচ)', value: 'batch' },
              { title: 'Section (সেকশন)', value: 'section' },
              { title: 'Blood Group (রক্তের গ্রুপ)', value: 'blood_group' },
              { title: 'College Roll (রোল)', value: 'roll' },
            ],
          },
          initialValue: ['group'],
        }),
        defineField({
          name: 'roommates_page_badges',
          title: 'Roommates Page Badges / রুমমেট পেইজ ব্যাজ',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'রুমমেট পেইজের কার্ডে প্রতিটি শিক্ষার্থীর নামের সাথে কোন তথ্য দেখাবে।',
          options: {
            list: [
              { title: 'Group (গ্রুপ)', value: 'group' },
              { title: 'Batch (ব্যাচ)', value: 'batch' },
              { title: 'Section (সেকশন)', value: 'section' },
              { title: 'Blood Group (রক্তের গ্রুপ)', value: 'blood_group' },
              { title: 'College Roll (রোল)', value: 'roll' },
            ],
          },
          initialValue: ['group'],
        }),
        defineField({
          name: 'birthday_page_badges',
          title: 'Birthday Page Badges / বার্থডে পেইজ ব্যাজ',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'বার্থডে পেইজের কার্ডে জন্মদিনের পাশাপাশি আর কোন কোন তথ্য ব্যাজ হিসেবে দেখাবে।',
          options: {
            list: [
              { title: 'Room No (রুম নম্বর)', value: 'room' },
              { title: 'Group (গ্রুপ)', value: 'group' },
              { title: 'Batch (ব্যাচ)', value: 'batch' },
              { title: 'Section (সেকশন)', value: 'section' },
              { title: 'Blood Group (রক্তের গ্রুপ)', value: 'blood_group' },
            ],
          },
          initialValue: ['room', 'group'],
        }),
        defineField({
          name: 'max_badges_per_card',
          title: 'Maximum Badges Per Card / প্রতি কার্ডে সর্বোচ্চ ব্যাজ সংখ্যা',
          type: 'number',
          description: 'কার্ডে সুন্দর লুক বজায় রাখতে সর্বোচ্চ কয়টি ব্যাজ দেখানো হবে (ডিফল্ট: ৩)।',
          initialValue: 3,
          validation: (Rule) => Rule.min(1).max(6),
        }),
      ],
    }),

    defineField({
      name: 'quick_links',
      title: 'Legacy Quick Links (hidden)',
      type: 'array',
      hidden: true,
      of: [{ type: 'object', fields: [{ name: 'title_en', type: 'string' }] }],
    }),
  ],

  preview: {
    select: {
      title: 'site_title_en',
      subtitle: 'site_title_bn',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Site Settings',
        subtitle: subtitle || 'Global Configuration',
      }
    },
  },
})
