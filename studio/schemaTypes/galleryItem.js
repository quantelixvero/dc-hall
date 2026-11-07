import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Items',
  type: 'document',
  description: 'হলের ফটো কালেকশন — ছবি আপলোড, শিরোনাম এবং ডিফল্ট ক্যাপশন পরিচালনা করুন।',
  groups: [
    { name: 'photos', title: 'Photos', default: true },
    { name: 'info', title: 'Heading & Details' },
    { name: 'settings', title: 'Display Settings' },
  ],
  fields: [
    // ═════════════════════════════════════════════════════════════════
    // Group 1: Photos
    // ═════════════════════════════════════════════════════════════════
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      group: 'photos',
      description: 'একসাথে যত ইচ্ছা ছবি এখানে ড্র্যাগ ও ড্রপ করে আপলোড করুন। প্রথম ছবিটি স্বয়ংক্রিয়ভাবে কভার হিসেবে প্রদর্শিত হবে। প্রতিটি ছবির উপর ক্লিক করে নির্দিষ্ট ক্যাপশন দেওয়া যায়।',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'ছবির নির্দিষ্ট ক্যাপশন (ঐচ্ছিক — খালি রাখলে ডিফল্ট ক্যাপশন দেখাবে)।',
            },
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'asset',
            },
            prepare({ title, media }) {
              return {
                title: title || 'Photo',
                media,
              }
            },
          },
        },
      ],
    }),

    // ═════════════════════════════════════════════════════════════════
    // Group 2: Info & Details
    // ═════════════════════════════════════════════════════════════════
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'info',
      description: 'গ্যালারির মূল শিরোনাম (যেমন: "Daily Hostel Life", "Sports & Tournaments", "Campus Adda")।',
      validation: (Rule) => Rule.required(),
      initialValue: 'Hostel Photo Collection',
    }),
    defineField({
      name: 'default_caption',
      title: 'Default Photo Caption',
      type: 'string',
      group: 'info',
      description: 'এই কালেকশনের সকল ছবির সাধারণ ক্যাপশন। কোনো ছবির নির্দিষ্ট ক্যাপশন না থাকলে এটি প্রদর্শিত হবে।',
      placeholder: 'e.g. Daily Hall Life, Campus Adda, Hostel Moments...',
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'string',
      group: 'info',
      description: 'কোন ব্যাচের জন্য এই ফটো কালেকশন তা নির্বাচন করুন।',
      options: {
        list: [
          { title: 'HSC-27 (Founder Batch)', value: 'HSC-27' },
          { title: 'HSC-28', value: 'HSC-28' },
          { title: 'HSC-29', value: 'HSC-29' },
          { title: 'HSC-30', value: 'HSC-30' },
          { title: 'HSC-31', value: 'HSC-31' },
          { title: 'HSC-32', value: 'HSC-32' },
          { title: 'HSC-33', value: 'HSC-33' },
          { title: 'HSC-34', value: 'HSC-34' },
          { title: 'HSC-35', value: 'HSC-35' },
          { title: 'HSC-26 (Alumni)', value: 'HSC-26' },
          { title: 'HSC-25 (Alumni)', value: 'HSC-25' },
          { title: 'HSC-24 (Alumni)', value: 'HSC-24' },
          { title: 'General / All Batches', value: 'all' },
        ],
      },
    }),

    // ═════════════════════════════════════════════════════════════════
    // Group 3: Display Settings
    // ═════════════════════════════════════════════════════════════════
    defineField({
      name: 'preview_limit',
      title: 'Main Page Display Count',
      type: 'number',
      group: 'settings',
      description: 'গ্যালারি পেজে শুরুতে সর্বোচ্চ কয়টি ছবি দেখাবে (যেমন: ৬ বা ৮)। অতিরিক্ত ছবি থাকলে "View All" বাটনে দেখা যাবে। খালি রাখলে সব ছবি সরাসরি দেখাবে।',
      placeholder: 'e.g. 6 or 8',
    }),
    defineField({
      name: 'position',
      title: 'Display Order',
      type: 'number',
      group: 'settings',
      description: 'প্রদর্শন ক্রম (ছোট নম্বর আগে প্রদর্শিত হবে)।',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'settings',
      description: 'ওয়েবসাইটে নির্দিষ্ট গ্যালারি সেকশন লিংক করার কোড নাম। Generate বাটনে ক্লিক করে স্বয়ংক্রিয়ভাবে তৈরি করুন।',
      options: {
        source: 'heading',
        maxLength: 60,
      },
    }),
    defineField({
      name: 'gallery_title',
      title: 'Legacy Title (hidden)',
      type: 'string',
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'positionAsc',
      by: [{ field: 'position', direction: 'asc' }],
    },
    {
      title: 'Heading A-Z',
      name: 'headingAsc',
      by: [{ field: 'heading', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'heading',
      caption: 'default_caption',
      photos: 'photos',
      media: 'photos.0',
    },
    prepare({ title, caption, photos, media }) {
      const count = Array.isArray(photos) ? photos.length : 0
      const sub = caption ? `${count} photos • Default: "${caption}"` : `${count} photos`
      return {
        title: title || 'Gallery',
        subtitle: sub,
        media: media,
      }
    },
  },
})
