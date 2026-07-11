import { getProjects } from '@/app/actions/project.action'
import { ProjectList } from '@/components/admin/project/ProjectList'
import { Button } from '@/components/ui/button'
import { ProjectData } from '@/app/types/project'
import Link from 'next/link'
import React from 'react'

export const dynamic = 'force-dynamic'

async function Page() {
  let projects: ProjectData[] = []
  let failed = false
  try {
    projects = await getProjects(true)
  } catch (error) {
    console.error('Failed to load projects:', error)
    failed = true
  }

  return (
    <div className='w-full h-full flex flex-col p-4 md:p-10  items-start '>
      <span className='md:text-2xl font-semibold  text-xl text-gray-900 dark:text-gray-100'>
        Projects
      </span>
      <p className=' text-gray-500 mt-2 mb-6'>
        Manage which projects to be displayed in the website.
      </p>

      <Link href="/admin/dashboard/project/add">
        <Button className='mb-4 md:mb-6'>
          Add Project
        </Button>
      </Link>

      {failed ? (
        <p className='text-red-500'>Could not load projects. Check the database connection and reload.</p>
      ) : (
        <ProjectList projects={projects} />
      )}
    </div>
  )
}

export default Page
