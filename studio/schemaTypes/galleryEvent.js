import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryEvent',
  title: 'Gallery Events',
  type: 'document',
  groups: [
    { name: 'media', title: 'Photos & Videos', default: true },
    { name: 'info', title: 'Event Details' },
  ],
  fields: [
    // ═══════════════════════════════════════════
    // Event Info
    // ═══════════════════════════════════════════
    defineField({
      name: 'event_id',
      title: 'Event Slug / ID',
      type: 'slug',
      group: 'info',
      description: 'ইউনিক আইডি বা ইউআরএল শনাক্তকারী (যেমন: "iftar-reunion-2026")। Generate বাটনে ক্লিক করে স্বয়ংক্রিয়ভাবে তৈরি করুন।',
      options: {
        source: 'title_en',
        maxLength: 80,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Display Order',
      type: 'number',
      group: 'info',
      description: 'প্রদর্শন ক্রম (ছোট নম্বর আগে দেখাবে)। তারিখ অনুযায়ী স্বয়ংক্রিয় ক্রম রাখতে খালি রাখুন।',
    }),
    defineField({
      name: 'title_en',
      title: 'Event Title (English)',
      type: 'string',
      group: 'info',
      description: 'ইভেন্টের শিরোনাম ইংরেজিতে লিখুন।',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_bn',
      title: 'Event Title (Bangla)',
      type: 'string',
      group: 'info',
      description: 'ইভেন্টের শিরোনাম বাংলায় লিখুন।',
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
      group: 'info',
      description: 'ইভেন্টটির অনুষ্ঠিত হওয়ার তারিখ নির্বাচন করুন।',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'batches',
      title: 'Associated Batches',
      type: 'array',
      group: 'info',
      description: 'কোন ব্যাচের জন্য এই ইভেন্ট তা নির্বাচন করুন (একাধিক ব্যাচ নির্বাচন করা যায়)।',
      of: [{ type: 'string' }],
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
          { title: 'All Batches', value: 'all' },
        ],
      },
    }),
    defineField({
      name: 'description_en',
      title: 'Event Description (English)',
      type: 'text',
      rows: 3,
      group: 'info',
      description: 'ইভেন্টের বিস্তারিত বর্ণনা ইংরেজিতে লিখুন।',
    }),
    defineField({
      name: 'description_bn',
      title: 'Event Description (Bangla)',
      type: 'text',
      rows: 3,
      group: 'info',
      description: 'ইভেন্টের বিস্তারিত বর্ণনা বাংলায় লিখুন।',
    }),
    defineField({
      name: 'locations',
      title: 'Event Locations List',
      type: 'array',
      group: 'info',
      description: 'ইভেন্টের স্থানসমূহ এক এক করে যোগ করুন (যেমন: "Rajshahi College", "Padma Garden")। সাইটে প্রতিটি স্থানে ক্লিক করলে গুগল ম্যাপে সরাসরি দেখাবে।',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'location_name',
      title: 'Single Location Name',
      type: 'string',
      group: 'info',
      description: 'একটি মাত্র সাধারণ স্থান হলে এখানে লিখুন।',
      placeholder: 'e.g. Rajshahi',
    }),
    defineField({
      name: 'location_map_url',
      title: 'Google Maps URL (hidden)',
      type: 'url',
      group: 'info',
      hidden: true,
    }),

    // ═══════════════════════════════════════════
    // Photos & Videos
    // ═══════════════════════════════════════════
    defineField({
      name: 'media_order',
      title: 'Media Display Order',
      type: 'string',
      group: 'media',
      description: 'ওয়েবসাইটে ফটো নাকি ভিডিও আগে প্রদর্শিত হবে তা নির্বাচন করুন।',
      options: {
        list: [
          { title: 'Photos First, then Videos', value: 'photos_first' },
          { title: 'Videos First, then Photos', value: 'videos_first' },
        ],
        layout: 'radio',
      },
      initialValue: 'photos_first',
    }),
    defineField({
      name: 'default_caption_en',
      title: 'Default Photo Caption (English)',
      type: 'string',
      group: 'media',
      description: 'ইভেন্টের সকল ছবির সাধারণ ডিফল্ট ক্যাপশন (ইংরেজি)।',
      placeholder: 'e.g. Reunion Moments, Tour Highlights...',
    }),
    defineField({
      name: 'default_caption_bn',
      title: 'Default Photo Caption (Bangla)',
      type: 'string',
      group: 'media',
      description: 'ইভেন্টের সকল ছবির সাধারণ ডিফল্ট ক্যাপশন (বাংলা)।',
      placeholder: 'যেমন: স্মৃতিময় মুহূর্ত, রিইউনিয়ন ফটো...',
    }),
    defineField({
      name: 'photos',
      title: 'Event Photos',
      type: 'array',
      group: 'media',
      description: 'একসাথে যত ইচ্ছা ছবি এখানে ড্র্যাগ করে ছেড়ে দিন। প্রথম ছবিটি কভার ফটো হিসেবে কাজ করবে। ছবিতে ক্লিক করে ক্যাপশন দিন।',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption_en',
              title: 'Caption (English)',
              type: 'string',
              description: 'ছবির নির্দিষ্ট ক্যাপশন (ইংরেজি)।',
            },
            {
              name: 'caption_bn',
              title: 'Caption (Bangla)',
              type: 'string',
              description: 'ছবির নির্দিষ্ট ক্যাপশন (বাংলা)।',
            },
          ],
          preview: {
            select: {
              title: 'caption_en',
              subtitle: 'caption_bn',
              media: 'asset',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Event Photo',
                subtitle: subtitle || '',
                media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'videos',
      title: 'Event Videos',
      type: 'array',
      group: 'media',
      description: 'YouTube, Google Drive, Mega.nz লিংক বা সরাসরি ভিডিও আপলোড করুন। লিংক দিলে স্বয়ংক্রিয়ভাবে এমবেড হবে।',
      of: [
        {
          type: 'object',
          name: 'eventVideo',
          title: 'Video',
          fields: [
            defineField({
              name: 'url',
              title: 'Video URL',
              type: 'url',
              description: 'ভিডিও লিংক (YouTube, Google Drive, বা Mega.nz)।',
            }),
            defineField({
              name: 'video_file',
              title: 'Upload Video File',
              type: 'file',
              description: 'সরাসরি ভিডিও ফাইল আপলোড করুন (MP4 বা WebM)। URL লিংক দিলে এটি খালি রাখুন।',
              options: { accept: 'video/mp4,video/webm,video/ogg' },
            }),
            defineField({
              name: 'title_en',
              title: 'Video Title (English)',
              type: 'string',
              description: 'ভিডিওর শিরোনাম (ইংরেজি)।',
            }),
            defineField({
              name: 'title_bn',
              title: 'Video Title (Bangla)',
              type: 'string',
              description: 'ভিডিওর শিরোনাম (বাংলা)।',
            }),
          ],
          preview: {
            select: {
              title: 'title_en',
              subtitle: 'url',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Video',
                subtitle: subtitle || 'Uploaded file',
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'category',
      title: 'Legacy Category (hidden)',
      type: 'string',
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: 'Event Date (Newest First)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Position',
      name: 'positionAsc',
      by: [{ field: 'position', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title_en',
      subtitle: 'date',
      media: 'photos.0',
      batches: 'batches',
    },
    prepare({ title, subtitle, media, batches }) {
      const batchLabel = batches && batches.length ? batches.join(', ') : ''
      const thumb = media?.asset ? media : (media?.photo?.asset ? media.photo : (media?.photo || media))
      return {
        title: title || 'Gallery Event',
        subtitle: `${batchLabel ? batchLabel + ' · ' : ''}${subtitle || ''}`,
        media: (thumb && typeof thumb === 'object') ? thumb : undefined,
      }
    },
  },
})
