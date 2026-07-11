"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { EducationData } from "@/app/types/education"
import {
    createEducation,
    deleteEducation,
    updateEducation,
} from "@/app/actions/education.action"

export default function EducationForm({
    educationItem,
    isEdit,
}: {
    educationItem?: EducationData
    isEdit?: boolean
}) {
    const router = useRouter()
    const [degree, setDegree] = useState("")
    const [institution, setInstitution] = useState("")
    const [period, setPeriod] = useState("")
    const [description, setDescription] = useState("")
    const [order, setOrder] = useState(0)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (educationItem) {
            setDegree(educationItem.degree)
            setInstitution(educationItem.institution)
            setPeriod(educationItem.period)
            setDescription(educationItem.description)
            setOrder(educationItem.order)
        }
    }, [educationItem])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const data = { degree, institution, period, description, order }
            if (isEdit && educationItem) {
                await updateEducation(educationItem._id, data)
                toast.success("Education updated successfully")
            } else {
                await createEducation(data)
                toast.success("Education created successfully")
            }
            router.push("/admin/dashboard/education")
        } catch (error) {
            console.error("Error saving education:", error)
            toast.error(isEdit ? "Error updating education" : "Error creating education")
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (!isEdit || !educationItem) return
        if (!window.confirm(`Delete "${educationItem.degree}"? This cannot be undone.`)) return
        try {
            await deleteEducation(educationItem._id)
            toast.success("Education deleted successfully")
            router.replace("/admin/dashboard/education")
        } catch (error) {
            console.error("Error deleting education:", error)
            toast.error("Error deleting education")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl p-4 w-full border rounded-md">
            <div>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold mb-4">{isEdit ? "Edit" : "Add"} Education</span>
                    {isEdit && (
                        <Trash2 onClick={handleDelete} className="cursor-pointer text-red-500" />
                    )}
                </div>
                <p className="text-sm text-gray-500">
                    Fill in the details of your education below.
                </p>
            </div>

            <div>
                <Label>Degree</Label>
                <Input value={degree} onChange={(e) => setDegree(e.target.value)} required />
            </div>

            <div>
                <Label>Institution</Label>
                <Input value={institution} onChange={(e) => setInstitution(e.target.value)} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label>Period</Label>
                    <Input
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        placeholder="e.g. 2020 - 2024"
                    />
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
            </div>

            <div>
                <Label>Description</Label>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                />
            </div>

            <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Submit"}
            </Button>
        </form>
    )
}
