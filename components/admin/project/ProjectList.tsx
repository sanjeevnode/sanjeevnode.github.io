"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Edit } from "lucide-react"
import { ProjectData } from "@/app/types/project"
import { getProjects } from "@/app/actions/project.action"

export function ProjectList() {

    const [projectList, setProjectList] = useState<ProjectData[]>([]);

    const [searchTerm, setSearchTerm] = useState("")

    // Filtered list based on search input
    const filteredItems = projectList.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    async function getProjectsData() {
        const projects = await getProjects()
        setProjectList(projects)
    }

    // Fetch project list from the server
    useEffect(() => {
        getProjectsData()
    }, [])

    return (
        <div className="space-y-4">
            <Input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-[200px]"
            />

            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">S.No</TableHead>
                            <TableHead className="md:w-[300px]">Title</TableHead>
                            <TableHead className="hidden lg:table-cell w-[400px]">Description</TableHead>
                            <TableHead className="hidden lg:table-cell w-[200px]">Tags</TableHead>
                            <TableHead className="w-[70px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredItems.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-6">
                                    No projects found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredItems.map((item, index) => (
                                <TableRow key={item._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <ul className="list-disc list-inside space-y-1">
                                            {item.description.map((desc, i) => (
                                                <li key={i}>{desc}</li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <div className="flex flex-wrap gap-1">
                                            {item.tags.map((tag, i) => (
                                                <span key={i} className="bg-muted px-2 py-1 rounded-full text-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/admin/dashboard/project/${item._id}`}>
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
