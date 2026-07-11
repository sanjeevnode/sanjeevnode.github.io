import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectToDatabase } from '@/lib/mongoose'
import { Project } from '@/lib/model/projectModel'
import { Experience } from '@/lib/model/experienceModel'
import { Education } from '@/lib/model/educationModel'
import { SkillGroup } from '@/lib/model/skillModel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, FolderKanban, GraduationCap, Wrench } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function CMSPage() {
    const session = await getServerSession(authOptions)

    let counts: number[] | null = null
    try {
        await connectToDatabase()
        counts = await Promise.all([
            Project.countDocuments(),
            Experience.countDocuments(),
            Education.countDocuments(),
            SkillGroup.countDocuments(),
        ])
    } catch (error) {
        console.error('Failed to load dashboard counts:', error)
    }

    const cards = counts && [
        { label: 'Projects', count: counts[0], hint: 'shown on the website', href: '/admin/dashboard/project', icon: FolderKanban },
        { label: 'Experience', count: counts[1], hint: 'work experience entries', href: '/admin/dashboard/experience', icon: Briefcase },
        { label: 'Education', count: counts[2], hint: 'education entries', href: '/admin/dashboard/education', icon: GraduationCap },
        { label: 'Skills', count: counts[3], hint: 'skill categories', href: '/admin/dashboard/skill', icon: Wrench },
    ]

    return (
        <div className='flex flex-col p-4 md:p-10 gap-6'>
            <div>
                <h1 className='text-2xl font-bold'>Welcome{session?.user?.name ? `, ${session.user.name}` : ''}</h1>
                <p className='text-gray-500 mt-1'>Manage the content shown on sanjeevnode.in.</p>
            </div>

            {!cards ? (
                <p className='text-red-500'>Could not load stats. Check the database connection and reload.</p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl'>
                    {cards.map(({ label, count, hint, href, icon: Icon }) => (
                        <Link key={href} href={href}>
                            <Card className='hover:shadow-md transition-shadow'>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>{label}</CardTitle>
                                    <Icon className='h-4 w-4 text-gray-500' />
                                </CardHeader>
                                <CardContent>
                                    <div className='text-3xl font-bold'>{count}</div>
                                    <p className='text-xs text-gray-500 mt-1'>{hint}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
