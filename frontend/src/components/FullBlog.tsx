// import React from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import type { DOMNode, Element as HtmlElement } from "html-react-parser";


interface fullBlogProps {
    title: string;
    subtitle: string;
    author: {
        name: string;
    };
    date: string;
    readTime: string;
    content: string;
}

export const FullBlog = ({ title, author, date, readTime, content, subtitle }: fullBlogProps) => {

    const cleanHtml = DOMPurify.sanitize(content)

    const reactTree = parse(cleanHtml, {
        replace: (domNode: DOMNode) => {
          // Check if it's an Element (has a `name` prop) and that name is "script"
          if (
            typeof domNode === "object" &&
            domNode !== null &&
            "name" in domNode &&
            (domNode as HtmlElement).name === "script"
          ) {
            return null;
          }
        },
      });

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
            {/* Title*/}
            <div className="space-y-4">
                <div className="text-5xl font-extrabold leading-tight">{title}</div>
                <p className="text-gray-700 text-lg">{subtitle}</p>
            </div>

            {/* Author row */}
            <div className="sm:flex items-center sm:space-x-4">
                <div className="mb-4 sm:mb-0 flex items-center space-x-2">
                    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-200 rounded-full ">
                        <span className="font-medium text-gray-600 ">{author.name ? author.name[0] : 'A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="font-medium">{author.name ? author.name : "Anonymous"}</span>
                        <div className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-100 cursor-pointer">
                            Follow
                        </div>
                    </div>
                </div>
                <span className="text-sm text-gray-500">
                    {readTime} &nbsp; · &nbsp; {date}
                </span>
            </div>

            {/* Divider */}
            <div className="border-t" />

            {/* Article Content */}
            <div className="prose prose-lg">
                {reactTree}
            </div>
        </div>
    )
}
