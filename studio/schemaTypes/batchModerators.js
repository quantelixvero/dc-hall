import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'batchModerators',
  title: 'Batch Moderators',
  type: 'document',
  fields: [
    defineField({
      name: 'batch',
      title: 'Batch Name',
      type: 'string',
      description: 'এই ব্যাচের পরিচিতি নাম (অপরিবর্তনযোগ্য)।',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'moderators',
      title: 'Batch Moderators / ব্যাচ মডারেটর নির্বাচন',
      type: 'array',
      description: 'এই ব্যাচের শিক্ষার্থীদের মধ্য থেকে মডারেটর নির্বাচন করুন (পাসওয়ার্ড ও ভিজিবিলিটি সেটিংস অনুসারে সর্বোচ্চ নির্ধারিত সংখ্যা পর্যন্ত)।',
      of: [
        {
          type: 'reference',
          to: [{ type: 'student' }],
          options: {
            filter: ({ document }) => {
              const batch = document?.batch || 'HSC-27'
              return {
                filter: '_type == "student" && (batch == $batch || (!defined(batch) && $batch == "HSC-27"))',
                params: { batch },
              }
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.custom(async (mods, context) => {
          if (!mods || !mods.length) return true
          try {
            const client = context.getClient({ apiVersion: '2023-01-01' })
            const settings = await client.fetch('*[_type == "adminSettings"][0]{ max_moderators_per_batch }')
            const max = settings?.max_moderators_per_batch || 5
            if (mods.length > max) {
              return `সর্বোচ্চ ${max} জন মডারেটর নির্বাচন করা যাবে (অ্যাডমিন সেটিংস অনুসারে)। বর্তমানে ${mods.length} জন নির্বাচিত।`
            }
          } catch (e) {
            // fallback if fetch fails
            if (mods.length > 20) return 'সর্বোচ্চ ২০ জন মডারেটর নির্বাচন করা যাবে।'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      batch: 'batch',
      mods: 'moderators',
    },
    prepare({ batch, mods }) {
      const count = Array.isArray(mods) ? mods.length : 0
      return {
        title: `${batch || 'Batch'} Moderators (${count})`,
        subtitle: `${count} student moderator(s) assigned`,
      }
    },
  },
})
