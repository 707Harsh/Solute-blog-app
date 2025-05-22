// import JoditEditor from "jodit-react"
import React from "react"
const JoditEditor = React.lazy(() => import("jodit-react"))
import { useRef, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { useProgress } from '@bprogress/react'
import Select from "react-select"


interface TagOption {
    value: string
    label: string
}

export const WriteBlog = () => {

    const editor = useRef(null)
    const [title, setTitle] = useState("")
    const [subtitle, setsubTitle] = useState("")
    const [content, setContent] = useState("")
    const [selectedTags, setSelectedTags] = useState<TagOption[]>([])
    const navigate = useNavigate()
    const { start, stop, } = useProgress()

    const popularTags: TagOption[] = [
        "Artificial Intelligence",
        "Blockchain",
        "Career",
        "Cloud Computing",
        "Community",
        "CSS",
        "Cybersecurity",
        "Data Science",
        "Design",
        "DevOps",
        "Education",
        "Entertainment",
        "Entrepreneurship",
        "Finance",
        "Food",
        "Game Development",
        "Health",
        "Hobbies",
        "JavaScript",
        "Lifestyle",
        "Machine Learning",
        "Marketing",
        "Mobile Development",
        "Money",
        "Node.js",
        "Open Source",
        "Personal Development",
        "Productivity",
        "Programming",
        "React",
        "Remote Work",
        "Sports",
        "Startups",
        "Tech",
        "Travel",
        "Web Development"
    ].map((t) => ({ value: t, label: t }))

    const countWords = (text: string) =>
        text.trim().split(/\s+/).filter(Boolean).length

    const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value
        const words = raw.trim().split(/\s+/).filter(Boolean)

        if (words.length <= 40) {
            setsubTitle(raw)
        } else {
            // trim down to first 40 words
            const trimmed = words.slice(0, 40).join(" ")
            setsubTitle(trimmed)
        }
    }

    const handlePublish = async () => {
        try {
            start()
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,
                {
                    title,
                    subtitle,
                    content,
                    tags: selectedTags.map((opt) => opt.value),
                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }

                })
            if (response.status === 200) {
                setTitle("")
                setsubTitle("")
                setContent("")
                setSelectedTags([])
                stop()
                navigate(`/blog/${response.data.id}`)
            }
        } catch (error) {
            stop()
            console.error(error)
            alert('Error publishing blog')
        }
    }
    return (
        <div>
            <div className="max-w-4xl mx-auto py-6 px-4">
                <h1 className="flex justify-center text-3xl font-bold mb-8">Write your blog here !</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter your blog title"
                        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="subtitle">
                        Subtitle <span className="text-sm font-normal text-gray-400">({countWords(subtitle)}/40 words)</span>
                    </label>
                    <input
                        type="text"
                        id="subtitle"
                        placeholder="Enter your blog subtitle (max 40 words)"
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                        value={subtitle}
                        onChange={handleSubtitleChange}
                    />
                </div>
                <div className="block text-gray-700 text-lg font-bold mb-2">
                    Content
                </div>
                <JoditEditor
                    ref={editor}
                    value={content}
                    tabIndex={1}
                    onChange={(newContent) => setContent(newContent)}
                    className="mb-4"
                />
                {/* Tags Multi‐Select */}
                <div className="mb-6">
                    <label
                        htmlFor="tags"
                        className="block font-bold text-gray-700 mb-2 text-lg"
                    >
                        Tags
                    </label>
                    <Select
                        id="tags"
                        isMulti
                        options={popularTags}
                        value={selectedTags}
                        onChange={(opts) => {
                            setSelectedTags(Array.isArray(opts) ? opts : [])
                        }}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Select one or more tags…"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handlePublish}
                        className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Publish
                    </button>
                </div>
            </div>
        </div>
    )
}