
import React, { useState } from 'react';

// --- Types ---
export interface CourseDetails {
  title: string;
  subtitle?: string;
  instructor: {
    name: string;
    role: string;
    image?: string; // or initials
    initials: string;
    color: string;
  };
  rating: number;
  reviews: number;
  students: number;
  lastUpdated: string;
  price: number;
  originalPrice?: number;
  tag: string; // Bestseller etc
  language: string;
}

// --- Icons ---
const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const CheckIcon = () => (
    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);

const PlayIcon = () => (
    <svg className="w-16 h-16 text-white opacity-90 hover:opacity-100 transition-opacity drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
    </svg>
);

// --- CourseHeader ---
interface CourseHeaderProps {
    course: CourseDetails;
    onEnroll: () => void;
    onPreview: () => void;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({ course, onEnroll, onPreview }) => {
    return (
        <section className="bg-[#1C1D1F] text-white py-8 md:py-12 relative">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Course Info */}
                    <div className="md:col-span-8">
                        {/* Breadcrumbs */}
                        <div className="text-sm font-medium text-blue-300 mb-4 flex items-center gap-2">
                            <span className="cursor-pointer hover:underline">Development</span>
                            <span className="text-gray-500">/</span>
                            <span className="cursor-pointer hover:underline">Web Development</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                            {course.title}
                        </h1>
                        <p className="text-lg text-gray-300 mb-6 max-w-2xl">
                            {course.subtitle || "Master the skills you need to become a professional developer. Hands-on projects, expert guidance, and certificate included."}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                            {course.tag && (
                                <span className="bg-[#ECEB98] text-black font-bold px-2 py-0.5 rounded text-xs uppercase tracking-wide">
                                    {course.tag}
                                </span>
                            )}
                            <div className="flex items-center gap-1 text-yellow-400 font-bold">
                                <span>{course.rating}</span>
                                <div className="flex">
                                    {[1,2,3,4,5].map(s => <StarIcon key={s} filled={s <= Math.floor(course.rating)} />)}
                                </div>
                                <span className="text-blue-300 font-normal hover:underline cursor-pointer underline-offset-2 ml-1">({course.reviews.toLocaleString()} ratings)</span>
                            </div>
                            <span className="text-gray-300">{course.students.toLocaleString()} students</span>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                            <span className="text-gray-300">Created by</span>
                            <a href="#" className="text-blue-300 hover:underline underline-offset-2 font-medium">
                                {course.instructor.name}
                            </a>
                            <div className="flex items-center text-gray-400 gap-4 ml-2">
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Last updated {course.lastUpdated}
                                </span>
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                                    {course.language}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sticky Enroll Card */}
                    <div className="md:col-span-4 hidden md:block">
                        <div className="sticky top-24 bg-white text-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-200 p-1">
                             {/* Media Placeholder in Sidebar (if requested, but media is separate component) */}
                             {/* Content */}
                             <div className="p-6">
                                <div className="flex items-end gap-2 mb-6">
                                    <span className="text-3xl font-bold text-gray-900">
                                        {course.price === 0 ? 'Free' : `₹${course.price}`}
                                    </span>
                                    {course.originalPrice && (
                                        <span className="text-gray-500 line-through text-lg mb-1">₹{course.originalPrice}</span>
                                    )}
                                    {course.originalPrice && course.price > 0 && (
                                        <span className="text-gray-600 text-sm mb-1.5 ml-auto">
                                            {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off
                                        </span>
                                    )}
                                </div>
                                
                                <button 
                                    onClick={onEnroll}
                                    className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors mb-3 shadow-sm"
                                >
                                    {course.price === 0 ? 'Enroll for Free' : 'Add to Cart'}
                                </button>
                                <button 
                                    onClick={onEnroll}
                                    className="w-full py-3 bg-white text-gray-900 border border-gray-300 font-bold rounded-lg hover:bg-gray-50 transition-colors mb-6"
                                >
                                    Buy Now
                                </button>

                                <div className="text-center text-xs text-gray-500 mb-4">
                                    30-Day Money-Back Guarantee
                                </div>

                                <div className="space-y-3 text-sm text-gray-700">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold w-5">∞</span>
                                        <span>Full lifetime access</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold w-5">📱</span>
                                        <span>Access on mobile and TV</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold w-5">🏆</span>
                                        <span>Certificate of completion</span>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Mobile Sticky CTA Placeholder (Bottom) */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                 <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-900">{course.price === 0 ? 'Free' : `₹${course.price}`}</span>
                    {course.originalPrice && <span className="text-xs text-gray-500 line-through">₹{course.originalPrice}</span>}
                 </div>
                 <button 
                    onClick={onEnroll}
                    className="px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-blue-700"
                 >
                    Enroll Now
                 </button>
            </div>
        </section>
    );
};

// --- CourseMedia ---
interface CourseMediaProps {
    videoUrl?: string; // If present, show video
    posterImage: string;
    onPreview: () => void;
}

export const CourseMedia: React.FC<CourseMediaProps> = ({ videoUrl, posterImage, onPreview }) => {
    return (
        <section className="bg-white py-0 md:py-8 border-b border-gray-100 md:border-none">
            <div className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8">
                <div className="max-w-5xl">
                    <div className="relative aspect-video bg-black md:rounded-xl overflow-hidden shadow-lg group cursor-pointer" onClick={onPreview}>
                        {videoUrl ? (
                            <video 
                                src={videoUrl} 
                                poster={posterImage}
                                controls 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <>
                                <img 
                                    src={posterImage} 
                                    alt="Course Preview" 
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                                            <PlayIcon />
                                        </div>
                                        <span className="text-white font-bold text-lg drop-shadow-md">Preview this course</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- WhatYoullLearn ---
interface WhatYoullLearnProps {
    outcomes: string[];
}

export const WhatYoullLearn: React.FC<WhatYoullLearnProps> = ({ outcomes }) => {
    return (
        <section className="py-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                    {outcomes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <span className="flex-shrink-0 mt-1">
                                <CheckIcon />
                            </span>
                            <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
