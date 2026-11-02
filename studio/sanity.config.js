import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

export default defineConfig({
  name: 'default',
  title: 'Dhaka College International Hall',

  projectId: 'w16kaeyg',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      // ═══════════════════════════════════════════
      // Pre-filled Batch Student Templates
      // ═══════════════════════════════════════════
      {
        id: 'student-hsc27',
        title: 'HSC-27 Student (স্বয়ংক্রিয় HSC-27)',
        schemaType: 'student',
        value: {
          batch: 'HSC-27',
        },
      },
      {
        id: 'student-hsc28',
        title: 'HSC-28 Student (স্বয়ংক্রিয় HSC-28)',
        schemaType: 'student',
        value: {
          batch: 'HSC-28',
        },
      },
      {
        id: 'student-hsc29',
        title: 'HSC-29 Student (স্বয়ংক্রিয় HSC-29)',
        schemaType: 'student',
        value: {
          batch: 'HSC-29',
        },
      },
      // ═══════════════════════════════════════════
      // Pre-filled Batch Room Templates
      // ═══════════════════════════════════════════
      {
        id: 'room-hsc27',
        title: 'HSC-27 Room (স্বয়ংক্রিয় HSC-27)',
        schemaType: 'room',
        value: {
          batch: 'HSC-27',
        },
      },
      {
        id: 'room-hsc28',
        title: 'HSC-28 Room (স্বয়ংক্রিয় HSC-28)',
        schemaType: 'room',
        value: {
          batch: 'HSC-28',
        },
      },
      {
        id: 'room-hsc29',
        title: 'HSC-29 Room (স্বয়ংক্রিয় HSC-29)',
        schemaType: 'room',
        value: {
          batch: 'HSC-29',
        },
      },
      // ═══════════════════════════════════════════
      // Pre-filled Batch Gallery Templates
      // ═══════════════════════════════════════════
      {
        id: 'galleryItem-hsc27',
        title: 'HSC-27 Photo Collection',
        schemaType: 'galleryItem',
        value: {
          batch: 'HSC-27',
          heading: 'HSC-27',
        },
      },
      {
        id: 'galleryItem-hsc28',
        title: 'HSC-28 Photo Collection',
        schemaType: 'galleryItem',
        value: {
          batch: 'HSC-28',
          heading: 'HSC-28',
        },
      },
      {
        id: 'galleryItem-hsc29',
        title: 'HSC-29 Photo Collection',
        schemaType: 'galleryItem',
        value: {
          batch: 'HSC-29',
          heading: 'HSC-29',
        },
      },
      // ═══════════════════════════════════════════
      // Edit Request Template (auto-status pending)
      // ═══════════════════════════════════════════
      {
        id: 'editRequest-pending',
        title: 'New Edit Request (নতুন সম্পাদনা অনুরোধ)',
        schemaType: 'editRequest',
        value: {
          status: 'pending',
        },
      },
    ],
  },
})
