import { getSkillGroupById } from '@/app/actions/skill.action'
import SkillForm from '@/components/admin/skill/SkillForm'
import { ArrowLeftCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const dynamic = 'force-dynamic'

async function EditSkillGroup({ params }: { params: { skillId: string } }) {
    let skillData
    try {
        skillData = await getSkillGroupById(params.skillId)
    } catch {
        return (
            <div className='w-full h-full flex flex-col p-4 md:p-10 items-start'>
                <p className='text-gray-500'>Skill group not found.</p>
                <Link href="/admin/dashboard/skill" className='mt-4 underline'>
                    Back to skills
                </Link>
            </div>
        )
    }

    return (
        <div className='w-full h-full flex flex-col p-4 md:p-10 items-start'>
            <span className='md:text-2xl font-semibold text-xl text-gray-900 dark:text-gray-100 flex items-center'>
                <Link href="/admin/dashboard/skill">
                    <ArrowLeftCircle className='h-6 w-6 text-gray-900 dark:text-gray-100 mr-2' />
                </Link>
                Skills
            </span>
            <p className='text-gray-500 mt-2 mb-6'>
                Edit this skill category.
            </p>

            <SkillForm isEdit={true} skillItem={skillData} />
        </div>
    )
}

export default EditSkillGroup
