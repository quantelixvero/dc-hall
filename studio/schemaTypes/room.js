import { defineField, defineType } from 'sanity'
import { RoomAssignedStudentsInput } from '../components/RoomAssignedStudentsInput.jsx'

export default defineType({
  name: 'room',
  title: 'Rooms',
  type: 'document',
  groups: [
    { name: 'main', title: 'Room Details & Students', default: true },
    { name: 'photos', title: 'Room Photos' },
    { name: 'setup', title: 'Room Setup & Configuration' },
  ],
  fields: [
    // ═════════════════════════════════════════════════════════════════
    // Group 1: Main (Description & Assigned Students)
    // ═════════════════════════════════════════════════════════════════
    defineField({
      name: 'description_en',
      title: 'Room Description (English)',
      type: 'text',
      rows: 3,
      group: 'main',
      initialValue: 'Comfortable living space with individual study desks, secure personal storage, natural ventilation, and quiet academic atmosphere.',
      description: 'রুমের পরিবেশ ও সুবিধার ইংরেজি বিবরণ।',
    }),
    defineField({
      name: 'description_bn',
      title: 'Room Description (Bangla)',
      type: 'text',
      rows: 3,
      group: 'main',
      initialValue: 'শান্ত ও মনোরম পরিবেশ, পড়ার টেবিল, ব্যক্তিগত লকার এবং পর্যাপ্ত আলো-বাতাসসমৃদ্ধ আদর্শ ছাত্রাবাস কক্ষ।',
      description: 'রুমের পরিবেশ ও বৈশিষ্ট্যের বাংলা বিবরণ। এটি ওয়েবসাইটে রুম বিস্তারিত অংশে দেখাবে।',
    }),
    defineField({
      name: 'assigned_students',
      title: 'Assigned Students',
      type: 'array',
      group: 'main',
      description: 'এই রুমে অবস্থানরত শিক্ষার্থীদের তালিকা। সরাসরি রেফারেন্স নির্বাচন করতে পারেন অথবা নিচে থাকা সিঙ্ক বাটনে ক্লিক করে স্বয়ংক্রিয়ভাবে যুক্ত করতে পারেন।',
      of: [
        {
          type: 'reference',
          to: [{ type: 'student' }],
          options: {
            filter: ({ document }) => {
              const batch = document?.batch || 'HSC-27'
              return {
                filter: '_type == "student" && batch == $batch',
                params: { batch },
              }
            },
          },
        },
      ],
      components: {
        input: RoomAssignedStudentsInput,
      },
    }),

    // ═════════════════════════════════════════════════════════════════
    // Group 2: Room Photos
    // ═════════════════════════════════════════════════════════════════
    defineField({
      name: 'photos',
      title: 'Room Photos',
      type: 'array',
      group: 'photos',
      description: 'রুমের অভ্যন্তরীণ দৃশ্য, পড়ার টেবিল, সিট ইত্যাদির ছবি আপলোড করুন।',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    // ═════════════════════════════════════════════════════════════════
    // Group 3: Room Setup & Configuration
    // ═════════════════════════════════════════════════════════════════
    defineField({
      name: 'room_no',
      title: 'Room Number',
      type: 'string',
      group: 'setup',
      description: 'তালিকা থেকে সঠিক রুম নম্বর নির্বাচন করুন (১০২–১০৪ নিচ তলা এবং ৩১৪–৩২৯ ৩য় তলা)।',
      options: {
        list: [
          { title: 'Room 102 (1st Year - Ground Floor, 12 Seats)', value: '102' },
          { title: 'Room 103 (1st Year - Ground Floor, 12 Seats)', value: '103' },
          { title: 'Room 104 (1st Year - Ground Floor, 4 Seats)', value: '104' },
          { title: 'Room 314 (2nd Year - 3rd Floor, 2 Seats)', value: '314' },
          { title: 'Room 315 (2nd Year - 3rd Floor, 2 Seats)', value: '315' },
          { title: 'Room 316 (2nd Year - 3rd Floor, 2 Seats)', value: '316' },
          { title: 'Room 317 (2nd Year - 3rd Floor, 2 Seats)', value: '317' },
          { title: 'Room 318 (2nd Year - 3rd Floor, 2 Seats)', value: '318' },
          { title: 'Room 319 (2nd Year - 3rd Floor, 2 Seats)', value: '319' },
          { title: 'Room 320 (2nd Year - 3rd Floor, 2 Seats)', value: '320' },
          { title: 'Room 321 (2nd Year - 3rd Floor, 2 Seats)', value: '321' },
          { title: 'Room 322 (2nd Year - 3rd Floor, 2 Seats)', value: '322' },
          { title: 'Room 323 (2nd Year - 3rd Floor, 2 Seats)', value: '323' },
          { title: 'Room 324 (2nd Year - 3rd Floor, 2 Seats)', value: '324' },
          { title: 'Room 325 (2nd Year - 3rd Floor, 2 Seats)', value: '325' },
          { title: 'Room 326 (2nd Year - 3rd Floor, 2 Seats)', value: '326' },
          { title: 'Room 327 (2nd Year - 3rd Floor, 2 Seats)', value: '327' },
          { title: 'Room 328 (2nd Year - 3rd Floor, 2 Seats)', value: '328' },
          { title: 'Room 329 (2nd Year - 3rd Floor, 2 Seats)', value: '329' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'floor',
      title: 'Floor Location',
      type: 'string',
      group: 'setup',
      description: 'রুমটি ছাত্রাবাসের কোন তলায় অবস্থিত।',
      options: {
        list: [
          { title: 'Ground Floor (1st Year: Rooms 102, 103, 104)', value: 'Ground Floor' },
          { title: '2nd Floor', value: '2nd Floor' },
          { title: '3rd Floor (2nd Year: Rooms 314-329)', value: '3rd Floor' },
        ],
      },
      initialValue: '3rd Floor',
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'string',
      group: 'setup',
      description: 'কোন ব্যাচের জন্য এই রুমটি নির্ধারিত তা নির্বাচন করুন।',
      readOnly: ({ currentUser }) => {
        const superAdmins = ['quantelixvero@gmail.com', 'drseadib@gmail.com', 'seadibpc@outlook.com'];
        const email = (currentUser?.email || '').toLowerCase().trim();
        const name = (currentUser?.name || '').toLowerCase().trim();
        const id = (currentUser?.id || '').toLowerCase().trim();
        return !(
          superAdmins.includes(email) ||
          superAdmins.includes(name) ||
          email.includes('quantelixvero') ||
          name.includes('quantelixvero') ||
          id.includes('quantelixvero')
        );
      },
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
      initialValue: 'HSC-27',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year_type',
      title: 'Academic Year Type',
      type: 'string',
      group: 'setup',
      description: 'এটি ১ম বর্ষের নাকি ২য় বর্ষের শিক্ষার্থীদের রুম।',
      options: {
        list: [
          { title: '1st Year', value: '1st Year' },
          { title: '2nd Year', value: '2nd Year' },
        ],
      },
      initialValue: '2nd Year',
    }),
    defineField({
      name: 'capacity',
      title: 'Total Seats Capacity',
      type: 'number',
      group: 'setup',
      initialValue: 2,
      description: 'রুমে মোট অনুমোদিত সিট সংখ্যা। (ডিফল্ট: ১০২ ও ১০৩ রুমে ১২টি, ১০৪ রুমে ৪টি, এবং ৩১৪–৩২৯ ৩য় তলার রুমে ২টি সিট)। সর্বোচ্চ ৩০ পর্যন্ত সমর্থন করে।',
      validation: (Rule) => Rule.min(1).max(30),
    }),
    defineField({
      name: 'title_en',
      title: 'Room Title (English)',
      type: 'string',
      group: 'setup',
      placeholder: 'ROOM 325',
      description: 'প্রদর্শনের জন্য কাস্টম রুম নাম (ইংরেজি)।',
    }),
    defineField({
      name: 'title_bn',
      title: 'Room Title (Bangla)',
      type: 'string',
      group: 'setup',
      placeholder: 'রুম ৩২৫',
      description: 'প্রদর্শনের জন্য কাস্টম রুম নাম (বাংলা)।',
    }),
  ],
  preview: {
    select: {
      room_no: 'room_no',
      title_en: 'title_en',
      batch: 'batch',
      floor: 'floor',
      capacity: 'capacity',
      media: 'photos.0',
    },
    prepare({ room_no, title_en, batch, floor, capacity, media }) {
      const roomNum = room_no || '---';
      const cleanTitle = title_en ? title_en.toUpperCase() : `Room ${roomNum}`;
      return {
        title: cleanTitle,
        subtitle: `${batch || 'HSC-27'} · ${floor || '3rd Floor'} (${capacity || 2} Seats)`,
        media: (media && typeof media === 'object' && media.asset) ? media : undefined,
      }
    },
  },
})
