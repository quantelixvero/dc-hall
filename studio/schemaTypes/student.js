import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'student',
  title: 'Students (শিক্ষার্থী)',
  type: 'document',
  groups: [
    { name: 'basic', title: '① নাম ও মৌলিক (Name & Basic)', default: true },
    { name: 'academic', title: '② একাডেমিক ও রুম (Academic & Room)' },
    { name: 'contact', title: '③ যোগাযোগ (Contact & Social)' },
    { name: 'bio_media', title: '④ ছবি ও বায়ো (Photo & Bio)' },
    { name: 'results_1st', title: '⑤ 1st Year ফলাফল (Class 11 Results)' },
    { name: 'results_2nd', title: '⑥ 2nd Year ফলাফল (Class 12 Results)' },
  ],
  fields: [
    // ═══════════════════════════════════════════
    // ① Name & Basic
    // ═══════════════════════════════════════════
    defineField({
      name: 'position',
      title: 'Serial / Position (ক্রমিক নম্বর)',
      type: 'number',
      group: 'basic',
      description: 'Student display order. Lower number = appears first.',
    }),
    defineField({
      name: 'name_en',
      title: 'Full Name (English)',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name_bn',
      title: 'সম্পূর্ণ নাম (বাংলা)',
      type: 'string',
      group: 'basic',
      description: 'খালি থাকলে ইংরেজি নাম দেখাবে।',
    }),
    defineField({
      name: 'dob_date',
      title: '📅 Date of Birth / জন্ম তারিখ (ক্যালেন্ডার)',
      type: 'date',
      group: 'basic',
      description: 'ক্যালেন্ডার থেকে জন্ম তারিখ ও মাস সিলেক্ট করুন। ⚠️ সাল গুরুত্বপূর্ণ নয় — শুধু দিন ও মাস ব্যবহৃত হবে।',
      options: {
        dateFormat: 'DD-MMMM',
      },
    }),
    // Legacy fields — hidden, kept for backward compatibility with existing data
    defineField({
      name: 'dob_month',
      title: 'Birth Month (Legacy)',
      type: 'string',
      group: 'basic',
      hidden: true,
      options: {
        list: [
          { title: 'January (জানুয়ারি)', value: '01' },
          { title: 'February (ফেব্রুয়ারি)', value: '02' },
          { title: 'March (মার্চ)', value: '03' },
          { title: 'April (এপ্রিল)', value: '04' },
          { title: 'May (মে)', value: '05' },
          { title: 'June (জুন)', value: '06' },
          { title: 'July (জুলাই)', value: '07' },
          { title: 'August (আগস্ট)', value: '08' },
          { title: 'September (সেপ্টেম্বর)', value: '09' },
          { title: 'October (অক্টোবর)', value: '10' },
          { title: 'November (নভেম্বর)', value: '11' },
          { title: 'December (ডিসেম্বর)', value: '12' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'dob_day',
      title: 'Birth Day (Legacy)',
      type: 'string',
      group: 'basic',
      hidden: true,
      options: {
        list: [
          '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
          '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
          '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'dob',
      title: 'Date of Birth (Legacy Manual)',
      type: 'string',
      group: 'basic',
      hidden: true,
      placeholder: '04/10',
    }),
    defineField({
      name: 'blood_group',
      title: 'Blood Group (রক্তের গ্রুপ)',
      type: 'string',
      group: 'basic',
      options: {
        list: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'batch',
      title: 'Batch (ব্যাচ)',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'HSC-27 (Founder Batch)', value: 'HSC-27' },
          { title: 'HSC-28 (2026-27 Batch)', value: 'HSC-28' },
          { title: 'HSC-29 (2027-28 Batch)', value: 'HSC-29' },
          { title: 'HSC-30 (2028-29 Batch)', value: 'HSC-30' },
          { title: 'HSC-31 (2029-30 Batch)', value: 'HSC-31' },
          { title: 'HSC-32 (2030-31 Batch)', value: 'HSC-32' },
          { title: 'HSC-33 (2031-32 Batch)', value: 'HSC-33' },
          { title: 'HSC-34 (2032-33 Batch)', value: 'HSC-34' },
          { title: 'HSC-35 (2033-34 Batch)', value: 'HSC-35' },
          { title: 'HSC-26 (Alumni)', value: 'HSC-26' },
          { title: 'HSC-25 (Alumni)', value: 'HSC-25' },
          { title: 'HSC-24 (Alumni)', value: 'HSC-24' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'HSC-27',
      description: 'Class XII → HSC-27 etc. Replaces old "Class 11/12" field.',
    }),

    // ═══════════════════════════════════════════
    // ② Academic & Room
    // ═══════════════════════════════════════════
    defineField({
      name: 'room_ref',
      title: 'Assigned Room (রুম নির্বাচন — রুম ডিরেক্টরি)',
      type: 'reference',
      to: [{ type: 'room' }],
      group: 'academic',
      description: 'বিদ্যমান রুমসমূহ থেকে সিলেক্ট করুন। এটি রুম ডিরেক্টরি ও রুমমেট পেজের সাথে সরাসরি সংযুক্ত।',
    }),
    defineField({
      name: 'room_no',
      title: 'Current / 2nd Year Room Number (বর্তমান / ২য় বর্ষের রুম)',
      type: 'string',
      group: 'academic',
      description: 'মূল রুম নম্বর (যেমন: ৩১৭, ৩২৫)। রুম রেফারেন্স সিলেক্ট করা থাকলে এটি স্বয়ংক্রিয়ভাবে সিঙ্ক হবে।',
      placeholder: 'e.g. 317',
    }),
    defineField({
      name: 'room_1st_year',
      title: 'Room (1st Year) - ১ম বর্ষের রুম (গ্রাউন্ড ফ্লোর)',
      type: 'object',
      group: 'academic',
      description: '১ম বর্ষে থাকাকালীন রুম নম্বর (১০২, ১০৩, ১০৪) নির্বাচন করুন এবং নির্দিষ্ট বেডমেট সিলেক্ট করুন।',
      fields: [
        defineField({
          name: 'room_no',
          title: 'Room Number (১ম বর্ষের রুম নম্বর)',
          type: 'string',
          options: {
            list: [
              { title: 'ROOM 102 (১ম বর্ষ - নিচ তলা)', value: '102' },
              { title: 'ROOM 103 (১ম বর্ষ - নিচ তলা)', value: '103' },
              { title: 'ROOM 104 (১ম বর্ষ - নিচ তলা)', value: '104' },
            ],
          },
          description: '১ম বর্ষের রুম (১০২, ১০৩, ১০৪) ড্রপডাউন থেকে নির্বাচন করুন।',
        }),
        defineField({
          name: 'bedmate_ref',
          title: 'Bedmate Selection (১ম বর্ষের নির্দিষ্ট বেডমেট নির্বাচন)',
          type: 'reference',
          to: [{ type: 'student' }],
          options: {
            filter: ({ document }) => {
              const batch = document?.batch || 'HSC-27'
              const rawId = document?._id || ''
              const cleanId = rawId.replace(/^drafts\./, '')
              return {
                filter: '_type == "student" && batch == $batch && !(_id in [$id1, $id2])',
                params: {
                  batch,
                  id1: cleanId,
                  id2: `drafts.${cleanId}`,
                },
              }
            },
          },
          description: '১০২, ১০৩, ১০৪ রুমে যিনি আপনার নির্দিষ্ট সিট/বেডমেট তাকে নির্বাচন করুন।',
        }),
        defineField({
          name: 'bedmate_name',
          title: 'Bedmate Name (বেডমেটের নাম — ব্যাকআপ/ম্যানুয়াল)',
          type: 'string',
          placeholder: 'e.g. Md. Shanto',
        }),
      ],
    }),
    defineField({
      name: 'room_2nd_year',
      title: 'Room (2nd Year) - ২য় বর্ষের রুম (৩য় তলা)',
      type: 'object',
      group: 'academic',
      description: '২য় বর্ষে ওঠার পর ৩১৪ থেকে ৩২৯ রুম এবং রুমমেট নির্বাচন করুন। ১ম বর্ষে থাকাকালীন এটি খালি রাখুন।',
      fields: [
        defineField({
          name: 'room_no',
          title: 'Room Number (২য় বর্ষের রুম নম্বর)',
          type: 'string',
          options: {
            list: [
              { title: 'ROOM 314 (৩য় তলা)', value: '314' },
              { title: 'ROOM 315 (৩য় তলা)', value: '315' },
              { title: 'ROOM 316 (৩য় তলা)', value: '316' },
              { title: 'ROOM 317 (৩য় তলা)', value: '317' },
              { title: 'ROOM 318 (৩য় তলা)', value: '318' },
              { title: 'ROOM 319 (৩য় তলা)', value: '319' },
              { title: 'ROOM 320 (৩য় তলা)', value: '320' },
              { title: 'ROOM 321 (৩য় তলা)', value: '321' },
              { title: 'ROOM 322 (৩য় তলা)', value: '322' },
              { title: 'ROOM 323 (৩য় তলা)', value: '323' },
              { title: 'ROOM 324 (৩য় তলা)', value: '324' },
              { title: 'ROOM 325 (৩য় তলা)', value: '325' },
              { title: 'ROOM 326 (৩য় তলা)', value: '326' },
              { title: 'ROOM 327 (৩য় তলা)', value: '327' },
              { title: 'ROOM 328 (৩য় তলা)', value: '328' },
              { title: 'ROOM 329 (৩য় তলা)', value: '329' },
            ],
          },
          description: '২য় বর্ষে ওঠার পর রুম সিলেক্ট করুন। ১ম বর্ষে খালি রাখুন।',
        }),
        defineField({
          name: 'bedmate_ref',
          title: 'Roommate Selection (২য় বর্ষের রুমমেট নির্বাচন)',
          type: 'reference',
          to: [{ type: 'student' }],
          options: {
            filter: ({ document }) => {
              const batch = document?.batch || 'HSC-27'
              const rawId = document?._id || ''
              const cleanId = rawId.replace(/^drafts\./, '')
              return {
                filter: '_type == "student" && batch == $batch && !(_id in [$id1, $id2])',
                params: {
                  batch,
                  id1: cleanId,
                  id2: `drafts.${cleanId}`,
                },
              }
            },
          },
          description: '২য় বর্ষে আপনার রুমে অপর শিক্ষার্থীকে সিলেক্ট করুন।',
        }),
        defineField({
          name: 'bedmate_name',
          title: 'Roommate Name (রুমমেটের নাম — ব্যাকআপ/ম্যানুয়াল)',
          type: 'string',
          placeholder: 'e.g. Kayes',
        }),
      ],
    }),
    defineField({
      name: 'short_roll',
      title: 'Roll Number (ছোট রোল)',
      type: 'string',
      group: 'academic',
      description: 'Just the roll digits: 161, 9, 78, 1132 etc. Leading zeros optional — system handles it. Full roll auto-generates from batch + group + this roll.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'group',
      title: 'Group (বিভাগ)',
      type: 'string',
      group: 'academic',
      options: {
        list: [
          { title: 'Science — বিজ্ঞান (01)', value: 'science' },
          { title: 'Business Studies — ব্যবসায় শিক্ষা (02)', value: 'commerce' },
          { title: 'Humanities — মানবিক (03)', value: 'arts' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      description: 'Science = 01, B.Studies = 02, Humanities = 03 (for full roll generation).',
    }),
    defineField({
      name: 'section',
      title: 'Section (সেকশন)',
      type: 'string',
      group: 'academic',
      options: {
        list: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        layout: 'radio',
        direction: 'horizontal',
      },
      description: 'A–J সেকশন অনুভূমিক রেডিও বাটন থেকে সহজে নির্বাচন করুন।',
    }),
    defineField({
      name: 'practical_group',
      title: 'Practical Group (ব্যবহারিক গ্রুপ)',
      type: 'string',
      group: 'academic',
      options: {
        list: [
          'A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2',
          'E1', 'E2', 'F1', 'F2', 'G1', 'G2', 'H1', 'H2',
          'I1', 'I2', 'J1', 'J2'
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      description: 'ব্যবহারিক গ্রুপের রেডিও বাটন নির্বাচন করুন।',
    }),

    // ═══════════════════════════════════════════
    // ③ Contact & Social
    // ═══════════════════════════════════════════
    defineField({
      name: 'phone',
      title: 'Student Phone Number (ফোন নম্বর)',
      type: 'string',
      group: 'contact',
      description: 'Main phone number.',
    }),
    defineField({
      name: 'phone_has_whatsapp',
      title: 'This phone has WhatsApp',
      type: 'boolean',
      group: 'contact',
      initialValue: true,
      description: 'Tick if this main number is also on WhatsApp.',
    }),
    defineField({
      name: 'phone_has_telegram',
      title: 'This phone has Telegram',
      type: 'boolean',
      group: 'contact',
      initialValue: false,
    }),
    defineField({
      name: 'whatsapp_alt',
      title: 'Separate WhatsApp Number (আলাদা হোয়াটসঅ্যাপ)',
      type: 'string',
      group: 'contact',
      description: 'Only fill if WhatsApp is on a DIFFERENT number than the main phone.',
    }),
    defineField({
      name: 'telegram_alt',
      title: 'Separate Telegram Number/Username',
      type: 'string',
      group: 'contact',
      description: 'Only fill if Telegram is on a different number or username.',
    }),
    defineField({
      name: 'father_phone',
      title: 'Guardian / Father Phone (অভিভাবক নম্বর)',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'address_en',
      title: 'Address (English)',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'address_bn',
      title: 'ঠিকানা (বাংলা)',
      type: 'string',
      group: 'contact',
      description: 'খালি থাকলে ইংরেজি ঠিকানা দেখাবে।',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook Profile URL or Username (ফেসবুক লিংক বা ইউজারনেম)',
      type: 'string',
      group: 'contact',
      description: 'ফেসবুক লিংক (যেমন: https://www.facebook.com/seadix) অথবা শুধু ইউজারনেম (যেমন: seadix) — যেকোনোটি লিখলেই ফেসবুক ও মেসেঞ্জার দুটোই তৈরি হবে।',
      placeholder: 'seadix বা https://facebook.com/seadix',
    }),

    // ═══════════════════════════════════════════
    // ④ Photo & Bio
    // ═══════════════════════════════════════════
    defineField({
      name: 'photo',
      title: 'Profile Photo (ছবি)',
      type: 'image',
      group: 'bio_media',
      options: { hotspot: true },
      description: 'Portrait 3:4 ratio recommended.',
    }),
    defineField({
      name: 'bio_en',
      title: 'About / Bio (English)',
      type: 'text',
      rows: 3,
      group: 'bio_media',
      description: 'Empty → default bio auto-shows on website.',
    }),
    defineField({
      name: 'bio_bn',
      title: 'পরিচয় / বায়ো (বাংলা)',
      type: 'text',
      rows: 3,
      group: 'bio_media',
      description: 'খালি থাকলে ইংরেজি বায়ো দেখাবে।',
    }),

    // ═══════════════════════════════════════════
    // ⑤ 1st Year Results (Class 11)
    // ═══════════════════════════════════════════
    defineField({
      name: 'results_1st_year',
      title: '1st Year Results — Class 11 (একাদশ শ্রেণি ফলাফল)',
      type: 'object',
      group: 'results_1st',
      description: 'Upload PDF or paste link for each exam.',
      fields: [
        { name: 'ct1_pdf', title: 'CT-1 Exam — PDF', type: 'file' },
        { name: 'ct1_link', title: 'CT-1 Exam — Link URL', type: 'url' },
        { name: 'ct2_pdf', title: 'CT-2 Exam — PDF', type: 'file' },
        { name: 'ct2_link', title: 'CT-2 Exam — Link URL', type: 'url' },
        { name: 'hy_pdf', title: 'Half Yearly — PDF', type: 'file' },
        { name: 'hy_link', title: 'Half Yearly — Link URL', type: 'url' },
        { name: 'ct3_pdf', title: 'CT-3 Exam — PDF', type: 'file' },
        { name: 'ct3_link', title: 'CT-3 Exam — Link URL', type: 'url' },
        { name: 'yearly_pdf', title: 'Yearly Final — PDF', type: 'file' },
        { name: 'yearly_link', title: 'Yearly Final — Link URL', type: 'url' },
      ],
    }),

    // ═══════════════════════════════════════════
    // ⑥ 2nd Year Results (Class 12)
    // ═══════════════════════════════════════════
    defineField({
      name: 'results_2nd_year',
      title: '2nd Year Results — Class 12 (দ্বাদশ শ্রেণি ফলাফল)',
      type: 'object',
      group: 'results_2nd',
      description: 'Upload PDF or paste link for each exam.',
      fields: [
        { name: 'ct1_pdf', title: 'CT-1 Exam — PDF', type: 'file' },
        { name: 'ct1_link', title: 'CT-1 Exam — Link URL', type: 'url' },
        { name: 'ct2_pdf', title: 'CT-2 Exam — PDF', type: 'file' },
        { name: 'ct2_link', title: 'CT-2 Exam — Link URL', type: 'url' },
        { name: 'ct3_pdf', title: 'CT-3 Exam — PDF', type: 'file' },
        { name: 'ct3_link', title: 'CT-3 Exam — Link URL', type: 'url' },
        { name: 'test_pdf', title: 'Test Exam — PDF', type: 'file' },
        { name: 'test_link', title: 'Test Exam — Link URL', type: 'url' },
      ],
    }),

    // Hidden auto-generated fields (kept for backward compatibility)
    defineField({
      name: 'student_id',
      title: 'Student ID (Auto)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'class_no',
      title: 'Class (Legacy)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'full_roll',
      title: 'Full Roll (Legacy)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'messenger',
      title: 'Messenger (Legacy)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'pdfs',
      title: 'Legacy PDFs',
      type: 'object',
      hidden: true,
      fields: [
        { name: 'ct1', title: 'CT-1', type: 'file' },
        { name: 'ct2', title: 'CT-2', type: 'file' },
        { name: 'hy', title: 'HY', type: 'file' },
        { name: 'ct3', title: 'CT-3', type: 'file' },
        { name: 'yearly', title: 'Yearly', type: 'file' },
      ],
    }),
    defineField({
      name: 'custom_links',
      title: 'Legacy Custom Links',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'url', type: 'url' }] }],
      hidden: true,
    }),
    defineField({
      name: 'dob_bn',
      title: 'Legacy DOB BN',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'generated_pdf_names',
      title: 'Legacy Generated PDF Names',
      type: 'object',
      fields: [
        { name: 'ct1', type: 'string' },
        { name: 'ct2', type: 'string' },
        { name: 'hy', type: 'string' },
        { name: 'ct3', type: 'string' },
        { name: 'yearly', type: 'string' },
        { name: 'test', type: 'string' },
      ],
      hidden: true,
    }),
    defineField({
      name: 'group_bn',
      title: 'Legacy Group BN',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'group_en',
      title: 'Legacy Group EN',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'roommate_ids',
      title: 'Legacy Roommate IDs',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: true,
    }),
  ],

  orderings: [
    {
      title: 'Batch → Roll',
      name: 'batchRoll',
      by: [
        { field: 'batch', direction: 'desc' },
        { field: 'short_roll', direction: 'asc' },
      ],
    },
    {
      title: 'Position',
      name: 'positionAsc',
      by: [{ field: 'position', direction: 'asc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name_en', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'name_en',
      roll: 'short_roll',
      room: 'room_no',
      batch: 'batch',
      group: 'group',
      media: 'photo',
      class_no: 'class_no',
    },
    prepare({ title, roll, room, batch, group, media, class_no }) {
      const groupCode = group === 'science' ? 'Sci' : group === 'commerce' ? 'B.St' : group === 'arts' ? 'Hum' : '';
      const displayBatch = batch || (class_no === '12' ? 'HSC-27' : class_no === '11' ? 'HSC-28' : 'HSC-27');
      const parts = [displayBatch, groupCode, room ? `R${room}` : '', roll ? `Roll ${roll}` : ''].filter(Boolean);
      return {
        title: title || 'Unnamed Student',
        subtitle: parts.join(' · '),
        media: media,
      }
    },
  },
})
