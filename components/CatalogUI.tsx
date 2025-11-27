
import React from 'react';

// --- Types ---
export interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  duration: string;
  lectures: number;
  level: string;
  price: number;
  originalPrice?: number;
  category: string;
  imageColor: string; // Tailwind bg class for placeholder
  tag?: string;
}

export interface FilterState {
  categories: string[];
  levels: string[];
  price: string[]; // 'free', 'paid'
  rating: number | null;
}

// --- Icons ---
const GridIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const StarIcon: React.FC<{ filled: boolean; className?: string }> = ({ filled, className = "w-4 h-4" }) => (
  <svg className={`${className} ${filled ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// --- Components ---

export const CatalogSearchBar: React.FC<{ value: string; onChange: (val: string) => void }> = ({ value, onChange }) => (
  <div className="relative w-full max-w-md">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      className="block w-full bg-gray-50 border border-transparent text-gray-900 placeholder-gray-500 rounded-full pl-11 pr-4 py-2.5 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm hover:bg-white hover:shadow-md"
      placeholder="Search for courses..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

interface FilterGroupProps {
  title: string;
  items: { label: string; value: string | number }[];
  selectedValues: (string | number)[];
  onChange: (value: string | number) => void;
}

const FilterGroup: React.FC<FilterGroupProps> = ({ title, items, selectedValues, onChange }) => (
  <div className="py-5 border-b border-gray-100 last:border-0">
    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{title}</h3>
    <div className="space-y-2">
      {items.map((item) => {
        const isChecked = selectedValues.includes(item.value);
        return (
          <label key={item.value} className="flex items-center group cursor-pointer select-none">
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors mr-3 ${isChecked ? 'bg-primary border-primary' : 'bg-white border-gray-300 group-hover:border-primary'}`}>
              {isChecked && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={isChecked}
              onChange={() => onChange(item.value)}
            />
            <span className={`text-sm transition-colors ${isChecked ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
              {item.label}
            </span>
          </label>
        );
      })}
    </div>
  </div>
);

export const LeftFiltersPanel: React.FC<{
  filters: FilterState;
  onFilterChange: (type: keyof FilterState, value: string | number) => void;
  onClear: () => void;
  className?: string;
}> = ({ filters, onFilterChange, onClear, className = '' }) => {
  
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        <button onClick={onClear} className="text-xs font-medium text-primary hover:text-blue-700 hover:underline">
          Reset
        </button>
      </div>

      <FilterGroup
        title="Category"
        items={[
          { label: 'Web Development', value: 'Web Development' },
          { label: 'Data Science', value: 'Data Science' },
          { label: 'Design', value: 'Design' },
          { label: 'Marketing', value: 'Marketing' },
          { label: 'Business', value: 'Business' },
        ]}
        selectedValues={filters.categories}
        onChange={(val) => onFilterChange('categories', val)}
      />
      
      <FilterGroup
        title="Level"
        items={[
          { label: 'Beginner', value: 'Beginner' },
          { label: 'Intermediate', value: 'Intermediate' },
          { label: 'Advanced', value: 'Advanced' },
        ]}
        selectedValues={filters.levels}
        onChange={(val) => onFilterChange('levels', val)}
      />

      <FilterGroup
        title="Price"
        items={[
          { label: 'Free', value: 'free' },
          { label: 'Paid', value: 'paid' },
        ]}
        selectedValues={filters.price}
        onChange={(val) => onFilterChange('price', val)}
      />

      <div className="pt-5">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Rating</h3>
         <div className="space-y-1">
            {[4.5, 4.0, 3.5].map((rating) => (
               <button 
                key={rating}
                onClick={() => onFilterChange('rating', rating)}
                className={`flex items-center w-full px-2 py-1.5 rounded-lg transition-colors ${filters.rating === rating ? 'bg-yellow-50 ring-1 ring-yellow-200' : 'hover:bg-gray-50'}`}
               >
                 <div className="flex text-yellow-400 mr-2">
                   {[1,2,3,4,5].map(star => <StarIcon key={star} filled={star <= Math.floor(rating) || (star === Math.ceil(rating) && rating % 1 !== 0)} />)}
                 </div>
                 <span className={`text-sm ${filters.rating === rating ? 'text-gray-900 font-bold' : 'text-gray-600'}`}>& Up</span>
               </button>
            ))}
         </div>
      </div>
    </div>
  );
};

export const ResultsHeader: React.FC<{
  resultCount: number;
  filters: FilterState;
  onRemoveFilter: (type: keyof FilterState, value: string | number) => void;
  sortBy: string;
  onSortChange: (val: string) => void;
  viewMode: 'grid' | 'list';
  onViewChange: (mode: 'grid' | 'list') => void;
}> = ({ resultCount, filters, onRemoveFilter, sortBy, onSortChange, viewMode, onViewChange }) => {
  
  const hasActiveFilters = filters.categories.length > 0 || filters.levels.length > 0 || filters.price.length > 0 || filters.rating !== null;

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-gray-600 font-medium text-sm">
          Showing <span className="text-gray-900 font-bold">{resultCount}</span> courses
        </p>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Custom Select */}
          <div className="relative group">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer hover:border-gray-300 transition-colors"
            >
              <option value="popularity">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDownIcon />
            </div>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => onViewChange('grid')}
              className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              aria-label="Grid view"
            >
              <GridIcon />
            </button>
            <button
              onClick={() => onViewChange('list')}
              className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              aria-label="List view"
            >
              <ListIcon />
            </button>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.categories.map(c => (
            <span key={c} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-primary border border-blue-100">
              {c}
              <button onClick={() => onRemoveFilter('categories', c)} className="ml-1.5 hover:text-blue-800 focus:outline-none">×</button>
            </span>
          ))}
          {filters.levels.map(l => (
            <span key={l} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-600 border border-purple-100">
              {l}
              <button onClick={() => onRemoveFilter('levels', l)} className="ml-1.5 hover:text-purple-800 focus:outline-none">×</button>
            </span>
          ))}
          {filters.price.map(p => (
            <span key={p} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-100 uppercase">
              {p}
              <button onClick={() => onRemoveFilter('price', p)} className="ml-1.5 hover:text-green-800 focus:outline-none">×</button>
            </span>
          ))}
          {filters.rating && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100">
              {filters.rating}+ Stars
              <button onClick={() => onRemoveFilter('rating', filters.rating!)} className="ml-1.5 hover:text-yellow-900 focus:outline-none">×</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const CourseCard: React.FC<{ course: Course; onClick?: () => void }> = ({ course, onClick }) => (
  <div 
    onClick={onClick}
    className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden relative"
  >
    {/* Image Container */}
    <div className={`aspect-[16/9] w-full ${course.imageColor} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
      <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-110 transition-transform duration-500">
         <span className="text-4xl font-bold text-white uppercase tracking-widest select-none">
           {course.category.substring(0,2)}
         </span>
      </div>
      
      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
         {course.tag && (
           <span className="bg-white/90 backdrop-blur-md text-gray-800 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
             {course.tag}
           </span>
         )}
      </div>
    </div>

    <div className="p-5 flex flex-col flex-grow">
      {/* Meta Header */}
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold tracking-wide uppercase text-primary bg-blue-50 px-2 py-0.5 rounded-full">
          {course.category}
        </span>
        <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-yellow-700">
          <span className="text-xs font-bold">{course.rating}</span>
          <StarIcon filled={true} className="w-3 h-3" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
        {course.title}
      </h3>

      {/* Instructor & Meta */}
      <div className="flex items-center gap-2 mb-4">
         <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-500">
            {course.instructor.charAt(0)}
         </div>
         <span className="text-xs text-gray-500 font-medium truncate">{course.instructor}</span>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex flex-col">
           {course.originalPrice && (
             <span className="text-[10px] text-gray-400 line-through">₹{course.originalPrice}</span>
           )}
           <span className="text-sm font-bold text-gray-900">
             {course.price === 0 ? 'Free' : `₹${course.price}`}
           </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
           <span className="flex items-center gap-1">
             <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             {course.duration}
           </span>
           <span>{course.level}</span>
        </div>
      </div>
    </div>
  </div>
);

export const CourseListItem: React.FC<{ course: Course; onClick?: () => void }> = ({ course, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-blue-100 transition-all duration-300 flex flex-col sm:flex-row cursor-pointer group"
  >
    {/* Image Placeholder */}
    <div className={`h-48 sm:h-auto sm:w-56 ${course.imageColor} relative flex-shrink-0 flex items-center justify-center overflow-hidden`}>
      <span className="text-3xl font-bold opacity-20 text-white uppercase group-hover:scale-110 transition-transform duration-500">
        {course.category.substring(0,2)}
      </span>
      {course.tag && (
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded shadow-sm text-gray-800">
          {course.tag}
        </span>
      )}
    </div>

    <div className="p-5 flex-grow flex flex-col sm:flex-row gap-4 min-w-0">
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold tracking-wide uppercase text-primary bg-blue-50 px-2 py-0.5 rounded-full">
            {course.category}
          </span>
          <span className="text-xs text-gray-500 font-medium">· {course.level}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors truncate">
          {course.title}
        </h3>
        <div className="flex items-center gap-2 mb-3">
           <div className="flex items-center gap-1 text-yellow-400">
             <span className="text-sm font-bold text-gray-900">{course.rating}</span>
             <StarIcon filled={true} className="w-3.5 h-3.5" />
           </div>
           <span className="text-xs text-gray-400">({course.reviews} reviews)</span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          Master {course.title} with hands-on projects and expert guidance. Join students worldwide in this comprehensive curriculum.
        </p>
        
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
             <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[9px] font-bold text-gray-600">
                {course.instructor.charAt(0)}
             </div>
             {course.instructor}
          </div>
          <span className="flex items-center gap-1">
             <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             {course.duration}
          </span>
          <span className="flex items-center gap-1">
             <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
             {course.lectures} lectures
          </span>
        </div>
      </div>

      <div className="flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-end border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6 min-w-[120px] flex-shrink-0">
         <div className="text-right mb-0 sm:mb-4">
           {course.originalPrice && (
             <span className="text-xs text-gray-400 line-through block">₹{course.originalPrice}</span>
           )}
           <span className="text-xl font-bold text-gray-900 block">
             {course.price === 0 ? 'Free' : `₹${course.price}`}
           </span>
         </div>
         <button className="text-sm font-bold text-white bg-primary px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto">
           View Details
         </button>
      </div>
    </div>
  </div>
);

export const PaginationControls: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-12">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      
      <div className="hidden sm:flex space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
              currentPage === page
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <span className="sm:hidden text-sm text-gray-600 font-medium">Page {currentPage} of {totalPages}</span>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export const FilterModalMobile: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (type: keyof FilterState, value: string | number) => void;
  onApply: () => void;
  onClear: () => void;
}> = ({ isOpen, onClose, filters, onFilterChange, onApply, onClear }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white animate-fade-in">
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">Filter Courses</h2>
        <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-[#F5F7FB]">
        <LeftFiltersPanel 
          filters={filters} 
          onFilterChange={onFilterChange} 
          onClear={onClear}
          className="border-0 shadow-none p-0 bg-transparent" 
        />
      </div>

      <div className="p-4 border-t border-gray-100 bg-white safe-area-pb">
        <button 
          onClick={onApply}
          className="w-full bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-blue-700 transition-colors active:scale-[0.99]"
        >
          Show Results
        </button>
      </div>
    </div>
  );
};
