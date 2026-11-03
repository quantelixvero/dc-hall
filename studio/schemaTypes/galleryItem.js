import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Items (ফটো গ্যালারি)',
  type: 'document',
  description: '📸 হলের ফটো গ্যালারি — ছবি ড্র্যাগ ও ড্রপ করুন, শিরোনাম ও ডিফল্ট ক্যাপশন দিন।',
  groups: [
    { name: 'photos', title: '📸 ফটোসমূহ (Photos)', default: true },
    { name: 'info', title: 'ℹ️ শিরোনাম ও বিবরণ (Info)' },
    { name: 'settings', title: '⚙️ প্রদর্শন সেটিংস (Settings)' },
  ],
  fields: [
    // ═════════════════════════════════════════════════════════════════
    // Group 1: Photos (DEFAULT ACTIVE GROUP — FRONT & CENTER)
    // ═════════════════════════════════════════════════════════════════
    defineField({
      name: 'photos',
      title: 'Photos / ফটোসমূহ (একসাথে ড্র্যাগ ও ড্রপ করুন)',
      type: 'array',
      group: 'photos',
      description: '📸 একসাথে যত ইচ্ছা ছবি এখানে ড্র্যাগ ও ড্রপ করুন। প্রথম ছবিটি স্বয়ংক্রিয়ভাবে কভার হিসেবে দেখাবে। প্রতিটি ছবির উপর ক্লিক করে নির্দিষ্ট ক্যাপশন দিতে পারেন।',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption / ক্যাপশন (ঐচ্ছিক — খালি রাখলে শিরোনাম বা ডিফল্ট ক্যাপশন দেখাবে)',
              type: 'string',
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
      title: 'Heading / শিরোনাম',
      type: 'string',
      group: 'info',
      description: 'গ্যালারির শিরোনাম — যেমন: "HSC-27", "Daily Hostel Life", "Sports & Tournaments", "Campus Adda" ইত্যাদি। এটি ওয়েবসাইটের গ্যালারি সেকশনে দেখাবে।',
      validation: (Rule) => Rule.required(),
      initialValue: 'Hostel Photo Collection',
    }),
    defineField({
      name: 'default_caption',
      title: 'Default Photo Caption / ডিফল্ট ফটো ক্যাপশন (ঐচ্ছিক)',
      type: 'string',
      group: 'info',
      description: '📸 এই গ্যালারির সকল ছবির জন্য সাধারণ ক্যাপশন। কোনো ছবির নির্দিষ্ট ক্যাপশন না থাকলে এই ক্যাপশনটি স্বয়ংক্রিয়ভাবে ওয়েবসাইটে ও মডালে দেখাবে। খালি রাখলে শিরোনাম (Heading) ক্যাপশন হিসেবে কাজ করবে।',
      placeholder: 'যেমন: Daily Hall Life, Campus Adda, Hostel Moments...',
    }),
    defineField({
      name: 'batch',
      title: 'Batch / ব্যাচ (ঐচ্ছিক)',
      type: 'string',
      group: 'info',
      description: 'কোন ব্যাচের জন্য এই ফটো কালেকশন সেটি সিলেক্ট করুন। খালি রাখলে শিরোনাম অনুযায়ী ব্যাচ নির্ধারিত হবে।',
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
          { title: 'General / All Batches (সাধারণ গ্যালারি)', value: 'all' },
        ],
      },
    }),

    // ═════════════════════════════════════════════════════════════════
    // Group 3: Display Settings
    // ═════════════════════════════════════════════════════════════════
    defineField({
      name: 'preview_limit',
      title: 'Main Page Display Count / মূল পেজে ছবির সংখ্যা (ঐচ্ছিক)',
      type: 'number',
      group: 'settings',
      description: 'গ্যালারি পেজে শুরুতে সর্বোচ্চ কয়টি ছবি দেখাবে (যেমন: ৬ বা ৮)। অতিরিক্ত ছবি থাকলে "View All" বাটনে ক্লিক করে সব দেখা যাবে। খালি রাখলে সবগুলো ছবি সরাসরি দেখাবে।',
      placeholder: 'যেমন: 6 বা 8 (খালি রাখলে সব ছবি দেখাবে)',
    }),
    defineField({
      name: 'position',
      title: 'Display Order / প্রদর্শন ক্রম',
      type: 'number',
      group: 'settings',
      description: 'কম নম্বর আগে দেখাবে। খালি রাখলে শিরোনাম অনুযায়ী সাজাবে।',
    }),
    defineField({
      name: 'slug',
      title: 'Slug / URL আইডেন্টিফায়ার (যেমন: hsc-27)',
      type: 'slug',
      group: 'settings',
      description: 'ওয়েবসাইটে নির্দিষ্ট গ্যালারি সেকশন লিংক করার জন্য। শিরোনাম থেকে তৈরি করতে Generate-এ ক্লিক করুন।',
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
