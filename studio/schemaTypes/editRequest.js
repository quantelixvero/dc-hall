import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'editRequest',
  title: 'Edit Request (সম্পাদনা অনুরোধ)',
  type: 'document',
  fields: [
    defineField({
      name: 'batch',
      title: 'Batch (ব্যাচ)',
      type: 'string',
      options: {
        list: [
          { title: 'HSC-27', value: 'HSC-27' },
          { title: 'HSC-28', value: 'HSC-28' },
          { title: 'HSC-29', value: 'HSC-29' },
          { title: 'HSC-30', value: 'HSC-30' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'target_type',
      title: 'Target Type (কী পরিবর্তন করতে চান)',
      type: 'string',
      options: {
        list: [
          { title: '📚 Student Profile', value: 'student' },
          { title: '🏠 Room / Roommate', value: 'room' },
          { title: '🖼️ Gallery Photo', value: 'galleryItem' },
          { title: '🎪 Event', value: 'galleryEvent' },
          { title: '📝 Other / General', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'request_type',
      title: 'Request Type (অনুরোধের ধরন)',
      type: 'string',
      options: {
        list: [
          { title: '➕ নতুন যোগ করা (Create)', value: 'create' },
          { title: '✏️ তথ্য পরিবর্তন করা (Update)', value: 'update' },
          { title: '🗑️ মুছে ফেলা (Delete)', value: 'delete' },
        ],
      },
      initialValue: 'update',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Request Title (অনুরোধের শিরোনাম)',
      type: 'string',
      description: 'সংক্ষেপে কী পরিবর্তন চান লিখুন (যেমন: "রহিমের ফোন নম্বর আপডেট")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'বিস্তারিত বিবরণ (Description)',
      type: 'text',
      rows: 5,
      description: 'কী পরিবর্তন করতে চান তার বিস্তারিত লিখুন। যদি কোনো student এর তথ্য পরিবর্তন হয় তাহলে তার নাম, রোল নম্বর ও পুরনো-নতুন তথ্য লিখুন।',
    }),
    defineField({
      name: 'attachment',
      title: 'Attachment (ছবি বা ফাইল সংযুক্তি)',
      type: 'image',
      description: 'প্রয়োজনে স্ক্রিনশট বা নতুন ছবি সংযুক্ত করুন।',
    }),
    defineField({
      name: 'requester_email',
      title: 'Requester Email (অনুরোধকারীর ইমেইল)',
      type: 'string',
      readOnly: true,
      description: 'স্বয়ংক্রিয়ভাবে আপনার ইমেইল বসবে।',
    }),
    defineField({
      name: 'status',
      title: 'Status (অবস্থা)',
      type: 'string',
      options: {
        list: [
          { title: '⏳ Pending (অপেক্ষমান)', value: 'pending' },
          { title: '✅ Approved (অনুমোদিত)', value: 'approved' },
          { title: '❌ Rejected (প্রত্যাখ্যাত)', value: 'rejected' },
          { title: '🔄 In Progress (কাজ চলছে)', value: 'in_progress' },
          { title: '✔️ Done (সম্পন্ন)', value: 'done' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'reviewed_by',
      title: 'Reviewed By (পর্যালোচনাকারী)',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'review_note',
      title: 'Review Note (পর্যালোচনা মন্তব্য)',
      type: 'text',
      rows: 3,
      description: 'Batch Admin এর মন্তব্য (অনুমোদন/প্রত্যাখ্যানের কারণ)।',
    }),
  ],
  orderings: [
    {
      title: 'Status, then Date',
      name: 'statusDate',
      by: [
        { field: 'status', direction: 'asc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      batch: 'batch',
      status: 'status',
      requester: 'requester_email',
      type: 'request_type',
    },
    prepare({ title, batch, status, requester, type }) {
      const statusIcons = {
        pending: '⏳',
        approved: '✅',
        rejected: '❌',
        in_progress: '🔄',
        done: '✔️',
      }
      const typeIcons = {
        create: '➕',
        update: '✏️',
        delete: '🗑️',
      }
      return {
        title: `${statusIcons[status] || '⏳'} ${title || 'Untitled Request'}`,
        subtitle: `${typeIcons[type] || ''} ${batch || ''} — ${requester || 'Unknown'}`,
      }
    },
  },
})
