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
      title: 'URL Slug / ফর্ম লিংক নাম',
      type: 'slug',
      options: {
        source: 'title_en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'লিংক কেমন হবে: dchall.pro.bd/form/hsc27 হলে এখানে slug হবে "hsc27"',
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
      title: 'Google Form Link / Embed URL (গুগল ফর্ম লিংক)',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'গুগল ফর্মের ভিউ বা এম্বেড লিংক পেস্ট করুন (যেমন: https://docs.google.com/forms/d/e/.../viewform?embedded=true)',
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
