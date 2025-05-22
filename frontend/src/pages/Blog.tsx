import { useParams } from "react-router-dom"
import { FullBlog } from "../components/FullBlog"
import { useBlog } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton"

export const Blog = () => {

    const { id } = useParams()
    const { blog, loading, error } = useBlog(id as string)
    if (loading) {
        return (<div>
            <BlogSkeleton/>
        </div>)
    }
    if (error) {
        return <div>Error: {error}</div>
    }
    if (!blog) {
        return <div>No blog found</div>
    }

    function estimateReadTimeFromHtml(html: string, wpm = 200): number {
        // 1) Remove everything between <…>
        const text = html.replace(/<[^>]+>/g, ' ')
      
        // 2) Collapse whitespace and count
        const words = text.trim().split(/\s+/).filter(Boolean).length
        return Math.max(1, Math.ceil(words / wpm))
    }

    const minutes = estimateReadTimeFromHtml(blog.content)

    const date = new Date(blog.publishedAt)

    const formatted = date.toLocaleDateString('en-GB', {
        day:   'numeric',   // "3"
        month: 'short',     // "Dec"
        year:  'numeric',   // "2023"
      })

    return <div className="pt-20">
        <FullBlog 
        title={blog.title}
        subtitle={blog.subtitle}
        content={blog.content}
        author={blog.author}
        date={formatted}
        readTime={`${minutes} min read`}
        />
    </div>
}
