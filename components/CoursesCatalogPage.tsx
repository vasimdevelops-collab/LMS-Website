
import React, { useState, useMemo, useEffect } from 'react';
import { 
  CatalogSearchBar, 
  LeftFiltersPanel, 
  ResultsHeader, 
  CourseCard, 
  CourseListItem, 
  PaginationControls,
  FilterModalMobile,
  Course,
  FilterState
} from './CatalogUI';

// --- Mock Data ---
const MOCK_COURSES: Course[] = [
  { id: 1, title: "Full-Stack Web Development Bootcamp", instructor: "Angela Yu", rating: 4.8, reviews: 1240, duration: "24h", lectures: 156, level: "Beginner", price: 599, originalPrice: 2999, category: "Web Development", imageColor: "bg-blue-600", tag: "Bestseller" },
  { id: 2, title: "The Complete Python Pro Bootcamp", instructor: "Dr. Angela Yu", rating: 4.9, reviews: 850, duration: "32h", lectures: 210, level: "Beginner", price: 699, originalPrice: 3499, category: "Data Science", imageColor: "bg-yellow-500", tag: "Hot" },
  { id: 3, title: "UI/UX Design Masterclass 2025", instructor: "Gary Simon", rating: 4.7, reviews: 430, duration: "18h", lectures: 89, level: "Intermediate", price: 499, originalPrice: 1999, category: "Design", imageColor: "bg-purple-600" },
  { id: 4, title: "React Native: Build Mobile Apps", instructor: "Maximilian Schwarzmüller", rating: 4.8, reviews: 620, duration: "20h", lectures: 130, level: "Intermediate", price: 0, originalPrice: 999, category: "Web Development", imageColor: "bg-cyan-500" },
  { id: 5, title: "Machine Learning A-Z", instructor: "Kirill Eremenko", rating: 4.6, reviews: 2100, duration: "42h", lectures: 320, level: "Advanced", price: 899, originalPrice: 4999, category: "Data Science", imageColor: "bg-green-600", tag: "Bestseller" },
  { id: 6, title: "Digital Marketing Strategy", instructor: "Seth Godin", rating: 4.5, reviews: 320, duration: "12h", lectures: 45, level: "Beginner", price: 399, originalPrice: 1499, category: "Marketing", imageColor: "bg-pink-500" },
  { id: 7, title: "Docker & Kubernetes: The Practical Guide", instructor: "Stephen Grider", rating: 4.8, reviews: 540, duration: "15h", lectures: 90, level: "Advanced", price: 599, originalPrice: 2499, category: "Web Development", imageColor: "bg-indigo-600" },
  { id: 8, title: "Graphic Design Bootcamp: Photoshop, Illustrator", instructor: "Derrick Mitchell", rating: 4.4, reviews: 180, duration: "16h", lectures: 75, level: "Beginner", price: 0, category: "Design", imageColor: "bg-red-500" },
  { id: 9, title: "Business Analysis Fundamentals", instructor: "The BA Guide", rating: 4.3, reviews: 120, duration: "9h", lectures: 32, level: "Beginner", price: 299, category: "Business", imageColor: "bg-gray-600" },
  { id: 10, title: "Advanced CSS and Sass", instructor: "Jonas Schmedtmann", rating: 4.9, reviews: 900, duration: "28h", lectures: 120, level: "Advanced", price: 499, category: "Web Development", imageColor: "bg-blue-400" },
  { id: 11, title: "Data Visualization with Tableau", instructor: "Kirill Eremenko", rating: 4.6, reviews: 400, duration: "10h", lectures: 50, level: "Intermediate", price: 599, category: "Data Science", imageColor: "bg-orange-500" },
  { id: 12, title: "SEO 2025: Complete SEO Training", instructor: "Arun Nagarajan", rating: 4.2, reviews: 150, duration: "8h", lectures: 25, level: "Beginner", price: 0, category: "Marketing", imageColor: "bg-teal-500" },
];

const ITEMS_PER_PAGE = 8;

interface CatalogPageProps {
  onNavigate?: (page: string) => void;
}

const CoursesCatalogPage: React.FC<CatalogPageProps> = ({ onNavigate }) => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    levels: [],
    price: [],
    rating: null
  });
  const [sortOption, setSortOption] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Handlers
  const handleFilterChange = (type: keyof FilterState, value: string | number) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (type === 'rating') {
        newFilters.rating = prev.rating === value ? null : value as number;
      } else {
        const list = prev[type] as (string | number)[];
        if (list.includes(value)) {
          // @ts-ignore
          newFilters[type] = list.filter(item => item !== value);
        } else {
          // @ts-ignore
          newFilters[type] = [...list, value];
        }
      }
      return newFilters;
    });
    setCurrentPage(1);
  };

  const handleRemoveFilter = (type: keyof FilterState, value: string | number) => {
    handleFilterChange(type, value);
  };

  const clearFilters = () => {
    setFilters({ categories: [], levels: [], price: [], rating: null });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const goToDetails = () => {
    if (onNavigate) {
      onNavigate('course-details');
      window.scrollTo(0,0);
    }
  };

  // Logic: Filtering & Sorting
  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter(course => {
      if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) && !course.instructor.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filters.categories.length > 0 && !filters.categories.includes(course.category)) return false;
      if (filters.levels.length > 0 && !filters.levels.includes(course.level)) return false;
      if (filters.price.length > 0) {
        const isFree = course.price === 0;
        if (filters.price.includes('free') && !isFree) return false;
        if (filters.price.includes('paid') && isFree) return false;
      }
      if (filters.rating !== null && course.rating < filters.rating) return false;
      return true;
    });
  }, [searchQuery, filters]);

  const sortedCourses = useMemo(() => {
    const data = [...filteredCourses];
    switch (sortOption) {
      case 'newest': return data.sort((a, b) => b.id - a.id);
      case 'rating': return data.sort((a, b) => b.rating - a.rating);
      case 'price-low': return data.sort((a, b) => a.price - b.price);
      case 'price-high': return data.sort((a, b) => b.price - a.price);
      case 'popularity': default: return data.sort((a, b) => b.reviews - a.reviews);
    }
  }, [filteredCourses, sortOption]);

  const totalPages = Math.ceil(sortedCourses.length / ITEMS_PER_PAGE);
  const displayedCourses = sortedCourses.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const activeFiltersCount = filters.categories.length + filters.levels.length + filters.price.length + (filters.rating ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#F5F7FB] pb-24 relative">
      
      {/* --- Header & Search --- */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Browse Courses</h1>
              <p className="text-gray-500 mt-2 text-lg">Discover your next skill from 120+ expert-led courses.</p>
            </div>
            <CatalogSearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
             <div className="sticky top-24">
               <LeftFiltersPanel 
                 filters={filters} 
                 onFilterChange={handleFilterChange} 
                 onClear={clearFilters} 
               />
             </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 min-w-0">
             <ResultsHeader 
               resultCount={sortedCourses.length}
               filters={filters}
               onRemoveFilter={handleRemoveFilter}
               sortBy={sortOption} 
               onSortChange={setSortOption} 
               viewMode={viewMode} 
               onViewChange={setViewMode} 
             />

             {displayedCourses.length > 0 ? (
               <div className="animate-fade-in-up">
                 <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
                   {displayedCourses.map(course => (
                     viewMode === 'grid' 
                       ? <CourseCard key={course.id} course={course} onClick={goToDetails} />
                       : <CourseListItem key={course.id} course={course} onClick={goToDetails} />
                   ))}
                 </div>

                 <PaginationControls 
                   currentPage={currentPage} 
                   totalPages={totalPages} 
                   onPageChange={setCurrentPage} 
                 />
               </div>
             ) : (
               <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
                 <div className="text-5xl mb-4 opacity-50">🔍</div>
                 <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
                 <p className="text-gray-500 mb-6 max-w-sm mx-auto">We couldn't find any courses matching your current filters. Try adjusting them or search for something else.</p>
                 <button onClick={clearFilters} className="px-6 py-2.5 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 font-bold transition-colors">
                   Clear all filters
                 </button>
               </div>
             )}
          </div>

        </div>
      </div>

      {/* Floating Filter Button (Mobile) */}
      <button 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 lg:hidden active:scale-95 transition-transform"
        onClick={() => setIsMobileFilterOpen(true)}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span className="font-bold text-sm">Filters</span>
        {activeFiltersCount > 0 && (
          <span className="bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </button>

      <FilterModalMobile 
        isOpen={isMobileFilterOpen} 
        onClose={() => setIsMobileFilterOpen(false)} 
        filters={filters} 
        onFilterChange={handleFilterChange}
        onApply={() => setIsMobileFilterOpen(false)}
        onClear={clearFilters}
      />

    </div>
  );
};

export default CoursesCatalogPage;
