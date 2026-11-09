import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'developerProfile',
  title: 'Developer Profile',
  type: 'document',
  groups: [
    { name: 'bio', title: 'Bio & Portrait', default: true },
    { name: 'panels', title: 'About, Contact & Focus' },
    { name: 'skills_projects', title: 'Skills & Projects' },
    { name: 'contributors', title: 'Contributors' },
    { name: 'feedback_portal', title: 'Feedback & Grievance Portal' },
  ],
  fields: [
    // ═══════════════════════════════════════════
    // Developer Page Sections Controls
    // ═══════════════════════════════════════════
    defineField({
      name: 'sections_control',
      hidden: true,
      title: 'Developer Page Sections Visibility & Order',
      type: 'array',
      description: 'ডেভেলপার পেজের সেকশনগুলোর ক্রম সাজান। যে সেকশনটি উপরে থাকবে ওয়েবসাইটে সেটি আগে দেখাবে।',
      of: [
        {
          type: 'object',
          name: 'devSectionItem',
          title: 'Section',
          fields: [
            defineField({
              name: 'section_id',
              title: 'Section',
              type: 'string',
              description: 'যে সেকশনটি নিয়ন্ত্রণ করতে চান তা ড্রপডাউন থেকে নির্বাচন করুন।',
              options: {
                list: [
                  { title: 'Hero Bio & Portrait', value: 'hero_bio' },
                  { title: 'Overview Panels', value: 'overview_panels' },
                  { title: 'Featured Projects', value: 'featured_projects' },
                  { title: 'Skills & Project Method', value: 'skills_timeline' },
                  { title: 'Contributors', value: 'contributors' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'enabled',
              title: 'Show Section on Website',
              type: 'boolean',
              description: 'চালু (ON) থাকলে ডেভেলপার পেজে এই সেকশনটি প্রদর্শিত হবে। বন্ধ করতে অফ করুন।',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              section_id: 'section_id',
              enabled: 'enabled',
            },
            prepare({ section_id, enabled }) {
              const titles = {
                hero_bio: 'Hero Bio & Portrait',
                overview_panels: 'Overview Panels',
                featured_projects: 'Featured Projects',
                skills_timeline: 'Skills & Timeline',
                contributors: 'Contributors',
              }
              const isOff = enabled === false
              return {
                title: titles[section_id] || section_id || 'Section',
                subtitle: isOff ? 'Hidden on site' : 'Visible on site',
              }
            },
          },
        },
      ],
      initialValue: [
        { _key: 'dsec1', section_id: 'hero_bio', enabled: true },
        { _key: 'dsec2', section_id: 'overview_panels', enabled: true },
        { _key: 'dsec3', section_id: 'featured_projects', enabled: true },
        { _key: 'dsec4', section_id: 'skills_timeline', enabled: true },
        { _key: 'dsec5', section_id: 'contributors', enabled: true },
      ],
    }),

    // ═══════════════════════════════════════════
    // Bio & Portrait
    // ═══════════════════════════════════════════
    defineField({
      name: 'eyebrow_en',
      title: 'Eyebrow Tag (English)',
      type: 'string',
      group: 'bio',
      placeholder: 'Aspiring Software Engineer',
      description: 'নামের উপরের ছোট পরিচিতিমূলক পদবি বা ট্যাগলাইন (ইংরেজি)।',
    }),
    defineField({
      name: 'eyebrow_bn',
      title: 'Eyebrow Tag (Bangla)',
      type: 'string',
      group: 'bio',
      placeholder: 'উচ্চাকাঙ্ক্ষী সফটওয়্যার প্রকৌশলী',
      description: 'নামের উপরের ছোট পরিচিতিমূলক পদবি বা ট্যাগলাইন (বাংলা)।',
    }),
    defineField({
      name: 'name_en',
      title: 'Developer Name (English)',
      type: 'string',
      group: 'bio',
      placeholder: 'Abdullah Al Adib',
      description: 'ডেভেলপারের পূর্ণ নাম (ইংরেজি)।',
    }),
    defineField({
      name: 'name_bn',
      title: 'Developer Name (Bangla)',
      type: 'string',
      group: 'bio',
      placeholder: 'আবদুল্লাহ আল আদিব',
      description: 'ডেভেলপারের পূর্ণ নাম (বাংলা)।',
    }),
    defineField({
      name: 'lead_en',
      title: 'Lead Bio (English)',
      type: 'text',
      rows: 3,
      group: 'bio',
      description: 'ডেভেলপারের সংক্ষিপ্ত ভূমিকা ও আত্মপরিচয় (ইংরেজি)।',
    }),
    defineField({
      name: 'lead_bn',
      title: 'Lead Bio (Bangla)',
      type: 'text',
      rows: 3,
      group: 'bio',
      description: 'ডেভেলপারের সংক্ষিপ্ত ভূমিকা ও আত্মপরিচয় (বাংলা)।',
    }),
    defineField({
      name: 'portfolio_link',
      title: 'Personal Portfolio Link',
      type: 'url',
      group: 'bio',
      placeholder: 'https://adi.pro.bd/',
      description: 'ব্যক্তিগত পোর্টফোলিও ওয়েবসাইটের সরাসরি লিংক।',
    }),
    defineField({
      name: 'projects_link',
      title: 'View Projects Link',
      type: 'url',
      group: 'bio',
      placeholder: 'https://adi.pro.bd/#projects',
      description: 'প্রোজেক্ট তালিকার সরাসরি লিংক।',
    }),
    defineField({
      name: 'portrait',
      title: 'Developer Portrait Image',
      type: 'image',
      group: 'bio',
      description: 'ডেভেলপারের পরিষ্কার প্রোফাইল বা পোর্ট্রেট ছবি।',
    }),
    defineField({
      name: 'eyebrow_org_en',
      title: 'Eyebrow Organization (English)',
      type: 'string',
      group: 'bio',
      placeholder: 'Dhaka College',
      initialValue: 'Dhaka College',
      description: 'নামের উপরের ট্যাগের প্রতিষ্ঠানের নাম (ইংরেজি)।',
    }),
    defineField({
      name: 'eyebrow_org_bn',
      title: 'Eyebrow Organization (Bangla)',
      type: 'string',
      group: 'bio',
      placeholder: 'ঢাকা কলেজ',
      initialValue: 'ঢাকা কলেজ',
      description: 'নামের উপরের ট্যাগের প্রতিষ্ঠানের নাম (বাংলা)।',
    }),
    defineField({
      name: 'portrait_badge_en',
      title: 'Portrait Badge / Caption (English)',
      type: 'string',
      group: 'bio',
      placeholder: 'Lead Developer · Dhaka College',
      initialValue: 'Lead Developer · Dhaka College',
      description: 'ছবির নিচের ভেরিফাইড ব্যাজের লেখা (ইংরেজি)।',
    }),
    defineField({
      name: 'portrait_badge_bn',
      title: 'Portrait Badge / Caption (Bangla)',
      type: 'string',
      group: 'bio',
      placeholder: 'প্রধান ডেভেলপার · ঢাকা কলেজ',
      initialValue: 'প্রধান ডেভেলপার · ঢাকা কলেজ',
      description: 'ছবির নিচের ভেরিফাইড ব্যাজের লেখা (বাংলা)।',
    }),
    defineField({
      name: 'metrics',
      title: 'Hero Metrics Strip (3 Cards)',
      type: 'array',
      group: 'bio',
      description: 'হিরো সেকশনের নিচের ৩টি তথ্য কার্ড (যেমন: ব্যাচ, দক্ষতা, হল)। ইচ্ছামত এডিট বা নতুন কার্ড যোগ করতে পারেন।',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title_en', title: 'Metric Title (English)', type: 'string', placeholder: "HSC '27" },
            { name: 'title_bn', title: 'Metric Title (Bangla)', type: 'string', placeholder: "এইচএসসি '২৭" },
            { name: 'subtitle_en', title: 'Subtitle (English)', type: 'string', placeholder: 'Science Dept' },
            { name: 'subtitle_bn', title: 'Subtitle (Bangla)', type: 'string', placeholder: 'বিজ্ঞান বিভাগ' },
          ],
          preview: {
            select: {
              title: 'title_en',
              subtitle: 'subtitle_en',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Metric',
                subtitle: subtitle || '',
              }
            },
          },
        },
      ],
      initialValue: [
        { _key: 'm1', title_en: "HSC '27", title_bn: "এইচএসসি '২৭", subtitle_en: "Science Dept", subtitle_bn: "বিজ্ঞান বিভাগ" },
        { _key: 'm2', title_en: "Full-Stack", title_bn: "ফুল-স্ট্যাক", subtitle_en: "Web & Cloud Systems", subtitle_bn: "ওয়েব ও ক্লাউড সিস্টেম" },
        { _key: 'm3', title_en: "International Hall", title_bn: "আন্তর্জাতিক ছাত্রাবাস", subtitle_en: "Dhaka College", subtitle_bn: "ঢাকা কলেজ" },
      ],
    }),

    // ═══════════════════════════════════════════
    // Overview Panels
    // ═══════════════════════════════════════════
    defineField({
      name: 'about_title_en',
      title: 'About Title (English)',
      type: 'string',
      group: 'panels',
      description: 'পরিচিতি কার্ডের শিরোনাম (ইংরেজি)।',
    }),
    defineField({
      name: 'about_title_bn',
      title: 'About Title (Bangla)',
      type: 'string',
      group: 'panels',
      description: 'পরিচিতি কার্ডের শিরোনাম (বাংলা)।',
    }),
    defineField({
      name: 'about_text_en',
      title: 'About Text (English)',
      type: 'text',
      rows: 4,
      group: 'panels',
      description: 'পরিচিতি কার্ডের বিস্তারিত বক্তব্য (ইংরেজি)।',
    }),
    defineField({
      name: 'about_text_bn',
      title: 'About Text (Bangla)',
      type: 'text',
      rows: 4,
      group: 'panels',
      description: 'পরিচিতি কার্ডের বিস্তারিত বক্তব্য (বাংলা)।',
    }),
    defineField({
      name: 'contact_title_en',
      title: 'Contact Title (English)',
      type: 'string',
      group: 'panels',
      description: 'যোগাযোগ কার্ডের শিরোনাম (ইংরেজি)।',
    }),
    defineField({
      name: 'contact_title_bn',
      title: 'Contact Title (Bangla)',
      type: 'string',
      group: 'panels',
      description: 'যোগাযোগ কার্ডের শিরোনাম (বাংলা)।',
    }),
    defineField({
      name: 'contact_text_en',
      title: 'Contact Text (English)',
      type: 'text',
      rows: 4,
      group: 'panels',
      description: 'যোগাযোগের মাধ্যম ও বিবরণ (ইংরেজি)।',
    }),
    defineField({
      name: 'contact_text_bn',
      title: 'Contact Text (Bangla)',
      type: 'text',
      rows: 4,
      group: 'panels',
      description: 'যোগাযোগের মাধ্যম ও বিবরণ (বাংলা)।',
    }),
    defineField({
      name: 'focus_title_en',
      title: 'Focus Title (English)',
      type: 'string',
      group: 'panels',
      description: 'উদ্দেশ্য বা লক্ষ্যের শিরোনাম (ইংরেজি)।',
    }),
    defineField({
      name: 'focus_title_bn',
      title: 'Focus Title (Bangla)',
      type: 'string',
      group: 'panels',
      description: 'উদ্দেশ্য বা লক্ষ্যের শিরোনাম (বাংলা)।',
    }),
    defineField({
      name: 'focus_text_en',
      title: 'Focus Text (English)',
      type: 'text',
      rows: 4,
      group: 'panels',
      description: 'কাজের লক্ষ্য ও ভবিষ্যৎ পরিকল্পনা (ইংরেজি)।',
    }),
    defineField({
      name: 'focus_text_bn',
      title: 'Focus Text (Bangla)',
      type: 'text',
      rows: 4,
      group: 'panels',
      description: 'কাজের লক্ষ্য ও ভবিষ্যৎ পরিকল্পনা (বাংলা)।',
    }),

    // ═══════════════════════════════════════════
    // Skills & Projects
    // ═══════════════════════════════════════════
    defineField({
      name: 'skills',
      title: 'Key Skills',
      type: 'array',
      group: 'skills_projects',
      description: 'প্রযুক্তি ও দক্ষতার নামসমূহ (যেমন: React, JavaScript, Node.js ইত্যাদি)।',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'skill', title: 'Skill Name', type: 'string', description: 'দক্ষতার নাম' },
          ],
        },
      ],
    }),
    defineField({
      name: 'projects',
      title: 'Featured Projects',
      type: 'array',
      group: 'skills_projects',
      description: 'উল্লেখযোগ্য প্রোজেক্টসমূহ এখানে যোগ করুন।',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', title: 'Category Tag', type: 'string', placeholder: 'e.g. Web App', description: 'প্রোজেক্টের ক্যাটাগরি (যেমন: Web Tool, Portal, Blog)' },
            { name: 'title', title: 'Project Title (English)', type: 'string', description: 'প্রোজেক্টের শিরোনাম (ইংরেজি)' },
            { name: 'title_bn', title: 'Project Title (Bangla)', type: 'string', description: 'প্রোজেক্টের শিরোনাম (বাংলা)' },
            { name: 'url', title: 'Project URL', type: 'url', description: 'প্রোজেক্টের সম্পূর্ণ লাইভ লিংক' },
            { name: 'domain_display', title: 'Display Domain', type: 'string', placeholder: 'e.g. seadib.blogspot.com', description: 'প্রদর্শনের জন্য সংক্ষিপ্ত ডোমেইন নাম' },
            { name: 'desc_en', title: 'Description (English)', type: 'text', rows: 2, description: 'প্রোজেক্টের সংক্ষিপ্ত বিবরণ (ইংরেজি)' },
            { name: 'desc_bn', title: 'Description (Bangla)', type: 'text', rows: 2, description: 'প্রোজেক্টের সংক্ষিপ্ত বিবরণ (বাংলা)' },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'domain_display',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Project',
                subtitle: subtitle || '',
              }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // Contributors
    // ═══════════════════════════════════════════
    defineField({
      name: 'contributors',
      title: 'Contributors',
      type: 'array',
      group: 'contributors',
      description: 'এই ওয়েব পোর্টাল তৈরিতে সহযোগীদের তথ্য ও ছবি এখানে যুক্ত করুন।',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name_en', title: 'Contributor Name (English)', type: 'string', description: 'সহযোগীর নাম (ইংরেজি)' },
            { name: 'name_bn', title: 'Contributor Name (Bangla)', type: 'string', description: 'সহযোগীর নাম (বাংলা)' },
            { name: 'desc_en', title: 'Role Description (English)', type: 'text', rows: 2, description: 'সহযোগীর অবদান ও দায়িত্ব (ইংরেজি)' },
            { name: 'desc_bn', title: 'Role Description (Bangla)', type: 'text', rows: 2, description: 'সহযোগীর অবদান ও দায়িত্ব (বাংলা)' },
            { name: 'photo', title: 'Photo', type: 'image', description: 'সহযোগীর ছবি' },
          ],
          preview: {
            select: {
              title: 'name_en',
              subtitle: 'desc_en',
              media: 'photo',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Contributor',
                subtitle: subtitle || '',
                media: (media && typeof media === 'object' && media.asset) ? media : undefined,
              }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // Feedback & Grievance Portal
    // ═══════════════════════════════════════════
    defineField({
      name: 'feedback_eyebrow',
      title: 'Feedback Eyebrow Tag',
      type: 'string',
      group: 'feedback_portal',
      placeholder: 'Developer Helpdesk & Grievance Portal',
      initialValue: 'Developer Helpdesk & Grievance Portal',
      description: 'ফিডব্যাক ও অভিযোগ পোর্টালের উপরের ছোট ট্যাগ।',
    }),
    defineField({
      name: 'feedback_title',
      title: 'Feedback Section Title',
      type: 'string',
      group: 'feedback_portal',
      placeholder: 'Submit Feedback or Grievance',
      initialValue: 'Submit Feedback or Grievance',
      description: 'ফিডব্যাক ও অভিযোগ ফর্মের প্রধান শিরোনাম (ইংরেজি)।',
    }),
    defineField({
      name: 'feedback_subtitle',
      title: 'Feedback Section Subtitle',
      type: 'text',
      rows: 2,
      group: 'feedback_portal',
      placeholder: 'Send website issues, moderator concerns, or feature suggestions directly to the developer at quantelixvero@gmail.com.',
      initialValue: 'Send website issues, moderator concerns, or feature suggestions directly to the developer at quantelixvero@gmail.com.',
      description: 'ফিডব্যাক ও অভিযোগ ফর্মের বিবরণ (ইংরেজি)।',
    }),
    defineField({
      name: 'feedback_email',
      title: 'Developer Contact Email',
      type: 'string',
      group: 'feedback_portal',
      placeholder: 'quantelixvero@gmail.com',
      initialValue: 'quantelixvero@gmail.com',
      description: 'যে ইমেইলে ওয়েবসাইটের সমস্ত ফিডব্যাক ও অভিযোগ বার্তা পৌঁছাবে।',
    }),
  ],
  preview: {
    select: {
      title: 'name_en',
      subtitle: 'lead_en',
      media: 'portrait',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Developer Profile',
        subtitle: subtitle || 'Developer',
        media: (media && typeof media === 'object' && media.asset) ? media : undefined,
      }
    },
  },
})
