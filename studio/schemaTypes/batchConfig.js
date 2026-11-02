import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'batchConfig',
  title: 'Batch Configuration (ব্যাচ কনফিগারেশন)',
  type: 'document',
  fields: [
    defineField({
      name: 'batch',
      title: 'Batch Name (ব্যাচের নাম)',
      type: 'string',
      options: {
        list: [
          { title: 'HSC-27 (Founder Batch)', value: 'HSC-27' },
          { title: 'HSC-28', value: 'HSC-28' },
          { title: 'HSC-29', value: 'HSC-29' },
          { title: 'HSC-30', value: 'HSC-30' },
        ],
      },
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),

    // ═══════════════════════════════════════════
    // Website Login Password for this batch
    // ═══════════════════════════════════════════
    defineField({
      name: 'batch_password',
      title: '🔑 Website Login Password (ওয়েবসাইটে এই ব্যাচের লগইন পাসওয়ার্ড)',
      type: 'string',
      description: 'ওয়েবসাইটে এই ব্যাচের শিক্ষার্থীরা যে পাসওয়ার্ড দিয়ে লগইন করে তাদের ব্যাচের সংরক্ষিত তথ্য দেখতে পায়। এটি পরিবর্তন করলে ওয়েবসাইটে এই ব্যাচের নতুন পাসওয়ার্ড সেট হবে।',
    }),

    // ═══════════════════════════════════════════
    // Batch Admin Emails
    // ═══════════════════════════════════════════
    defineField({
      name: 'batch_admin_emails',
      title: '👑 Batch Admin Emails (ব্যাচ এডমিন ইমেইল)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'এই ইমেইলগুলো দিয়ে Sanity Studio তে login করলে এই ব্যাচের 5টি ফোল্ডারে full edit access পাবে। ⚠️ নতুন email যোগ করার পরে Main Admin কে Sanity project-এ member invite করতে হবে।',
    }),

    // ═══════════════════════════════════════════
    // Moderator Emails
    // ═══════════════════════════════════════════
    defineField({
      name: 'moderator_emails',
      title: '📝 Moderator Emails (মডারেটর ইমেইল)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'এই ইমেইলগুলো দিয়ে login করলে শুধু Edit Request পাঠাতে পারবে। সরাসরি edit পারবে না। ⚠️ নতুন email যোগ করার পরে Main Admin কে Sanity project-এ member invite করতে হবে।',
    }),
  ],
  preview: {
    select: {
      batch: 'batch',
      admins: 'batch_admin_emails',
      mods: 'moderator_emails',
      password: 'batch_password',
    },
    prepare({ batch, admins, mods, password }) {
      const adminCount = Array.isArray(admins) ? admins.length : 0
      const modCount = Array.isArray(mods) ? mods.length : 0
      const passInfo = password ? '🔐 Password set' : '⚠️ No password'
      return {
        title: `${batch || 'Unknown Batch'} Configuration`,
        subtitle: `${adminCount} Admin(s), ${modCount} Mod(s) | ${passInfo}`,
      }
    },
  },
})
