import { getEducations, seedEducation } from '@/app/actions/education.action'
import { EducationData } from '@/app/types/education'
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
    let educations: EducationData[] = []
    let failed = false
    try {
        educations = await getEducations(true)
    } catch (error) {
        console.error('Failed to load educations:', error)
        failed = true
    }

    return (
        <div className='w-full h-full flex flex-col p-4 md:p-10 items-start'>
            <span className='md:text-2xl font-semibold text-xl text-gray-900'>
                Education
            </span>
            <p className='text-gray-500 mt-2 mb-6'>
                Manage the education entries shown on the website.
            </p>

            <div className='flex gap-2 mb-4 md:mb-6'>
                <Link href="/admin/dashboard/education/add">
                    <Button>Add Education</Button>
                </Link>
                {!failed && educations.length === 0 && (
                    <form action={seedEducation}>
                        <Button variant="outline" type="submit">
                            Import current website content
                        </Button>
                    </form>
                )}
            </div>

            {failed ? (
                <p className='text-red-500'>Could not load education entries. Check the database connection and reload.</p>
            ) : (
                <div className="rounded-md border overflow-x-auto w-full max-w-4xl">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Order</TableHead>
                                <TableHead>Degree</TableHead>
                                <TableHead className="hidden md:table-cell">Institution</TableHead>
                                <TableHead className="hidden md:table-cell">Period</TableHead>
                                <TableHead className="w-[90px]">Status</TableHead>
                                <TableHead className="w-[70px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {educations.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-6">
                                        No education entries yet. Use &quot;Import current website content&quot; to start from what is live today.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                educations.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell>{item.order}</TableCell>
                                        <TableCell className="font-medium">{item.degree}</TableCell>
                                        <TableCell className="hidden md:table-cell">{item.institution}</TableCell>
                                        <TableCell className="hidden md:table-cell">{item.period}</TableCell>
                                        <TableCell>
                                            <StatusBadge active={item.active !== false} />
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/admin/dashboard/education/${item._id}`}>
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
