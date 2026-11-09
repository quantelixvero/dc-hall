import { defineField, defineType } from 'sanity'

// Predefined Profile Fields for Dropdown (Clean English titles)
const PROFILE_FIELD_OPTIONS = [
  { title: 'Profile Photo', value: 'photo' },
  { title: 'Full Name', value: 'name' },
  { title: 'Room · Roll Badge', value: 'room_badge' },
  { title: 'Quick Action Buttons (Call, WhatsApp, Email, FB)', value: 'quick_actions' },
  { title: 'Batch / Class', value: 'batch' },
  { title: 'Roll Number', value: 'roll' },
  { title: 'Academic Group (Science, Humanities, Business)', value: 'group' },
  { title: 'Section', value: 'section' },
  { title: 'Practical Group', value: 'practical_group' },
  { title: 'Blood Group', value: 'blood_group' },
  { title: 'Date of Birth', value: 'dob' },
  { title: 'Room (1st Year) — Ground Floor: 102, 103, 104', value: 'room_1st_year' },
  { title: 'Room (2nd Year) — 3rd Floor: 314-329', value: 'room_2nd_year' },
  { title: 'Phone Number', value: 'phone' },
  { title: 'WhatsApp', value: 'whatsapp' },
  { title: 'Telegram', value: 'telegram' },
  { title: 'Facebook Profile', value: 'facebook' },
  { title: 'Messenger', value: 'messenger' },
  { title: 'Email Address', value: 'email' },
  { title: 'Guardian / Father Phone', value: 'father_phone' },
  { title: 'Guardian Information', value: 'guardian' },
  { title: 'Address / Location', value: 'address' },
  { title: 'About / Bio', value: 'bio' },
  { title: '1st Year Academic Results', value: 'results_1st' },
  { title: '2nd Year Academic Results', value: 'results_2nd' },
  { title: 'College / Institution', value: 'college' },
  { title: 'Emergency Contact', value: 'emergency_contact' },
  { title: 'Full Roll Number', value: 'full_roll' },
  { title: 'Serial Position', value: 'position' },
]

// Predefined Home Page Section Options
const HOMEPAGE_SECTION_OPTIONS = [
  { title: 'Students Preview', value: 'students_preview' },
  { title: 'Roommates Preview', value: 'roommates_preview' },
  { title: 'Results Preview', value: 'results_preview' },
  { title: 'Hall Super Preview', value: 'hall_super_preview' },
  { title: 'Hall Info & History', value: 'hall_info_preview' },
  { title: 'Moments & Memories / Campus Photos', value: 'moments_preview' },
  { title: 'Portals & Resources', value: 'resources_preview' },
  { title: 'Location & Map', value: 'location_preview' },
]

// Predefined Developer Section Options
const DEVELOPER_SECTION_OPTIONS = [
  { title: 'Hero Bio & Portrait', value: 'hero_bio' },
  { title: 'Overview Panels', value: 'overview_panels' },
  { title: 'Featured Projects', value: 'featured_projects' },
  { title: 'Skills & Project Method', value: 'skills_timeline' },
  { title: 'Batch Moderators', value: 'batch_moderators' },
  { title: 'Feedback & Grievance Form', value: 'developer_feedback' },
  { title: 'Contributors', value: 'contributors' },
]

// Predefined Hall Info Section Options
const HALLINFO_SECTION_OPTIONS = [
  { title: 'History & Nearby Places', value: 'history_nearby' },
  { title: 'Campus Photos', value: 'campus_photos' },
  { title: 'Hall Super Profile & Message', value: 'hall_super' },
  { title: 'Office & Helpdesk', value: 'helpdesk' },
  { title: 'Notable Alumni Profiles', value: 'alumni' },
  { title: 'Admission Success Chart', value: 'success_chart' },
  { title: 'Location & Map', value: 'location_map' },
]

export default defineType({
  name: 'adminSettings',
  title: 'Security & Visibility Controls',
  type: 'document',

  groups: [
    { name: 'passwords', title: 'Passwords & Master Key', default: true },
    { name: 'batch_rotation', title: 'Batch Moderators & Access' },
    { name: 'profile_controls', title: 'Profile Fields & Badges' },
    { name: 'page_access', title: 'Page Access & Locks' },
    { name: 'homepage_vis', title: 'Home Page Sections' },
    { name: 'developer_vis', title: 'Developer Sections' },
    { name: 'hallinfo_vis', title: 'Hall Info Sections' },
    { name: 'menu_vis', title: 'Navigation Menu' },
    { name: 'footer_settings', title: 'Footer Columns & Links' },
  ],

  fields: [
    // ═══════════════════════════════════════════
    // SUPER ADMIN ACCOUNTS (FULL ACCESS)
    // ═══════════════════════════════════════════
    defineField({
      name: 'super_admin_emails',
      title: 'Super Admin Emails',
      type: 'array',
      group: 'batch_rotation',
      description: 'স্টুডিওতে পূর্ণ নিয়ন্ত্রণাধিকারী (Super Admin) ইমেইল তালিকা। quantelixvero@gmail.com সর্বদা প্রধান অ্যাডমিন। এখানে কোনো ইমেইল যোগ করলে সে পুরো স্টুডিওর সমস্ত সেটিংস ও সব ব্যাচের তথ্য ম্যানেজ করার ফুল অ্যাক্সেস পাবে।',
      of: [{ type: 'string' }],
      initialValue: [
        'quantelixvero@gmail.com',
        'drseadib@gmail.com',
        'seadibpc@outlook.com',
      ],
    }),

    // ═══════════════════════════════════════════
    // BATCH MODERATORS & UNIVERSAL ACCESS
    // ═══════════════════════════════════════════
    defineField({
      name: 'universal_moderator_emails',
      title: 'Universal & Batch Moderator Access / যেকোনো ব্যাচ বা নির্দিষ্ট ব্যাচের মডারেটর অ্যাক্সেস',
      type: 'array',
      group: 'batch_rotation',
      description: 'হুট করে যেকোনো জিমেইলকে নির্দিষ্ট কোনো ব্যাচে অথবা সকল ব্যাচে অ্যাক্সেস দিতে চাইলে এখানে যোগ করুন। ব্যাচ সিলেক্ট করে দিলে সেই ব্যক্তি কেবল ওই ব্যাচের ডেটা অ্যাক্সেস করতে পারবে, অন্য ব্যাচ দেখতে পারবে না।',
      of: [
        {
          type: 'object',
          name: 'moderatorAccess',
          title: 'Moderator Access Entry / মডারেটর অ্যাক্সেস',
          fields: [
            defineField({
              name: 'email',
              title: 'Moderator Email / মডারেটর ইমেইল',
              type: 'string',
              description: 'ব্যবহারকারীর গুগল বা স্যানিটি অ্যাকাউন্ট ইমেইল ঠিকানা।',
              validation: (Rule) => Rule.required().error('মডারেটরের ইমেইল প্রদান করা আবশ্যক।'),
            }),
            defineField({
              name: 'assigned_batch',
              title: 'Assigned Batch / নির্ধারিত ব্যাচ',
              type: 'string',
              description: 'কোন ব্যাচের অ্যাক্সেস দিতে চান? "সকল ব্যাচ (Universal)" নির্বাচন করলে সব ব্যাচের পোর্টাল অ্যাক্সেস করতে পারবে। নির্দিষ্ট ব্যাচ দিলে শুধুমাত্র সেই ব্যাচে প্রবেশাধিকার থাকবে।',
              initialValue: 'all',
              options: {
                list: [
                  { title: 'All Batches / সার্বজনীন (সকল ব্যাচ)', value: 'all' },
                  { title: 'HSC-27 (Founder Batch)', value: 'HSC-27' },
                  { title: 'HSC-28 (2026-27)', value: 'HSC-28' },
                  { title: 'HSC-29 (2027-28)', value: 'HSC-29' },
                  { title: 'HSC-30 (2028-29)', value: 'HSC-30' },
                  { title: 'HSC-31 (2029-30)', value: 'HSC-31' },
                  { title: 'HSC-32 (2030-31)', value: 'HSC-32' },
                  { title: 'HSC-33 (2031-32)', value: 'HSC-33' },
                  { title: 'HSC-34 (2032-33)', value: 'HSC-34' },
                  { title: 'HSC-35 (2033-34)', value: 'HSC-35' },
                  { title: 'HSC-36', value: 'HSC-36' },
                  { title: 'HSC-37', value: 'HSC-37' },
                  { title: 'HSC-38', value: 'HSC-38' },
                  { title: 'HSC-39', value: 'HSC-39' },
                  { title: 'HSC-40', value: 'HSC-40' },
                ],
              },
            }),
            defineField({
              name: 'role',
              title: 'Access Level / অ্যাক্সেসের ধরন',
              type: 'string',
              initialValue: 'batch_admin',
              description: 'ব্যাচ অ্যাডমিন সরাসরি তথ্য এডিট ও যুক্ত করতে পারে। মডারেটর শুধুমাত্র এডিট রিকোয়েস্ট পাঠাতে পারে।',
              options: {
                list: [
                  { title: 'Batch Admin (সরাসরি শিক্ষার্থী, রুম, ফটো, ইভেন্ট ও ফর্ম এডিটের পূর্ণ ক্ষমতা)', value: 'batch_admin' },
                  { title: 'Moderator (শুধুমাত্র এডিট রিকোয়েস্ট পাঠানোর সীমিত ক্ষমতা)', value: 'moderator' },
                ],
              },
            }),
            defineField({
              name: 'is_active',
              title: 'Active Access / সক্রিয় অ্যাক্সেস',
              type: 'boolean',
              initialValue: true,
              description: 'সক্রিয় (ON) থাকলে স্টুডিওতে প্রবেশাধিকার কার্যকর থাকবে। সাময়িক বন্ধ রাখতে এটি অফ করুন।',
            }),
            defineField({
              name: 'notes',
              title: 'Notes & Identity / মডারেটরের নাম বা নোট',
              type: 'string',
              description: 'কার কাছে দায়িত্ব দেওয়া হয়েছে বা মডারেটরের নাম লিখে রাখুন (ঐচ্ছিক)।',
            }),
          ],
          preview: {
            select: {
              email: 'email',
              batch: 'assigned_batch',
              role: 'role',
              active: 'is_active',
              notes: 'notes',
            },
            prepare({ email, batch, role, active, notes }) {
              const statusTag = active !== false ? 'Active' : 'Inactive'
              const bLabel = batch === 'all' || !batch ? 'Universal (All Batches)' : batch
              const rLabel = role === 'moderator' ? 'Moderator (Requests)' : 'Batch Admin'
              return {
                title: `${statusTag} — ${email || 'No email'} [${bLabel}]`,
                subtitle: `${rLabel}${notes ? ` • ${notes}` : ''}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'batch_rotation_enabled',
      title: 'Annual Auto-Rotation on January 1st',
      type: 'boolean',
      group: 'batch_rotation',
      description: 'চালু থাকলে প্রতি বছর ১লা জানুয়ারি স্বয়ংক্রিয়ভাবে সবচেয়ে পুরোনো ব্যাচের স্টুডিও অ্যাক্সেস নিষ্ক্রিয় হবে এবং তাদের স্লটটি নতুন আগত ব্যাচের জন্য অ্যাসাইন হবে।',
      initialValue: true,
    }),
    defineField({
      name: 'batch_email_slots',
      title: 'Batch Moderator Email Slots / নির্দিষ্ট ব্যাচের মডারেটর স্লট',
      type: 'array',
      group: 'batch_rotation',
      description: 'স্টুডিওতে নির্দিষ্ট ব্যাচভিত্তিক অ্যাক্সেস নিয়ন্ত্রণের জন্য মডারেটর ইমেইল স্লট। এখান থেকে যেকোনো সময় ইমেইল পরিবর্তন বা ব্যাচ অ্যাসাইনমেন্ট বদল করা যাবে।',
      initialValue: [
        {
          _key: 'slot_1_sr',
          slot_name: 'Slot 1 (Senior Batch / Founder)',
          admin_email: 'dchall.hsc27@gmail.com',
          assigned_batch: 'HSC-27',
          is_active: true,
          notes: 'HSC-27 ব্যাচ মডারেটর ইমেইল স্লট।'
        },
        {
          _key: 'slot_2_mid',
          slot_name: 'Slot 2 (Mid Batch / Current 2nd Year)',
          admin_email: 'dchall.hsc28@gmail.com',
          assigned_batch: 'HSC-28',
          is_active: true,
          notes: 'HSC-28 ব্যাচ মডারেটর ইমেইল স্লট।'
        },
        {
          _key: 'slot_3_jr',
          slot_name: 'Slot 3 (Junior Batch / 1st Year)',
          admin_email: 'dchall.hsc29@gmail.com',
          assigned_batch: 'HSC-29',
          is_active: true,
          notes: 'HSC-29 ব্যাচ মডারেটর ইমেইল স্লট।'
        }
      ],
      of: [
        {
          type: 'object',
          name: 'batchEmailSlot',
          title: 'Batch Moderator Slot / ব্যাচ মডারেটর স্লট',
          fields: [
            defineField({
              name: 'slot_name',
              title: 'Slot Label',
              type: 'string',
              description: 'স্লটের নাম বা ভূমিকা (যেমন: Slot 1, Senior Batch, Junior Batch)।',
            }),
            defineField({
              name: 'admin_email',
              title: 'Moderator Email / মডারেটর ইমেইল',
              type: 'string',
              description: 'যে জিমেইলটি দিয়ে এই ব্যাচের জন্য মডারেটর হিসেবে Sanity Studio-তে লগইন করার অনুমতি দেওয়া হবে। ইমেইল বদলালে এখানে আপডেট করুন।',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'assigned_batch',
              title: 'Assigned Batch',
              type: 'string',
              description: 'এই ইমেইলটি দিয়ে স্টুডিওতে লগইন করলে শুধুমাত্র এই নির্দিষ্ট ব্যাচের তথ্য ও ফোল্ডারে প্রবেশ করা যাবে।',
              options: {
                list: [
                  { title: 'HSC-27 (Founder / 2025-26)', value: 'HSC-27' },
                  { title: 'HSC-28 (2026-27)', value: 'HSC-28' },
                  { title: 'HSC-29 (2027-28)', value: 'HSC-29' },
                  { title: 'HSC-30 (2028-29)', value: 'HSC-30' },
                  { title: 'HSC-31 (2029-30)', value: 'HSC-31' },
                  { title: 'HSC-32 (2030-31)', value: 'HSC-32' },
                  { title: 'HSC-33 (2031-32)', value: 'HSC-33' },
                  { title: 'HSC-34 (2032-33)', value: 'HSC-34' },
                  { title: 'HSC-35 (2033-34)', value: 'HSC-35' },
                  { title: 'HSC-36', value: 'HSC-36' },
                  { title: 'HSC-37', value: 'HSC-37' },
                  { title: 'HSC-38', value: 'HSC-38' },
                  { title: 'HSC-39', value: 'HSC-39' },
                  { title: 'HSC-40', value: 'HSC-40' },
                ],
              },
            }),
            defineField({
              name: 'is_active',
              title: 'Active Access',
              type: 'boolean',
              description: 'সক্রিয় (ON) থাকলে এই ইমেইল দিয়ে স্টুডিওতে প্রবেশ করা যাবে। সাময়িক বন্ধ রাখতে এটি অফ করুন।',
              initialValue: true,
            }),
            defineField({
              name: 'expiry_date',
              title: 'Access Expiry Date',
              type: 'date',
              description: 'কোনো নির্দিষ্ট তারিখে স্বয়ংক্রিয়ভাবে এই স্লটের মেয়াদ শেষ করতে চাইলে তারিখটি নির্বাচন করুন। (ঐচ্ছিক)',
            }),
            defineField({
              name: 'notes',
              title: 'Notes & Handover Details',
              type: 'string',
              description: 'কার কাছে দায়িত্ব দেওয়া হয়েছে বা হ্যান্ডওভারের বিশেষ তথ্য এখানে লিখে রাখুন।',
            }),
          ],
          preview: {
            select: {
              title: 'slot_name',
              subtitle: 'admin_email',
              batch: 'assigned_batch',
              active: 'is_active',
            },
            prepare({ title, subtitle, batch, active }) {
              const statusTag = active ? '🟢 Active' : '🔴 Inactive'
              return {
                title: `${statusTag} — ${title || 'Slot'}: ${batch || 'Unassigned'}`,
                subtitle: subtitle || 'No email assigned',
              }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // 1. MASTER PASSWORD & BATCH DIRECTORY LOCKS
    // ═══════════════════════════════════════════
    defineField({
      name: 'master_password',
      title: 'Master Admin Password',
      type: 'string',
      group: 'passwords',
      description: 'অ্যাডমিনের প্রধান সুপার মাস্টার পাসওয়ার্ড। এই পাসওয়ার্ড দিয়ে ওয়েবসাইটে লগইন করলে সকল ব্যাচ এবং সমস্ত সংরক্ষিত গোপন তথ্য অবিলম্বে আনলক হবে।',
    }),

    defineField({
      name: 'batch_security_controls',
      title: 'Batch Directory Locks & Passwords',
      type: 'array',
      group: 'passwords',
      description: 'প্রতিটি ব্যাচের জন্য ওয়েবসাইট পাসওয়ার্ড ও ডিরেক্টরি লক নিয়ন্ত্রণ। "Lock Batch Directory" অন থাকলে সাধারণ ভিজিটররা এই ব্যাচের শিক্ষার্থী ও রুমমেট দেখতে পারবে না, পাসওয়ার্ড দিয়ে আনলক করতে হবে।',
      initialValue: [
        {
          _key: 'sec_hsc27',
          batch: 'HSC-27',
          batch_password: '',
          is_locked: false,
          lock_notice: 'এই ব্যাচের তথ্য দেখতে অনুগ্রহ করে ব্যাচ পাসওয়ার্ড দিয়ে লগইন করুন।',
          moderator_emails: [],
        },
        {
          _key: 'sec_hsc28',
          batch: 'HSC-28',
          batch_password: '',
          is_locked: false,
          lock_notice: 'এই ব্যাচের তথ্য দেখতে অনুগ্রহ করে ব্যাচ পাসওয়ার্ড দিয়ে লগইন করুন।',
          moderator_emails: [],
        },
        {
          _key: 'sec_hsc29',
          batch: 'HSC-29',
          batch_password: '',
          is_locked: false,
          lock_notice: 'এই ব্যাচের তথ্য দেখতে অনুগ্রহ করে ব্যাচ পাসওয়ার্ড দিয়ে লগইন করুন।',
          moderator_emails: [],
        },
      ],
      of: [
        {
          type: 'object',
          name: 'batchSecurityItem',
          title: 'Batch Security Item',
          fields: [
            defineField({
              name: 'batch',
              title: 'Batch',
              type: 'string',
              options: {
                list: [
                  'HSC-27', 'HSC-28', 'HSC-29', 'HSC-30',
                  'HSC-31', 'HSC-32', 'HSC-33', 'HSC-34', 'HSC-35',
                  'HSC-36', 'HSC-37', 'HSC-38', 'HSC-39', 'HSC-40',
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'batch_password',
              title: 'Batch Access Password',
              type: 'string',
              description: 'এই ব্যাচের ডিরেক্টরি আনলক করার পাসওয়ার্ড।',
            }),
            defineField({
              name: 'is_locked',
              title: 'Lock Batch Directory (লক করুন)',
              type: 'boolean',
              description: 'চালু (ON) থাকলে সাধারণ ভিজিটররা এই ব্যাচের শিক্ষার্থী তালিকা ও রুমমেট তথ্য দেখতে পারবে না, ব্যাচ পাসওয়ার্ড দিয়ে আনলক করতে হবে।',
              initialValue: false,
            }),
            defineField({
              name: 'lock_notice',
              title: 'Batch Lock Notice Message',
              type: 'string',
              initialValue: 'এই ব্যাচের তথ্য দেখতে অনুগ্রহ করে ব্যাচ পাসওয়ার্ড দিয়ে লগইন করুন।',
              description: 'ব্যাচ লক থাকা অবস্থায় শিক্ষার্থীদের জন্য যে বার্তাটি প্রদর্শন করা হবে।',
            }),
            defineField({
              name: 'moderator_emails',
              title: 'Moderator Emails (মডারেটর ইমেইল)',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'এই ব্যাচের অনুমোদিত মডারেটরদের জিমেইল। এরা স্টুডিওতে শুধুমাত্র এডিট রিকোয়েস্ট পাঠাতে পারবে।',
            }),
          ],
          preview: {
            select: {
              batch: 'batch',
              is_locked: 'is_locked',
              pass: 'batch_password',
            },
            prepare({ batch, is_locked, pass }) {
              const lockTag = is_locked ? '🔒 Locked' : '🟢 Public'
              const passTag = pass ? `Password: ${pass}` : 'No Password'
              return {
                title: `${lockTag} — ${batch || 'Batch'}`,
                subtitle: passTag,
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'student_name_case',
      title: 'Student Name Display Case / শিক্ষার্থীর নামের ফরম্যাট',
      type: 'string',
      group: 'profile_controls',
      description: 'অ্যাডমিন প্যানেলে যেভাবেই নাম লেখা হোক না কেন, ওয়েবসাইটে নাম প্রদর্শনের নির্দিষ্ট নিয়ম।',
      options: {
        list: [
          { title: 'Capitalize Each Word / Title Case (যেমন: Md. Rahim Ali)', value: 'capitalize_each_word' },
          { title: 'ALL UPPERCASE / সব বড় হাতের (যেমন: MD. RAHIM ALI)', value: 'uppercase' },
          { title: 'all lowercase / সব ছোট হাতের (যেমন: md. rahim ali)', value: 'lowercase' },
          { title: 'As Typed / যেমন লেখা হয়েছে তেমনই', value: 'as_typed' },
        ],
        layout: 'radio',
      },
      initialValue: 'capitalize_each_word',
    }),

        defineField({
      name: 'card_meta_badges',
      title: 'Card Meta Badges Settings / কার্ড মেটা ব্যাজ সেটিংস',
      type: 'object',
      group: 'profile_controls',
      description: 'স্টুডেন্ট কার্ড, হোমপেজ কার্ড, রুমমেট, বার্থডে ও মডারেটর কার্ডে নামের নিচে কোন কোন ব্যাজ দেখাবে তা এখান থেকে নিয়ন্ত্রণ করুন। ড্র্যাগ করে ব্যাজের ক্রম আগে-পরে সাজানো (Reorder) যাবে। কোনো ব্যাজ না চাইলে তালিকা ফাঁকা রাখুন (তাহলে কার্ডে কোনো ব্যাজ দেখাবে না এবং কার্ড ছোট দেখাবে)।',
      fields: [
        defineField({
          name: 'student_page_badges',
          title: 'Student Page Badges / স্টুডেন্ট পেইজ ব্যাজ',
          type: 'array',
          description: 'স্টুডেন্ট পেইজের কার্ডে নামের নিচে কোন কোন ব্যাজ দেখাবে। ড্র্যাগ করে ব্যাজের ক্রম আগে-পরে সাজাতে পারেন। (ফাঁকা রাখলে কোনো ব্যাজ দেখাবে না)',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Room No (রুম নম্বর)', value: 'room' },
                  { title: 'College Roll (রোল)', value: 'roll' },
                  { title: 'Academic Group (গ্রুপ)', value: 'group' },
                  { title: 'Batch (ব্যাচ)', value: 'batch' },
                  { title: 'Section (সেকশন)', value: 'section' },
                  { title: 'Blood Group (রক্তের গ্রুপ)', value: 'blood_group' },
                  { title: 'Moderator Badge (মডারেটর ব্যাজ)', value: 'moderator' },
                ],
              },
            },
          ],
        }),
        defineField({
          name: 'home_students_badges',
          title: 'Home Page Students Badges / হোমপেজ স্টুডেন্ট ব্যাজ',
          type: 'array',
          description: 'হোমপেজের নির্বাচিত ৬ জন শিক্ষার্থী কার্ডে কোন কোন ব্যাজ দেখাবে। ড্র্যাগ করে আগে-পরে সাজাতে পারেন।',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Room No (রুম নম্বর)', value: 'room' },
                  { title: 'College Roll (রোল)', value: 'roll' },
                  { title: 'Academic Group (গ্রুপ)', value: 'group' },
                  { title: 'Batch (ব্যাচ)', value: 'batch' },
                  { title: 'Section (সেকশন)', value: 'section' },
                  { title: 'Blood Group (রক্তের গ্রুপ)', value: 'blood_group' },
                  { title: 'Moderator Badge (মডারেটর ব্যাজ)', value: 'moderator' },
                ],
              },
            },
          ],
        }),
        defineField({
          name: 'home_roommates_badges',
          title: 'Home Page Roommates Badges / হোমপেজ রুমমেট ব্যাজ',
          type: 'array',
          description: 'হোমপেজের রুমমেট সেকশনের কার্ডে প্রতিটি শিক্ষার্থীর সাথে কোন ব্যাজ দেখাবে। ড্র্যাগ করে আগে-পরে সাজাতে পারেন।',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Room No (রুম নম্বর)', value: 'room' },
                  { title: 'College Roll (রোল)', value: 'roll' },
                  { title: 'Academic Group (গ্রুপ)', value: 'group' },
                  { title: 'Batch (ব্যাচ)', value: 'batch' },
                  { title: 'Section (সেকশন)', value: 'section' },
                  { title: 'Blood Group (রক্তের গ্রুপ)', value: 'blood_group' },
                  { title: 'Moderator Badge (মডারেটর ব্যাজ)', value: 'moderator' },
                ],
              },
            },
          ],
        }),
        defineField({
          name: 'roommates_page_badges',
          title: 'Roommates Page Badges / রুমমেট পেইজ ব্যাজ',
          type: 'array',
          description: 'রুমমেট পেইজের কার্ডে প্রতিটি শিক্ষার্থীর নামের নিচে কোন তথ্য দেখাবে। ড্র্যাগ করে আগে-পরে সাজাতে পারেন।',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Room No (রুম নম্বর)', value: 'room' },
                  { title: 'College Roll (রোল)', value: 'roll' },
                  { title: 'Academic Group (গ্রুপ)', value: 'group' },
                  { title: 'Batch (ব্যাচ)', value: 'batch' },
                  { title: 'Section (সেকশন)', value: 'section' },
                  { title: 'Blood Group (রক্তের গ্রুপ)', value: 'blood_group' },
                  { title: 'Moderator Badge (মডারেটর ব্যাজ)', value: 'moderator' },
                ],
              },
            },
          ],
        }),
        defineField({
          name: 'birthday_page_badges',
          title: 'Birthday Page Badges / বার্থডে পেইজ ব্যাজ',
          type: 'array',
          description: 'বার্থডে পেইজের কার্ডে জন্মদিনের পাশাপাশি আর কোন কোন তথ্য ব্যাজ হিসেবে দেখাবে। ড্র্যাগ করে আগে-পরে সাজাতে পারেন।',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Room No (রুম নম্বর)', value: 'room' },
                  { title: 'College Roll (রোল)', value: 'roll' },
                  { title: 'Academic Group (গ্রুপ)', value: 'group' },
                  { title: 'Batch (ব্যাচ)', value: 'batch' },
                  { title: 'Section (সেকশন)', value: 'section' },
                  { title: 'Blood Group (রক্তের গ্রুপ)', value: 'blood_group' },
                  { title: 'Moderator Badge (মডারেটর ব্যাজ)', value: 'moderator' },
                ],
              },
            },
          ],
        }),
        defineField({
          name: 'moderator_card_badges',
          title: 'Moderator Card Badges / মডারেটর কার্ডের ব্যাজ',
          type: 'array',
          description: 'ডেভেলপার পেজের ব্যাচ মডারেটর কার্ডে নামের নিচে কোন কোন ব্যাজ দেখাবে। ড্র্যাগ করে আগে-পরে সাজাতে পারেন।',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Room No (রুম নম্বর)', value: 'room' },
                  { title: 'College Roll (রোল)', value: 'roll' },
                  { title: 'Academic Group (গ্রুপ)', value: 'group' },
                  { title: 'Batch (ব্যাচ)', value: 'batch' },
                  { title: 'Section (সেকশন)', value: 'section' },
                  { title: 'Blood Group (রক্তের গ্রুপ)', value: 'blood_group' },
                  { title: 'Moderator Badge (মডারেটর ব্যাজ)', value: 'moderator' },
                ],
              },
            },
          ],
        }),
        defineField({
          name: 'max_badges_per_card',
          title: 'Maximum Badges per Card / কার্ড প্রতি সর্বোচ্চ ব্যাজ সংখ্যা',
          type: 'number',
          description: 'প্রতিটি কার্ডে একসাথে সর্বোচ্চ কয়টি ব্যাজ দেখানো হবে (ডিফল্ট: ৩)।',
          initialValue: 3,
        }),
      ],
    }),

    defineField({
      name: 'global_visibility_mode',
      title: 'Global Seniority & Protection Mode',
      type: 'string',
      group: 'profile_controls',
      options: {
        list: [
          { title: 'Junior Protection Mode (Junior safe mode — juniors cannot see senior private data)', value: 'junior_safe' },
          { title: 'Full Unlock Mode (All authenticated batches can view complete site data)', value: 'full_unlock' },
        ],
        layout: 'radio',
      },
      initialValue: 'junior_safe',
      description: 'জুনিয়র প্রটেকশন মোডে জুনিয়র শিক্ষার্থীরা সিনিয়রদের লক করা তথ্য দেখতে পারে না। ফুল আনলক মোডে রেজিস্টার্ড যেকোনো ব্যাচ লগইন করলেই সব ব্যাচের ডাটা সরাসরি দেখতে পাবে।',
    }),

    defineField({
      name: 'global_visibility',
      title: 'Global Public Visibility',
      type: 'boolean',
      group: 'profile_controls',
      description: 'চালু (ON) থাকলে সাধারণ ভিজিটররা কোনো লগইন ছাড়াই প্রাথমিক প্রোফাইল তথ্য দেখতে পাবেন। বন্ধ করলে পুরো সাইটের প্রোফাইল প্রাইভেট হয়ে যাবে।',
      initialValue: true,
    }),

    // ═══════════════════════════════════════════
    // PAGE-LEVEL ACCESS & LOCK CONTROLS
    // ═══════════════════════════════════════════
    defineField({
      name: 'page_access_controls',
      title: 'Page Access & Visibility Controls',
      type: 'array',
      group: 'page_access',
      description: 'ওয়েবসাইটের প্রতিটি পেজ (যেমন Academic Results, Students, Roommates, Gallery ইত্যাদি) সাধারণ ভিজিটরের জন্য উন্মুক্ত থাকবে নাকি পাসওয়ার্ড দিয়ে লক থাকবে তা এখান থেকে নির্ধারণ করুন।',
      initialValue: [
        { page_id: 'results', title: 'Academic Results (results.html)', is_visible: true, is_locked: true, lock_message: 'এই পেজের ফলাফল দেখতে অনুগ্রহ করে ব্যাচ পাসওয়ার্ড দিয়ে লগইন করুন।' },
        { page_id: 'students', title: 'Student Directory (students.html)', is_visible: true, is_locked: false, lock_message: 'শিক্ষার্থীদের সম্পূর্ণ তথ্য দেখতে লগইন করুন।' },
        { page_id: 'roommates', title: 'Roommates (roommates.html)', is_visible: true, is_locked: false, lock_message: 'রুম ও রুমমেটদের তালিকা দেখতে লগইন করুন।' },
        { page_id: 'birthday', title: 'Student Birthdays (birthday.html)', is_visible: true, is_locked: false, lock_message: 'জন্মদিন ক্যালেন্ডার দেখতে লগইন করুন।' },
        { page_id: 'notices', title: 'Notices & Circulars (notices.html)', is_visible: true, is_locked: false, lock_message: 'হলের অফিশিয়াল নোটিশ দেখতে লগইন করুন।' },
        { page_id: 'gallery', title: 'Photo Gallery (gallery.html)', is_visible: true, is_locked: false, lock_message: 'ফটো গ্যালারি দেখতে লগইন করুন।' },
        { page_id: 'hostel', title: 'Hostel Info (hostel.html)', is_visible: true, is_locked: false, lock_message: 'হল তথ্য দেখতে লগইন করুন।' },
        { page_id: 'dc-clubs', title: 'College Clubs (dc-clubs.html)', is_visible: true, is_locked: false, lock_message: 'ক্লাব তথ্য দেখতে লগইন করুন।' },
        { page_id: 'dc-social', title: 'Social Links (dc-social.html)', is_visible: true, is_locked: false, lock_message: 'সোশ্যাল মিডিয়া পেজ দেখতে লগইন করুন।' },
      ],
      of: [
        {
          type: 'object',
          name: 'pageAccessRule',
          title: 'Page Access Rule',
          fields: [
            defineField({
              name: 'page_id',
              title: 'Page Identifier',
              type: 'string',
              readOnly: true,
              description: 'সিস্টেমে পেজটির অভ্যন্তরীণ আইডি (যেমন: results, students)। এটি অপরিবর্তনযোগ্য।',
            }),
            defineField({
              name: 'title',
              title: 'Page Name',
              type: 'string',
              description: 'পেজের শিরোনাম।',
            }),
            defineField({
              name: 'access_level',
              title: 'Page Access Level',
              type: 'string',
              options: {
                list: [
                  { title: 'Unlocked / Public (Open for everyone)', value: 'unlocked' },
                  { title: 'Lock for Normal Users (Requires batch login)', value: 'lock_normal' },
                  { title: 'Lock for All (Requires Master Admin Password)', value: 'lock_all' },
                  { title: 'Hidden (Completely hidden from menu and site)', value: 'hidden' },
                ],
                layout: 'radio',
              },
              initialValue: 'unlocked',
              description: 'সাধারণ ভিজিটরদের জন্য এই পেজটি কীভাবে প্রদর্শিত হবে তা নির্ধারণ করুন।',
            }),
            defineField({
              name: 'is_visible',
              title: 'Visible on Website',
              type: 'boolean',
              initialValue: true,
              description: 'বন্ধ (OFF) করলে এই পেজটি ওয়েবসাইট এবং নেভিগেশন মেনু থেকে সম্পূর্ণরূপে লুকানো থাকবে।',
            }),
            defineField({
              name: 'is_locked',
              title: 'Require Login / Locked',
              type: 'boolean',
              initialValue: false,
              description: 'চালু (ON) থাকলে এই পেজে ঢুকলে পাসওয়ার্ড লক স্ক্রিন দেখাবে। শিক্ষার্থীরা সঠিক ব্যাচ পাসওয়ার্ড দিলে পেজ দেখতে পারবে।',
            }),
            defineField({
              name: 'lock_message',
              title: 'Lock Screen Message',
              type: 'string',
              placeholder: 'এই পেজের সংরক্ষিত তথ্য দেখতে অনুগ্রহ করে লগইন করুন।',
              description: 'লক স্ক্রিনে শিক্ষার্থীদের উদ্দেশে যে নির্দেশনা বার্তাটি দেখাবে তা এখানে লিখুন।',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              page_id: 'page_id',
              is_visible: 'is_visible',
              is_locked: 'is_locked',
            },
            prepare({ title, page_id, is_visible, is_locked }) {
              const visTag = is_visible === false ? '🚫 Hidden' : '👁️ Visible'
              const lockTag = is_locked ? '🔒 Locked' : '🔓 Public'
              return {
                title: `${lockTag} · ${title || page_id}`,
                subtitle: `${page_id}.html — ${visTag}`,
              }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // 2. UNIFIED PROFILE FIELDS & LOCKS
    // ═══════════════════════════════════════════
    defineField({
      name: 'profile_field_controls',
      title: 'Profile Field Controls',
      type: 'array',
      group: 'profile_controls',
      description: 'শিক্ষার্থী প্রোফাইলের ফিল্ডগুলোর ক্রম সাজান ও নিয়ন্ত্রণ করুন। কোনো ফিল্ড লুকানো বা পাসওয়ার্ড লক করতে এই সেটিং ব্যবহার করুন।',
      of: [
        {
          type: 'object',
          name: 'profileFieldControl',
          title: 'Profile Field',
          fields: [
            defineField({
              name: 'field_id',
              title: 'Select Profile Field',
              type: 'string',
              options: {
                list: PROFILE_FIELD_OPTIONS,
              },
              validation: (Rule) => Rule.required(),
              description: 'যে ফিল্ডটির প্রদর্শন বা নিরাপত্তা নিয়ন্ত্রণ করতে চান তা ড্রপডাউন থেকে বেছে নিন।',
            }),
            defineField({
              name: 'label',
              title: 'Custom Display Name',
              type: 'string',
              description: 'খালি রাখলে সিস্টেমের ডিফল্ট নামটি ব্যবহার হবে। অন্য কোনো নাম দিতে চাইলে এখানে লিখুন।',
            }),
            defineField({
              name: 'visibility_tier',
              title: 'Field Visibility Tier',
              type: 'string',
              options: {
                list: [
                  { title: 'Public (Open for everyone without login)', value: 'public' },
                  { title: 'Lock for Normal Users (Requires batch login)', value: 'lock_normal' },
                  { title: 'Lock for Juniors (Visible to peers and seniors only)', value: 'lock_junior' },
                  { title: 'Lock for All (Requires Master Key only)', value: 'lock_all' },
                  { title: 'Hide Completely (Hidden from entire website)', value: 'hide' },
                ],
                layout: 'radio',
              },
              initialValue: 'public',
              description: 'ওয়েবসাইটে এই নির্দিষ্ট তথ্যের নিরাপত্তা স্তর বেছে নিন।',
            }),
            defineField({
              name: 'invisible',
              title: 'Hide on Website',
              type: 'boolean',
              description: 'চালু (ON) করলে ওয়েবসাইট ও মোডাল থেকে এই ফিল্ডটি সম্পূর্ণ অদৃশ্য হয়ে যাবে।',
              initialValue: false,
            }),
            defineField({
              name: 'public_lock',
              title: 'Lock for Public Visitors',
              type: 'boolean',
              description: 'চালু (ON) থাকলে যারা লগইন করেনি তারা এই তথ্যটি দেখতে পারবে না, লক আইকন দেখতে পাবে।',
              initialValue: false,
            }),
            defineField({
              name: 'batch_lock',
              title: 'Lock for Junior Batches',
              type: 'boolean',
              description: 'চালু (ON) থাকলে জুনিয়র ব্যাচের শিক্ষার্থী সিনিয়রদের প্রোফাইলে এই তথ্যটি লক দেখতে পাবে।',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              field_id: 'field_id',
              label: 'label',
              invisible: 'invisible',
              public_lock: 'public_lock',
              batch_lock: 'batch_lock',
            },
            prepare({ field_id, label, invisible, public_lock, batch_lock }) {
              const matched = PROFILE_FIELD_OPTIONS.find((o) => o.value === field_id)
              const name = label || (matched ? matched.title : field_id) || 'Profile Field'
              const isHidden = invisible === true
              const statusTag = isHidden ? '⚪ Hidden' : '🟢 Visible'
              const pubStr = public_lock ? '🔒 Locked' : '🔓 Public'
              const batchStr = batch_lock ? '🔒 Locked' : '🔓 Open'
              return {
                title: `${statusTag} ${name}`,
                subtitle: isHidden
                  ? 'Hidden from website'
                  : `Visitors: ${pubStr} | Juniors: ${batchStr}`,
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
      title: 'Home Page Sections',
      type: 'array',
      group: 'homepage_vis',
      description: 'হোম পেজের সেকশনগুলোর ক্রম সাজান এবং দৃশ্যমানতা নিয়ন্ত্রণ করুন।',
      of: [
        {
          type: 'object',
          name: 'homepageSection',
          title: 'Home Page Section',
          fields: [
            defineField({
              name: 'section_id',
              title: 'Select Home Section',
              type: 'string',
              options: {
                list: HOMEPAGE_SECTION_OPTIONS,
              },
              validation: (Rule) => Rule.required(),
              description: 'কোন সেকশনটি নিয়ন্ত্রণ করতে চান তা ড্রপডাউন থেকে নির্বাচন করুন।',
            }),
            defineField({
              name: 'label',
              title: 'Custom Title',
              type: 'string',
              description: 'হোম পেজে সেকশনটির কোনো ভিন্ন নাম দিতে চাইলে এখানে লিখুন।',
            }),
            defineField({
              name: 'visibility_tier',
              title: 'Section Visibility Tier',
              type: 'string',
              options: {
                list: [
                  { title: 'Public (Open for everyone)', value: 'public' },
                  { title: 'Lock for Normal Users (Requires batch login)', value: 'lock_normal' },
                  { title: 'Lock for Juniors (Visible to seniors and peers)', value: 'lock_junior' },
                  { title: 'Lock for All (Requires Master Key)', value: 'lock_all' },
                  { title: 'Hide Completely (Omitted from home page)', value: 'hide' },
                ],
                layout: 'radio',
              },
              initialValue: 'public',
              description: 'এই সেকশনটি প্রদর্শনের নিয়ম নির্বাচন করুন।',
            }),
            defineField({
              name: 'invisible',
              title: 'Hide on Home Page',
              type: 'boolean',
              description: 'চালু (ON) করলে হোম পেজ থেকে এই সেকশনটি পুরোপুরি বাদ যাবে এবং নিচের সেকশনগুলো উপরে উঠে আসবে।',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              section_id: 'section_id',
              label: 'label',
              invisible: 'invisible',
            },
            prepare({ section_id, label, invisible }) {
              const matched = HOMEPAGE_SECTION_OPTIONS.find((o) => o.value === section_id)
              const name = label || (matched ? matched.title : section_id) || 'Home Section'
              const isHidden = invisible === true
              const statusTag = isHidden ? '[Hidden]' : '[Visible]'
              return {
                title: `${statusTag} ${name}`,
                subtitle: isHidden ? 'Omitted from home page' : 'Displayed on home page',
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
      title: 'Developer Page Sections',
      type: 'array',
      group: 'developer_vis',
      description: 'ডেভেলপার পেজের বিভিন্ন সেকশনের দৃশ্যমানতা ও ক্রম নিয়ন্ত্রণ করুন।',
      of: [
        {
          type: 'object',
          name: 'developerSection',
          title: 'Developer Section',
          fields: [
            defineField({
              name: 'section_id',
              title: 'Select Developer Section',
              type: 'string',
              options: {
                list: DEVELOPER_SECTION_OPTIONS,
              },
              validation: (Rule) => Rule.required(),
              description: 'যে সেকশনটি নিয়ন্ত্রণ করতে চান তা ড্রপডাউন থেকে বাছুন।',
            }),
            defineField({
              name: 'label',
              title: 'Custom Title',
              type: 'string',
              description: 'সেকশনের কোনো বিকল্প শিরোনাম দিতে চাইলে এখানে লিখুন।',
            }),
            defineField({
              name: 'visibility_tier',
              title: 'Field Visibility Tier',
              type: 'string',
              options: {
                list: [
                  { title: 'Public (Open for everyone)', value: 'public' },
                  { title: 'Lock for Normal Users (Requires login)', value: 'lock_normal' },
                  { title: 'Lock for Juniors (Locked for juniors)', value: 'lock_junior' },
                  { title: 'Lock for All (Requires Master Key)', value: 'lock_all' },
                  { title: 'Hide Completely (Completely hidden)', value: 'hide' },
                ],
                layout: 'radio',
              },
              initialValue: 'public',
              description: 'এই সেকশনটির প্রদর্শনের নিয়ম নির্ধারণ করুন।',
            }),
            defineField({
              name: 'invisible',
              title: 'Hide on Developer Page',
              type: 'boolean',
              description: 'চালু (ON) করলে ডেভেলপার পেজ থেকে এই সেকশনটি সম্পূর্ণ বাদ থাকবে।',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              section_id: 'section_id',
              label: 'label',
              invisible: 'invisible',
            },
            prepare({ section_id, label, invisible }) {
              const matched = DEVELOPER_SECTION_OPTIONS.find((o) => o.value === section_id)
              const name = label || (matched ? matched.title : section_id) || 'Developer Section'
              const isHidden = invisible === true
              const statusTag = isHidden ? '[Hidden]' : '[Visible]'
              return {
                title: `${statusTag} ${name}`,
                subtitle: isHidden ? 'Hidden from page' : 'Visible on page',
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'max_moderators_per_batch',
      title: 'Max Moderators Per Batch / ব্যাচ প্রতি সর্বোচ্চ মডারেটর সংখ্যা',
      type: 'number',
      group: 'developer_vis',
      description: 'ডেভেলপার পেজে প্রতিটি ব্যাচের জন্য সর্বোচ্চ কতজন মডারেটর নির্বাচন ও প্রদর্শন করা যাবে। (ডিফল্ট: ৫ জন, সর্বোচ্চ ২০)',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(20),
    }),
    defineField({
      name: 'show_batch_moderators',
      title: 'Show Batch Moderators on Developer Page / ডেভেলপার পেজে ব্যাচ মডারেটর সেকশন',
      type: 'boolean',
      group: 'developer_vis',
      description: 'চালু থাকলে ডেভেলপার পেজে প্রতিটি ব্যাচের নির্বাচিত মডারেটরদের কার্ড ও তালিকা প্রদর্শিত হবে।',
      initialValue: true,
    }),

    // ═══════════════════════════════════════════
    // 5. HALL INFO SECTIONS VISIBILITY & ORDER
    // ═══════════════════════════════════════════
    defineField({
      name: 'hallinfo_sections',
      title: 'Hall Info Page Sections',
      type: 'array',
      group: 'hallinfo_vis',
      description: 'হল পরিচিতি পেজের সেকশনগুলোর ক্রম ও প্রদর্শন নিয়ন্ত্রণ করুন।',
      of: [
        {
          type: 'object',
          name: 'hallinfoSection',
          title: 'Hall Info Section',
          fields: [
            defineField({
              name: 'section_id',
              title: 'Select Hall Info Section',
              type: 'string',
              options: {
                list: HALLINFO_SECTION_OPTIONS,
              },
              validation: (Rule) => Rule.required(),
              description: 'যে সেকশনটি নিয়ন্ত্রণ করতে চান তা ড্রপডাউন থেকে নির্বাচন করুন।',
            }),
            defineField({
              name: 'label',
              title: 'Custom Title',
              type: 'string',
              description: 'সেকশনের কোনো বিশেষ নাম দিতে চাইলে এখানে লিখুন।',
            }),
            defineField({
              name: 'visibility_tier',
              title: 'Field Visibility Tier',
              type: 'string',
              options: {
                list: [
                  { title: 'Public (Open for everyone)', value: 'public' },
                  { title: 'Lock for Normal Users (Requires login)', value: 'lock_normal' },
                  { title: 'Lock for Juniors (Locked for juniors)', value: 'lock_junior' },
                  { title: 'Lock for All (Requires Master Key)', value: 'lock_all' },
                  { title: 'Hide Completely (Completely hidden)', value: 'hide' },
                ],
                layout: 'radio',
              },
              initialValue: 'public',
              description: 'এই সেকশনের প্রদর্শনের শর্ত নির্বাচন করুন।',
            }),
            defineField({
              name: 'invisible',
              title: 'Hide on Hall Info Page',
              type: 'boolean',
              description: 'চালু (ON) করলে হল পরিচিতি পেজ থেকে এই অংশটি সম্পূর্ণ বাদ থাকবে।',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              section_id: 'section_id',
              label: 'label',
              invisible: 'invisible',
            },
            prepare({ section_id, label, invisible }) {
              const matched = HALLINFO_SECTION_OPTIONS.find((o) => o.value === section_id)
              const name = label || (matched ? matched.title : section_id) || 'Hall Info Section'
              const isHidden = invisible === true
              const statusTag = isHidden ? '[Hidden]' : '[Visible]'
              return {
                title: `${statusTag} ${name}`,
                subtitle: isHidden ? 'Hidden from page' : 'Visible on page',
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
      description: 'ওয়েবসাইটের প্রধান নেভিগেশন বারে কোন কোন বাটন প্রদর্শিত হবে তা অন/অফ করুন।',
      fields: [
        { name: 'menu_home', title: 'Home Button', type: 'boolean', description: 'হোম পেজ বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
        { name: 'menu_students', title: 'Students Button', type: 'boolean', description: 'শিক্ষার্থী তালিকা বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
        { name: 'menu_roommates', title: 'Roommates Button', type: 'boolean', description: 'রুম ও রুমমেট বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
        { name: 'menu_results', title: 'Results Button', type: 'boolean', description: 'ফলাফল বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
        { name: 'menu_gallery', title: 'Gallery Button', type: 'boolean', description: 'ফটো গ্যালারি বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
        { name: 'menu_hostel', title: 'Hostel / Hall Info Button', type: 'boolean', description: 'হল পরিচিতি বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
        { name: 'menu_dc_clubs', title: 'College Clubs Button', type: 'boolean', description: 'কলেজ ক্লাবসমূহ বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
        { name: 'menu_dc_social', title: 'Social Media Button', type: 'boolean', description: 'সোশ্যাল মিডিয়া পেজ বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
        { name: 'menu_developer', title: 'Developer Button', type: 'boolean', description: 'ডেভেলপার প্রোফাইল বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
        { name: 'menu_profile', title: 'Profile / Login Button', type: 'boolean', description: 'প্রোফাইল ও লগইন বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
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
      description: 'ওয়েবসাইটের ফুটারের কলাম ও লিংকগুলো পরিচালনা করুন। কোনো কলাম বা লিংক বন্ধ (Inactive) করলে তা সাইট থেকে বাদ যাবে।',
      of: [
        {
          type: 'object',
          name: 'footerColumn',
          title: 'Footer Column',
          fields: [
            defineField({
              name: 'title_en',
              title: 'Column Title English',
              type: 'string',
              description: 'কলামের ইংরেজি শিরোনাম (যেমন: Quick Links, Students, Hall)।',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title_bn',
              title: 'Column Title Bangla',
              type: 'string',
              description: 'কলামের বাংলা শিরোনাম (ঐচ্ছিক)।',
            }),
            defineField({
              name: 'is_active',
              title: 'Active (Visible on Site)',
              type: 'boolean',
              description: 'কলামটি ওয়েবসাইটে প্রদর্শিত হবে কি না।',
              initialValue: true,
            }),
            defineField({
              name: 'links',
              title: 'Column Links',
              type: 'array',
              description: 'এই কলামের লিংকসমূহ ড্র্যাগ করে সাজান।',
              of: [
                {
                  type: 'object',
                  name: 'columnLink',
                  title: 'Link',
                  fields: [
                    defineField({
                      name: 'title_en',
                      title: 'Link Title English',
                      type: 'string',
                      description: 'লিংকের ইংরেজি নাম।',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'title_bn',
                      title: 'Link Title Bangla',
                      type: 'string',
                      description: 'লিংকের বাংলা নাম (ঐচ্ছিক)।',
                    }),
                    defineField({
                      name: 'url',
                      title: 'Target URL',
                      type: 'string',
                      description: 'লিংকের গন্তব্য ঠিকানা (যেমন: students.html বা https://...)।',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'is_active',
                      title: 'Active',
                      type: 'boolean',
                      description: 'লিংকটি ওয়েবসাইটে চালু রাখবেন কি না।',
                      initialValue: true,
                    }),
                    defineField({
                      name: 'open_in_new_tab',
                      title: 'Open in New Tab',
                      type: 'boolean',
                      description: 'ক্লিক করলে নতুন ব্রাউজার ট্যাবে খুলবে কি না।',
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
  ],

  preview: {
    prepare() {
      return {
        title: 'Security & Visibility Controls',
        subtitle: 'Password, Locks, Visibility & Footer Management',
      }
    },
  },
})
