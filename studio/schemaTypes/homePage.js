import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page Content',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section', default: true },
    { name: 'history_info', title: 'History & Hall Information' },
    { name: 'stats_location', title: 'Stats, Results & Location' },
  ],
  fields: [
    // ═══════════════════════════════════════════
    // Homepage Sections Controls
    // ═══════════════════════════════════════════
    defineField({
      name: 'sections_control',
      hidden: true,
      title: 'Homepage Sections Visibility & Order',
      type: 'array',
      description: 'হোমপেজের সেকশনগুলোর ক্রম সাজান। যে সেকশনটি উপরে থাকবে ওয়েবসাইটে সেটি আগে দেখাবে।',
      of: [
        {
          type: 'object',
          name: 'homeSectionItem',
          title: 'Section',
          fields: [
            defineField({
              name: 'section_id',
              title: 'Section',
              type: 'string',
              description: 'হোম পেজের যে অংশটি নিয়ন্ত্রণ করতে চান তা নির্বাচন করুন।',
              options: {
                list: [
                  { title: 'Students Preview', value: 'students_preview' },
                  { title: 'Roommate Preview', value: 'roommates_preview' },
                  { title: 'Results Preview', value: 'results_preview' },
                  { title: 'Hall Super Preview', value: 'hall_super_preview' },
                  { title: 'Hall Info & History', value: 'hall_info_preview' },
                  { title: 'Moments & Memories (Campus Photos)', value: 'moments_preview' },
                  { title: 'Portals & Resources', value: 'resources_preview' },
                  { title: 'Location & Map', value: 'location_preview' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'enabled',
              title: 'Show Section on Website',
              type: 'boolean',
              description: 'চালু (ON) থাকলে হোম পেজে এই সেকশনটি প্রদর্শিত হবে। বন্ধ করতে অফ করুন।',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              section_id: 'section_id',
              enabled: 'enabled',
            },
            prepare({ section_id, enabled }) {
              const titles = {
                students_preview: 'Students Preview',
                roommates_preview: 'Roommate Preview',
                results_preview: 'Results Preview',
                hall_super_preview: 'Hall Super Preview',
                hall_info_preview: 'Hall Info & History',
                moments_preview: 'Moments & Memories',
                resources_preview: 'Portals & Resources',
                location_preview: 'Location & Map',
              }
              const isOff = enabled === false
              return {
                title: titles[section_id] || section_id || 'Section',
                subtitle: isOff ? 'Hidden on site' : 'Visible on site',
              }
            },
          },
        },
      ],
      initialValue: [
        { _key: 'hsec1', section_id: 'students_preview', enabled: true },
        { _key: 'hsec2', section_id: 'roommates_preview', enabled: true },
        { _key: 'hsec3', section_id: 'results_preview', enabled: true },
        { _key: 'hsec4', section_id: 'hall_super_preview', enabled: true },
        { _key: 'hsec5', section_id: 'hall_info_preview', enabled: true },
        { _key: 'hsec6', section_id: 'moments_preview', enabled: true },
        { _key: 'hsec7', section_id: 'resources_preview', enabled: true },
        { _key: 'hsec8', section_id: 'location_preview', enabled: true },
      ],
    }),

    // --- Group: Hero ---
    defineField({
      name: 'hero_eyebrow_en',
      title: 'Hero Eyebrow (English)',
      type: 'string',
      group: 'hero',
      description: 'হিরো ব্যানারের উপরের ছোট ট্যাগলাইন (ইংরেজি)। যেমন: "Welcome to Dhaka College Hall"',
    }),
    defineField({
      name: 'hero_eyebrow_bn',
      title: 'Hero Eyebrow (Bangla)',
      type: 'string',
      group: 'hero',
      description: 'হিরো ব্যানারের উপরের ছোট ট্যাগলাইন (বাংলা)।',
    }),
    defineField({
      name: 'hero_title_en',
      title: 'Hero Main Title (English)',
      type: 'string',
      group: 'hero',
      description: 'হোম পেজের প্রধান ব্যানার শিরোনাম (ইংরেজি)।',
    }),
    defineField({
      name: 'hero_title_bn',
      title: 'Hero Main Title (Bangla)',
      type: 'string',
      group: 'hero',
      description: 'হোম পেজের প্রধান ব্যানার শিরোনাম (বাংলা)।',
    }),
    defineField({
      name: 'hero_phrases',
      title: 'Rotating Hero Phrases',
      type: 'array',
      group: 'hero',
      description: 'শিরোনামের নিচে টাইপিং এনিমেশনে যে বাক্যগুলো একের পর এক ঘুরবে তা এখানে যোগ করুন।',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'en', title: 'English Phrase', type: 'string', description: 'ইংরেজি বাক্য' },
            { name: 'bn', title: 'Bangla Phrase', type: 'string', description: 'বাংলা বাক্য' },
          ],
        },
      ],
    }),

    // --- Group: History & Info ---
    defineField({
      name: 'info_title_en',
      title: 'Info Section Title (English)',
      type: 'string',
      group: 'history_info',
      description: 'হল পরিচিতি সেকশনের শিরোনাম (ইংরেজি)।',
    }),
    defineField({
      name: 'info_title_bn',
      title: 'Info Section Title (Bangla)',
      type: 'string',
      group: 'history_info',
      description: 'হল পরিচিতি সেকশনের শিরোনাম (বাংলা)।',
    }),
    defineField({
      name: 'info_lead_en',
      title: 'Info Lead Subtitle (English)',
      type: 'text',
      rows: 2,
      group: 'history_info',
      description: 'পরিচিতি সেকশনের ছোট সাবটাইটেল (ইংরেজি)।',
    }),
    defineField({
      name: 'info_lead_bn',
      title: 'Info Lead Subtitle (Bangla)',
      type: 'text',
      rows: 2,
      group: 'history_info',
      description: 'পরিচিতি সেকশনের ছোট সাবটাইটেল (বাংলা)।',
    }),
    defineField({
      name: 'history_text_en',
      title: 'History Intro Text (English)',
      type: 'text',
      rows: 4,
      group: 'history_info',
      description: 'হলের সংক্ষিপ্ত ইতিহাস ও ঐতিহ্য (ইংরেজি)।',
    }),
    defineField({
      name: 'history_text_bn',
      title: 'History Intro Text (Bangla)',
      type: 'text',
      rows: 4,
      group: 'history_info',
      description: 'হলের সংক্ষিপ্ত ইতিহাস ও ঐতিহ্য (বাংলা)।',
    }),

    // --- Group: Stats & Location ---
    defineField({
      name: 'famous_text_en',
      title: 'Famous Alumni Intro (English)',
      type: 'text',
      rows: 2,
      group: 'stats_location',
      description: 'কৃতি প্রাক্তনীদের ভূমিকা বর্ণনা (ইংরেজি)।',
    }),
    defineField({
      name: 'famous_text_bn',
      title: 'Famous Alumni Intro (Bangla)',
      type: 'text',
      rows: 2,
      group: 'stats_location',
      description: 'কৃতি প্রাক্তনীদের ভূমিকা বর্ণনা (বাংলা)।',
    }),
    defineField({
      name: 'success_text_en',
      title: 'Admission Success Preview Text (English)',
      type: 'text',
      rows: 2,
      group: 'stats_location',
      description: 'বিশ্ববিদ্যালয় ও মেডিকেল ভর্তি সাফল্য চার্টের ভূমিকা (ইংরেজি)।',
    }),
    defineField({
      name: 'success_text_bn',
      title: 'Admission Success Preview Text (Bangla)',
      type: 'text',
      rows: 2,
      group: 'stats_location',
      description: 'বিশ্ববিদ্যালয় ও মেডিকেল ভর্তি সাফল্য চার্টের ভূমিকা (বাংলা)।',
    }),
    defineField({
      name: 'location_title_en',
      title: 'Location Title (English)',
      type: 'string',
      group: 'stats_location',
      description: 'অবস্থান সেকশনের শিরোনাম (ইংরেজি)।',
    }),
    defineField({
      name: 'location_title_bn',
      title: 'Location Title (Bangla)',
      type: 'string',
      group: 'stats_location',
      description: 'অবস্থান সেকশনের শিরোনাম (বাংলা)।',
    }),
    defineField({
      name: 'location_text_en',
      title: 'Location Description (English)',
      type: 'text',
      rows: 2,
      group: 'stats_location',
      description: 'হলের সঠিক ঠিকানা ও যাতায়াতের সংক্ষিপ্ত দিকনির্দেশনা (ইংরেজি)।',
    }),
    defineField({
      name: 'location_text_bn',
      title: 'Location Description (Bangla)',
      type: 'text',
      rows: 2,
      group: 'stats_location',
      description: 'হলের সঠিক ঠিকানা ও যাতায়াতের সংক্ষিপ্ত দিকনির্দেশনা (বাংলা)।',
    }),
    defineField({
      name: 'map_url',
      title: 'Google Map Embed URL',
      type: 'url',
      group: 'stats_location',
      description: 'গুগল ম্যাপসের আইফ্রেম/এমবেড লিংক এখানে দিন।',
    }),

    // --- Group: Results Preview ---
    defineField({
      name: 'results_eyebrow_en',
      title: 'Results Eyebrow (English)',
      type: 'string',
      group: 'stats_location',
      description: 'ফলাফল সেকশনের ট্যাগলাইন (ইংরেজি)। যেমন: "Academic Performance"',
    }),
    defineField({
      name: 'results_eyebrow_bn',
      title: 'Results Eyebrow (Bangla)',
      type: 'string',
      group: 'stats_location',
      description: 'ফলাফল সেকশনের ট্যাগলাইন (বাংলা)।',
    }),
    defineField({
      name: 'results_title_en',
      title: 'Results Section Title (English)',
      type: 'string',
      group: 'stats_location',
      description: 'ফলাফল সেকশনের মূল শিরোনাম (ইংরেজি)।',
    }),
    defineField({
      name: 'results_title_bn',
      title: 'Results Section Title (Bangla)',
      type: 'string',
      group: 'stats_location',
      description: 'ফলাফল সেকশনের মূল শিরোনাম (বাংলা)।',
    }),
    defineField({
      name: 'results_lead_en',
      title: 'Results Lead Text (English)',
      type: 'text',
      rows: 2,
      group: 'stats_location',
      description: 'ফলাফল সেকশনের সাবটাইটেল (ইংরেজি)।',
    }),
    defineField({
      name: 'results_lead_bn',
      title: 'Results Lead Text (Bangla)',
      type: 'text',
      rows: 2,
      group: 'stats_location',
      description: 'ফলাফল সেকশনের সাবটাইটেল (বাংলা)।',
    }),

    // --- Gallery Preview ---
    defineField({
      name: 'gallery_eyebrow_en',
      title: 'Gallery Eyebrow (English)',
      type: 'string',
      group: 'stats_location',
      description: 'ফটো গ্যালারি সেকশনের ট্যাগলাইন (ইংরেজি)। যেমন: "Moments & Memories"',
    }),
    defineField({
      name: 'gallery_eyebrow_bn',
      title: 'Gallery Eyebrow (Bangla)',
      type: 'string',
      group: 'stats_location',
      description: 'ফটো গ্যালারি সেকশনের ট্যাগলাইন (বাংলা)।',
    }),
    defineField({
      name: 'gallery_title_en',
      title: 'Gallery Section Title (English)',
      type: 'string',
      group: 'stats_location',
      description: 'ফটো গ্যালারি সেকশনের মূল শিরোনাম (ইংরেজি)।',
    }),
    defineField({
      name: 'gallery_title_bn',
      title: 'Gallery Section Title (Bangla)',
      type: 'string',
      group: 'stats_location',
      description: 'ফটো গ্যালারি সেকশনের মূল শিরোনাম (বাংলা)।',
    }),
  ],
  preview: {
    select: {
      title: 'hero_title_en',
      subtitle: 'hero_eyebrow_en',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Home Page Content',
        subtitle: subtitle || 'Homepage Sections',
      }
    },
  },
})
