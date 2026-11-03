import { defineField, defineType } from 'sanity'

// Predefined Profile Fields for the Dropdown
const PROFILE_FIELD_OPTIONS = [
  { title: '📷 Profile Photo (প্রোফাইল ছবি)', value: 'photo' },
  { title: '📝 Full Name (পুরো নাম)', value: 'name' },
  { title: '🏷️ Room · Roll Badge (কার্ড ও মোডালের রুম-রোল ব্যাজ)', value: 'room_badge' },
  { title: '⚡ Quick Action Buttons (কল, হোয়াটসঅ্যাপ, ইমেইল, ফেসবুক, মেসেঞ্জার বাটন)', value: 'quick_actions' },
  { title: '🎓 Batch / Class (ব্যাচ)', value: 'batch' },
  { title: '🔢 Roll Number (রোল নম্বর)', value: 'roll' },
  { title: '📚 Academic Group (গ্রুপ/বিভাগ: বিজ্ঞান, মানবিক, ব্যবসায় শিক্ষা)', value: 'group' },
  { title: '🏷️ Section (সেকশন)', value: 'section' },
  { title: '🧪 Practical Group (ব্যবহারিক গ্রুপ)', value: 'practical_group' },
  { title: '🩸 Blood Group (রক্তের গ্রুপ)', value: 'blood_group' },
  { title: '📅 Date of Birth (জন্মতারিখ)', value: 'dob' },
  { title: '🚪 Room (1st Year) — ১ম বর্ষের রুম (নিচ তলা: ১০২, ১০৩, ১০৪)', value: 'room_1st_year' },
  { title: '🚪 Room (2nd Year) — ২য় বর্ষের রুম (৩য় তলা: ৩১৪ থেকে ৩২৯)', value: 'room_2nd_year' },
  { title: '📞 Phone Number (শিক্ষার্থীর ফোন নম্বর)', value: 'phone' },
  { title: '💬 WhatsApp (হোয়াটসঅ্যাপ নম্বর)', value: 'whatsapp' },
  { title: '✈️ Telegram (টেলিগ্রাম ইউজারনেম/নম্বর)', value: 'telegram' },
  { title: '👥 Facebook Profile (ফেসবুক লিংক)', value: 'facebook' },
  { title: '💬 Messenger (মেসেঞ্জার লিংক)', value: 'messenger' },
  { title: '📧 Email Address (ইমেইল ঠিকানা)', value: 'email' },
  { title: '👨 Guardian / Father Phone (অভিভাবকের ফোন নম্বর)', value: 'father_phone' },
  { title: '👪 Guardian Information (অভিভাবক তথ্য)', value: 'guardian' },
  { title: '📍 Address / Location (ঠিকানা)', value: 'address' },
  { title: '📄 About / Bio (পরিচিতি / বায়ো)', value: 'bio' },
  { title: '📊 1st Year Academic Results (১ম বর্ষের ফলাফল)', value: 'results_1st' },
  { title: '📊 2nd Year Academic Results (২য় বর্ষের ফলাফল)', value: 'results_2nd' },
  { title: '🔢 Serial Position (সিরিয়াল পজিশন)', value: 'position' },
]

// Predefined Home Page Section Options
const HOMEPAGE_SECTION_OPTIONS = [
  { title: '👥 Students Preview (শিক্ষার্থী প্রিভিউ)', value: 'students_preview' },
  { title: '🏠 Roommates Preview (রুমমেট প্রিভিউ)', value: 'roommates_preview' },
  { title: '📊 Results Preview (একাডেমিক রেজাল্ট প্রিভিউ)', value: 'results_preview' },
  { title: '🏛️ Hall Super Preview (হল সুপার প্রিভিউ)', value: 'hall_super_preview' },
  { title: '📜 Hall Info & History (হল পরিচিতি ও ইতিহাস)', value: 'hall_info_preview' },
  { title: '🖼️ Moments & Memories / Campus Photos (ক্যাম্পাস ফটো)', value: 'moments_preview' },
  { title: '🌐 Portals & Resources (কলেজ রিসোর্স ও ক্লাব)', value: 'resources_preview' },
  { title: '📍 Location & Map (অবস্থান ও গুগল ম্যাপ)', value: 'location_preview' },
]

// Predefined Developer Section Options
const DEVELOPER_SECTION_OPTIONS = [
  { title: '👤 Hero Bio & Portrait (হিরো বায়ো ও ছবি)', value: 'hero_bio' },
  { title: '📋 Overview Panels (পরিচিতি, যোগাযোগ ও ফোকাস)', value: 'overview_panels' },
  { title: '🚀 Featured Projects (ফিচার্ড প্রজেক্টসমূহ)', value: 'featured_projects' },
  { title: '🛠️ Skills & Project Method (দক্ষতা ও কর্মপদ্ধতি)', value: 'skills_timeline' },
  { title: '🤝 Contributors (কন্ট্রিবিউটর তালিকা)', value: 'contributors' },
]

// Predefined Hall Info Section Options
const HALLINFO_SECTION_OPTIONS = [
  { title: '🏛️ History & Nearby Places (ইতিহাস ও আশেপাশের স্থান)', value: 'history_nearby' },
  { title: '📸 Campus Photos (ক্যাম্পাস ছবিসমূহ)', value: 'campus_photos' },
  { title: '👨‍🏫 Hall Super Profile & Message (হল সুপার বাণী ও তথ্য)', value: 'hall_super' },
  { title: '🏢 Office & Helpdesk (হল অফিস ও হেল্পডেস্ক)', value: 'helpdesk' },
  { title: '⭐ Notable Alumni Profiles (বিশিষ্ট প্রাক্তনীগণ)', value: 'alumni' },
  { title: '📈 Admission Success Chart (ভর্তি সাফল্য চার্ট)', value: 'success_chart' },
  { title: '🗺️ Location & Map (অবস্থান ও ম্যাপ)', value: 'location_map' },
]

export default defineType({
  name: 'adminSettings',
  title: 'Security & Visibility Controls (সিকিউরিটি ও ভিজিবিলিটি)',
  type: 'document',

  groups: [
    { name: 'passwords', title: '🔑 Passwords & Master Key' , default: true },
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
      description: 'অ্যাডমিনের প্রধান মাস্টার পাসওয়ার্ড। এটি দিয়ে ওয়েবসাইটে লগইন করলে সব ব্যাচ এবং সব সংরক্ষিত ডাটা আনলক হয়ে যাবে।',
    }),

    defineField({
      name: 'global_visibility',
      title: 'Global Public Visibility (সবার জন্য আনলক)',
      type: 'boolean',
      group: 'profile_controls',
      description: 'চালু (ON) থাকলে সাধারণ ভিজিটররা লগইন ছাড়াই মৌলিক প্রোফাইল তথ্য দেখতে পাবে। বন্ধ করলে সম্পূর্ণ সাইট ব্যক্তিগত হয়ে যাবে।',
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
      description: 'ড্র্যাগ করে প্রোফাইলের ফিল্ডগুলোর ক্রম (Order) উপর-নিচ সাজান। Hide on Website চালু (ON) করলে ওই ফিল্ডটি ওয়েবসাইট থেকে পুরোপুরি অদৃশ্য হয়ে যাবে এবং নিচের অংশগুলো উপরে উঠে আসবে। Public Lock ও Batch Lock দিয়ে সংবেদনশীল তথ্য গোপন রাখুন।',
      of: [
        {
          type: 'object',
          name: 'profileFieldControl',
          title: 'Profile Field',
          fields: [
            defineField({
              name: 'field_id',
              title: 'Select Profile Field (ড্রপডাউন থেকে ফিল্ড নির্বাচন করুন)',
              type: 'string',
              options: {
                list: PROFILE_FIELD_OPTIONS,
              },
              validation: (Rule) => Rule.required(),
              description: 'কোন ফিল্ডটি নিয়ন্ত্রণ করতে চান তা ড্রপডাউন থেকে বেছে নিন।',
            }),
            defineField({
              name: 'label',
              title: 'Custom Display Name (ঐচ্ছিক নাম)',
              type: 'string',
              description: 'খালি রাখলে স্বয়ংক্রিয়ভাবে ড্রপডাউনের ডিফল্ট নামটি ব্যবহার হবে।',
            }),
            defineField({
              name: 'invisible',
              title: 'Hide on Website (লুকিয়ে রাখুন — Invisible)',
              type: 'boolean',
              description: 'অন (ON) করলে ওয়েবসাইট থেকে এই ফিল্ডটি পুরোপুরি অদৃশ্য হয়ে যাবে এবং নিচের অংশগুলো স্বয়ংক্রিয়ভাবে উপরে উঠে আসবে। দৃশ্যমান রাখতে এটি বন্ধ (OFF) রাখুন।',
              initialValue: false,
            }),
            defineField({
              name: 'public_lock',
              title: 'Lock for Public Visitors (সাধারণ ভিজিটরের জন্য লক)',
              type: 'boolean',
              description: 'অন (ON) থাকলে সাধারণ ভিজিটররা (যারা লগইন করেনি) এই তথ্যটি লক/মাস্ক অবস্থায় দেখতে পাবে।',
              initialValue: false,
            }),
            defineField({
              name: 'batch_lock',
              title: 'Lock for Junior Batches (জুনিয়র ব্যাচের জন্য লক)',
              type: 'boolean',
              description: 'অন (ON) থাকলে জুনিয়র ব্যাচের শিক্ষার্থী সিনিয়র ব্যাচের প্রোফাইল দেখার সময় এই তথ্যটি লক দেখতে পাবে (সিনিয়ররা জুনিয়রদের সবসময় দেখতে পাবে)।',
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
              const icon = isHidden ? '⚪' : '🟢'
              const pubStr = public_lock ? '🔒 Locked' : '🔓 Open'
              const batchStr = batch_lock ? '🔒 Locked' : '🔓 Open'
              return {
                title: `${icon} ${name}`,
                subtitle: isHidden
                  ? `Hidden from website (লুকানো / অদৃশ্য)`
                  : `Visible  |  Public: ${pubStr}  |  Batch: ${batchStr}`,
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
      description: 'হোম পেজের সেকশনগুলোর ক্রম ড্র্যাগ করে সাজান। Hide on Home Page চালু করলে হোম পেজ থেকে সেটি পুরোপুরি অদৃশ্য হয়ে যাবে এবং নিচের সেকশনগুলো উপরে উঠে আসবে।',
      of: [
        {
          type: 'object',
          name: 'homepageSection',
          title: 'Home Page Section',
          fields: [
            defineField({
              name: 'section_id',
              title: 'Select Home Section (ড্রপডাউন থেকে সেকশন নির্বাচন করুন)',
              type: 'string',
              options: {
                list: HOMEPAGE_SECTION_OPTIONS,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Custom Title (ঐচ্ছিক কাস্টম শিরোনাম)',
              type: 'string',
              description: 'খালি রাখলে স্বয়ংক্রিয়ভাবে ডিফল্ট নামটি প্রদর্শিত হবে।',
            }),
            defineField({
              name: 'invisible',
              title: 'Hide on Home Page (হোম পেজ থেকে লুকান — Invisible)',
              type: 'boolean',
              description: 'অন (ON) করলে হোম পেজ থেকে এই সেকশনটি পুরোপুরি বাদ যাবে এবং নিচের সেকশন উপরে চলে আসবে।',
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
              const icon = isHidden ? '⚪' : '🟢'
              return {
                title: `${icon} ${name}`,
                subtitle: isHidden ? 'Hidden from Home Page (লুকানো)' : 'Visible on Home Page (দৃশ্যমান)',
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
      description: 'ডেভেলপার পেজের সেকশনগুলোর ক্রম ড্র্যাগ করে সাজান।',
      of: [
        {
          type: 'object',
          name: 'developerSection',
          title: 'Developer Section',
          fields: [
            defineField({
              name: 'section_id',
              title: 'Select Developer Section (ড্রপডাউন থেকে নির্বাচন করুন)',
              type: 'string',
              options: {
                list: DEVELOPER_SECTION_OPTIONS,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Custom Title (ঐচ্ছিক কাস্টম শিরোনাম)',
              type: 'string',
            }),
            defineField({
              name: 'invisible',
              title: 'Hide on Developer Page (লুকিয়ে রাখুন — Invisible)',
              type: 'boolean',
              description: 'অন (ON) করলে ডেভেলপার পেজ থেকে এই সেকশনটি পুরোপুরি লুকানো থাকবে।',
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
              const icon = isHidden ? '⚪' : '🟢'
              return {
                title: `${icon} ${name}`,
                subtitle: isHidden ? 'Hidden (লুকানো)' : 'Visible (দৃশ্যমান)',
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
      description: 'হল ইনফো পেজের সেকশনগুলোর ক্রম ড্র্যাগ করে সাজান।',
      of: [
        {
          type: 'object',
          name: 'hallinfoSection',
          title: 'Hall Info Section',
          fields: [
            defineField({
              name: 'section_id',
              title: 'Select Hall Info Section (ড্রপডাউন থেকে নির্বাচন করুন)',
              type: 'string',
              options: {
                list: HALLINFO_SECTION_OPTIONS,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Custom Title (ঐচ্ছিক কাস্টম শিরোনাম)',
              type: 'string',
            }),
            defineField({
              name: 'invisible',
              title: 'Hide on Hall Info Page (লুকিয়ে রাখুন — Invisible)',
              type: 'boolean',
              description: 'অন (ON) করলে হল পরিচিতি পেজ থেকে এই সেকশনটি লুকানো থাকবে।',
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
              const icon = isHidden ? '⚪' : '🟢'
              return {
                title: `${icon} ${name}`,
                subtitle: isHidden ? 'Hidden (লুকানো)' : 'Visible (দৃশ্যমান)',
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
      description: 'ওয়েবসাইটের প্রধান নেভিগেশন বারে কোন কোন বাটন প্রদর্শিত হবে তা অন/অফ করুন।',
      fields: [
        { name: 'menu_home', title: 'Home Button', type: 'boolean', description: 'হোম পেজ বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
        { name: 'menu_students', title: 'Students Button', type: 'boolean', description: 'শিক্ষার্থী তালিকা বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
        { name: 'menu_roommates', title: 'Roommates Button', type: 'boolean', description: 'রুম ও রুমমেট বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
        { name: 'menu_results', title: 'Results Button', type: 'boolean', description: 'ফলাফল বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
        { name: 'menu_gallery', title: 'Gallery Button', type: 'boolean', description: 'ফটো গ্যালারি বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
        { name: 'menu_hostel', title: 'Hostel / Hall Info Button', type: 'boolean', description: 'হল পরিচিতি বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
        { name: 'menu_dc_clubs', title: 'College Clubs Button', type: 'boolean', description: 'কলেজ ক্লাবসমূহ বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
        { name: 'menu_dc_social', title: 'Social Media Button', type: 'boolean', description: 'সোশ্যাল মিডিয়া পেজ বাটনটি মেনুতে দেখাবেন কি না।', initialValue: true },
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
      description: 'ওয়েবসাইটের ফুটারের কলাম ও লিংকগুলো পরিচালনা করুন। কোনো কলাম বা লিংক বন্ধ (Inactive) করলে তা সাইট থেকে বাদ যাবে।',
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
              description: 'কলামের ইংরেজি শিরোনাম (যেমন: Quick Links / Students / Hall)।',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title_bn',
              title: 'Column Title (Bangla)',
              type: 'string',
              description: 'কলামের বাংলা শিরোনাম (ঐচ্ছিক)।',
            }),
            defineField({
              name: 'is_active',
              title: 'Active (Visible on Site)',
              type: 'boolean',
              description: 'কলামটি ওয়েবসাইটে প্রদর্শিত হবে কি না।',
              initialValue: true,
            }),
            defineField({
              name: 'links',
              title: 'Column Links (Drag to Reorder)',
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
                      title: 'Link Title (English)',
                      type: 'string',
                      description: 'লিংকের ইংরেজি নাম।',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'title_bn',
                      title: 'Link Title (Bangla)',
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
                      title: 'Active (Visible)',
                      type: 'boolean',
                      description: 'লিংকটি ওয়েবসাইটে চালু রাখবেন কি না।',
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
        title: 'Security & Visibility Controls',
        subtitle: 'Password, Locks, Visibility & Footer Management',
      }
    },
  },
})
