import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hallForm',
  title: 'Custom Forms & Surveys (গুগল ফর্ম ও জরিপ)',
  type: 'document',
  fields: [
    defineField({
      name: 'title_en',
      title: 'Form Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "HSC-27 Room Allocation & Feedback Form"',
    }),
    defineField({
      name: 'title_bn',
      title: 'ফর্ম শিরোনাম (বাংলা)',
      type: 'string',
      description: 'যেমন: "এইচএসসি-২৭ সিট বণ্টন ও মতামত ফর্ম"',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug / ফর্ম লিংক নাম (ছোট হাতের অক্ষর)',
      type: 'slug',
      options: {
        source: 'title_en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'লিংক কেমন হবে: dchall.pro.bd/form/hsc27 হলে এখানে slug হবে "hsc27" (শুধু ইংরেজি অক্ষর ও সংখ্যা)',
    }),
    defineField({
      name: 'batch',
      title: 'Batch (ব্যাচ)',
      type: 'string',
      options: {
        list: [
          { title: 'All Batches (সকল ব্যাচ)', value: 'all' },
          { title: 'HSC-27 (Founder Batch)', value: 'HSC-27' },
          { title: 'HSC-28', value: 'HSC-28' },
          { title: 'HSC-29', value: 'HSC-29' },
          { title: 'HSC-30', value: 'HSC-30' },
          { title: 'HSC-31', value: 'HSC-31' },
          { title: 'HSC-32', value: 'HSC-32' },
          { title: 'HSC-33', value: 'HSC-33' },
          { title: 'HSC-34', value: 'HSC-34' },
          { title: 'HSC-35', value: 'HSC-35' },
        ],
      },
      initialValue: 'HSC-27',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'google_form_url',
      title: '1. Google Form Direct Link (সরাসরি ফর্ম বা ভিউ লিংক)',
      type: 'string',
      description: 'গুগল ফর্মের ভিউ বা শেয়ার লিংক পেস্ট করুন (যেমন: https://docs.google.com/forms/d/e/.../viewform)। এটি স্বয়ংক্রিয়ভাবে এমবেড লিংকে রূপান্তর করা হবে।',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!value && !context.document?.google_form_embed_code) {
            return 'অনুগ্রহ করে ফর্ম লিংক অথবা নিচের এম্বেড কোড প্রদান করুন।'
          }
          return true
        }),
    }),
    defineField({
      name: 'google_form_embed_code',
      title: '2. Google Form Embed Code / Iframe (বিকল্প: এম্বেড কোড বা এম্বেড লিংক)',
      type: 'text',
      rows: 3,
      description: 'গুগল ফর্মের Send -> < > (HTML embed) থেকে পাওয়া সম্পূর্ণ <iframe>...</iframe> কোড বা লিংক থাকলে সরাসরি এখানে পেস্ট করতে পারেন।',
    }),
    defineField({
      name: 'description_en',
      title: 'Instructions / Subtitle (English)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description_bn',
      title: 'সংক্ষিপ্ত নির্দেশনা / সাবটাইটেল (বাংলা)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'is_active',
      title: 'Form Active / ফর্ম সচল আছে',
      type: 'boolean',
      initialValue: true,
      description: 'বন্ধ করতে চাইলে এটি বন্ধ (Off) করে দিন। বন্ধ থাকলে ওয়েবসাইটে ফর্মটি দেখাবে না।',
    }),
    defineField({
      name: 'requires_login',
      title: 'Requires Student Login / শুধু লগইন করা শিক্ষার্থী পূরণ করতে পারবে',
      type: 'boolean',
      initialValue: false,
      description: 'চালু থাকলে ওয়েবসাইটে প্রবেশের সময় স্টুডেন্ট পোর্টাল পাসওয়ার্ড চাইবে।',
    }),
  ],
  preview: {
    select: {
      title: 'title_en',
      subtitle: 'slug.current',
      batch: 'batch',
      isActive: 'is_active',
    },
    prepare({ title, subtitle, batch, isActive }) {
      return {
        title: title || 'Untitled Form',
        subtitle: `${batch || 'All'} · /form/${subtitle || ''} [${isActive !== false ? 'Active' : 'Closed'}]`,
      }
    },
  },
})
