"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X, Plus, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { SkillGroupData } from "@/app/types/skill"
import {
    createSkillGroup,
    deleteSkillGroup,
    updateSkillGroup,
} from "@/app/actions/skill.action"

export default function SkillForm({
    skillItem,
    isEdit,
}: {
    skillItem?: SkillGroupData
    isEdit?: boolean
}) {
    const router = useRouter()
    const [category, setCategory] = useState("")
    const [skills, setSkills] = useState<string[]>([])
    const [skillInput, setSkillInput] = useState("")
    const [order, setOrder] = useState(0)
    const [active, setActive] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (skillItem) {
            setCategory(skillItem.category)
            setSkills(skillItem.skills)
            setOrder(skillItem.order)
            setActive(skillItem.active !== false)
        }
    }, [skillItem])

    const addSkill = () => {
        const s = skillInput.trim()
        if (s && !skills.includes(s)) {
            setSkills([...skills, s])
            setSkillInput("")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const data = { category, skills, order, active }
            if (isEdit && skillItem) {
                await updateSkillGroup(skillItem._id, data)
                toast.success("Skill group updated successfully")
            } else {
                await createSkillGroup(data)
                toast.success("Skill group created successfully")
            }
            router.push("/admin/dashboard/skill")
        } catch (error) {
            console.error("Error saving skill group:", error)
            toast.error(isEdit ? "Error updating skill group" : "Error creating skill group")
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (!isEdit || !skillItem) return
        if (!window.confirm(`Delete skill group "${skillItem.category}"? This cannot be undone.`)) return
        try {
            await deleteSkillGroup(skillItem._id)
            toast.success("Skill group deleted successfully")
            router.replace("/admin/dashboard/skill")
        } catch (error) {
            console.error("Error deleting skill group:", error)
            toast.error("Error deleting skill group")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl p-4 w-full border rounded-md">
            <div>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold mb-4">{isEdit ? "Edit" : "Add"} Skill Group</span>
                    {isEdit && (
                        <Trash2 onClick={handleDelete} className="cursor-pointer text-red-500" />
                    )}
                </div>
                <p className="text-sm text-gray-500">
                    A category with its list of skills, e.g. Frontend: React, Next.js...
                </p>
            </div>

            <div>
                <Label>Category</Label>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>

            <div>
                <Label>Skills</Label>
                <div className="flex gap-2 mt-1">
                    <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                        placeholder="Add a skill"
                    />
                    <Button type="button" onClick={addSkill}>
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, i) => (
                        <div key={i} className="bg-muted px-3 py-1 rounded-full flex items-center text-sm">
                            {skill}
                            <X
                                className="ml-2 h-4 w-4 cursor-pointer"
                                onClick={() => setSkills(skills.filter((_, idx) => idx !== i))}
                            />
                        </div>
                    ))}
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

            <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="h-4 w-4"
                />
                Active (visible on the website)
            </label>

            <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Submit"}
            </Button>
        </form>
    )
}
