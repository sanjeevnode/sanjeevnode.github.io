// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// import { Edit } from "lucide-react"
// import { ProjectItem } from "@/app/types/project"

// export function ProjectList({ projectList }: { projectList: ProjectItem[] }) {
//     const [items, setItems] = useState(projectList)

//     return (
//         <div className="rounded-md border overflow-x-auto">
//             <Table>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead className="w-[50px]">S.No</TableHead>
//                         <TableHead>Title</TableHead>
//                         <TableHead className="hidden md:table-cell">Description</TableHead>
//                         <TableHead className="hidden md:table-cell w-[200px]">Tags</TableHead>
//                         <TableHead className="w-[70px]"></TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {items.length === 0 ? (
//                         <TableRow>
//                             <TableCell colSpan={5} className="text-center py-6">
//                                 No projects found.
//                             </TableCell>
//                         </TableRow>
//                     ) : (
//                         items.map((item, index) => (
//                             <TableRow key={item.id}>
//                                 <TableCell>{index + 1}</TableCell>
//                                 <TableCell className="font-medium">{item.title}</TableCell>
//                                 <TableCell className="hidden md:table-cell">
//                                     <ul className="list-disc list-inside space-y-1">
//                                         {item.description.map((desc, i) => (
//                                             <li key={i}>{desc}</li>
//                                         ))}
//                                     </ul>
//                                 </TableCell>
//                                 <TableCell className="hidden md:table-cell">
//                                     <div className="flex flex-wrap gap-1">
//                                         {item.tags.map((tag, i) => (
//                                             <span key={i} className="bg-muted px-2 py-1 rounded-full text-sm">
//                                                 {tag}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </TableCell>
//                                 <TableCell>

//                                     <Link href={`/admin/projects/${item.id}`}>
//                                         <Edit className="h-4 w-4" />
//                                     </Link>
//                                 </TableCell>
//                             </TableRow>
//                         ))
//                     )}
//                 </TableBody>
//             </Table>
//         </div>
//     )
// }

"use client"

import { useState } from "react"
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
import { ProjectItem } from "@/app/types/project"

export function ProjectList({ projectList }: { projectList: ProjectItem[] }) {
    const [searchTerm, setSearchTerm] = useState("")

    // Filtered list based on search input
    const filteredItems = projectList.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

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
                            <TableHead>Title</TableHead>
                            <TableHead className="hidden md:table-cell">Description</TableHead>
                            <TableHead className="hidden md:table-cell w-[200px]">Tags</TableHead>
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
                                <TableRow key={item.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <ul className="list-disc list-inside space-y-1">
                                            {item.description.map((desc, i) => (
                                                <li key={i}>{desc}</li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex flex-wrap gap-1">
                                            {item.tags.map((tag, i) => (
                                                <span key={i} className="bg-muted px-2 py-1 rounded-full text-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/admin/dashboard/project/${item.id}`}>
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
