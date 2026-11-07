import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hallForm',
  title: 'Custom Forms & Surveys',
  type: 'document',
  fields: [
    defineField({
      name: 'title_en',
      title: 'Form Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'ফর্মের ইংরেজি নাম (যেমন: "HSC-27 Room Allocation & Feedback Form")।',
    }),
    defineField({
      name: 'title_bn',
      title: 'Form Title (Bangla)',
      type: 'string',
      description: 'ফর্মের বাংলা নাম (যেমন: "এইচএসসি-২৭ সিট বণ্টন ও মতামত ফর্ম")।',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title_en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'ওয়েব লিংক শনাক্তকারী (যেমন: dchall.pro.bd/form/hsc27 হলে slug হবে "hsc27")।',
    }),
    defineField({
      name: 'batch',
      title: 'Target Batch',
      type: 'string',
      options: {
        list: [
          { title: 'All Batches', value: 'all' },
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
      description: 'কোন ব্যাচের শিক্ষার্থীরা এই ফর্মটি পূরণ করবে তা নির্বাচন করুন।',
    }),
    defineField({
      name: 'google_form_url',
      title: 'Google Form Direct URL',
      type: 'string',
      description: 'গুগল ফর্মের ভিউ বা শেয়ার লিংক এখানে পেস্ট করুন (যেমন: https://docs.google.com/forms/d/e/.../viewform)।',
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
      title: 'Google Form Embed Code / Iframe',
      type: 'text',
      rows: 3,
      description: 'গুগল ফর্মের Send -> Embed HTML থেকে পাওয়া <iframe>...</iframe> কোড বা লিংক থাকলে সরাসরি এখানে পেস্ট করুন।',
    }),
    defineField({
      name: 'description_en',
      title: 'Instructions / Subtitle (English)',
      type: 'text',
      rows: 2,
      description: 'ফর্ম পূরণ সংক্রান্ত প্রয়োজনীয় দিকনির্দেশনা (ইংরেজি)।',
    }),
    defineField({
      name: 'description_bn',
      title: 'Instructions / Subtitle (Bangla)',
      type: 'text',
      rows: 2,
      description: 'ফর্ম পূরণ সংক্রান্ত প্রয়োজনীয় দিকনির্দেশনা (বাংলা)।',
    }),
    defineField({
      name: 'is_active',
      title: 'Active Form Status',
      type: 'boolean',
      initialValue: true,
      description: 'চালু (ON) থাকলে শিক্ষার্থীরা ওয়েবসাইটে ফর্মটি দেখতে ও পূরণ করতে পারবে। মেয়াদ শেষ হলে এটি বন্ধ করে দিন।',
    }),
    defineField({
      name: 'requires_login',
      title: 'Require Student Login',
      type: 'boolean',
      initialValue: false,
      description: 'চালু (ON) থাকলে শিক্ষার্থীরা কেবল ব্যাচ পাসওয়ার্ড দিয়ে লগইন করার পরেই এই ফর্মটি পূরণ করতে পারবে।',
    }),
  ],
  preview: {
    select: {
      title: 'title_en',
      titleBn: 'title_bn',
      batch: 'batch',
      active: 'is_active',
    },
    prepare({ title, titleBn, batch, active }) {
      const status = active !== false ? 'Active' : 'Closed'
      return {
        title: title || titleBn || 'Custom Form',
        subtitle: `Batch: ${batch || 'All'} · Status: ${status}`,
      }
    },
  },
})
