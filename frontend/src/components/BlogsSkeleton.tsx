// BlogsSkeleton.tsx
import React from 'react'

interface BlogsSkeletonProps {
  count?: number
}

export const BlogsSkeleton: React.FC<BlogsSkeletonProps> = ({ count = 5 }) => {
  return (
    <div className="space-y-4 max-w-4xl mx-auto py-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          role="status"
          className="border-b py-6 px-4 cursor-pointer hover:bg-gray-50 transition duration-200 ease-in-out animate-pulse"
        >
          {/* Top section skeleton */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            {/* Avatar */}
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            {/* Name */}
            <div className="ml-2 space-y-1 flex-1">
              <div className="h-3 bg-gray-300 rounded w-20" />
              <div className="h-2 bg-gray-200 rounded w-32" />
            </div>
            {/* Date */}
            <div className="h-3 bg-gray-300 rounded w-16" />
          </div>

          {/* Main content row */}
          <div className="flex gap-6">
            {/* Text skeletons */}
            <div className="flex-1 space-y-3">
              {/* Title */}
              <div className="h-6 bg-gray-300 rounded w-3/4" />
              {/* Excerpt */}
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />

              {/* Tag + read time */}
              <div className="flex items-center mt-4 space-x-3">
                <div className="h-4 bg-gray-300 rounded-full w-16" />
                <div className="h-3 bg-gray-300 rounded w-12" />
              </div>
            </div>

            {/* Thumbnail */}
            <div className="w-20 h-20 bg-gray-300 rounded-sm flex-shrink-0" />
          </div>

          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </div>
  )
}
