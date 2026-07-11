"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { ExperienceData, ExperienceProject } from "@/app/types/experience"
import {
    createExperience,
    deleteExperience,
    updateExperience,
} from "@/app/actions/experience.action"

const emptyProject = (): ExperienceProject => ({
    title: "",
    technologies: [],
    description: [],
    link: "",
})

function ProjectEditor({
    project,
    onChange,
    onRemove,
}: {
    project: ExperienceProject
    onChange: (p: ExperienceProject) => void
    onRemove: () => void
}) {
    const [techInput, setTechInput] = useState("")
    const [descInput, setDescInput] = useState("")

    const addTech = () => {
        const t = techInput.trim()
        if (t && !project.technologies.includes(t)) {
            onChange({ ...project, technologies: [...project.technologies, t] })
            setTechInput("")
        }
    }

    const addDesc = () => {
        const d = descInput.trim()
        if (d) {
            onChange({ ...project, description: [...project.description, d] })
            setDescInput("")
        }
    }

    return (
        <div className="border rounded-md p-4 space-y-4 bg-gray-50">
            <div className="flex justify-between items-center">
                <span className="font-semibold">Project / Work Area</span>
                <Trash2 className="h-4 w-4 cursor-pointer text-red-500" onClick={onRemove} />
            </div>

            <div>
                <Label>Title</Label>
                <Input
                    value={project.title}
                    onChange={(e) => onChange({ ...project, title: e.target.value })}
                    required
                />
            </div>

            <div>
                <Label>Technologies</Label>
                <div className="flex gap-2 mt-1">
                    <Input
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                        placeholder="Add a technology"
                    />
                    <Button type="button" onClick={addTech}>
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, i) => (
                        <div key={i} className="bg-muted px-3 py-1 rounded-full flex items-center text-sm">
                            {tech}
                            <X
                                className="ml-2 h-4 w-4 cursor-pointer"
                                onClick={() =>
                                    onChange({
                                        ...project,
                                        technologies: project.technologies.filter((_, idx) => idx !== i),
                                    })
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <Label>Description points</Label>
                <div className="flex items-start gap-2 mt-1">
                    <Textarea
                        value={descInput}
                        onChange={(e) => setDescInput(e.target.value)}
                        placeholder="Add a description line..."
                    />
                    <Button type="button" onClick={addDesc}>
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    {project.description.map((desc, i) => (
                        <div key={i} className="bg-muted px-3 py-1 flex items-center text-sm w-fit rounded-md">
                            {desc}
                            <X
                                className="ml-2 h-4 w-4 cursor-pointer shrink-0"
                                onClick={() =>
                                    onChange({
                                        ...project,
                                        description: project.description.filter((_, idx) => idx !== i),
                                    })
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <Label>Link (optional)</Label>
                <Input
                    value={project.link ?? ""}
                    onChange={(e) => onChange({ ...project, link: e.target.value })}
                />
            </div>
        </div>
    )
}

export default function ExperienceForm({
    experienceItem,
    isEdit,
}: {
    experienceItem?: ExperienceData
    isEdit?: boolean
}) {
    const router = useRouter()
    const [company, setCompany] = useState("")
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [period, setPeriod] = useState("")
    const [order, setOrder] = useState(0)
    const [projects, setProjects] = useState<ExperienceProject[]>([])
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (experienceItem) {
            setCompany(experienceItem.company)
            setTitle(experienceItem.title)
            setLocation(experienceItem.location)
            setPeriod(experienceItem.period)
            setOrder(experienceItem.order)
            setProjects(experienceItem.projects)
        }
    }, [experienceItem])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const data = { company, title, location, period, order, projects }
            if (isEdit && experienceItem) {
                await updateExperience(experienceItem._id, data)
                toast.success("Experience updated successfully")
            } else {
                await createExperience(data)
                toast.success("Experience created successfully")
            }
            router.push("/admin/dashboard/experience")
        } catch (error) {
            console.error("Error saving experience:", error)
            toast.error(isEdit ? "Error updating experience" : "Error creating experience")
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (!isEdit || !experienceItem) return
        if (!window.confirm(`Delete experience at "${experienceItem.company}"? This cannot be undone.`)) return
        try {
            await deleteExperience(experienceItem._id)
            toast.success("Experience deleted successfully")
            router.replace("/admin/dashboard/experience")
        } catch (error) {
            console.error("Error deleting experience:", error)
            toast.error("Error deleting experience")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl p-4 w-full border rounded-md">
            <div>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold mb-4">{isEdit ? "Edit" : "Add"} Experience</span>
                    {isEdit && (
                        <Trash2 onClick={handleDelete} className="cursor-pointer text-red-500" />
                    )}
                </div>
                <p className="text-sm text-gray-500">
                    Fill in the details of your work experience below.
                </p>
            </div>

            <div>
                <Label>Company</Label>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} required />
            </div>

            <div>
                <Label>Role / Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label>Location</Label>
                    <Input value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div>
                    <Label>Period</Label>
                    <Input
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        placeholder="e.g. Oct 2024 – Present"
                    />
                </div>
            </div>

            <div>
                <Label>Display order (lower shows first)</Label>
                <Input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="max-w-[120px]"
                />
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>Projects / Work Areas</Label>
                    <Button type="button" variant="outline" onClick={() => setProjects([...projects, emptyProject()])}>
                        <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                </div>
                {projects.length === 0 && (
                    <p className="text-sm text-gray-500">No projects added yet.</p>
                )}
                {projects.map((project, i) => (
                    <ProjectEditor
                        key={i}
                        project={project}
                        onChange={(p) => setProjects(projects.map((old, idx) => (idx === i ? p : old)))}
                        onRemove={() => setProjects(projects.filter((_, idx) => idx !== i))}
                    />
                ))}
            </div>

            <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Submit"}
            </Button>
        </form>
    )
}
