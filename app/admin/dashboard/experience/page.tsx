import { getExperiences, seedExperience } from '@/app/actions/experience.action'
import { ExperienceData } from '@/app/types/experience'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Edit } from 'lucide-react'
import StatusBadge from '@/components/admin/StatusBadge'
import Link from 'next/link'
import React from 'react'

export const dynamic = 'force-dynamic'

async function Page() {
    let experiences: ExperienceData[] = []
    let failed = false
    try {
        experiences = await getExperiences(true)
    } catch (error) {
        console.error('Failed to load experiences:', error)
        failed = true
    }

    return (
        <div className='w-full h-full flex flex-col p-4 md:p-10 items-start'>
            <span className='md:text-2xl font-semibold text-xl text-gray-900 dark:text-gray-100'>
                Experience
            </span>
            <p className='text-gray-500 mt-2 mb-6'>
                Manage the work experience shown on the website.
            </p>

            <div className='flex gap-2 mb-4 md:mb-6'>
                <Link href="/admin/dashboard/experience/add">
                    <Button>Add Experience</Button>
                </Link>
                {!failed && experiences.length === 0 && (
                    <form action={seedExperience}>
                        <Button variant="outline" type="submit">
                            Import current website content
                        </Button>
                    </form>
                )}
            </div>

            {failed ? (
                <p className='text-red-500'>Could not load experiences. Check the database connection and reload.</p>
            ) : (
                <div className="rounded-md border overflow-x-auto w-full max-w-4xl">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Order</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead className="hidden md:table-cell">Role</TableHead>
                                <TableHead className="hidden md:table-cell">Period</TableHead>
                                <TableHead className="hidden lg:table-cell">Projects</TableHead>
                                <TableHead className="w-[90px]">Status</TableHead>
                                <TableHead className="w-[70px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {experiences.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-6">
                                        No experience entries yet. Use &quot;Import current website content&quot; to start from what is live today.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                experiences.map((exp) => (
                                    <TableRow key={exp._id}>
                                        <TableCell>{exp.order}</TableCell>
                                        <TableCell className="font-medium">{exp.company}</TableCell>
                                        <TableCell className="hidden md:table-cell">{exp.title}</TableCell>
                                        <TableCell className="hidden md:table-cell">{exp.period}</TableCell>
                                        <TableCell className="hidden lg:table-cell">{exp.projects.length}</TableCell>
                                        <TableCell>
                                            <StatusBadge active={exp.active !== false} />
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/admin/dashboard/experience/${exp._id}`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}

export default Page
