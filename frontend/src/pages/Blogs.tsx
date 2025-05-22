import { useState } from "react"
import { BlogCard } from "../components/BlogCard"
import { BlogsSkeleton } from "../components/BlogsSkeleton"
import { useBlogs } from "../hooks"

export const Blogs = () => {

    const {blogs, loading, error} = useBlogs()
    const [currentPage, setCurrentPage] = useState(1)
    const blogsPerPage = 6

    if (loading) {
        return( 
            <div className="pt-20">
                <BlogsSkeleton/>
            </div>
        )
    }
    if (error) {
        return( 
            <div className="pt-20">
                Error : {error}
            </div>
        )
    }
    if (blogs.length === 0) {
        return( 
            <div className="pt-20">
                <h1 className="text-2xl text-center">No blogs found</h1>
                <p className="text-center">You can create a blog by clicking on the publish button</p>
            </div>
        )
    }

    // Sort blogs by published date (most recent first)
    const sortedBlogs = [...blogs].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    // Pagination logic
     const indexOfLastBlog = currentPage * blogsPerPage
     const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
     const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog)
     const totalPages = Math.ceil(sortedBlogs.length / blogsPerPage)
 
     const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
     const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))

     return (
        <div className="pt-20 max-w-4xl mx-auto px-4">
            {currentBlogs.map((blog) => (
                <BlogCard
                    key={blog.id}
                    id={blog.id}
                    name={blog.author.name || "Anonymous"}
                    title={blog.title}
                    subtitle={blog.subtitle}
                    content={blog.content}
                    publishedAt={blog.publishedAt}
                    tags={blog.tags}
                />
            ))}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-700 font-semibold">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}