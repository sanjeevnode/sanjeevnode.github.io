import { getExperienceById } from '@/app/actions/experience.action'
import ExperienceForm from '@/components/admin/experience/ExperienceForm'
import { ArrowLeftCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const dynamic = 'force-dynamic'

async function EditExperience({ params }: { params: { experienceId: string } }) {
    let experienceData
    try {
        experienceData = await getExperienceById(params.experienceId)
    } catch {
        return (
            <div className='w-full h-full flex flex-col p-4 md:p-10 items-start'>
                <p className='text-gray-500'>Experience not found.</p>
                <Link href="/admin/dashboard/experience" className='mt-4 underline'>
                    Back to experience
                </Link>
            </div>
        )
    }

    return (
        <div className='w-full h-full flex flex-col p-4 md:p-10 items-start'>
            <span className='md:text-2xl font-semibold text-xl text-gray-900 dark:text-gray-100 flex items-center'>
                <Link href="/admin/dashboard/experience">
                    <ArrowLeftCircle className='h-6 w-6 text-gray-900 dark:text-gray-100 mr-2' />
                </Link>
                Experience
            </span>
            <p className='text-gray-500 mt-2 mb-6'>
                Edit this work experience.
            </p>

            <ExperienceForm isEdit={true} experienceItem={experienceData} />
        </div>
    )
}

export default EditExperience
