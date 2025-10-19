import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Users, GraduationCap, FileText, ChevronRight, Sparkles, TrendingUp, Clock, Search, X, Lock } from 'lucide-react'
import { AuthContext } from '../context/AuthContext' // Adjust path as needed

const Acads = () => {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useContext(AuthContext)
  const [activeSection, setActiveSection] = useState('freshers')
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchActive, setIsSearchActive] = useState(false)

  const sections = [
    {
      id: 'freshers',
      title: 'Freshers',
      icon: <Users className="h-5 w-5" />,
      description: 'Resources for first-year students',
      file: '/Data/freshers.json',
      color: 'from-blue-500 to-blue-700',
      bgGradient: 'from-blue-50 to-indigo-50'
    },
    {
      id: 'semesters',
      title: 'Semesters',
      icon: <GraduationCap className="h-5 w-5" />,
      description: 'Semester-wise study materials',
      file: '/Data/sems.json',
      color: 'from-purple-500 to-purple-700',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      id: 'commons',
      title: 'Commons',
      icon: <BookOpen className="h-5 w-5" />,
      description: 'Common subjects and resources',
      file: '/Data/commons.json',
      color: 'from-green-500 to-green-700',
      bgGradient: 'from-green-50 to-emerald-50'
    }
  ]

  // Filter subjects only when search is active
  const displayedSubjects = isSearchActive
    ? subjects.filter((subject) =>
        subject.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : subjects

  useEffect(() => {
    if (user) {
      loadSectionData(activeSection)
    }
  }, [activeSection, user])

  // Clear search when section changes
  useEffect(() => {
    setSearchInput('')
    setSearchQuery('')
    setIsSearchActive(false)
  }, [activeSection])

  const loadSectionData = async (sectionId) => {
    setLoading(true)
    setError(null)
    
    try {
      const section = sections.find(s => s.id === sectionId)
      const response = await fetch(section.file)
      
      if (!response.ok) {
        throw new Error(`Failed to load ${section.title} data`)
      }
      
      const data = await response.json()
      setSubjects(data.subjects || [])
    } catch (err) {
      setError(err.message)
      setSubjects([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubjectClick = (subject, index) => {
    const subjectSlug = subject.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
    
    navigate(`/acads/${subjectSlug}`, { 
      state: { 
        subject: subject,
        section: activeSection,
        index: index
      }
    })
  }

  const handleInputChange = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSearch = () => {
    if (searchInput.trim()) {
      setSearchQuery(searchInput)
      setIsSearchActive(true)
    }
  }

  const handleClearSearch = () => {
    setSearchInput('')
    setSearchQuery('')
    setIsSearchActive(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  const currentSection = sections.find(s => s.id === activeSection)

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto mb-6 w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
            <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-purple-400 animate-spin" style={{animationDirection: 'reverse'}}></div>
          </div>
          <p className="text-gray-700 font-semibold text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  // Show login prompt when user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/60 p-8 text-center relative z-10">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Login to Access Materials</h2>
            <p className="text-gray-600">Please login to access study materials and resources</p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Login to Continue
          </button>
        </div>
      </div>
    )
  }

  // Main content - shown only when logged in
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pt-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 relative z-10">
        {/* Page Header */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-4">
              Academic Resources
            </h1>
            <p className="text-gray-600 text-xl font-medium max-w-2xl mx-auto">
              Curated study materials and learning resources for every semester
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-3 xl:col-span-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/60 p-6 sticky top-20 w-full">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Categories</h3>
                <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
              
              <nav className="space-y-3">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full group relative overflow-hidden rounded-xl transition-all duration-300 ${
                      activeSection === section.id
                        ? `bg-gradient-to-r ${section.color} text-white shadow-lg transform scale-[1.02]`
                        : 'hover:bg-gray-50 text-gray-700 hover:shadow-md border border-transparent hover:border-gray-200'
                    }`}
                  >
                    {activeSection === section.id && (
                      <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                    )}
                    
                    <div className="relative flex items-center justify-between p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2.5 rounded-lg transition-all duration-300 ${
                          activeSection === section.id 
                            ? 'bg-white/20 shadow-inner' 
                            : 'bg-gray-100 group-hover:bg-gray-200'
                        }`}>
                          {React.cloneElement(section.icon, {
                            className: `h-5 w-5 ${
                              activeSection === section.id 
                                ? 'text-white' 
                                : 'text-gray-600 group-hover:text-gray-700'
                            }`
                          })}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-base leading-tight">{section.title}</div>
                          <div className={`text-xs mt-0.5 ${
                            activeSection === section.id 
                              ? 'text-white/80' 
                              : 'text-gray-500 group-hover:text-gray-600'
                          }`}>
                            {section.description}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`h-5 w-5 transition-all duration-300 ${
                        activeSection === section.id 
                          ? 'text-white/80 transform rotate-90' 
                          : 'text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1'
                      }`} />
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 xl:col-span-9">
            {/* Section Header with Search Box */}
            <div className={`bg-gradient-to-r ${currentSection.bgGradient} backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/60 p-8 mb-8 relative overflow-hidden`}>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full opacity-30 -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full opacity-20 -ml-12 -mb-12"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between flex-wrap text-left gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-3 bg-gradient-to-br ${currentSection.color} rounded-xl shadow-lg`}>
                        {React.cloneElement(currentSection.icon, {
                          className: "h-6 w-6 text-white"
                        })}
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                        {currentSection.title}
                      </h2>
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">
                      {currentSection.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/80 px-5 py-3 rounded-full border border-gray-200 shadow-md">
                    <div className={`w-2.5 h-2.5 bg-gradient-to-r ${currentSection.color} rounded-full animate-pulse`}></div>
                    <span className="text-sm font-bold text-gray-700">
                      {displayedSubjects.length} {displayedSubjects.length === 1 ? 'subject' : 'subjects'}
                    </span>
                  </div>
                </div>

                {/* Search Box Inside Section Header */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-md">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder={`Search subjects in ${currentSection.title}...`}
                        value={searchInput}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      />
                      <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                    
                    <button
                      onClick={handleSearch}
                      className={`px-6 py-3 bg-gradient-to-r ${currentSection.color} text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium flex items-center gap-2`}
                    >
                      <Search className="h-4 w-4" />
                      Search
                    </button>
                    
                    {isSearchActive && (
                      <button
                        onClick={handleClearSearch}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium flex items-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        Clear
                      </button>
                    )}
                  </div>
                  
                  {isSearchActive && (
                    <p className="mt-3 text-sm text-gray-700 font-medium">
                      Found {displayedSubjects.length} result{displayedSubjects.length !== 1 ? 's' : ''} for "{searchQuery}"
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/60 p-16 text-center">
                <div className="relative mx-auto mb-6 w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
                  <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-purple-400 animate-spin" style={{animationDirection: 'reverse'}}></div>
                  <BookOpen className="absolute inset-0 m-auto h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-700 font-semibold text-lg">Loading subjects...</p>
                <p className="text-gray-500 text-sm mt-1">Please wait while we fetch the latest content</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50/90 backdrop-blur-sm border border-red-200/60 rounded-2xl p-8 mb-8 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-red-100 rounded-xl">
                    <FileText className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-800 text-lg mb-2">Unable to load content</h3>
                    <p className="text-red-700 text-sm mb-2 font-medium">{error}</p>
                    <p className="text-red-600 text-sm">Showing sample data for demonstration purposes.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Subject Cards */}
            {!loading && displayedSubjects.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {displayedSubjects.map((subject, index) => (
                  <div
                    key={subject.id || index}
                    onClick={() => handleSubjectClick(subject, index)}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 p-6 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${currentSection.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
                    
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${currentSection.color} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 leading-tight">
                              {subject.title}
                            </h3>
                          </div>
                          <div className="h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-full transition-all duration-500"></div>
                        </div>
                        <div className={`flex-shrink-0 p-2.5 bg-gradient-to-br ${currentSection.color} group-hover:shadow-lg rounded-xl transition-all duration-300`}>
                          <ChevronRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                      
                      {subject.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {subject.description}
                        </p>
                      )}
                      
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && displayedSubjects.length === 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/60 p-16 text-center">
                <div className={`relative mx-auto mb-6 w-24 h-24 bg-gradient-to-br ${currentSection.bgGradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <BookOpen className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {isSearchActive ? 'No results found' : 'No subjects available'}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto leading-relaxed mb-6">
                  {isSearchActive 
                    ? `No subjects found matching "${searchQuery}". Try a different search term or clear the search to see all subjects.`
                    : 'No subjects found for this section. Please check back later or try selecting a different category.'}
                </p>
                {isSearchActive ? (
                  <button 
                    onClick={handleClearSearch}
                    className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${currentSection.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
                  >
                    <X className="h-5 w-5" />
                    Clear Search
                  </button>
                ) : (
                  <button 
                    onClick={() => setActiveSection('freshers')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <BookOpen className="h-5 w-5" />
                    Browse Other Categories
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Acads
