"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus } from "lucide-react"
import Image from "next/image"
import { ProjectItem } from "@/app/types/project"

export default function ProjectForm({ projectItem, isEdit }: { projectItem?: ProjectItem, isEdit?: boolean }) {
    const [title, setTitle] = useState("")
    const [descriptions, setDescriptions] = useState<string[]>([])
    const [newDescription, setNewDescription] = useState("")

    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState("")

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const [link, setLink] = useState("")
    const [github, setGithub] = useState("")

    // If projectItem is provided, populate the form with its data
    useEffect(() => {
        if (projectItem) {
            setTitle(projectItem.title)
            setDescriptions(projectItem.description)
            setTags(projectItem.tags)
            setLink(projectItem.link || "")
            setGithub(projectItem.github || "")
        }
    }, [projectItem])

    const handleAddDescription = () => {
        if (newDescription.trim()) {
            setDescriptions([...descriptions, newDescription.trim()])
            setNewDescription("")
        }
    }

    const removeDescription = (index: number) => {
        setDescriptions(descriptions.filter((_, i) => i !== index))
    }

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()])
            setTagInput("")
        }
    }

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const formData = {
            title,
            descriptions,
            imageFile,
            imagePreview,
            link,
            github,
            tags,
        }

        console.log("Submitted Project:", formData)

        // You can handle uploading the image to a server or cloud storage here
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl p-4 w-full border rounded-md">
            <div>
                <span className="text-2xl font-bold mb-4">{isEdit ? 'Edit' : 'Add'} Project</span>
                <p className="text-sm text-gray-500">
                    Fill in the details of your project below.
                </p>
            </div>
            <div>
                <Label>Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div>
                <Label>Description</Label>
                <div className="flex items-start gap-2">
                    <Textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Add a description line..."
                        required
                    />
                    <Button type="button" onClick={handleAddDescription}>
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    {descriptions.map((desc, index) => (
                        <div key={index} className="bg-muted px-3 py-1 flex items-center text-sm w-fit rounded-md">
                            {desc}
                            <X
                                className="ml-2 h-4 w-4 cursor-pointer"
                                onClick={() => removeDescription(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mt-1">
                    <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                        placeholder="Add a tag"
                    />
                    <Button type="button" onClick={handleAddTag}>
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                        <div key={index} className="bg-muted px-3 py-1 rounded-full flex items-center text-sm">
                            {tag}
                            <X
                                className="ml-2 h-4 w-4 cursor-pointer"
                                onClick={() => removeTag(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <Label>Image Upload</Label>
                <Input type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreview && (
                    <div className="flex items-center mt-2">
                        <Image
                            src={imagePreview}
                            alt="Image Preview"
                            width={200}
                            height={200}
                            className="mt-2 rounded-md"
                            style={{ objectFit: "cover" }}
                        />
                        <X
                            className="ml-2 h-4 w-4 cursor-pointer"
                            onClick={() => {
                                setImagePreview(null)
                                setImageFile(null)
                            }}
                        />
                    </div>
                )}
            </div>

            <div>
                <Label>GitHub Link</Label>
                <Input value={github} onChange={(e) => setGithub(e.target.value)} />
            </div>

            <div>
                <Label>Live Link</Label>
                <Input value={link} onChange={(e) => setLink(e.target.value)} />
            </div>

            <Button type="submit">Submit</Button>
        </form>
    )
}
