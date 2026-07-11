import { getEducationById } from '@/app/actions/education.action'
import EducationForm from '@/components/admin/education/EducationForm'
import { ArrowLeftCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const dynamic = 'force-dynamic'

async function EditEducation({ params }: { params: { educationId: string } }) {
    let educationData
    try {
        educationData = await getEducationById(params.educationId)
    } catch {
        return (
            <div className='w-full h-full flex flex-col p-4 md:p-10 items-start'>
                <p className='text-gray-500'>Education entry not found.</p>
                <Link href="/admin/dashboard/education" className='mt-4 underline'>
                    Back to education
                </Link>
            </div>
        )
    }

    return (
        <div className='w-full h-full flex flex-col p-4 md:p-10 items-start'>
            <span className='md:text-2xl font-semibold text-xl text-gray-900 flex items-center'>
                <Link href="/admin/dashboard/education">
                    <ArrowLeftCircle className='h-6 w-6 text-gray-900 mr-2' />
                </Link>
                Education
            </span>
            <p className='text-gray-500 mt-2 mb-6'>
                Edit this education entry.
            </p>

            <EducationForm isEdit={true} educationItem={educationData} />
        </div>
    )
}

export default EditEducation
