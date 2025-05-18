"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus } from "lucide-react"
import Image from "next/image"
import { ProjectData } from "@/app/types/project"
import { createProject, updateProject } from "@/app/actions/project.action"
import toast from "react-hot-toast"

export default function ProjectForm({ projectItem, isEdit }: { projectItem?: ProjectData, isEdit?: boolean }) {
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
            setTitle(projectItem.title);
            setDescriptions(projectItem.description);
            setTags(projectItem.tags);
            setLink(projectItem.link || "");
            setGithub(projectItem.github || "");

            if (projectItem.image?.data && projectItem.image?.contentType) {
                // Create base64 preview URL
                const base64Image = `data:${projectItem.image.contentType};base64,${projectItem.image.data}`;
                setImagePreview(base64Image);
            }
        }
    }, [projectItem]);


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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {

            const formData = new FormData();
            formData.append("title", title)
            formData.append("description", JSON.stringify(descriptions))
            formData.append("tags", JSON.stringify(tags))
            formData.append("link", link)
            formData.append("github", github)
            if (imageFile) {
                formData.append("image", imageFile)
            }

            if (isEdit && projectItem) {
                formData.append("id", projectItem._id)
                await updateProject(projectItem._id, formData);
            }
            else {
                await createProject(formData);
            }
            setTitle("")
            setDescriptions([])
            setTags([])
            setLink("")
            setGithub("")
            setImageFile(null)
            setImagePreview(null)
        } catch (error: unknown) {
            console.error("Error creating project:", error)
            toast.error("Error creating project")
        }
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

                {/* Show preview if exists */}
                {imagePreview ? (
                    <div className="flex flex-col gap-2 mt-2">
                        <div className="relative w-48 h-48 border rounded-md overflow-hidden">
                            <Image
                                src={imagePreview}
                                alt="Image Preview"
                                fill
                                className="object-cover"
                            />
                            <button
                                type="button"
                                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow"
                                onClick={() => {
                                    setImagePreview(null);
                                    setImageFile(null);
                                }}
                            >
                                <X className="h-4 w-4 text-red-500" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500">Current image preview. Upload a new image to replace it.</p>
                    </div>
                ) : (
                    <Input type="file" accept="image/*" onChange={handleImageChange} />
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
