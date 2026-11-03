import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'notice',
  title: 'Notices & Announcements (নোটিশ ও ঘোষণা)',
  type: 'document',
  groups: [
    { name: 'content', title: '📝 নোটিশ বিষয়বস্তু (Content)', default: true },
    { name: 'popup', title: '🚨 পপআপ ও সময়সীমা (Popup & Duration)' },
    { name: 'attachments', title: '📎 ছবি, পিডিএফ ও লিংক (Attachments)' },
  ],
  fields: [
    // ═════════════════════════════════════════════════════════════════
    // Group 1: Content
    // ═════════════════════════════════════════════════════════════════
    defineField({
      name: 'title_bn',
      title: 'Notice Title / নোটিশের শিরোনাম (বাংলা)',
      type: 'string',
      group: 'content',
      description: 'জরুরি নোটিশের মূল শিরোনাম বাংলায় লিখুন।',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_en',
      title: 'Notice Title (English)',
      type: 'string',
      group: 'content',
      description: 'Notice title in English.',
    }),
    defineField({
      name: 'notice_text_bn',
      title: 'Notice Description / নোটিশের বিবরণ (বাংলা)',
      type: 'text',
      rows: 5,
      group: 'content',
      description: 'নোটিশের পূর্ণাঙ্গ বিবরণ বাংলায় লিখুন।',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notice_text_en',
      title: 'Notice Description (English)',
      type: 'text',
      rows: 5,
      group: 'content',
      description: 'Full notice announcement in English.',
    }),
    defineField({
      name: 'date',
      title: 'Notice Date / নোটিশের তারিখ',
      type: 'date',
      group: 'content',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category / ক্যাটাগরি',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: '🚨 Urgent Notice / জরুরি নোটিশ', value: 'urgent' },
          { title: '🏛️ Hostel Notice / ছাত্রাবাস ও সিট বরাদ্দ', value: 'hostel' },
          { title: '📢 General Announcement / সাধারণ ঘোষণা', value: 'general' },
          { title: '🎪 Event & Cultural / অনুষ্ঠান ও কালচারাল', value: 'event' },
          { title: '🎓 Academic & Admission / ভর্তি ও একাডেমিক', value: 'academic' },
        ],
        layout: 'radio',
      },
      initialValue: 'urgent',
    }),
    defineField({
      name: 'priority',
      title: 'Priority Level / গুরুত্বের স্তর',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: '🔴 High / জরুরি (Red Badge)', value: 'high' },
          { title: '🟡 Medium / গুরুত্বপূর্ণ (Amber Badge)', value: 'medium' },
          { title: '🟢 Normal / সাধারণ (Green Badge)', value: 'normal' },
        ],
        layout: 'radio',
      },
      initialValue: 'high',
    }),
    defineField({
      name: 'is_pinned',
      title: 'Pin Notice / নোটিশটি শীর্ষে পিন করুন',
      type: 'boolean',
      group: 'content',
      initialValue: false,
      description: 'চালু থাকলে নোটিশটি তালিকার সর্বপ্রথমে দেখাবে।',
    }),

    // ═════════════════════════════════════════════════════════════════
    // Group 2: Popup & Duration Controls
    // ═════════════════════════════════════════════════════════════════
    defineField({
      name: 'is_popup_active',
      title: 'Show as Website Popup / ওয়েবসাইটে পপআপ হিসেবে দেখান',
      type: 'boolean',
      group: 'popup',
      initialValue: true,
      description: 'চালু থাকলে ব্যবহারকারী ওয়েবসাইটে প্রবেশ করামাত্র এই নোটিশটির একটি সুন্দর পপআপ স্ক্রিনে ভেসে উঠবে।',
    }),
    defineField({
      name: 'popup_duration_type',
      title: 'Popup Duration / পপআপ প্রদর্শনের সময়কাল',
      type: 'string',
      group: 'popup',
      options: {
        list: [
          { title: '1 Day / শুধুমাত্র ১ দিন (আজকের দিন)', value: '1_day' },
          { title: 'Date Range / নির্দিষ্ট তারিখ থেকে তারিখ পর্যন্ত', value: 'date_range' },
          { title: 'Always Active / সবসময় চালু (ম্যানুয়ালি বন্ধ না করা পর্যন্ত)', value: 'always' },
        ],
        layout: 'radio',
      },
      initialValue: '1_day',
    }),
    defineField({
      name: 'start_date',
      title: 'Start Date & Time / প্রদর্শন শুরুর সময়',
      type: 'datetime',
      group: 'popup',
      description: 'যে সময় থেকে পপআপ দেখানো শুরু হবে (Date Range মোডের জন্য প্রযোজ্য)।',
      hidden: ({ parent }) => parent?.popup_duration_type !== 'date_range',
    }),
    defineField({
      name: 'end_date',
      title: 'End Date & Time / প্রদর্শন সমাপ্তির সময়',
      type: 'datetime',
      group: 'popup',
      description: 'যে সময়ে পপআপ স্বয়ংক্রিয়ভাবে বন্ধ হয়ে যাবে (Date Range মোডের জন্য প্রযোজ্য)।',
      hidden: ({ parent }) => parent?.popup_duration_type !== 'date_range',
    }),

    // ═════════════════════════════════════════════════════════════════
    // Group 3: Attachments (Photo, PDF, Link)
    // ═════════════════════════════════════════════════════════════════
    defineField({
      name: 'photo',
      title: 'Notice Banner / নোটিশের ছবি বা ব্যানার',
      type: 'image',
      group: 'attachments',
      options: { hotspot: true },
      description: 'কোনো অফিসিয়াল নোটিশের ছবি বা ব্যানার থাকলে আপলোড করুন। এটি পপআপ ও নোটিশ বোর্ডে সুন্দরভাবে দেখাবে।',
    }),
    defineField({
      name: 'file',
      title: 'PDF / File Attachment (পিডিএফ সার্কুলার ফাইল)',
      type: 'file',
      group: 'attachments',
      description: 'অফিসিয়াল নোটিশ বা সার্কুলারের পিডিএফ ফাইল আপলোড করুন। ব্যবহারকারীরা সরাসরি ডাউনলোড করতে পারবে।',
    }),
    defineField({
      name: 'link_url',
      title: 'Action Link URL / সংশ্লিষ্ট ওয়েব লিংক',
      type: 'url',
      group: 'attachments',
      placeholder: 'https://...',
      description: 'যেমন: গুগল ফর্ম, রেজিস্ট্রেশন পেজ বা বিস্তারিত নিউজের লিংক।',
    }),
    defineField({
      name: 'link_text',
      title: 'Button Label / অ্যাকশন বাটন টেক্সট',
      type: 'string',
      group: 'attachments',
      placeholder: 'যেমন: ফর্ম পূরণ করুন / বিস্তারিত দেখুন',
      initialValue: 'বিস্তারিত দেখুন',
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
      title: 'title_bn',
      title_en: 'title_en',
      date: 'date',
      category: 'category',
      isPopup: 'is_popup_active',
      media: 'photo',
    },
    prepare({ title, title_en, date, category, isPopup, media }) {
      const catLabel = category === 'urgent' ? '🚨 Urgent' : category === 'hostel' ? '🏛️ Hostel' : '📢 General'
      const popupBadge = isPopup ? ' • 🚨 Active Popup' : ''
      return {
        title: title || title_en || 'Notice',
        subtitle: `${catLabel} • ${date || 'No Date'}${popupBadge}`,
        media,
      }
    },
  },
})
