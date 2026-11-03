import { defineField, defineType } from 'sanity'
import { RoomAssignedStudentsInput } from '../components/RoomAssignedStudentsInput.jsx'

export default defineType({
  name: 'room',
  title: 'Rooms (রুমসমূহ)',
  type: 'document',
  groups: [
    { name: 'main', title: '🏠 রুম বিবরণ ও শিক্ষার্থী (Details & Students)', default: true },
    { name: 'photos', title: '📸 রুম ফটো (Room Photos)' },
    { name: 'setup', title: '⚙️ রুম কনফিগারেশন ও নম্বর (Room Setup)' },
  ],
  fields: [
    // ═════════════════════════════════════════════════════════════════
    // Group 1: Main (Description & Assigned Students) - Front & Center
    // ═════════════════════════════════════════════════════════════════
    defineField({
      name: 'description_bn',
      title: 'রুম বিবরণ (বাংলা)',
      type: 'text',
      rows: 3,
      group: 'main',
      initialValue: 'শান্ত ও মনোরম পরিবেশ, পড়ার টেবিল, ব্যক্তিগত লকার এবং পর্যাপ্ত আলো-বাতাসসমৃদ্ধ আদর্শ ছাত্রাবাস কক্ষ।',
      description: 'রুমের পরিবেশ ও বৈশিষ্ট্যের বিবরণ। এটি ওয়েবসাইটে রুম বিস্তারিত পেজে দেখাবে।',
    }),
    defineField({
      name: 'description_en',
      title: 'Room Description (English)',
      type: 'text',
      rows: 3,
      group: 'main',
      initialValue: 'Comfortable living space with individual study desks, secure personal storage, natural ventilation, and quiet academic atmosphere.',
      description: 'Room description in English.',
    }),
    defineField({
      name: 'assigned_students',
      title: 'Assigned Students (এই রুমের শিক্ষার্থীগণ)',
      type: 'array',
      group: 'main',
      of: [{ type: 'reference', to: [{ type: 'student' }] }],
      description: 'রুমের শিক্ষার্থী সরাসরি এখান থেকেও সিলেক্ট করতে পারেন অথবা রিফ্রেশ দিয়ে স্টুডেন্ট প্রোফাইল থেকে সিঙ্ক করতে পারেন!',
      components: {
        input: RoomAssignedStudentsInput,
      },
    }),

    // ═════════════════════════════════════════════════════════════════
    // Group 2: Room Photos
    // ═════════════════════════════════════════════════════════════════
    defineField({
      name: 'photos',
      title: 'Room Photos (রুমের ছবিসমূহ)',
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
      title: 'Room Number (রুম নম্বর)',
      type: 'string',
      group: 'setup',
      description: 'তালিকা থেকে রুম নম্বর সিলেক্ট করুন। ১০২–১০৪ (১ম বর্ষ) এবং ৩১৪–৩২৯ (২য় বর্ষ)।',
      options: {
        list: [
          { title: 'Room 102 (১ম বর্ষ - নিচ তলা)', value: '102' },
          { title: 'Room 103 (১ম বর্ষ - নিচ তলা)', value: '103' },
          { title: 'Room 104 (১ম বর্ষ - নিচ তলা)', value: '104' },
          { title: 'Room 314 (২য় বর্ষ - ৩য় তলা)', value: '314' },
          { title: 'Room 315 (২য় বর্ষ - ৩য় তলা)', value: '315' },
          { title: 'Room 316 (২য় বর্ষ - ৩য় তলা)', value: '316' },
          { title: 'Room 317 (২য় বর্ষ - ৩য় তলা)', value: '317' },
          { title: 'Room 318 (২য় বর্ষ - ৩য় তলা)', value: '318' },
          { title: 'Room 319 (২য় বর্ষ - ৩য় তলা)', value: '319' },
          { title: 'Room 320 (২য় বর্ষ - ৩য় তলা)', value: '320' },
          { title: 'Room 321 (২য় বর্ষ - ৩য় তলা)', value: '321' },
          { title: 'Room 322 (২য় বর্ষ - ৩য় তলা)', value: '322' },
          { title: 'Room 323 (২য় বর্ষ - ৩য় তলা)', value: '323' },
          { title: 'Room 324 (২য় বর্ষ - ৩য় তলা)', value: '324' },
          { title: 'Room 325 (২য় বর্ষ - ৩য় তলা)', value: '325' },
          { title: 'Room 326 (২য় বর্ষ - ৩য় তলা)', value: '326' },
          { title: 'Room 327 (২য় বর্ষ - ৩য় তলা)', value: '327' },
          { title: 'Room 328 (২য় বর্ষ - ৩য় তলা)', value: '328' },
          { title: 'Room 329 (২য় বর্ষ - ৩য় তলা)', value: '329' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'floor',
      title: 'Floor (তলা নির্বাচন করুন)',
      type: 'string',
      group: 'setup',
      options: {
        list: [
          { title: 'Ground Floor / নিচ তলা (১ম তলা — ১০২, ১০৩, ১০৪)', value: 'Ground Floor' },
          { title: '2nd Floor / দোতলা (২য় তলা)', value: '2nd Floor' },
          { title: '3rd Floor / তিনতলা (৩য় তলা — ৩১৪ থেকে ৩২৯)', value: '3rd Floor' },
        ],
      },
      initialValue: '3rd Floor',
    }),
    defineField({
      name: 'batch',
      title: 'Batch (ব্যাচ)',
      type: 'string',
      group: 'setup',
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
      initialValue: 'HSC-27',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year_type',
      title: 'Academic Year Type (কোন বর্ষের বরাদ্দ)',
      type: 'string',
      group: 'setup',
      options: {
        list: [
          { title: '1st Year (১ম বর্ষ)', value: '1st Year' },
          { title: '2nd Year (২য় বর্ষ)', value: '2nd Year' },
        ],
      },
      initialValue: '2nd Year',
    }),
    defineField({
      name: 'capacity',
      title: 'Total Seats (মোট সিট সংখ্যা)',
      type: 'number',
      group: 'setup',
      initialValue: 2,
      description: 'ডিফল্ট হিসেবে ২ সিট থাকবে।',
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: 'title_en',
      title: 'Room Title EN (অপশনাল — যেমন: Room 315)',
      type: 'string',
      group: 'setup',
      placeholder: 'Room 315',
    }),
    defineField({
      name: 'title_bn',
      title: 'রুম শিরোনাম বাংলা (অপশনাল — যেমন: রুম ৩১৫)',
      type: 'string',
      group: 'setup',
      placeholder: 'রুম ৩১৫',
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
      const cleanTitle = title_en ? title_en : `Room ${roomNum}`;
      return {
        title: cleanTitle,
        subtitle: `${batch || 'HSC-27'} · ${floor || '3rd Floor'} (${capacity || 2} Seats)`,
        media: (media && typeof media === 'object' && media.asset) ? media : undefined,
      }
    },
  },
})
