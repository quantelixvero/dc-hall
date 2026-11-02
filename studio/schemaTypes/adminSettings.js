import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'adminSettings',
  title: 'Admin Settings (অ্যাডমিন সেটিংস)',
  type: 'document',

  groups: [
    { name: 'passwords', title: '🔑 পাসওয়ার্ড ব্যবস্থাপনা (Passwords)' },
    { name: 'privacy', title: '🔒 গোপনীয়তা সেটিংস (Privacy Controls)' },
  ],

  fields: [
    // ═══════════════════════════════════════════
    // Password Management
    // ═══════════════════════════════════════════
    defineField({
      name: 'master_password',
      title: 'Master Admin Password (অ্যাডমিন মাস্টার পাসওয়ার্ড)',
      type: 'string',
      group: 'passwords',
      description: 'এই পাসওয়ার্ড দিয়ে ওয়েবসাইটে লগইন করলে সমস্ত ব্যাচের সব লক করা তথ্য আনলক হবে। ডিফল্ট: 102103104',
      placeholder: '102103104',
    }),

    defineField({
      name: 'batch_passwords',
      title: 'Batch Specific Passwords (ব্যাচভিত্তিক গোপন পাসওয়ার্ড)',
      type: 'object',
      group: 'passwords',
      description: 'নির্দিষ্ট ব্যাচের শিক্ষার্থীরা এই পাসওয়ার্ড দিয়ে লগইন করলে শুধুমাত্র তাদের ব্যাচের সংরক্ষিত তথ্য দেখতে পারবে।',
      fields: [
        { name: 'hsc27', title: 'HSC 2027 Password', type: 'string', placeholder: 'dc27hall' },
        { name: 'hsc28', title: 'HSC 2028 Password', type: 'string', placeholder: 'dc28hall' },
        { name: 'hsc29', title: 'HSC 2029 Password', type: 'string', placeholder: 'dc29hall' },
        { name: 'hsc30', title: 'HSC 2030 Password', type: 'string', placeholder: 'dc30hall' },
      ],
    }),

    defineField({
      name: 'legacy_password',
      title: 'Global Legacy Visibility Password (অপশনাল ব্যাকআপ পাসওয়ার্ড)',
      type: 'string',
      group: 'passwords',
    }),

    // ═══════════════════════════════════════════
    // Privacy Controls
    // ═══════════════════════════════════════════
    defineField({
      name: 'global_visibility',
      title: 'Global Visibility (সবার জন্য উন্মুক্ত রাখবেন কি না)',
      type: 'boolean',
      group: 'privacy',
      description: 'ON থাকলে পাসওয়ার্ড ছাড়াই সাধারণ ভিজিটররা মৌলিক তথ্য দেখতে পারবে।',
      initialValue: true,
    }),

    defineField({
      name: 'locked_fields',
      title: 'General User Locked Fields (সাধারণ ব্যবহারকারীদের জন্য লক তথ্যসমূহ)',
      type: 'object',
      group: 'privacy',
      description: 'যে যে ফিল্ডগুলো সাধারণ ভিজিটরদের কাছে লক থাকবে (লগইন ছাড়া দেখা যাবে না)',
      fields: [
        { name: 'lock_phone', title: 'Lock Student Phone Number (শিক্ষার্থীর ফোন নম্বর লক)', type: 'boolean', initialValue: true },
        { name: 'lock_father_phone', title: 'Lock Guardian Phone (অভিভাবকের ফোন লক)', type: 'boolean', initialValue: true },
        { name: 'lock_email', title: 'Lock Email (ইমেইল ঠিকানা লক)', type: 'boolean', initialValue: true },
        { name: 'lock_address', title: 'Lock Address / Location (ঠিকানা লক)', type: 'boolean', initialValue: false },
        { name: 'lock_socials', title: 'Lock Social Links (ফেসবুক / সোশ্যাল লক)', type: 'boolean', initialValue: false },
        { name: 'lock_results', title: 'Lock Academic Results PDFs (মার্কস ও ফলাফল লক)', type: 'boolean', initialValue: true },
        { name: 'lock_room', title: 'Lock Room Allocation (রুম নম্বর ও সিট লক)', type: 'boolean', initialValue: false },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Admin Settings',
        subtitle: 'পাসওয়ার্ড ও গোপনীয়তা নিয়ন্ত্রণ',
      }
    },
  },
})
