import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

const ALL_BATCHES = [
  'HSC-27', 'HSC-28', 'HSC-29', 'HSC-30',
  'HSC-31', 'HSC-32', 'HSC-33', 'HSC-34', 'HSC-35',
  'HSC-26', 'HSC-25', 'HSC-24'
]

// Generate dynamic batch templates
const batchStudentTemplates = ALL_BATCHES.map((batch) => {
  const cleanKey = batch.toLowerCase().replace(/[^a-z0-9]/g, '')
  return {
    id: `student-${cleanKey}`,
    title: `${batch} Student (স্বয়ংক্রিয় ${batch})`,
    schemaType: 'student',
    value: { batch },
  }
})

const batchRoomTemplates = ALL_BATCHES.map((batch) => {
  const cleanKey = batch.toLowerCase().replace(/[^a-z0-9]/g, '')
  return {
    id: `room-${cleanKey}`,
    title: `${batch} Room (স্বয়ংক্রিয় ${batch})`,
    schemaType: 'room',
    value: { batch },
  }
})

const batchGalleryTemplates = ALL_BATCHES.map((batch) => {
  const cleanKey = batch.toLowerCase().replace(/[^a-z0-9]/g, '')
  return {
    id: `galleryItem-${cleanKey}`,
    title: `${batch} Photo Collection`,
    schemaType: 'galleryItem',
    value: {
      batch,
      heading: batch,
    },
  }
})

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
      ...batchStudentTemplates,
      ...batchRoomTemplates,
      ...batchGalleryTemplates,
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
