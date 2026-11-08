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

    // Batch Public Lock
    defineField({
      name: 'is_locked',
      title: 'Lock Batch Directory',
      type: 'boolean',
      description: 'চালু (ON) থাকলে সাধারণ ভিজিটররা এই ব্যাচের শিক্ষার্থী তালিকা ও রুমমেট তথ্য দেখতে পারবে না, ব্যাচ পাসওয়ার্ড দিয়ে আনলক করতে হবে।',
      initialValue: false,
    }),

    // Batch Lock Notice
    defineField({
      name: 'lock_notice',
      title: 'Batch Lock Notice Message',
      type: 'string',
      description: 'ব্যাচ লক থাকা অবস্থায় শিক্ষার্থীদের জন্য যে বার্তাটি প্রদর্শন করা হবে।',
      placeholder: 'এই ব্যাচের তথ্য দেখতে অনুগ্রহ করে ব্যাচ পাসওয়ার্ড দিয়ে লগইন করুন।',
    }),

    // Batch Moderator Emails
    defineField({
      name: 'batch_admin_emails',
      title: 'Batch Moderator Emails / মডারেটর ইমেইল তালিকা',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ currentUser }) => {
        const email = (currentUser?.email || '').toLowerCase().trim()
        const name = (currentUser?.name || '').toLowerCase().trim()
        const id = (currentUser?.id || '').toLowerCase().trim()
        const superAdmins = ['quantelixvero@gmail.com', 'drseadib@gmail.com', 'seadibpc@outlook.com']
        return !(
          superAdmins.includes(email) ||
          superAdmins.includes(name) ||
          email.includes('quantelixvero') ||
          name.includes('quantelixvero') ||
          id.includes('quantelixvero')
        )
      },
      description: 'যে ইমেইলগুলো দিয়ে Sanity Studio-তে লগইন করলে এই ব্যাচের ফোল্ডারে মডারেটর অ্যাক্সেস পাওয়া যাবে। (শুধুমাত্র সুপার অ্যাডমিন পরিবর্তন করতে পারবেন)',
    }),

    // Moderator Emails
    defineField({
      name: 'moderator_emails',
      title: 'Moderator Emails',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ currentUser }) => {
        const email = (currentUser?.email || '').toLowerCase().trim()
        const name = (currentUser?.name || '').toLowerCase().trim()
        const id = (currentUser?.id || '').toLowerCase().trim()
        const superAdmins = ['quantelixvero@gmail.com', 'drseadib@gmail.com', 'seadibpc@outlook.com']
        return !(
          superAdmins.includes(email) ||
          superAdmins.includes(name) ||
          email.includes('quantelixvero') ||
          name.includes('quantelixvero') ||
          id.includes('quantelixvero')
        )
      },
      description: 'এই ইমেইলধারীরা সরাসরি ডাটা পরিবর্তন করতে পারবেন না, তারা শুধু স্টুডিও থেকে এডিট রিকোয়েস্ট পাঠাতে পারবেন। (শুধুমাত্র সুপার অ্যাডমিন পরিবর্তন করতে পারবেন)',
    }),
  ],
  preview: {
    select: {
      batch: 'batch',
      admins: 'batch_admin_emails',
      mods: 'moderator_emails',
      password: 'batch_password',
      isLocked: 'is_locked',
    },
    prepare({ batch, admins, mods, password, isLocked }) {
      const adminCount = Array.isArray(admins) ? admins.length : 0
      const modCount = Array.isArray(mods) ? mods.length : 0
      const passInfo = password ? '🔒 Password set' : '🔓 No password'
      const lockTag = isLocked ? '🔒 Locked' : '🟢 Active'
      return {
        title: `${lockTag} · ${batch || 'Batch'} Configuration`,
        subtitle: `${adminCount} Admin(s), ${modCount} Mod(s) | ${passInfo}`,
      }
    },
  },
})
