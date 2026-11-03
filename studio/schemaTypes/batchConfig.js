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
          { title: 'HSC-31', value: 'HSC-31' },
          { title: 'HSC-32', value: 'HSC-32' },
          { title: 'HSC-33', value: 'HSC-33' },
          { title: 'HSC-34', value: 'HSC-34' },
          { title: 'HSC-35', value: 'HSC-35' },
          { title: 'HSC-26 (Alumni)', value: 'HSC-26' },
          { title: 'HSC-25 (Alumni)', value: 'HSC-25' },
          { title: 'HSC-24 (Alumni)', value: 'HSC-24' },
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
      title: '👑 Batch Admin Emails (ব্যাচ এডমিন ইমেইল — শুধুমাত্র সুপার অ্যাডমিন দেখতে পাবেন)',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ currentUser }) => {
        const email = (currentUser?.email || '').toLowerCase().trim()
        const superAdmins = ['drseadib@gmail.com', 'seadibpc@outlook.com']
        return !superAdmins.includes(email)
      },
      description: 'এই ইমেইলগুলো দিয়ে Sanity Studio তে login করলে এই ব্যাচের ফোল্ডারগুলোতে access পাবে। শুধুমাত্র সুপার অ্যাডমিন এটি পরিবর্তন করতে পারবেন।',
    }),

    // ═══════════════════════════════════════════
    // Moderator Emails
    // ═══════════════════════════════════════════
    defineField({
      name: 'moderator_emails',
      title: '📝 Moderator Emails (মডারেটর ইমেইল — শুধুমাত্র সুপার অ্যাডমিন দেখতে পাবেন)',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ currentUser }) => {
        const email = (currentUser?.email || '').toLowerCase().trim()
        const superAdmins = ['drseadib@gmail.com', 'seadibpc@outlook.com']
        return !superAdmins.includes(email)
      },
      description: 'এই ইমেইলগুলো দিয়ে login করলে শুধু Edit Request পাঠাতে পারবে। শুধুমাত্র সুপার অ্যাডমিন এটি পরিবর্তন করতে পারবেন।',
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
