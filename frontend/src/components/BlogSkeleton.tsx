export const BlogSkeleton = () => {
    return (
        <div role="status" className="animate-pulse max-w-4xl mx-auto px-6 py-12 space-y-8">
            <div className="space-y-4">
                <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
            </div>

            <div className="sm:flex items-center sm:space-x-4">
                <div className="mb-4 sm:mb-0 flex items-center space-x-2">
                    <svg className="w-10 h-10 me-3 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    <div>
                        <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2"></div>
                        <div className="w-48 h-2 bg-gray-200 rounded-full "></div>
                    </div>
                </div>
            </div>

            <div className="border-t" />

            <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>

            <span className="sr-only">Loading...</span>

        </div>
    )
}





