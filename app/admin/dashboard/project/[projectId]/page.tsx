import { dummyProjects } from '@/app/types/project'
import ProjectForm from '@/components/admin/project/ProjectForm'
import { ArrowLeft, Link } from 'lucide-react'
import React from 'react'

interface EditProjectProps {
    params: {
        projectId: string
    }
}

function EditProject({ params }: EditProjectProps) {
    const { projectId } = params

    const prjojectData = dummyProjects.find((item) => item.id === projectId)
    return (
        <div className='w-full h-full flex flex-col p-4 md:p-10  items-start '>
            <span className='md:text-2xl font-semibold  text-xl text-gray-900 flex items-center '>
                <Link href="/admin/dashboard/project">
                    <ArrowLeft className='h-6 w-6 text-gray-900 mr-2' />
                </Link>
                Project
            </span>
            <p className=' text-gray-500 mt-2 mb-6'>
                Add a new project to the website.
            </p>

            <ProjectForm isEdit={true} projectItem={prjojectData} />
        </div>
    )
}

export default EditProject