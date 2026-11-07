import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'notice',
  title: 'Notices & Announcements',
  type: 'document',
  groups: [
    { name: 'content', title: 'Notice Content', default: true },
    { name: 'popup', title: 'Popup & Timing Controls' },
    { name: 'attachments', title: 'Attachments & Action Links' },
  ],
  fields: [
    // ═════════════════════════════════════════════════════════════════
    // Group 1: Notice Content
    // ═════════════════════════════════════════════════════════════════
    defineField({
      name: 'title_en',
      title: 'Notice Title (English)',
      type: 'string',
      group: 'content',
      description: 'নোটিশের মূল শিরোনাম ইংরেজিতে লিখুন।',
    }),
    defineField({
      name: 'title_bn',
      title: 'Notice Title (Bangla)',
      type: 'string',
      group: 'content',
      description: 'নোটিশের মূল শিরোনাম বাংলায় লিখুন।',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notice_text_en',
      title: 'Notice Description (English)',
      type: 'text',
      rows: 5,
      group: 'content',
      description: 'নোটিশের পূর্ণাঙ্গ বিবরণ ইংরেজিতে লিখুন।',
    }),
    defineField({
      name: 'notice_text_bn',
      title: 'Notice Description (Bangla)',
      type: 'text',
      rows: 5,
      group: 'content',
      description: 'নোটিশের পূর্ণাঙ্গ বিবরণ বাংলায় লিখুন।',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Notice Date',
      type: 'date',
      group: 'content',
      description: 'যে তারিখে নোটিশটি প্রকাশ করা হচ্ছে।',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      description: 'নোটিশের বিষয়শ্রেণী নির্ধারণ করুন।',
      options: {
        list: [
          { title: 'Urgent Notice', value: 'urgent' },
          { title: 'Hostel Notice & Seat Allocation', value: 'hostel' },
          { title: 'General Announcement', value: 'general' },
          { title: 'Event & Cultural', value: 'event' },
          { title: 'Academic & Admission', value: 'academic' },
        ],
        layout: 'radio',
      },
      initialValue: 'urgent',
    }),
    defineField({
      name: 'priority',
      title: 'Priority Level',
      type: 'string',
      group: 'content',
      description: 'নোটিশের গুরুত্ব নির্ধারণ করুন (লাল, হলুদ বা সবুজ ব্যাজ দেখাবে)।',
      options: {
        list: [
          { title: 'High Priority (Urgent / Red Badge)', value: 'high' },
          { title: 'Medium Priority (Important / Amber Badge)', value: 'medium' },
          { title: 'Normal Priority (Routine / Green Badge)', value: 'normal' },
        ],
        layout: 'radio',
      },
      initialValue: 'high',
    }),
    defineField({
      name: 'is_pinned',
      title: 'Pin Notice to Top',
      type: 'boolean',
      group: 'content',
      initialValue: false,
      description: 'চালু (ON) থাকলে এই নোটিশটি তালিকার সর্বপ্রথমে পিন হয়ে থাকবে।',
    }),

    // ═════════════════════════════════════════════════════════════════
    // Group 2: Popup & Duration Controls
    // ═════════════════════════════════════════════════════════════════
    defineField({
      name: 'is_popup_active',
      title: 'Show as Website Popup',
      type: 'boolean',
      group: 'popup',
      initialValue: true,
      description: 'চালু (ON) থাকলে শিক্ষার্থীরা ওয়েবসাইটে ঢোকামাত্র এই নোটিশটির একটি সুন্দর পপআপ স্ক্রিনে দেখতে পাবে।',
    }),
    defineField({
      name: 'popup_duration_type',
      title: 'Popup Duration Mode',
      type: 'string',
      group: 'popup',
      description: 'পপআপটি কতদিন বা কোন সময় পর্যন্ত ওয়েবসাইটে সচল থাকবে তা নির্ধারণ করুন।',
      options: {
        list: [
          { title: '1 Day Only (Shows today only)', value: '1_day' },
          { title: 'Date Range (Scheduled start & end date)', value: 'date_range' },
          { title: 'Always Active (Stays until manually closed)', value: 'always' },
        ],
        layout: 'radio',
      },
      initialValue: '1_day',
    }),
    defineField({
      name: 'start_date',
      title: 'Popup Start Date & Time',
      type: 'datetime',
      group: 'popup',
      description: 'পপআপ দেখানো শুরুর তারিখ ও সময় (Date Range মোডের জন্য)।',
      hidden: ({ parent }) => parent?.popup_duration_type !== 'date_range',
    }),
    defineField({
      name: 'end_date',
      title: 'Popup End Date & Time',
      type: 'datetime',
      group: 'popup',
      description: 'পপআপ স্বয়ংক্রিয়ভাবে বন্ধ হওয়ার তারিখ ও সময় (Date Range মোডের জন্য)।',
      hidden: ({ parent }) => parent?.popup_duration_type !== 'date_range',
    }),

    // ═════════════════════════════════════════════════════════════════
    // Group 3: Attachments (Photo, PDF, Link)
    // ═════════════════════════════════════════════════════════════════
    defineField({
      name: 'photo',
      title: 'Notice Banner Image',
      type: 'image',
      group: 'attachments',
      options: { hotspot: true },
      description: 'নোটিশের ছবি বা ব্যানার থাকলে আপলোড করুন। এটি পপআপ ও নোটিশ বোর্ডে সুন্দরভাবে প্রদর্শিত হবে।',
    }),
    defineField({
      name: 'file',
      title: 'PDF File Attachment',
      type: 'file',
      group: 'attachments',
      description: 'অফিসিয়াল নোটিশের সার্কুলার পিডিএফ ফাইল আপলোড করুন। শিক্ষার্থীরা এটি সরাসরি ডাউনলোড করতে পারবে।',
    }),
    defineField({
      name: 'link_url',
      title: 'Action Link URL',
      type: 'url',
      group: 'attachments',
      placeholder: 'https://...',
      description: 'গুগল ফর্ম, রেজিস্ট্রেশন পেজ বা প্রাসঙ্গিক বাইরের কোনো ওয়েবসাইটের লিংক।',
    }),
    defineField({
      name: 'link_text',
      title: 'Button Label',
      type: 'string',
      group: 'attachments',
      placeholder: 'e.g. View Notice / Apply Now',
      initialValue: 'বিস্তারিত দেখুন',
      description: 'লিংকের বাটনে যে লেখাটি দেখাবে (যেমন: বিস্তারিত দেখুন, ফর্ম পূরণ করুন)।',
    }),
  ],
  orderings: [
    {
      title: 'Notice Date (Newest first)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      titleBn: 'title_bn',
      titleEn: 'title_en',
      date: 'date',
      category: 'category',
      isPopup: 'is_popup_active',
      media: 'photo',
    },
    prepare({ titleBn, titleEn, date, category, isPopup, media }) {
      const catMap = {
        urgent: 'Urgent',
        hostel: 'Hostel',
        general: 'General',
        event: 'Event',
        academic: 'Academic',
      }
      const catLabel = catMap[category] || category || 'Notice'
      const popupBadge = isPopup ? ' • Active Popup' : ''
      return {
        title: titleEn || titleBn || 'Notice',
        subtitle: `${catLabel} • ${date || 'No Date'}${popupBadge}`,
        media,
      }
    },
  },
})
