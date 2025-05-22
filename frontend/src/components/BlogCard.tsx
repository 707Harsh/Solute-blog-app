interface BlogCardProps {
    id: string;
    name: string;
    title: string;
    subtitle: string;
    content: string;
    tags: string[];
    publishedAt: string;
}

export const BlogCard = ({ id, name, title, subtitle, content, tags, publishedAt }: BlogCardProps) => {

    const handleClick = () => {
        window.location.href = `/blog/${id}`;
    };

    const date = new Date(publishedAt)

    const formatted = date.toLocaleDateString('en-GB', {
        day: 'numeric',   // "3"
        month: 'short',     // "Dec"
        year: 'numeric',   // "2023"
    })

    function estimateReadTimeFromHtml(html: string, wpm = 200): number {
        // 1) Remove everything between <…>
        const text = html.replace(/<[^>]+>/g, ' ')

        // 2) Collapse whitespace and count
        const words = text.trim().split(/\s+/).filter(Boolean).length
        return Math.max(1, Math.ceil(words / wpm))
    }

    const minutes = estimateReadTimeFromHtml(content)

    return (
        <div onClick={handleClick} className="max-w-4xl mx-auto border-b py-6 px-4 cursor-pointer hover:bg-gray-50 transition duration-200 ease-in-out">
            {/* Top section with avatar, author and meta info */}
            <div className="flex items-center text-sm text-gray-500 mb-2">

                <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-200 rounded-full ">
                    <span className="font-medium text-gray-600 ">{name[0]}</span>
                </div>

                <span className="ml-2 text-black font-normal">{name}</span>
                <span className="mx-1">·</span>
                <span className="font-medium text-gray-500">{formatted}</span>
            </div>

            {/* Main content row */}
            <div className="flex gap-6 ">
                {/* Text content */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">
                        {title}
                    </h2>
                    <p className="text-gray-600 line-clamp-2">
                        {subtitle}
                    </p>

                    {/* Tags and read time */}
                    <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500 mt-4">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                            >
                                {tag}
                            </span>
                        ))}
                        <span>{minutes} min read</span>

                        {/* Icons (dummy placeholders for now) */}
                        {/* <div className="ml-auto flex items-center space-x-3">
                            <button title="Bookmark" className="hover:text-black">🔖</button>
                            <button title="Add to List" className="hover:text-black">➕</button>
                            <button title="More" className="hover:text-black">⋯</button>
                        </div> */}
                    </div>
                </div>

                {/* Right-side thumbnail image */}

                <img className="h-24 w-24 rounded-lg" src="https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-260nw-2086941550.jpg" alt="image description" />
            </div>
        </div>
    );
};
