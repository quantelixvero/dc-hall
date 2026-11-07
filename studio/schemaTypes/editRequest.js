import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'editRequest',
  title: 'Edit Request',
  type: 'document',
  fields: [
    defineField({
      name: 'batch',
      title: 'Target Batch',
      type: 'string',
      description: 'কোন ব্যাচের জন্য এই এডিট অনুরোধ পাঠানো হচ্ছে তা নির্বাচন করুন।',
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
      title: 'Target Category',
      type: 'string',
      description: 'কী ধরনের তথ্যের পরিবর্তন করতে চান তা নির্বাচন করুন।',
      options: {
        list: [
          { title: 'Student Profile', value: 'student' },
          { title: 'Room / Roommate', value: 'room' },
          { title: 'Gallery Photo', value: 'galleryItem' },
          { title: 'Event', value: 'galleryEvent' },
          { title: 'Other / General', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'request_type',
      title: 'Request Action Type',
      type: 'string',
      description: 'নতুন তথ্য যোগ, বিদ্যমান তথ্য পরিবর্তন নাকি মুছে ফেলার অনুরোধ তা নির্বাচন করুন।',
      options: {
        list: [
          { title: 'Create / Add New', value: 'create' },
          { title: 'Update Existing', value: 'update' },
          { title: 'Delete / Remove', value: 'delete' },
        ],
      },
      initialValue: 'update',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Request Title',
      type: 'string',
      description: 'সংক্ষেপে কী পরিবর্তন চান তা লিখুন (যেমন: "রহিমের ফোন নম্বর সংশোধন")।',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'text',
      rows: 5,
      description: 'কী পরিবর্তন করতে চান তার বিস্তারিত বিবরণ লিখুন। শিক্ষার্থীর ক্ষেত্রে নাম, রোল ও পূর্ববর্তী-নতুন তথ্য উল্লেখ করুন।',
    }),
    defineField({
      name: 'attachment',
      title: 'Attachment Image',
      type: 'image',
      description: 'প্রয়োজনে নতুন ছবি বা প্রমাণস্বরূপ স্ক্রিনশট যুক্ত করুন।',
    }),
    defineField({
      name: 'requester_email',
      title: 'Requester Email',
      type: 'string',
      readOnly: true,
      description: 'অনুরোধকারীর ইমেইল ঠিকানা (স্বয়ংক্রিয়ভাবে যুক্ত হয়)।',
    }),
    defineField({
      name: 'status',
      title: 'Review Status',
      type: 'string',
      description: 'অনুরোধটির বর্তমান অবস্থা (অপেক্ষমান, অনুমোদিত, বা বাতিল)।',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Done', value: 'done' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'reviewed_by',
      title: 'Reviewed By',
      type: 'string',
      readOnly: true,
      description: 'যে ব্যাচ অ্যাডমিন অনুরোধটি পর্যালোচনা করেছেন তার ইমেইল।',
    }),
    defineField({
      name: 'review_note',
      title: 'Review Note',
      type: 'text',
      rows: 3,
      description: 'ব্যাচ অ্যাডমিনের পর্যালোচনা মন্তব্য বা সিদ্ধান্ত জানানোর কারণ।',
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
      const statusMap = {
        pending: '[Pending]',
        approved: '[Approved]',
        rejected: '[Rejected]',
        in_progress: '[In Progress]',
        done: '[Done]',
      }
      const typeMap = {
        create: 'Add',
        update: 'Update',
        delete: 'Delete',
      }
      return {
        title: `${statusMap[status] || '[Request]'} ${title || 'Untitled Request'}`,
        subtitle: `${typeMap[type] || 'Request'} • ${batch || ''} — ${requester || 'Unknown'}`,
      }
    },
  },
})
