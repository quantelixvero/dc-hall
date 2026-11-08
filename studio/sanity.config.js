import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes/index.js'
import { structure } from './structure'

const ALL_BATCHES = [
  'HSC-27', 'HSC-28', 'HSC-29', 'HSC-30',
  'HSC-31', 'HSC-32', 'HSC-33', 'HSC-34', 'HSC-35',
  'HSC-36', 'HSC-37', 'HSC-38', 'HSC-39', 'HSC-40'
]

// Generate dynamic batch templates
const batchStudentTemplates = ALL_BATCHES.map((batch) => {
  const cleanKey = batch.toLowerCase().replace(/[^a-z0-9]/g, '')
  return {
    id: `student-${cleanKey}`,
    title: `${batch} Student`,
    schemaType: 'student',
    value: { batch },
  }
})

const batchRoomTemplates = ALL_BATCHES.map((batch) => {
  const cleanKey = batch.toLowerCase().replace(/[^a-z0-9]/g, '')
  return {
    id: `room-${cleanKey}`,
    title: `${batch} Room`,
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

const batchGalleryEventTemplates = ALL_BATCHES.map((batch) => {
  const cleanKey = batch.toLowerCase().replace(/[^a-z0-9]/g, '')
  return {
    id: `galleryEvent-${cleanKey}`,
    title: `${batch} Event`,
    schemaType: 'galleryEvent',
    value: { batch },
  }
})

const batchFormTemplates = ALL_BATCHES.map((batch) => {
  const cleanKey = batch.toLowerCase().replace(/[^a-z0-9]/g, '')
  return {
    id: `hallForm-${cleanKey}`,
    title: `${batch} Form`,
    schemaType: 'hallForm',
    value: { batch },
  }
})

const PERMANENT_SUPER_ADMINS = [
  'quantelixvero@gmail.com',
  'quantalixvero@gmail.com',
  'quantelix@gmail.com',
  'quantalix@gmail.com',
  'drseadib@gmail.com',
  'seadibpc@outlook.com',
]

function isSuperAdminUser(currentUser) {
  if (!currentUser) return false
  const email = (currentUser.email || '').toLowerCase().trim()
  const rawName = (currentUser.name || '').toLowerCase().trim()
  const cleanName = rawName.replace(/[^a-z0-9]/g, '')
  const id = (currentUser.id || '').toLowerCase().trim()
  
  // NOTE: Simply having "administrator" role in Sanity project settings does NOT grant Super Admin.
  // quantelixvero accounts are the ONLY permanent super admins by email/identity.
  return (
    PERMANENT_SUPER_ADMINS.includes(email) ||
    PERMANENT_SUPER_ADMINS.includes(rawName) ||
    PERMANENT_SUPER_ADMINS.includes(cleanName) ||
    email.includes('quantelix') ||
    email.includes('quantalix') ||
    rawName.includes('quantelix') ||
    rawName.includes('quantalix') ||
    cleanName.includes('quantelix') ||
    cleanName.includes('quantalix') ||
    id.includes('quantelix') ||
    id === 'gkqhnthtc' ||
    id === 'p5ycmgpwu'
  )
}

export default defineConfig({
  name: 'default',
  title: 'Dhaka College International Hall',

  projectId: 'w16kaeyg',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    visionTool()
  ],

  document: {
    newDocumentOptions: (prev, { creationContext, currentUser }) => {
      // Disallow non-super admins from creating documents from global navbar '+' menu
      if (creationContext.type === 'global') {
        if (!isSuperAdminUser(currentUser)) {
          return []
        }
      }
      return prev
    },
  },

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      // Remove generic un-scoped templates
      ...prev.filter((t) => !['student', 'room', 'galleryEvent', 'hallForm'].includes(t.schemaType)),
      ...batchStudentTemplates,
      ...batchRoomTemplates,
      ...batchGalleryTemplates,
      ...batchGalleryEventTemplates,
      ...batchFormTemplates,
      {
        id: 'editRequest-pending',
        title: 'New Edit Request',
        schemaType: 'editRequest',
        value: {
          status: 'pending',
        },
      },
    ],
  },
})
