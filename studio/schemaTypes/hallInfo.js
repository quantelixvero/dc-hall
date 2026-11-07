import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hallInfo',
  title: 'Hall History & Super',
  type: 'document',
  groups: [
    { name: 'hostel', title: 'Hostel & History', default: true },
    { name: 'super', title: 'Hall Super Profile & Message' },
    { name: 'helpdesk', title: 'Office & Helpdesk' },
    { name: 'success', title: 'Admission Success Stats' },
    { name: 'alumni', title: 'Notable Alumni Profiles' },
  ],
  fields: [
    // ═══════════════════════════════════════════
    // Hall Info Sections Controls
    // ═══════════════════════════════════════════
    defineField({
      name: 'sections_control',
      hidden: true,
      title: 'Hall Info Page Sections Visibility & Order',
      type: 'array',
      description: 'হল ইনফো পেজের সেকশনগুলোর ক্রম সাজান। যে সেকশনটি উপরে থাকবে ওয়েবসাইটে সেটি আগে দেখাবে।',
      of: [
        {
          type: 'object',
          name: 'sectionItem',
          title: 'Section',
          fields: [
            defineField({
              name: 'section_id',
              title: 'Section',
              type: 'string',
              description: 'যে সেকশনটি নিয়ন্ত্রণ করতে চান তা ড্রপডাউন থেকে নির্বাচন করুন।',
              options: {
                list: [
                  { title: 'History & Nearby Places', value: 'history_nearby' },
                  { title: 'Campus Photos', value: 'campus_photos' },
                  { title: 'Hall Super Profile & Message', value: 'hall_super' },
                  { title: 'Office & Helpdesk', value: 'helpdesk' },
                  { title: 'Notable Alumni Profiles', value: 'alumni' },
                  { title: 'Admission Success Chart', value: 'success_chart' },
                  { title: 'Location & Map', value: 'location_map' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'enabled',
              title: 'Show Section on Website',
              type: 'boolean',
              description: 'চালু (ON) থাকলে হল পরিচিতি পেজে এই সেকশনটি প্রদর্শিত হবে। বন্ধ করতে অফ করুন।',
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
                history_nearby: 'History & Nearby Places',
                campus_photos: 'Campus Photos',
                hall_super: 'Hall Super Profile & Message',
                helpdesk: 'Office & Helpdesk',
                alumni: 'Notable Alumni Profiles',
                success_chart: 'Admission Success Chart',
                location_map: 'Location & Map',
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
        { _key: 'sec1', section_id: 'history_nearby', enabled: true },
        { _key: 'sec2', section_id: 'campus_photos', enabled: true },
        { _key: 'sec3', section_id: 'hall_super', enabled: true },
        { _key: 'sec4', section_id: 'helpdesk', enabled: true },
        { _key: 'sec5', section_id: 'alumni', enabled: true },
        { _key: 'sec6', section_id: 'success_chart', enabled: true },
        { _key: 'sec7', section_id: 'location_map', enabled: true },
      ],
    }),

    // ═══════════════════════════════════════════
    // Hostel & History
    // ═══════════════════════════════════════════
    defineField({
      name: 'hostel_title_en',
      title: 'Hostel Title (English)',
      type: 'string',
      group: 'hostel',
      description: 'ছাত্রাবাসের প্রধান শিরোনাম (ইংরেজি)। যেমন: "International Hall, Dhaka College"',
    }),
    defineField({
      name: 'hostel_title_bn',
      title: 'Hostel Title (Bangla)',
      type: 'string',
      group: 'hostel',
      description: 'ছাত্রাবাসের প্রধান শিরোনাম (বাংলা)। যেমন: "আন্তর্জাতিক ছাত্রাবাস, ঢাকা কলেজ"',
    }),
    defineField({
      name: 'hostel_subtitle_en',
      title: 'Hostel Subtitle (English)',
      type: 'string',
      group: 'hostel',
      description: 'ছাত্রাবাসের সাবটাইটেল (ইংরেজি)।',
    }),
    defineField({
      name: 'hostel_subtitle_bn',
      title: 'Hostel Subtitle (Bangla)',
      type: 'string',
      group: 'hostel',
      description: 'ছাত্রাবাসের সাবটাইটেল (বাংলা)।',
    }),
    defineField({
      name: 'history_title_en',
      title: 'History Section Title (English)',
      type: 'string',
      group: 'hostel',
      description: 'ইতিহাস সেকশনের শিরোনাম (ইংরেজি)।',
    }),
    defineField({
      name: 'history_title_bn',
      title: 'History Section Title (Bangla)',
      type: 'string',
      group: 'hostel',
      description: 'ইতিহাস সেকশনের শিরোনাম (বাংলা)।',
    }),
    defineField({
      name: 'history_text_en',
      title: 'History Details (English)',
      type: 'text',
      rows: 4,
      group: 'hostel',
      description: 'হলের বিশদ ঐতিহাসিক পটভূমি (ইংরেজি)।',
    }),
    defineField({
      name: 'history_text_bn',
      title: 'History Details (Bangla)',
      type: 'text',
      rows: 4,
      group: 'hostel',
      description: 'হলের বিশদ ঐতিহাসিক পটভূমি (বাংলা)।',
    }),
    defineField({
      name: 'history_places',
      title: 'Nearby Historic Places',
      type: 'array',
      group: 'hostel',
      description: 'হলের আশপাশের ঐতিহাসিক ও গুরুত্বপূর্ণ স্থানের তালিকা।',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name_en', title: 'Place Name (English)', type: 'string', description: 'স্থানের নাম (ইংরেজি)' },
            { name: 'name_bn', title: 'Place Name (Bangla)', type: 'string', description: 'স্থানের নাম (বাংলা)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'hall_photo',
      title: 'Main Historic Hostel Photo',
      type: 'image',
      group: 'hostel',
      description: 'হল পরিচিতি পেজের মূল ঐতিহ্যবাহী ছবি। হটস্পট ক্রপিং সমর্থিত।',
      options: { hotspot: true },
    }),
    defineField({
      name: 'home_page_photo',
      title: 'Home Page Hall Photo (Optional)',
      type: 'image',
      group: 'hostel',
      description: 'হোম পেজের হল ইনফো সেকশনে আলাদা ছবি দেখাতে চাইলে এখানে আপলোড করুন। খালি রাখলে মূল ছবিটিই দেখাবে।',
      options: { hotspot: true },
    }),
    defineField({
      name: 'campus_photos',
      title: 'Campus Photo Gallery',
      type: 'array',
      group: 'hostel',
      description: 'একসাথে অনেক ছবি ড্র্যাগ করে আপলোড করুন। ড্র্যাগ করে ক্রম পরিবর্তন করুন। প্রতিটি ছবিতে ক্লিক করে ক্যাপশন যোগ করা যায়।',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption_en', title: 'Caption (English)', type: 'string', description: 'ছবির ক্যাপশন (ইংরেজি)' },
            { name: 'caption_bn', title: 'Caption (Bangla)', type: 'string', description: 'ছবির ক্যাপশন (বাংলা)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'location_title_en',
      title: 'Location Section Title (English)',
      type: 'string',
      group: 'hostel',
      description: 'অবস্থান সেকশনের শিরোনাম (ইংরেজি)।',
    }),
    defineField({
      name: 'location_title_bn',
      title: 'Location Section Title (Bangla)',
      type: 'string',
      group: 'hostel',
      description: 'অবস্থান সেকশনের শিরোনাম (বাংলা)।',
    }),
    defineField({
      name: 'location_text_en',
      title: 'Location Text (English)',
      type: 'text',
      rows: 2,
      group: 'hostel',
      description: 'হলের সঠিক ভৌগোলিক অবস্থান ও যাতায়াতের সংক্ষিপ্ত দিকনির্দেশনা (ইংরেজি)।',
    }),
    defineField({
      name: 'location_text_bn',
      title: 'Location Text (Bangla)',
      type: 'text',
      rows: 2,
      group: 'hostel',
      description: 'হলের সঠিক ভৌগোলিক অবস্থান ও যাতায়াতের সংক্ষিপ্ত দিকনির্দেশনা (বাংলা)।',
    }),
    defineField({
      name: 'map_url',
      title: 'Google Map Embed URL',
      type: 'url',
      group: 'hostel',
      description: 'গুগল ম্যাপসের আইফ্রেম বা এমবেড লিংক এখানে দিন।',
    }),

    // ═══════════════════════════════════════════
    // Hall Super
    // ═══════════════════════════════════════════
    defineField({
      name: 'hall_super_eyebrow_en',
      title: 'Hall Super Eyebrow (English)',
      type: 'string',
      group: 'super',
      description: 'হল সুপারের নামের উপরের ছোট ট্যাগলাইন (ইংরেজি)। যেমন: "Message from Provost"',
    }),
    defineField({
      name: 'hall_super_eyebrow_bn',
      title: 'Hall Super Eyebrow (Bangla)',
      type: 'string',
      group: 'super',
      description: 'হল সুপারের নামের উপরের ছোট ট্যাগলাইন (বাংলা)। যেমন: "প্রভোস্টের বাণী"',
    }),
    defineField({
      name: 'hall_super_name_en',
      title: 'Hall Super Name (English)',
      type: 'string',
      group: 'super',
      description: 'হল সুপারের পূর্ণ নাম (ইংরেজি)।',
    }),
    defineField({
      name: 'hall_super_name_bn',
      title: 'Hall Super Name (Bangla)',
      type: 'string',
      group: 'super',
      description: 'হল সুপারের পূর্ণ নাম (বাংলা)।',
    }),
    defineField({
      name: 'hall_super_designation_en',
      title: 'Designation (English)',
      type: 'string',
      group: 'super',
      placeholder: 'Provost · International Hall, Dhaka College',
      description: 'হল সুপারের পদবী ও বিভাগ (ইংরেজি)।',
    }),
    defineField({
      name: 'hall_super_designation_bn',
      title: 'Designation (Bangla)',
      type: 'string',
      group: 'super',
      placeholder: 'প্রভোস্ট · আন্তর্জাতিক ছাত্রাবাস, ঢাকা কলেজ',
      description: 'হল সুপারের পদবী ও বিভাগ (বাংলা)।',
    }),
    defineField({
      name: 'hall_super_photo',
      title: 'Hall Super Official Portrait',
      type: 'image',
      group: 'super',
      description: 'হল সুপারের অফিশিয়াল পোর্ট্রেট ছবি।',
    }),
    defineField({
      name: 'hall_super_bio_en',
      title: 'Hall Super Message / Bio (English)',
      type: 'text',
      rows: 5,
      group: 'super',
      description: 'শিক্ষার্থীদের উদ্দেশ্যে হল সুপারের বাণী বা বার্তা (ইংরেজি)।',
    }),
    defineField({
      name: 'hall_super_bio_bn',
      title: 'Hall Super Message / Bio (Bangla)',
      type: 'text',
      rows: 5,
      group: 'super',
      description: 'শিক্ষার্থীদের উদ্দেশ্যে হল সুপারের বাণী বা বার্তা (বাংলা)।',
    }),
    defineField({
      name: 'hall_super_phone',
      title: 'Hall Super Phone Number',
      type: 'string',
      group: 'super',
      placeholder: '+8801711000000',
      description: 'হল সুপারের অফিশিয়াল টেলিফোন বা মোবাইল নম্বর।',
    }),
    defineField({
      name: 'hall_super_whatsapp',
      title: 'Hall Super WhatsApp Link / Number',
      type: 'string',
      group: 'super',
      placeholder: 'https://wa.me/8801711000000 or +8801711000000',
      description: 'হল সুপারের হোয়াটসঅ্যাপ নম্বর বা সরাসরি চ্যাট লিংক।',
    }),
    defineField({
      name: 'hall_super_facebook',
      title: 'Hall Super Facebook Profile Link',
      type: 'url',
      group: 'super',
      placeholder: 'https://www.facebook.com/...',
      description: 'হল সুপারের অফিশিয়াল ফেসবুক প্রোফাইল লিংক।',
    }),
    defineField({
      name: 'hall_super_email',
      title: 'Hall Super Email Address',
      type: 'string',
      group: 'super',
      placeholder: 'hallsuper@dhakacollege.edu.bd',
      description: 'হল সুপারের প্রাতিষ্ঠানিক ইমেইল ঠিকানা।',
    }),
    defineField({
      name: 'hall_super_info_boxes',
      title: 'Key Information Highlights',
      type: 'array',
      group: 'super',
      description: 'হল সুপারের বার্তার সাথে প্রদর্শিত ছোট তথ্য বক্সসমূহ।',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title_en', title: 'Box Title (English)', type: 'string', description: 'শিরোনাম (ইংরেজি)' },
            { name: 'title_bn', title: 'Box Title (Bangla)', type: 'string', description: 'শিরোনাম (বাংলা)' },
            { name: 'text_en', title: 'Box Text (English)', type: 'text', rows: 2, description: 'বক্তব্য (ইংরেজি)' },
            { name: 'text_bn', title: 'Box Text (Bangla)', type: 'text', rows: 2, description: 'বক্তব্য (বাংলা)' },
          ],
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // Office & Helpdesk
    // ═══════════════════════════════════════════
    defineField({
      name: 'office_room',
      title: 'Office Location / Room',
      type: 'string',
      group: 'helpdesk',
      placeholder: 'Provost Office, Ground Floor, International Hall, Dhaka College',
      description: 'হল অফিসের সঠিক রুম নম্বর ও ফ্লোর অবস্থান।',
    }),
    defineField({
      name: 'visiting_hours',
      title: 'Visiting / Consultation Hours',
      type: 'string',
      group: 'helpdesk',
      placeholder: 'Saturday – Thursday: 5:00 PM – 8:00 PM',
      description: 'শিক্ষার্থী ও অভিভাবকদের সাক্ষাতের সময়সূচি।',
    }),
    defineField({
      name: 'emergency_contact_text',
      title: 'Emergency Contact Information',
      type: 'text',
      rows: 2,
      group: 'helpdesk',
      placeholder: 'For urgent residential matters or medical emergencies, contact hall office or duty student council.',
      description: 'জরুরি আবাসিক বা স্বাস্থ্য সংক্রান্ত প্রয়োজনে যোগাযোগের জরুরি নির্দেশনা।',
    }),

    // ═══════════════════════════════════════════
    // Admission Success
    // ═══════════════════════════════════════════
    defineField({
      name: 'success_title_en',
      title: 'Success Section Title (English)',
      type: 'string',
      group: 'success',
      description: 'ভর্তি সাফল্য সেকশনের শিরোনাম (ইংরেজি)।',
    }),
    defineField({
      name: 'success_title_bn',
      title: 'Success Section Title (Bangla)',
      type: 'string',
      group: 'success',
      description: 'ভর্তি সাফল্য সেকশনের শিরোনাম (বাংলা)।',
    }),
    defineField({
      name: 'success_text_en',
      title: 'Success Subtitle / Lead (English)',
      type: 'text',
      rows: 2,
      group: 'success',
      description: 'ভর্তি সাফল্যের ভূমিকা বিবরণ (ইংরেজি)।',
    }),
    defineField({
      name: 'success_text_bn',
      title: 'Success Subtitle / Lead (Bangla)',
      type: 'text',
      rows: 2,
      group: 'success',
      description: 'ভর্তি সাফল্যের ভূমিকা বিবরণ (বাংলা)।',
    }),
    defineField({
      name: 'success_chart',
      title: 'Admission Stats Bars',
      type: 'array',
      group: 'success',
      description: 'ভর্তি পরীক্ষার ফলাফল পরিসংখ্যান বার।',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', title: 'Academic Year', type: 'string', placeholder: 'e.g. 2026', description: 'শিক্ষাবর্ষ (যেমন: 2026)' },
            { name: 'width', title: 'Bar Progress Percentage (10-100)', type: 'number', description: 'গ্রাফ বারের শতাংশ মান (১০ থেকে ১০০)' },
            { name: 'text_en', title: 'Details Text (English)', type: 'string', description: 'ফলাফলের বিবরণ (ইংরেজি)' },
            { name: 'text_bn', title: 'Details Text (Bangla)', type: 'string', description: 'ফলাফলের বিবরণ (বাংলা)' },
          ],
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // Alumni Profiles
    // ═══════════════════════════════════════════
    defineField({
      name: 'alumni_profiles',
      title: 'Notable Alumni Profiles',
      type: 'array',
      group: 'alumni',
      description: 'প্রাক্তন কৃতি শিক্ষার্থীদের নাম, বায়ো, বিবরণ ও ছবি যোগ করুন।',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name_en', title: 'Name (English)', type: 'string', description: 'প্রাক্তনী শিক্ষার্থীর নাম (ইংরেজি)' },
            { name: 'name_bn', title: 'Name (Bangla)', type: 'string', description: 'প্রাক্তনী শিক্ষার্থীর নাম (বাংলা)' },
            { name: 'short_bio_en', title: 'Short Bio / Current Designation (English)', type: 'string', description: 'সংক্ষিপ্ত পদবি বা পরিচিতি (ইংরেজি)। যেমন: BUET CSE 2023 / Software Engineer' },
            { name: 'short_bio_bn', title: 'Short Bio / Current Designation (Bangla)', type: 'string', description: 'সংক্ষিপ্ত পদবি বা পরিচিতি (বাংলা)। যেমন: বুয়েট সিএসই ২০২৩ / সফটওয়্যার প্রকৌশলী' },
            { name: 'details_en', title: 'Details / Achievements (English)', type: 'text', rows: 3, description: 'অর্জন ও হলের অবদান (ইংরেজি)' },
            { name: 'details_bn', title: 'Details / Achievements (Bangla)', type: 'text', rows: 3, description: 'অর্জন ও হলের অবদান (বাংলা)' },
            { name: 'photo', title: 'Photo', type: 'image', description: 'প্রাক্তনী শিক্ষার্থীর পরিষ্কার ছবি' },
            // Fallback backward-compatible fields:
            { name: 'department_en', title: 'Department (Optional)', type: 'string', hidden: true },
            { name: 'pass_year', title: 'Passing Year (Optional)', type: 'string', hidden: true },
            { name: 'achievement_en', title: 'Achievement EN (Optional)', type: 'string', hidden: true },
            { name: 'biography_en', title: 'Biography EN (Optional)', type: 'text', hidden: true },
            { name: 'biography_bn', title: 'Biography BN (Optional)', type: 'text', hidden: true },
          ],
          preview: {
            select: {
              title: 'name_en',
              subtitle: 'short_bio_en',
              media: 'photo',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Alumni Member',
                subtitle: subtitle || '',
                media: (media && typeof media === 'object' && media.asset) ? media : undefined,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hostel_title_en',
      subtitle: 'hall_super_name_en',
      media: 'hall_super_photo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Hall History & Super',
        subtitle: subtitle ? `Super: ${subtitle}` : '',
        media: (media && typeof media === 'object' && media.asset) ? media : undefined,
      }
    },
  },
})
