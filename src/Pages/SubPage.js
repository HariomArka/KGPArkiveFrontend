import React from 'react'
import { Star, Download, Clock, Users, ChevronRight, BookOpen, Video, FileText, ExternalLink, Play, Pen, FileQuestion } from 'lucide-react'

const SubPage = ({ subject }) => {
  const handleLinkClick = (url) => {
    if (url && url !== 'drivelink') {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            {subject?.title}
          </h1>
          <div className="w-24 h-1 bg-gray-600 mx-auto rounded-full"></div>
        </div>


        {/* Notes Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => handleLinkClick(subject?.notes)}
            className="bg-gray-800 hover:bg-gray-900 text-white px-12 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">Our Notes</div>
                <div className="text-gray-300 text-sm">Our Class Notes with love and care</div>
              </div>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>


        {/* Main Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* NPTEL Card */}
          <div
            onClick={() => handleLinkClick(subject?.NPTEL)}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200 hover:border-gray-400"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-gray-700" />
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">NPTEL Lectures</h3>
              <p className="text-gray-600 text-sm mb-4">
                Complete video lecture series from NPTEL platform
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>Video Series</span>
              </div>
            </div>
          </div>

          {/* Resources Card */}
          <div
            onClick={() => handleLinkClick(subject?.resources)}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200 hover:border-gray-400"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-gray-700" />
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Resources</h3>
              <p className="text-gray-600 text-sm mb-4">
                Additional study materials and reference documents
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-2" />
                <span>Study Materials</span>
              </div>
            </div>
          </div>

          {/* Tutorial Card */}
          <div
            onClick={() => handleLinkClick(subject?.tutorial)}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200 hover:border-gray-400"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Pen className="w-6 h-6 text-gray-700" />
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Tutorial</h3>
              <p className="text-gray-600 text-sm mb-4">
                Additional study materials and reference documents
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-2" />
                <span>Assignments and their official solutions</span>
              </div>
            </div>
          </div>

          {/* PYQs Card */}
          <div
            onClick={() => handleLinkClick('https://qp.metakgp.org/')}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200 hover:border-gray-400"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FileQuestion className="w-6 h-6 text-gray-700" />
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">PYQs</h3>
              <p className="text-gray-600 text-sm mb-4">
                Collect from metakgp, and obviously submit yours just after exams
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-2" />
                <span>Previous Year Questions</span>
              </div>
            </div>
          </div>


          {/* Books Card */}
          <div
            onClick={() => handleLinkClick(subject?.books)}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200 hover:border-gray-400"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-gray-700" />
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Books</h3>
              <p className="text-gray-600 text-sm mb-4">
                Recommended textbooks and reference materials
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <BookOpen className="w-4 h-4 mr-2" />
                <span>E-Books & PDFs</span>
              </div>
            </div>
          </div>

          {/* My Tutorial Card */}
          <div
            onClick={() => handleLinkClick(subject?.mytutorial)}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200 hover:border-gray-400"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Pen className="w-6 h-6 text-gray-700" />
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">My Tutorial Solutions</h3>
              <p className="text-gray-600 text-sm mb-4">
                We have solved some tutorials by ourself
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-2" />
                <span>Assignments solutions by us</span>
              </div>
            </div>
          </div>
        </div>
        <div className='text-center font-bold text-2xl mb-6'>Videos to Explore</div>
        {/* Videos Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subject?.videos && subject.videos.length > 0 ? (
            subject.videos.map((videoSet, index) => (
              Object.entries(videoSet).map(([topic, link], topicIndex) => {
                // Extract YouTube video ID
                const videoIdMatch = link?.match(/(?:v=|youtu\.be\/)([^&]+)/);
                const videoId = videoIdMatch ? videoIdMatch[1] : null;
                const thumbnail = videoId
                  ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                  : null;

                return (
                  <div
                    key={`${index}-${topicIndex}`}
                    onClick={() => handleLinkClick(link)}
                    className="bg-white rounded-xl cursor-pointer hover:shadow-lg transition-all duration-300 group border border-gray-200 hover:border-gray-400 overflow-hidden flex flex-col"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-full aspect-video bg-gray-200">
                      {thumbnail ? (
                        <img
                          src={thumbnail}
                          alt={`${topic} thumbnail`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Video className="w-10 h-10 text-gray-500" />
                        </div>
                      )}

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all">
                        <Play className="w-14 h-14 text-white opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                          {topic}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>

                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Play className="w-4 h-4 mr-2" />
                        <span>Video Tutorial</span>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-3 h-3 fill-gray-400 text-gray-400" />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">5.0</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                );
              })
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No videos available yet</p>
              <p className="text-gray-400 text-sm">Check back later for topic-wise video content</p>
            </div>
          )}
        </div>


        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            All materials are curated for academic purposes. Click on any card to access the content.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SubPage