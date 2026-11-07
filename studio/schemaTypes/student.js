import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'student',
  title: 'Students',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Information', default: true },
    { name: 'academic', title: 'Academic & Room Details' },
    { name: 'contact', title: 'Contact & Social Profiles' },
    { name: 'bio_media', title: 'Photo & Biography' },
    { name: 'results_1st', title: '1st Year Results (Class 11)' },
    { name: 'results_2nd', title: '2nd Year Results (Class 12)' },
  ],
  fields: [
    // ═══════════════════════════════════════════
    // Basic Information
    // ═══════════════════════════════════════════
    defineField({
      name: 'position',
      title: 'Serial Position',
      type: 'number',
      group: 'basic',
      description: 'শিক্ষার্থী তালিকার ক্রমিক নম্বর। ছোট নম্বর সবার আগে দেখাবে।',
    }),
    defineField({
      name: 'name_en',
      title: 'Full Name (English)',
      type: 'string',
      group: 'basic',
      description: 'শিক্ষার্থীর পূর্ণ নাম ইংরেজিতে লিখুন।',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name_bn',
      title: 'Full Name (Bangla)',
      type: 'string',
      group: 'basic',
      description: 'শিক্ষার্থীর পূর্ণ নাম বাংলায় লিখুন (খালি রাখলে ইংরেজি নাম দেখাবে)।',
    }),
    defineField({
      name: 'dob_date',
      title: 'Date of Birth (Calendar)',
      type: 'date',
      group: 'basic',
      description: 'ক্যালেন্ডার থেকে জন্ম তারিখ ও মাস নির্বাচন করুন। সাল গুরুত্বপূর্ণ নয় — জন্মদিন ফিচারের জন্য শুধু দিন ও মাস ব্যবহৃত হবে।',
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
          { title: 'January', value: '01' },
          { title: 'February', value: '02' },
          { title: 'March', value: '03' },
          { title: 'April', value: '04' },
          { title: 'May', value: '05' },
          { title: 'June', value: '06' },
          { title: 'July', value: '07' },
          { title: 'August', value: '08' },
          { title: 'September', value: '09' },
          { title: 'October', value: '10' },
          { title: 'November', value: '11' },
          { title: 'December', value: '12' },
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
      title: 'Blood Group',
      type: 'string',
      group: 'basic',
      description: 'শিক্ষার্থীর রক্তের গ্রুপ নির্বাচন করুন।',
      options: {
        list: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'string',
      group: 'basic',
      readOnly: ({ currentUser }) => {
        const superAdmins = ['quantelixvero@gmail.com', 'drseadib@gmail.com', 'seadibpc@outlook.com'];
        const email = (currentUser?.email || '').toLowerCase();
        return !email || !superAdmins.includes(email);
      },
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
      initialValue: 'HSC-28',
      description: 'শিক্ষার্থীর ব্যাচ। ব্যাচ পরিবর্তন করার অধিকার শুধুমাত্র সুপার অ্যাডমিনের রয়েছে।',
    }),

    // ═══════════════════════════════════════════
    // Academic & Room Details
    // ═══════════════════════════════════════════
    defineField({
      name: 'room_ref',
      title: 'Assigned Room (Legacy Room Ref)',
      type: 'reference',
      to: [{ type: 'room' }],
      options: {
        filter: ({ document }) => {
          const batch = document?.batch || 'HSC-27'
          return {
            filter: '_type == "room" && batch == $batch',
            params: { batch },
          }
        },
      },
      group: 'academic',
      hidden: true,
    }),
    defineField({
      name: 'room_no',
      title: 'Room Number (Legacy Room No)',
      type: 'string',
      group: 'academic',
      hidden: true,
    }),
    defineField({
      name: 'room_1st_year',
      title: 'Room (1st Year)',
      type: 'object',
      group: 'academic',
      description: '১ম বর্ষে থাকাকালীন রুম এবং নির্দিষ্ট বেডমেট ড্রপডাউন থেকে নির্বাচন করুন।',
      fields: [
        defineField({
          name: 'room_ref',
          title: 'Room Selection',
          type: 'reference',
          to: [{ type: 'room' }],
          options: {
            filter: ({ document }) => {
              const batch = document?.batch || 'HSC-27'
              return {
                filter: '_type == "room" && (batch == $batch || (!defined(batch) && $batch == "HSC-27")) && (year_type == "1st Year" || room_no in ["102", "103", "104"])',
                params: { batch },
              }
            },
          },
          description: 'সকল রুমের তালিকা থেকে ১ম বর্ষের নির্দিষ্ট রুম (১০২, ১০৩, ১০৪ ইত্যাদি) নির্বাচন করুন।',
        }),
        defineField({
          name: 'room_no',
          title: 'Room Number (Legacy)',
          type: 'string',
          hidden: true,
        }),
        defineField({
          name: 'bedmate_ref',
          title: 'Bedmate Selection',
          type: 'reference',
          to: [{ type: 'student' }],
          options: {
            filter: ({ document }) => {
              const batch = document?.batch || 'HSC-27'
              const rawId = document?._id || ''
              const cleanId = rawId.replace(/^drafts\./, '')
              return {
                filter: '_type == "student" && (batch == $batch || (!defined(batch) && $batch == "HSC-27")) && !(_id in [$id1, $id2])',
                params: {
                  batch,
                  id1: cleanId,
                  id2: `drafts.${cleanId}`,
                },
              }
            },
          },
          description: '১০২, ১০৩, ১০৪ রুমে যিনি আপনার নির্দিষ্ট বেডমেট তাকে নির্বাচন করুন।',
        }),
      ],
    }),
    defineField({
      name: 'room_2nd_year',
      title: 'Room (2nd Year)',
      type: 'object',
      group: 'academic',
      description: '২য় বর্ষে ওঠার পর রুম এবং রুমমেট নির্বাচন করুন। ১ম বর্ষের শিক্ষার্থীদের জন্য এটি খালি রাখুন।',
      fields: [
        defineField({
          name: 'room_ref',
          title: 'Room Selection',
          type: 'reference',
          to: [{ type: 'room' }],
          options: {
            filter: ({ document }) => {
              const batch = document?.batch || 'HSC-27'
              return {
                filter: '_type == "room" && (batch == $batch || (!defined(batch) && $batch == "HSC-27")) && (year_type == "2nd Year" || !(room_no in ["102", "103", "104"]))',
                params: { batch },
              }
            },
          },
          description: '২য় বর্ষের নির্দিষ্ট রুম (৩১৪–৩২৯ ইত্যাদি) ড্রপডাউন থেকে নির্বাচন করুন।',
        }),
        defineField({
          name: 'room_no',
          title: 'Room Number (Legacy)',
          type: 'string',
          hidden: true,
        }),
        defineField({
          name: 'bedmate_ref',
          title: 'Roommate Selection',
          type: 'reference',
          to: [{ type: 'student' }],
          options: {
            filter: ({ document }) => {
              const batch = document?.batch || 'HSC-27'
              const rawId = document?._id || ''
              const cleanId = rawId.replace(/^drafts\./, '')
              return {
                filter: '_type == "student" && (batch == $batch || (!defined(batch) && $batch == "HSC-27")) && !(_id in [$id1, $id2])',
                params: {
                  batch,
                  id1: cleanId,
                  id2: `drafts.${cleanId}`,
                },
              }
            },
          },
          description: '২য় বর্ষে আপনার রুমের অপর রুমমেট শিক্ষার্থীকে নির্বাচন করুন।',
        }),
      ],
    }),
    defineField({
      name: 'short_roll',
      title: 'Roll Number',
      type: 'string',
      group: 'academic',
      description: 'শিক্ষার্থীর সংক্ষিপ্ত কলেজ রোল (যেমন: 161, 9, 78)। পূর্ণাঙ্গ রোল স্বয়ংক্রিয়ভাবে তৈরি হয়।',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'group',
      title: 'Academic Group',
      type: 'string',
      group: 'academic',
      description: 'শিক্ষার্থীর বিভাগ নির্বাচন করুন (বিজ্ঞান, ব্যবসায় শিক্ষা, বা মানবিক)।',
      options: {
        list: [
          { title: 'Science (01)', value: 'science' },
          { title: 'Business Studies (02)', value: 'commerce' },
          { title: 'Humanities (03)', value: 'arts' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      group: 'academic',
      description: 'ক্লাস সেকশন A থেকে J নির্বাচন করুন। প্রযোজ্য না হলে None রাখুন।',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'A', value: 'A' },
          { title: 'B', value: 'B' },
          { title: 'C', value: 'C' },
          { title: 'D', value: 'D' },
          { title: 'E', value: 'E' },
          { title: 'F', value: 'F' },
          { title: 'G', value: 'G' },
          { title: 'H', value: 'H' },
          { title: 'I', value: 'I' },
          { title: 'J', value: 'J' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'practical_group',
      title: 'Practical Group',
      type: 'string',
      group: 'academic',
      description: 'বিজ্ঞান বিভাগের ব্যবহারিক গ্রুপ (A1, A2 ইত্যাদি)। প্রযোজ্য না হলে None রাখুন।',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'A1', value: 'A1' }, { title: 'A2', value: 'A2' },
          { title: 'B1', value: 'B1' }, { title: 'B2', value: 'B2' },
          { title: 'C1', value: 'C1' }, { title: 'C2', value: 'C2' },
          { title: 'D1', value: 'D1' }, { title: 'D2', value: 'D2' },
          { title: 'E1', value: 'E1' }, { title: 'E2', value: 'E2' },
          { title: 'F1', value: 'F1' }, { title: 'F2', value: 'F2' },
          { title: 'G1', value: 'G1' }, { title: 'G2', value: 'G2' },
          { title: 'H1', value: 'H1' }, { title: 'H2', value: 'H2' },
          { title: 'I1', value: 'I1' }, { title: 'I2', value: 'I2' },
          { title: 'J1', value: 'J1' }, { title: 'J2', value: 'J2' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),

    // ═══════════════════════════════════════════
    // Contact & Social
    // ═══════════════════════════════════════════
    defineField({
      name: 'phone',
      title: 'Student Phone Number',
      type: 'string',
      group: 'contact',
      description: 'শিক্ষার্থীর প্রধান মোবাইল নম্বর।',
    }),
    defineField({
      name: 'phone_has_whatsapp',
      title: 'Main Phone Has WhatsApp',
      type: 'boolean',
      group: 'contact',
      initialValue: true,
      description: 'প্রধান ফোন নম্বরেই হোয়াটসঅ্যাপ থাকলে এটি চালু রাখুন।',
    }),
    defineField({
      name: 'phone_has_telegram',
      title: 'Main Phone Has Telegram',
      type: 'boolean',
      group: 'contact',
      initialValue: false,
      description: 'প্রধান ফোন নম্বরে টেলিগ্রাম থাকলে এটি চালু রাখুন।',
    }),
    defineField({
      name: 'whatsapp_alt',
      title: 'Separate WhatsApp Number',
      type: 'string',
      group: 'contact',
      description: 'প্রধান নম্বরের বাইরে ভিন্ন কোনো নম্বরে হোয়াটসঅ্যাপ থাকলে এখানে লিখুন।',
    }),
    defineField({
      name: 'telegram_alt',
      title: 'Separate Telegram Number / Username',
      type: 'string',
      group: 'contact',
      description: 'ভিন্ন কোনো নম্বরে বা ইউজারনেমে টেলিগ্রাম থাকলে এখানে লিখুন।',
    }),
    defineField({
      name: 'father_phone',
      title: 'Guardian / Father Phone Number',
      type: 'string',
      group: 'contact',
      description: 'শিক্ষার্থীর অভিভাবকের মোবাইল নম্বর।',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'contact',
      description: 'শিক্ষার্থীর ব্যক্তিগত ইমেইল ঠিকানা।',
    }),
    defineField({
      name: 'address_en',
      title: 'Permanent Address (English)',
      type: 'string',
      group: 'contact',
      description: 'স্থায়ী বা বর্তমান ঠিকানা (ইংরেজি)।',
    }),
    defineField({
      name: 'address_bn',
      title: 'Permanent Address (Bangla)',
      type: 'string',
      group: 'contact',
      description: 'স্থায়ী বা বর্তমান ঠিকানা (বাংলা)।',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook Profile URL or Username',
      type: 'string',
      group: 'contact',
      description: 'ফেসবুক প্রোফাইল লিংক বা ইউজারনেম। এটি থেকে সরাসরি মেসেঞ্জার লিংকও তৈরি হয়।',
      placeholder: 'e.g. seadix or https://facebook.com/seadix',
    }),

    // ═══════════════════════════════════════════
    // Photo & Bio
    // ═══════════════════════════════════════════
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      group: 'bio_media',
      options: { hotspot: true },
      description: 'শিক্ষার্থীর পাসপোর্ট বা পোর্ট্রেট ছবি (৩:৪ অনুপাত বাঞ্ছনীয়)।',
    }),
    defineField({
      name: 'bio_en',
      title: 'About / Bio (English)',
      type: 'text',
      rows: 3,
      group: 'bio_media',
      description: 'শিক্ষার্থীর আত্মপরিচয় ও ভবিষ্যৎ লক্ষ্য (ইংরেজি)।',
    }),
    defineField({
      name: 'bio_bn',
      title: 'About / Bio (Bangla)',
      type: 'text',
      rows: 3,
      group: 'bio_media',
      description: 'শিক্ষার্থীর আত্মপরিচয় ও ভবিষ্যৎ লক্ষ্য (বাংলা)।',
    }),

    // ═══════════════════════════════════════════
    // 1st Year Results (Class 11)
    // ═══════════════════════════════════════════
    defineField({
      name: 'results_1st_year',
      title: '1st Year Academic Results (Class 11)',
      type: 'object',
      group: 'results_1st',
      description: 'একাদশ শ্রেণির প্রতিটি পরীক্ষার ফলাফল পিডিএফ আপলোড বা ড্রাইভ লিংক যুক্ত করুন।',
      fields: [
        { name: 'ct1_pdf', title: 'CT-1 Exam PDF', type: 'file' },
        { name: 'ct1_link', title: 'CT-1 Exam Link URL', type: 'url' },
        { name: 'ct2_pdf', title: 'CT-2 Exam PDF', type: 'file' },
        { name: 'ct2_link', title: 'CT-2 Exam Link URL', type: 'url' },
        { name: 'hy_pdf', title: 'Half Yearly Exam PDF', type: 'file' },
        { name: 'hy_link', title: 'Half Yearly Exam Link URL', type: 'url' },
        { name: 'ct3_pdf', title: 'CT-3 Exam PDF', type: 'file' },
        { name: 'ct3_link', title: 'CT-3 Exam Link URL', type: 'url' },
        { name: 'yearly_pdf', title: 'Yearly Final Exam PDF', type: 'file' },
        { name: 'yearly_link', title: 'Yearly Final Exam Link URL', type: 'url' },
      ],
    }),

    // ═══════════════════════════════════════════
    // 2nd Year Results (Class 12)
    // ═══════════════════════════════════════════
    defineField({
      name: 'results_2nd_year',
      title: '2nd Year Academic Results (Class 12)',
      type: 'object',
      group: 'results_2nd',
      description: 'দ্বাদশ শ্রেণির প্রতিটি পরীক্ষার ফলাফল পিডিএফ আপলোড বা ড্রাইভ লিংক যুক্ত করুন।',
      fields: [
        { name: 'ct1_pdf', title: 'CT-1 Exam PDF', type: 'file' },
        { name: 'ct1_link', title: 'CT-1 Exam Link URL', type: 'url' },
        { name: 'ct2_pdf', title: 'CT-2 Exam PDF', type: 'file' },
        { name: 'ct2_link', title: 'CT-2 Exam Link URL', type: 'url' },
        { name: 'ct3_pdf', title: 'CT-3 Exam PDF', type: 'file' },
        { name: 'ct3_link', title: 'CT-3 Exam Link URL', type: 'url' },
        { name: 'test_pdf', title: 'Test Exam PDF', type: 'file' },
        { name: 'test_link', title: 'Test Exam Link URL', type: 'url' },
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
      room_ref: 'room_ref.room_no',
      room_1st_ref: 'room_1st_year.room_ref.room_no',
      room_2nd_ref: 'room_2nd_year.room_ref.room_no',
      batch: 'batch',
      group: 'group',
      media: 'photo',
      class_no: 'class_no',
    },
    prepare({ title, roll, room, room_ref, room_1st_ref, room_2nd_ref, batch, group, media, class_no }) {
      const groupCode = group === 'science' ? 'Sci' : group === 'commerce' ? 'B.St' : group === 'arts' ? 'Hum' : '';
      const displayBatch = batch || (class_no === '12' ? 'HSC-27' : class_no === '11' ? 'HSC-28' : 'HSC-27');
      const resolvedRoom = room_2nd_ref || room_1st_ref || room_ref || room;
      const parts = [displayBatch, groupCode, resolvedRoom ? `R${resolvedRoom}` : '', roll ? `Roll ${roll}` : ''].filter(Boolean);
      return {
        title: title || 'Unnamed Student',
        subtitle: parts.join(' · '),
        media: media,
      }
    },
  },
})
