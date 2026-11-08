import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'batchConfig',
  title: 'Batch Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'batch',
      title: 'Batch Name',
      type: 'string',
      description: 'এই ব্যাচটির পরিচিতি নাম। এটি সিস্টেম দ্বারা নির্ধারিত এবং অপরিবর্তনযোগ্য।',
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
          { title: 'HSC-36', value: 'HSC-36' },
          { title: 'HSC-37', value: 'HSC-37' },
          { title: 'HSC-38', value: 'HSC-38' },
          { title: 'HSC-39', value: 'HSC-39' },
          { title: 'HSC-40', value: 'HSC-40' },
          { title: 'HSC-26 (Alumni)', value: 'HSC-26' },
          { title: 'HSC-25 (Alumni)', value: 'HSC-25' },
          { title: 'HSC-24 (Alumni)', value: 'HSC-24' },
        ],
      },
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),

    // Website Login Password for this batch
    defineField({
      name: 'batch_password',
      title: 'Website Login Password',
      type: 'string',
      description: 'ওয়েবসাইটে এই ব্যাচের সংরক্ষিত তথ্য দেখার পাসওয়ার্ড। শিক্ষার্থীরা এই পাসওয়ার্ড দিয়ে ওয়েবসাইটে লগইন করবে।',
    }),
  ],
  preview: {
    select: {
      batch: 'batch',
      password: 'batch_password',
    },
    prepare({ batch, password }) {
      const passInfo = password ? '🔒 Password set' : '🔓 No password'
      return {
        title: `${batch || 'Batch'} Website Password`,
        subtitle: passInfo,
      }
    },
  },
})
