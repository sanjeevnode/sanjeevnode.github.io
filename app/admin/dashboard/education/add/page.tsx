import EducationForm from '@/components/admin/education/EducationForm'
import { ArrowLeftCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function AddEducation() {
    return (
        <div className='w-full h-full flex flex-col p-4 md:p-10 items-start'>
            <span className='md:text-2xl font-semibold text-xl text-gray-900 flex items-center'>
                <Link href="/admin/dashboard/education">
                    <ArrowLeftCircle className='h-6 w-6 text-gray-900 mr-2' />
                </Link>
                Education
            </span>
            <p className='text-gray-500 mt-2 mb-6'>
                Add a new education entry to the website.
            </p>

            <EducationForm />
        </div>
    )
}

export default AddEducation
