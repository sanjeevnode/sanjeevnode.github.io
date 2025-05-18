'use client'
import { getProjectById } from '@/app/actions/project.action'
import { ProjectData } from '@/app/types/project'
import ProjectForm from '@/components/admin/project/ProjectForm'
import React, { useEffect, useState } from 'react'

interface EditProjectProps {
    params: {
        projectId: string
    }
}

function EditProject({ params }: EditProjectProps) {
    const { projectId } = params
    const [projectData, setProjectData] = useState<ProjectData>()

    // Fetch project data from the server


    // Fetch project data when the component mounts
    useEffect(() => {
        async function getProjectData() {
            try {
                const pr = await getProjectById(projectId)
                setProjectData(pr)
            } catch (error) {
                console.error("Error fetching project data:", error)

            }
        }
        getProjectData()
    }, [projectId])

    return (
        <div className='w-full h-full flex flex-col p-4 md:p-10  items-start '>
            <span className='md:text-2xl font-semibold  text-xl text-gray-900 flex items-center '>

                Project
            </span>
            <p className=' text-gray-500 mt-2 mb-6'>
                Add a new project to the website.
            </p>

            <ProjectForm isEdit={true} projectItem={projectData} />
        </div>
    )
}

export default EditProject