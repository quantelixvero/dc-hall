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
    { name: 'batch_rotation', title: '🔄 Batch Email Slots & Rotation (ব্যাচ অ্যাডমিন ইমেইল ও রোটেশন)' },
    { name: 'profile_controls', title: '👤 Profile Fields & Locks' },
    { name: 'page_access', title: '🔐 Page Access & Locks (পেজ লক ও ভিজিবিলিটি)' },
    { name: 'homepage_vis', title: '🏠 Home Page Sections' },
    { name: 'developer_vis', title: '🧑‍💻 Developer Sections' },
    { name: 'hallinfo_vis', title: '🏛️ Hall Info Sections' },
    { name: 'menu_vis', title: '📱 Menu Items' },
    { name: 'footer_settings', title: '📎 Footer Columns & Links' },
  ],

  fields: [

    // ═══════════════════════════════════════════
    // BATCH EMAIL SLOTS & ANNUAL ROTATION SYSTEM
    // ═══════════════════════════════════════════
    defineField({
      name: 'batch_rotation_enabled',
      title: 'Annual Auto-Rotation on January 1st (১লা জানুয়ারি বার্ষিক স্বয়ংক্রিয় রোটেশন)',
      type: 'boolean',
      group: 'batch_rotation',
      description: 'চালু থাকলে প্রতি বছর ১লা জানুয়ারি স্বয়ংক্রিয়ভাবে সবচেয়ে পুরোনো ব্যাচের অ্যাক্সেস শেষ হবে এবং তাদের ইমেইল স্লটটি নতুন আগত ব্যাচের জন্য অ্যাসাইন হয়ে যাবে।',
      initialValue: true,
    }),
    defineField({
      name: 'batch_email_slots',
      title: 'Batch Admin Email Slots (৩টি ব্যাচ অ্যাডমিন ইমেইল স্লট ও অ্যাসাইনমেন্ট)',
      type: 'array',
      group: 'batch_rotation',
      description: 'স্টুডিওতে ব্যাচভিত্তিক অ্যাক্সেস লিমিটেশনের জন্য নির্ধারিত ৩টি ইমেইল স্লট। যেকোনো সময় এখান থেকেই ইমেইল পরিবর্তন বা ব্যাচ অ্যাসাইনমেন্ট বদল করা যাবে।',
      initialValue: [
        {
          _key: 'slot_1_sr',
          slot_name: 'Slot 1 (Senior Batch / Founder)',
          admin_email: 'dchall.hsc27@gmail.com',
          assigned_batch: 'HSC-27',
          is_active: true,
          notes: 'HSC-27 ব্যাচ অ্যাডমিন ইমেইল স্লট। পাস আউট হলে এই স্লটটি HSC-30 ব্যাচকে হ্যান্ডওভার করা যাবে।'
        },
        {
          _key: 'slot_2_mid',
          slot_name: 'Slot 2 (Mid Batch / Current 2nd Year)',
          admin_email: 'dchall.hsc28@gmail.com',
          assigned_batch: 'HSC-28',
          is_active: true,
          notes: 'HSC-28 ব্যাচ অ্যাডমিন ইমেইল স্লট।'
        },
        {
          _key: 'slot_3_jr',
          slot_name: 'Slot 3 (Junior Batch / 1st Year)',
          admin_email: 'dchall.hsc29@gmail.com',
          assigned_batch: 'HSC-29',
          is_active: true,
          notes: 'HSC-29 ব্যাচ অ্যাডমিন ইমেইল স্লট।'
        }
      ],
      of: [
        {
          type: 'object',
          name: 'batchEmailSlot',
          title: 'Batch Admin Slot',
          fields: [
            defineField({
              name: 'slot_name',
              title: 'Slot Label (স্লটের নাম / ভূমিকা)',
              type: 'string',
              description: 'যেমন: Slot 1 (Senior Batch), Slot 2 (Mid Batch), Slot 3 (Junior / Incoming Batch)',
            }),
            defineField({
              name: 'admin_email',
              title: 'Admin Email (অ্যাডমিন ইমেইল এড্রেস)',
              type: 'string',
              description: 'যে ইমেইলটি Sanity Studio-তে লগইন করার জন্য দেওয়া হবে। কোনো ইমেইলে সমস্যা হলে এখান থেকে পরিবর্তন করুন।',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'assigned_batch',
              title: 'Assigned Batch (নির্ধারিত ব্যাচ)',
              type: 'string',
              description: 'এই ইমেইলটি দিয়ে লগইন করলে শুধুমাত্র এই ব্যাচের ডেটা এডিট করা যাবে।',
              options: {
                list: [
                  { title: 'HSC-27 (Founder / 2025-26)', value: 'HSC-27' },
                  { title: 'HSC-28 (2026-27)', value: 'HSC-28' },
                  { title: 'HSC-29 (2027-28)', value: 'HSC-29' },
                  { title: 'HSC-30 (2028-29)', value: 'HSC-30' },
                  { title: 'HSC-31 (2029-30)', value: 'HSC-31' },
                  { title: 'HSC-32 (2030-31)', value: 'HSC-32' },
                ],
              },
            }),
            defineField({
              name: 'is_active',
              title: 'Active Access (অ্যাক্সেস সক্রিয় আছে?)',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'expiry_date',
              title: 'Access Expiry Date (মেয়াদ শেষ হওয়ার তারিখ - ঐচ্ছিক)',
              type: 'date',
              description: 'যদি কোনো নির্দিষ্ট তারিখে স্বয়ংক্রিয়ভাবে মেয়াদ শেষ করতে চান।',
            }),
            defineField({
              name: 'notes',
              title: 'Notes / Handover Details (নোট / দায়িত্ব হস্তান্তর বিবরণ)',
              type: 'string',
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
              return {
                title: `${active ? '🟢' : '🔴'} ${title || 'Slot'}: ${batch || 'Unassigned'}`,
                subtitle: subtitle || 'No email assigned',
              }
            },
          },
        },
      ],
    }),

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
      name: 'global_visibility_mode',
      title: 'Global Seniority & Protection Mode (গ্লোবাল ভিজিবিলিটি মোড)',
      type: 'string',
      group: 'profile_controls',
      options: {
        list: [
          { title: 'Junior Protection Mode (জুনিয়রদের জন্য নির্ধারিত ফিল্ডগুলো সিনিয়রদের প্রোফাইলে লক থাকবে)', value: 'junior_safe' },
          { title: 'Full Unlock Mode (লগইন করা সকল ব্যাচের জন্য সম্পূর্ণ সাইট ও প্রোফাইল আনলক)', value: 'full_unlock' },
        ],
        layout: 'radio',
      },
      initialValue: 'junior_safe',
      description: 'জুনিয়র প্রোটেকশন মোডে জুনিয়ররা সিনিয়রদের সংরক্ষিত ডাটা দেখতে পারবে না। ফুল আনলক মোডে যেকোনো রেজিস্টার্ড ব্যাচ লগইন করলে সব ব্যাচের ডাটা সরাসরি দেখতে পাবে।',
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
    // PAGE-LEVEL ACCESS & LOCK CONTROLS
    // ═══════════════════════════════════════════
    defineField({
      name: 'page_access_controls',
      title: 'Page Access & Visibility Controls (ওয়েবসাইটের সকল পেজ লক ও হাইড নিয়ন্ত্রণ)',
      type: 'array',
      group: 'page_access',
      description: 'ওয়েবসাইটের প্রতিটি পেজ (যেমন Academic Results, Students, Roommates, Birthdays, Gallery ইত্যাদি) ভিজিটরের জন্য উন্মুক্ত থাকবে নাকি পাসওয়ার্ড দিয়ে লক থাকবে তা এখান থেকে নির্ধারণ করুন।',
      initialValue: [
        { page_id: 'results', title: 'Academic Results (results.html)', is_visible: true, is_locked: true, lock_message: 'এই পেজের ফলাফল দেখতে অনুগ্রহ করে ব্যাচ পাসওয়ার্ড দিয়ে লগইন করুন।' },
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
              title: 'Page Identifier (পেজ শনাক্তকারী)',
              type: 'string',
              readOnly: true,
            }),
            defineField({
              name: 'title',
              title: 'Page Name (পেজের নাম)',
              type: 'string',
            }),
            defineField({
              name: 'access_level',
              title: 'Page Access Level (পেজ অ্যাক্সেস স্তর)',
              type: 'string',
              options: {
                list: [
                  { title: 'Unlocked / Public (উন্মুক্ত — সবাই দেখতে পারবে)', value: 'unlocked' },
                  { title: 'Lock for Normal Users (লক — লগইন করা শিক্ষার্থী দেখতে পারবে)', value: 'lock_normal' },
                  { title: 'Lock for All (শুধুমাত্র মাস্টার অ্যাডমিন দেখতে পারবে)', value: 'lock_all' },
                  { title: 'Hidden (সম্পূর্ণ লুকানো — মেনু ও সাইটে দেখাবে না)', value: 'hidden' },
                ],
                layout: 'radio',
              },
              initialValue: 'unlocked',
              description: 'পেজটি কীভাবে প্রদর্শিত হবে নির্বাচন করুন।',
            }),

            defineField({
              name: 'is_visible',
              title: 'Visible on Website (ওয়েবসাইটে দৃশ্যমান)',
              type: 'boolean',
              initialValue: true,
              description: 'বন্ধ (OFF) করলে এই পেজটি ওয়েবসাইট এবং মেনু থেকে সম্পূর্ণ লুকানো থাকবে।',
            }),
            defineField({
              name: 'is_locked',
              title: 'Require Login / Locked (পাসওয়ার্ড দিয়ে লক রাখুন)',
              type: 'boolean',
              initialValue: false,
              description: 'চালু (ON) থাকলে ভিজিটরকে অবশ্যই ব্যাচ পাসওয়ার্ড দিয়ে লগইন করতে হবে। লগইন না করলে পেজে লক স্ক্রিন দেখাবে।',
            }),
            defineField({
              name: 'lock_message',
              title: 'Lock Message (লক স্ক্রিনে প্রদর্শিত বার্তা)',
              type: 'string',
              placeholder: 'এই পেজের সংরক্ষিত তথ্য দেখতে অনুগ্রহ করে লগইন করুন।',
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
              const statusParts = [];
              if (is_visible === false) statusParts.push('🚫 Hidden');
              else statusParts.push('👁️ Visible');
              if (is_locked) statusParts.push('🔒 Locked');
              else statusParts.push('🔓 Public');
              return {
                title: title || page_id,
                subtitle: `${page_id}.html — ${statusParts.join(' · ')}`,
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
              name: 'visibility_tier',
              title: 'Field Visibility Tier (ফিল্ড ভিজিবিলিটি স্তর — ৫টি পরিষ্কার বিকল্প)',
              type: 'string',
              options: {
                list: [
                  { title: 'Public (উন্মুক্ত — লগইন ছাড়াও সবাই দেখতে পারবে)', value: 'public' },
                  { title: 'Lock for Normal Users (সাধারণ ব্যবহারকারীর জন্য লক — দেখতে হলে লগইন লাগবে)', value: 'lock_normal' },
                  { title: 'Lock for Juniors (জুনিয়রদের জন্য লক — সমবয়সী ও সিনিয়ররা দেখতে পারবে)', value: 'lock_junior' },
                  { title: 'Lock for All (সবার জন্য লক — শুধুমাত্র মাস্টার কি দেখতে পারবে)', value: 'lock_all' },
                  { title: 'Hide Completely (পুরোপুরি লুকানো — ওয়েবসাইট থেকে অদৃশ্য থাকবে)', value: 'hide' },
                ],
                layout: 'radio',
              },
              initialValue: 'public',
              description: 'এই ফিল্ডটির জন্য নির্দিষ্ট ভিজিবিলিটি স্তর নির্বাচন করুন।',
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
              name: 'visibility_tier',
              title: 'Field Visibility Tier (ফিল্ড ভিজিবিলিটি স্তর — ৫টি পরিষ্কার বিকল্প)',
              type: 'string',
              options: {
                list: [
                  { title: 'Public (উন্মুক্ত — লগইন ছাড়াও সবাই দেখতে পারবে)', value: 'public' },
                  { title: 'Lock for Normal Users (সাধারণ ব্যবহারকারীর জন্য লক — দেখতে হলে লগইন লাগবে)', value: 'lock_normal' },
                  { title: 'Lock for Juniors (জুনিয়রদের জন্য লক — সমবয়সী ও সিনিয়ররা দেখতে পারবে)', value: 'lock_junior' },
                  { title: 'Lock for All (সবার জন্য লক — শুধুমাত্র মাস্টার কি দেখতে পারবে)', value: 'lock_all' },
                  { title: 'Hide Completely (পুরোপুরি লুকানো — ওয়েবসাইট থেকে অদৃশ্য থাকবে)', value: 'hide' },
                ],
                layout: 'radio',
              },
              initialValue: 'public',
              description: 'এই ফিল্ডটির জন্য নির্দিষ্ট ভিজিবিলিটি স্তর নির্বাচন করুন।',
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
              name: 'visibility_tier',
              title: 'Field Visibility Tier (ফিল্ড ভিজিবিলিটি স্তর — ৫টি পরিষ্কার বিকল্প)',
              type: 'string',
              options: {
                list: [
                  { title: 'Public (উন্মুক্ত — লগইন ছাড়াও সবাই দেখতে পারবে)', value: 'public' },
                  { title: 'Lock for Normal Users (সাধারণ ব্যবহারকারীর জন্য লক — দেখতে হলে লগইন লাগবে)', value: 'lock_normal' },
                  { title: 'Lock for Juniors (জুনিয়রদের জন্য লক — সমবয়সী ও সিনিয়ররা দেখতে পারবে)', value: 'lock_junior' },
                  { title: 'Lock for All (সবার জন্য লক — শুধুমাত্র মাস্টার কি দেখতে পারবে)', value: 'lock_all' },
                  { title: 'Hide Completely (পুরোপুরি লুকানো — ওয়েবসাইট থেকে অদৃশ্য থাকবে)', value: 'hide' },
                ],
                layout: 'radio',
              },
              initialValue: 'public',
              description: 'এই ফিল্ডটির জন্য নির্দিষ্ট ভিজিবিলিটি স্তর নির্বাচন করুন।',
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
              name: 'visibility_tier',
              title: 'Field Visibility Tier (ফিল্ড ভিজিবিলিটি স্তর — ৫টি পরিষ্কার বিকল্প)',
              type: 'string',
              options: {
                list: [
                  { title: 'Public (উন্মুক্ত — লগইন ছাড়াও সবাই দেখতে পারবে)', value: 'public' },
                  { title: 'Lock for Normal Users (সাধারণ ব্যবহারকারীর জন্য লক — দেখতে হলে লগইন লাগবে)', value: 'lock_normal' },
                  { title: 'Lock for Juniors (জুনিয়রদের জন্য লক — সমবয়সী ও সিনিয়ররা দেখতে পারবে)', value: 'lock_junior' },
                  { title: 'Lock for All (সবার জন্য লক — শুধুমাত্র মাস্টার কি দেখতে পারবে)', value: 'lock_all' },
                  { title: 'Hide Completely (পুরোপুরি লুকানো — ওয়েবসাইট থেকে অদৃশ্য থাকবে)', value: 'hide' },
                ],
                layout: 'radio',
              },
              initialValue: 'public',
              description: 'এই ফিল্ডটির জন্য নির্দিষ্ট ভিজিবিলিটি স্তর নির্বাচন করুন।',
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
