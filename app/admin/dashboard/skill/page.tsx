import { getSkillGroups, seedSkillGroups } from '@/app/actions/skill.action'
import { SkillGroupData } from '@/app/types/skill'
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
import Link from 'next/link'
import React from 'react'

export const dynamic = 'force-dynamic'

async function Page() {
    let skillGroups: SkillGroupData[] = []
    let failed = false
    try {
        skillGroups = await getSkillGroups()
    } catch (error) {
        console.error('Failed to load skill groups:', error)
        failed = true
    }

    return (
        <div className='w-full h-full flex flex-col p-4 md:p-10 items-start'>
            <span className='md:text-2xl font-semibold text-xl text-gray-900'>
                Skills
            </span>
            <p className='text-gray-500 mt-2 mb-6'>
                Manage the skill categories shown on the website.
            </p>

            <div className='flex gap-2 mb-4 md:mb-6'>
                <Link href="/admin/dashboard/skill/add">
                    <Button>Add Skill Group</Button>
                </Link>
                {!failed && skillGroups.length === 0 && (
                    <form action={seedSkillGroups}>
                        <Button variant="outline" type="submit">
                            Import current website content
                        </Button>
                    </form>
                )}
            </div>

            {failed ? (
                <p className='text-red-500'>Could not load skill groups. Check the database connection and reload.</p>
            ) : (
                <div className="rounded-md border overflow-x-auto w-full max-w-4xl">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Order</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="hidden md:table-cell">Skills</TableHead>
                                <TableHead className="w-[70px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {skillGroups.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-6">
                                        No skill groups yet. Use &quot;Import current website content&quot; to start from what is live today.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                skillGroups.map((group) => (
                                    <TableRow key={group._id}>
                                        <TableCell>{group.order}</TableCell>
                                        <TableCell className="font-medium">{group.category}</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <div className="flex flex-wrap gap-1">
                                                {group.skills.map((skill, i) => (
                                                    <span key={i} className="bg-muted px-2 py-1 rounded-full text-sm">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/admin/dashboard/skill/${group._id}`}>
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
