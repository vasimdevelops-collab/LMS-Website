
import React from 'react';
import { CourseHeader, CourseMedia, WhatYoullLearn } from './CourseDetailComponents';

// --- Mock Data ---
const COURSE_DATA = {
    title: "Full-Stack Web Development Bootcamp",
    subtitle: "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps",
    instructor: {
        name: "Angela Yu",
        role: "Lead Instructor at App Brewery",
        initials: "AY",
        color: "bg-teal-100 text-teal-600"
    },
    rating: 4.8,
    reviews: 24500,
    students: 185000,
    lastUpdated: "11/2024",
    price: 599,
    originalPrice: 3499,
    tag: "Bestseller",
    language: "English"
};

const OUTCOMES = [
    "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
    "Learn the latest technologies, including Javascript ES6, Bootstrap 5, Tailwind CSS, React, and Node.js.",
    "Master backend development with Node.js, Express, and MongoDB.",
    "Understand the concepts behind REST APIs and how to build your own.",
    "Learn best practices for professional developer workflow using Git and GitHub.",
    "Deploy your applications to the cloud using industry-standard tools.",
    "Create responsive layouts that work beautifully on mobile devices.",
    "Get support from instructors and a community of learners."
];

// Placeholder image for demo purposes
const POSTER_IMG = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80";

// --- Props ---
// Added onNavigate to allow linking to the Lesson Page
interface CourseDetailsPageProps {
  onNavigate?: (page: string) => void;
}

const CourseDetailsPage: React.FC<CourseDetailsPageProps> = ({ onNavigate }) => {
    const handleEnroll = () => {
        // In a real app, this would check auth/payment, then navigate
        if (onNavigate) {
            onNavigate('lesson');
        } else {
            alert("Enrollment flow triggered!");
        }
    };

    const handlePreview = () => {
        alert("Playing preview video...");
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header Section with Sticky Sidebar embedded */}
            <CourseHeader 
                course={COURSE_DATA} 
                onEnroll={handleEnroll} 
                onPreview={handlePreview} 
            />

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-12 gap-8">
                    
                    {/* Left Content Column (Matches Header's 8-col layout) */}
                    <div className="md:col-span-8 space-y-8 pt-8">
                        
                        {/* Course Media (Video/Image) */}
                        <div className="-mt-8 md:mt-0">
                            <CourseMedia 
                                posterImage={POSTER_IMG} 
                                onPreview={handlePreview} 
                            />
                        </div>

                        {/* What You'll Learn */}
                        <WhatYoullLearn outcomes={OUTCOMES} />

                        {/* Description / Syllabus Placeholder */}
                        <div className="prose max-w-none text-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                            <p className="mb-4">
                                Welcome to the complete web development bootcamp, the only course you need to learn to code and become a full-stack web developer. With over 55 hours of content, this comprehensive course covers everything from the basics of HTML and CSS to advanced topics like React and Node.js.
                            </p>
                            <p>
                                Whether you're a complete beginner or looking to refresh your skills, this course is designed to take you from zero to hero. You'll build real-world projects, solve coding challenges, and gain the confidence to apply for developer jobs.
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:block md:col-span-4">
                         {/* Sidebar Spacer */}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CourseDetailsPage;
