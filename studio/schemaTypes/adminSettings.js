import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'adminSettings',
  title: 'Admin Settings (অ্যাডমিন সেটিংস)',
  type: 'document',

  groups: [
    { name: 'passwords', title: '🔑 পাসওয়ার্ড (Passwords)' },
    { name: 'global_lock', title: '🔒 Global Lock (পাবলিক ইউজার)' },
    { name: 'batch_lock', title: '🔒 Batch Lock (জুনিয়র→সিনিয়র)' },
    { name: 'profile_vis', title: '👤 Profile Visibility' },
    { name: 'homepage_vis', title: '🏠 Home Page Visibility' },
    { name: 'developer_vis', title: '🧑‍💻 Developer Visibility' },
    { name: 'hallinfo_vis', title: '🏛️ Hall Info Visibility' },
    { name: 'menu_vis', title: '📱 Menu Visibility' },
  ],

  fields: [
    // ═══════════════════════════════════════════
    // PASSWORD
    // ═══════════════════════════════════════════
    defineField({
      name: 'master_password',
      title: 'Master Admin Password (অ্যাডমিন মাস্টার পাসওয়ার্ড)',
      type: 'string',
      group: 'passwords',
      description: 'এই পাসওয়ার্ড দিয়ে ওয়েবসাইটে লগইন করলে সমস্ত ব্যাচের সব লক করা তথ্য আনলক হবে।',
    }),

    // ═══════════════════════════════════════════
    // GLOBAL LOCK — Public/unauthenticated users
    // ═══════════════════════════════════════════
    defineField({
      name: 'global_visibility',
      title: 'Global Visibility (সবার জন্য উন্মুক্ত)',
      type: 'boolean',
      group: 'global_lock',
      description: 'ON থাকলে পাসওয়ার্ড ছাড়াই সাধারণ ভিজিটররা মৌলিক তথ্য দেখতে পারবে।',
      initialValue: true,
    }),

    defineField({
      name: 'global_lock',
      title: '🔒 General User Locked Fields (পাবলিক ইউজারদের জন্য লক)',
      type: 'object',
      group: 'global_lock',
      description: 'লগইন ছাড়া কোন কোন ফিল্ড লুকানো/মাস্ক থাকবে',
      fields: [
        { name: 'lock_photo', title: '📷 প্রোফাইল ছবি লক', type: 'boolean', initialValue: false },
        { name: 'lock_name', title: '📝 নাম লক', type: 'boolean', initialValue: false },
        { name: 'lock_batch', title: '🎓 ব্যাচ লক', type: 'boolean', initialValue: false },
        { name: 'lock_roll', title: '🔢 রোল নম্বর লক', type: 'boolean', initialValue: false },
        { name: 'lock_group', title: '📚 গ্রুপ/বিভাগ লক', type: 'boolean', initialValue: false },
        { name: 'lock_section', title: '🏷️ সেকশন লক', type: 'boolean', initialValue: false },
        { name: 'lock_practical_group', title: '🧪 প্র্যাকটিক্যাল গ্রুপ লক', type: 'boolean', initialValue: false },
        { name: 'lock_room', title: '🚪 রুম নম্বর লক', type: 'boolean', initialValue: false },
        { name: 'lock_blood_group', title: '🩸 রক্তের গ্রুপ লক', type: 'boolean', initialValue: false },
        { name: 'lock_dob', title: '📅 জন্মতারিখ লক', type: 'boolean', initialValue: false },
        { name: 'lock_bio', title: '📄 বায়ো/পরিচয় লক', type: 'boolean', initialValue: false },
        { name: 'lock_phone', title: '📞 ফোন নম্বর লক', type: 'boolean', initialValue: true },
        { name: 'lock_whatsapp', title: '💬 হোয়াটসঅ্যাপ লক', type: 'boolean', initialValue: true },
        { name: 'lock_telegram', title: '✈️ টেলিগ্রাম লক', type: 'boolean', initialValue: true },
        { name: 'lock_father_phone', title: '👨 অভিভাবকের ফোন লক', type: 'boolean', initialValue: true },
        { name: 'lock_email', title: '📧 ইমেইল লক', type: 'boolean', initialValue: true },
        { name: 'lock_address', title: '📍 ঠিকানা লক', type: 'boolean', initialValue: true },
        { name: 'lock_facebook', title: '👥 ফেসবুক লক', type: 'boolean', initialValue: false },
        { name: 'lock_results', title: '📊 একাডেমিক রেজাল্ট লক', type: 'boolean', initialValue: true },
      ],
    }),

    // ═══════════════════════════════════════════
    // BATCH LOCK — Junior viewing Senior data
    // ═══════════════════════════════════════════
    defineField({
      name: 'batch_lock',
      title: '🔒 Batch Lock (জুনিয়র ব্যাচ → সিনিয়র ব্যাচের তথ্য)',
      type: 'object',
      group: 'batch_lock',
      description: 'জুনিয়র ব্যাচ (যেমন HSC-28) যখন সিনিয়র ব্যাচের (HSC-27) তথ্য দেখবে, তখন কোন কোন ফিল্ড লক থাকবে। সিনিয়ররা জুনিয়রদের সব দেখতে পারবে।',
      fields: [
        { name: 'lock_photo', title: '📷 সিনিয়রের ছবি লক', type: 'boolean', initialValue: false },
        { name: 'lock_phone', title: '📞 সিনিয়রের ফোন লক', type: 'boolean', initialValue: true },
        { name: 'lock_whatsapp', title: '💬 সিনিয়রের হোয়াটসঅ্যাপ লক', type: 'boolean', initialValue: true },
        { name: 'lock_telegram', title: '✈️ সিনিয়রের টেলিগ্রাম লক', type: 'boolean', initialValue: true },
        { name: 'lock_father_phone', title: '👨 সিনিয়রের অভিভাবক ফোন লক', type: 'boolean', initialValue: true },
        { name: 'lock_email', title: '📧 সিনিয়রের ইমেইল লক', type: 'boolean', initialValue: true },
        { name: 'lock_address', title: '📍 সিনিয়রের ঠিকানা লক', type: 'boolean', initialValue: true },
        { name: 'lock_facebook', title: '👥 সিনিয়রের ফেসবুক লক', type: 'boolean', initialValue: false },
        { name: 'lock_bio', title: '📄 সিনিয়রের বায়ো লক', type: 'boolean', initialValue: false },
        { name: 'lock_results', title: '📊 সিনিয়রের রেজাল্ট লক', type: 'boolean', initialValue: true },
        { name: 'lock_dob', title: '📅 সিনিয়রের জন্মতারিখ লক', type: 'boolean', initialValue: false },
        { name: 'lock_blood_group', title: '🩸 সিনিয়রের রক্তের গ্রুপ লক', type: 'boolean', initialValue: false },
        { name: 'lock_room', title: '🚪 সিনিয়রের রুম নম্বর লক', type: 'boolean', initialValue: false },
      ],
    }),

    // ═══════════════════════════════════════════
    // PROFILE VISIBILITY & ORDER
    // ═══════════════════════════════════════════
    defineField({
      name: 'profile_sections',
      title: '👤 Profile Sections (ক্রম ও দৃশ্যমানতা)',
      type: 'array',
      group: 'profile_vis',
      description: 'ড্র্যাগ করে ক্রম পরিবর্তন করুন। enabled বন্ধ করলে সেই অংশ ওয়েবসাইটে দেখা যাবে না।',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'section_id', title: 'Section ID', type: 'string', readOnly: true }),
            defineField({ name: 'label', title: 'Label', type: 'string', readOnly: true }),
            defineField({ name: 'enabled', title: 'দৃশ্যমান (Visible)', type: 'boolean', initialValue: true }),
          ],
          preview: {
            select: { title: 'label', enabled: 'enabled' },
            prepare({ title, enabled }) {
              return { title: `${enabled !== false ? '🟢' : '⚪'} ${title || 'Section'}` }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // HOME PAGE VISIBILITY & ORDER
    // ═══════════════════════════════════════════
    defineField({
      name: 'homepage_sections',
      title: '🏠 Home Page Sections (ক্রম ও দৃশ্যমানতা)',
      type: 'array',
      group: 'homepage_vis',
      description: 'হোম পেজের section গুলোর ক্রম ও দৃশ্যমানতা নিয়ন্ত্রণ করুন।',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'section_id', title: 'Section ID', type: 'string', readOnly: true }),
            defineField({ name: 'label', title: 'Label', type: 'string', readOnly: true }),
            defineField({ name: 'enabled', title: 'দৃশ্যমান (Visible)', type: 'boolean', initialValue: true }),
          ],
          preview: {
            select: { title: 'label', enabled: 'enabled' },
            prepare({ title, enabled }) {
              return { title: `${enabled !== false ? '🟢' : '⚪'} ${title || 'Section'}` }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // DEVELOPER VISIBILITY & ORDER
    // ═══════════════════════════════════════════
    defineField({
      name: 'developer_sections',
      title: '🧑‍💻 Developer Sections (ক্রম ও দৃশ্যমানতা)',
      type: 'array',
      group: 'developer_vis',
      description: 'Developer page এর section গুলোর ক্রম ও দৃশ্যমানতা।',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'section_id', title: 'Section ID', type: 'string', readOnly: true }),
            defineField({ name: 'label', title: 'Label', type: 'string', readOnly: true }),
            defineField({ name: 'enabled', title: 'দৃশ্যমান (Visible)', type: 'boolean', initialValue: true }),
          ],
          preview: {
            select: { title: 'label', enabled: 'enabled' },
            prepare({ title, enabled }) {
              return { title: `${enabled !== false ? '🟢' : '⚪'} ${title || 'Section'}` }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // HALL INFO VISIBILITY & ORDER
    // ═══════════════════════════════════════════
    defineField({
      name: 'hallinfo_sections',
      title: '🏛️ Hall Info Sections (ক্রম ও দৃশ্যমানতা)',
      type: 'array',
      group: 'hallinfo_vis',
      description: 'Hall Info page এর section গুলোর ক্রম ও দৃশ্যমানতা।',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'section_id', title: 'Section ID', type: 'string', readOnly: true }),
            defineField({ name: 'label', title: 'Label', type: 'string', readOnly: true }),
            defineField({ name: 'enabled', title: 'দৃশ্যমান (Visible)', type: 'boolean', initialValue: true }),
          ],
          preview: {
            select: { title: 'label', enabled: 'enabled' },
            prepare({ title, enabled }) {
              return { title: `${enabled !== false ? '🟢' : '⚪'} ${title || 'Section'}` }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // MENU VISIBILITY
    // ═══════════════════════════════════════════
    defineField({
      name: 'menu_visibility',
      title: '📱 Menu Items Visibility (মেনু আইটেম দৃশ্যমানতা)',
      type: 'object',
      group: 'menu_vis',
      description: 'Navigation menu তে কোন বাটন দেখাবে, কোনটা লুকানো থাকবে।',
      fields: [
        { name: 'menu_home', title: '🏠 Home', type: 'boolean', initialValue: true },
        { name: 'menu_students', title: '👥 Students', type: 'boolean', initialValue: true },
        { name: 'menu_roommates', title: '🏠 Roommates', type: 'boolean', initialValue: true },
        { name: 'menu_results', title: '📊 Results', type: 'boolean', initialValue: true },
        { name: 'menu_gallery', title: '🖼️ Gallery', type: 'boolean', initialValue: true },
        { name: 'menu_hostel', title: '🏛️ Hostel/Hall Info', type: 'boolean', initialValue: true },
        { name: 'menu_dc_clubs', title: '🎭 DC Clubs', type: 'boolean', initialValue: true },
        { name: 'menu_dc_social', title: '📱 DC Social', type: 'boolean', initialValue: true },
        { name: 'menu_developer', title: '🧑‍💻 Developer', type: 'boolean', initialValue: true },
        { name: 'menu_profile', title: '👤 Profile/Login', type: 'boolean', initialValue: true },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Admin Settings',
        subtitle: 'পাসওয়ার্ড, লক, ক্রম ও দৃশ্যমানতা নিয়ন্ত্রণ',
      }
    },
  },
})
