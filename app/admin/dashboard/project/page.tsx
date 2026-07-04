
import { ProjectList } from '@/components/admin/project/ProjectList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Page() {
  return (
    <div className='w-full h-full flex flex-col p-4 md:p-10  items-start '>
      <span className='md:text-2xl font-semibold  text-xl text-gray-900'>
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

      <ProjectList />

    </div>
  )
}

export default Page