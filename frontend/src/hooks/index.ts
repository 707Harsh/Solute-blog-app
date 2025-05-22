import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

interface Blog {
    "id": string,
    "title": string,
    "subtitle": string,
    "tags": string[],
    "content": string,
    "publishedAt": string,
    "author": {
        "name": string
    }
}

export const useBlog = (id:string) => {
    const [blog, setBlog] = useState<Blog>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            setBlog(response.data.post)
            setLoading(false)
        }
        )
        .catch((error) => {
            console.error("Error fetching blog:", error)
            setError("Failed to fetch blog")
            setLoading(false)
        }
        )
    }, [])

    return { blog, loading, error }
}

export const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            setBlogs(response.data.posts)
            setLoading(false)
        }
        )
        .catch((error) => {
            console.error("Error fetching blogs:", error)
            setError("Failed to fetch blogs")
            setLoading(false)
        }
        )
    }, [])

    return { blogs, loading, error }
}