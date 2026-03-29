import { projects } from '../data/projects';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Filter, Grid, List, Search, SlidersHorizontal, Download, ChevronDown, Check, X } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';

export function Work() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);

  const categories = [
    'HRTech',
    'HealthTech / Healthcare',
    'B2B SaaS',
    'B2C SaaS',
    'EdTech',
    'Travel & Hospitality',
    'Manufacturing',
    'Mobile App',
    'Web App',
    'Desktop Software',
    'Admin Panel / Dashboard',
    'CRM / ERP'
  ];
  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'impact', label: 'Highest Impact' },
    { value: 'alphabetical', label: 'A-Z' }
  ];

  // Hide/show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down & past threshold
        setIsHeaderHidden(true);
      } else {
        // Scrolling up
        setIsHeaderHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Set searching state
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProjects = selectedCategories.length === 0 
    ? projects 
    : projects.filter(p => selectedCategories.includes(p.category));

  const searchedProjects = filteredProjects.filter(project => 
    project.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    project.context.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    project.role.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    project.outcome.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
  );

  // Sort projects based on selected sort option
  const sortedProjects = useMemo(() => {
    const projectsCopy = [...searchedProjects];
    
    switch (sortBy) {
      case 'recent':
        return projectsCopy.sort((a, b) => {
          const yearA = parseInt(a.year);
          const yearB = parseInt(b.year);
          return yearB - yearA; // Most recent first
        });
      
      case 'impact':
        return projectsCopy.sort((a, b) => {
          // Extract impact percentage from outcome string (e.g., "45%" -> 45)
          const impactA = parseFloat(a.outcome.match(/(\d+)%/)?.[1] || '0');
          const impactB = parseFloat(b.outcome.match(/(\d+)%/)?.[1] || '0');
          return impactB - impactA; // Highest impact first
        });
      
      case 'alphabetical':
        return projectsCopy.sort((a, b) => 
          a.title.localeCompare(b.title)
        );
      
      default:
        return projectsCopy;
    }
  }, [searchedProjects, sortBy]);

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Comprehensive Header Section */}
      <section 
        className="border-b sticky z-40 backdrop-blur-md transition-all duration-300"
        style={{ 
          backgroundColor: 'var(--bg-primary)',
          borderColor: 'var(--border-default)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
          top: isHeaderHidden ? '0' : '72px',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Single Row - Title Left, Controls Right */}
          <div className="flex items-center justify-between gap-4 py-3">
            {/* Title - Left */}
            <div className="flex-shrink-0">
              <h1 
                className="mb-0"
                style={{ 
                  color: 'var(--text-primary)', 
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  fontSize: '28px',
                  lineHeight: 1.2,
                }}
              >
                Work
              </h1>
              <p className="text-xs" style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {sortedProjects.length} projects • End-to-end case studies
              </p>
            </div>

            {/* Controls - Right */}
            <div className="flex items-center gap-2.5">{/* Search */}
              <div 
                className="flex items-center gap-3 px-3 rounded-lg flex-shrink-0 relative"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1.5px solid var(--border-default)',
                  width: '260px',
                  height: '40px',
                }}
              >
                <Search className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="bg-transparent outline-none flex-1 text-sm"
                  style={{ color: 'var(--text-primary)' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setDebouncedSearchTerm(searchTerm);
                      e.currentTarget.blur();
                    }
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="flex-shrink-0 hover:opacity-70 transition-opacity"
                  >
                    <X className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  </button>
                )}
              </div>

              {/* Category Filter Dropdown */}
              <div className="relative flex-shrink-0" ref={filterRef}>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-3 rounded-lg text-sm transition-all duration-200 relative whitespace-nowrap"
                  onMouseEnter={(e) => {
                    if (selectedCategories.length === 0) {
                      e.currentTarget.style.backgroundColor = 'var(--badge-bg)';
                      e.currentTarget.style.borderColor = 'var(--badge-border)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategories.length === 0) {
                      e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                      e.currentTarget.style.borderColor = 'var(--border-default)';
                    }
                  }}
                  style={{
                    backgroundColor: selectedCategories.length > 0 ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                    border: '1.5px solid var(--border-default)',
                    color: selectedCategories.length > 0 ? 'white' : 'var(--text-primary)',
                    fontWeight: 500,
                    height: '40px',
                  }}
                >
                  <Filter className="w-4 h-4" />
                  <span>Category</span>
                  {selectedCategories.length > 0 && (
                    <span 
                      className="ml-1 px-1.5 py-0.5 rounded-full text-xs"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        fontWeight: 600,
                      }}
                    >
                      {selectedCategories.length}
                    </span>
                  )}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 left-0 rounded-xl overflow-hidden shadow-lg z-50"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1.5px solid var(--border-default)',
                        minWidth: '260px',
                        maxHeight: '264px',
                      }}
                    >
                      {/* Fixed Header */}
                      <div className="p-3 pb-2" style={{ borderBottom: '1px solid var(--border-default)' }}>
                        <div className="flex items-center justify-between">
                          <p className="text-xs" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                            FILTER BY CATEGORY
                          </p>
                          {selectedCategories.length > 0 && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedCategories([])}
                              className="text-xs"
                              style={{ color: 'var(--accent-blue)', fontWeight: 600 }}
                            >
                              Clear
                            </motion.button>
                          )}
                        </div>
                      </div>

                      {/* Scrollable Category List */}
                      <div className="p-3 overflow-y-auto custom-scrollbar" style={{ maxHeight: '220px' }}>
                        <div className="space-y-1">
                          {categories.map((category) => {
                            const isSelected = selectedCategories.includes(category);
                            return (
                              <motion.label
                                key={category}
                                whileHover={{ x: 2 }}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200"
                                style={{
                                  backgroundColor: isSelected ? 'var(--gradient-secondary)' : 'transparent',
                                }}
                              >
                                <div 
                                  className="w-4 h-4 rounded flex items-center justify-center transition-all duration-200 flex-shrink-0"
                                  style={{
                                    backgroundColor: isSelected ? 'var(--accent-blue)' : 'transparent',
                                    border: `2px solid ${isSelected ? 'var(--accent-blue)' : 'var(--border-default)'}`,
                                  }}
                                >
                                  {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                                </div>
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleCategory(category)}
                                  className="sr-only"
                                />
                                <span 
                                  className="text-sm flex-1"
                                  style={{ 
                                    color: 'var(--text-primary)',
                                    fontWeight: isSelected ? 600 : 500,
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {category}
                                </span>
                              </motion.label>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--badge-bg)';
                  e.currentTarget.style.borderColor = 'var(--badge-border)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                }}
                className="px-4 rounded-lg text-sm appearance-none cursor-pointer transition-all duration-200 whitespace-nowrap"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1.5px solid var(--border-default)',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  minWidth: '150px',
                  height: '40px',
                }}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Start a Project CTA */}
              <a
                href="/contact"
                className="flex items-center gap-2 px-6 rounded-lg transition-all duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--badge-bg)';
                  e.currentTarget.style.borderColor = 'var(--badge-border)';
                  e.currentTarget.style.color = 'var(--badge-text)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  e.currentTarget.style.color = 'white';
                }}
                style={{
                  backgroundColor: 'var(--accent-blue)',
                  border: '1.5px solid var(--accent-blue)',
                  color: 'white',
                  fontWeight: 600,
                  height: '40px',
                }}
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {searchedProjects.length === 0 ? (
          // No Results Found State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{
                backgroundColor: 'var(--gradient-secondary)',
                border: '2px solid var(--border-default)',
              }}
            >
              <Search className="w-10 h-10" style={{ color: 'var(--text-secondary)' }} />
            </div>
            <h3 
              className="mb-2"
              style={{ 
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '20px',
              }}
            >
              No projects found
            </h3>
            <p 
              className="text-center max-w-md"
              style={{ 
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              {debouncedSearchTerm 
                ? `We couldn't find any projects matching "${debouncedSearchTerm}". Try a different search term or filter.`
                : selectedCategories.length > 0
                ? `No projects found in the selected ${selectedCategories.length === 1 ? 'category' : 'categories'}. Try selecting different categories.`
                : 'No projects available at the moment.'}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategories.join(',') + viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={viewMode === 'grid' ? 'grid md:grid-cols-3 gap-5' : 'space-y-4'}
          >
            {sortedProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={`/case-study/${project.id}`}
                  style={{ textDecoration: 'none' }}
                  className="block"
                >
                  {viewMode === 'grid' ? (
                    // Grid Card Design
                    <div 
                      className="h-full rounded-xl overflow-hidden transition-all duration-200"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--badge-bg)';
                        e.currentTarget.style.borderColor = 'var(--badge-border)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                        e.currentTarget.style.borderColor = 'var(--border-default)';
                      }}
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1.5px solid var(--border-default)',
                      }}
                    >
                      {/* Image */}
                      <div className="relative w-full overflow-hidden" style={{ height: '220px', display: 'flex' }}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          style={{ transform: 'none', minHeight: '100%', minWidth: '100%' }}
                        />
                        <div 
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: 'white',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            }}
                          >
                            <ArrowUpRight className="w-4 h-4" style={{ color: 'var(--accent-blue)' }} />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-2">
                          <span 
                            className="text-xs px-2.5 py-1 rounded-md"
                            style={{
                              backgroundColor: 'var(--badge-bg)',
                              color: 'var(--badge-text)',
                              fontWeight: 600,
                            }}
                          >
                            {project.category}
                          </span>
                        </div>

                        <div>
                          <h3 
                            className="mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2"
                            style={{ 
                              color: 'var(--text-primary)',
                              fontWeight: 600,
                              lineHeight: 1.3,
                              fontSize: '18px',
                            }}
                          >
                            {project.title}
                          </h3>
                          <p 
                            className="text-sm line-clamp-2"
                            style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
                          >
                            {project.context}
                          </p>
                        </div>
                      </div>

                      {/* Role & Year */}
                      <div className="px-5 pb-5">
                        <div 
                          className="border-t pt-4 flex items-center justify-between"
                          style={{ borderColor: 'var(--border-default)' }}
                        >
                          <p style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '13px' }}>
                            Role: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{project.role}</span>
                          </p>
                          <span 
                            className="px-3 py-1.5"
                            style={{ 
                              backgroundColor: 'var(--year-badge-bg)', 
                              color: 'var(--text-primary)', 
                              fontWeight: 600, 
                              fontSize: '13px',
                              borderRadius: '8px'
                            }}
                          >
                            {project.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List Card Design
                    <div 
                      className="rounded-xl overflow-hidden transition-all duration-200"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--badge-bg)';
                        e.currentTarget.style.borderColor = 'var(--badge-border)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                        e.currentTarget.style.borderColor = 'var(--border-default)';
                      }}
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1.5px solid var(--border-default)',
                      }}
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="relative md:w-1/3 overflow-hidden" style={{ minHeight: '200px', display: 'flex' }}>
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            style={{ transform: 'none', minHeight: '100%', minWidth: '100%' }}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-5 flex flex-col justify-between">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span 
                                  className="text-xs px-2.5 py-1 rounded-md"
                                  style={{
                                    backgroundColor: 'var(--badge-bg)',
                                    color: 'var(--badge-text)',
                                    fontWeight: 600,
                                  }}
                                >
                                  {project.category}
                                </span>
                                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                  {project.domain}
                                </span>
                              </div>
                              <span 
                                className="text-xs px-2.5 py-1 rounded-full"
                                style={{
                                  backgroundColor: 'var(--gradient-secondary)',
                                  color: 'var(--text-secondary)',
                                  fontWeight: 600,
                                }}
                              >
                                {project.year}
                              </span>
                            </div>

                            <div>
                              <h3 
                                className="text-xl mb-2 group-hover:text-blue-600 transition-colors duration-200"
                                style={{ 
                                  color: 'var(--text-primary)',
                                  fontWeight: 600,
                                  lineHeight: 1.2,
                                }}
                              >
                                {project.title}
                              </h3>
                              <p 
                                className="text-sm line-clamp-2"
                                style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
                              >
                                {project.context}
                              </p>
                            </div>

                            <div className="flex gap-4">
                              <div>
                                <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                                  ROLE
                                </p>
                                <p className="text-xs" style={{ color: 'var(--text-primary)' }}>
                                  {project.role}
                                </p>
                              </div>
                              <div className="w-px" style={{ backgroundColor: 'var(--border-default)' }} />
                              <div>
                                <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                                  IMPACT
                                </p>
                                <p className="text-xs" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                                  {project.outcome}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-default)' }}>
                            {project.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-md"
                                style={{
                                  backgroundColor: 'var(--gradient-secondary)',
                                  color: 'var(--text-secondary)',
                                  border: '1px solid var(--border-default)',
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
        )}
      </section>
    </div>
  );
}