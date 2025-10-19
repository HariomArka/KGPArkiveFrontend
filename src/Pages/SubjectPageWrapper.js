import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SubPage from './SubPage' // Import your SubPage component

const SubjectPageWrapper = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { subject: subjectSlug } = useParams()
  
  // Get subject data from navigation state
  const subjectData = location.state?.subject
  const section = location.state?.section
  const index = location.state?.index

  // If no subject data in state, show error or redirect
  if (!subjectData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowLeft className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Subject Not Found</h2>
          <p className="text-gray-600 mb-6">
            The subject you're looking for could not be found. Please navigate back to the academics page and try again.
          </p>
          <button
            onClick={() => navigate('/acads')}
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
          >
            Back to Academics
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Back Button */}
      <div className="fixed top-20 left-4 z-50"> {/* Adjusted top to account for navbar */}
        <button
          onClick={() => navigate('/acads')}
          className="bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-gray-300 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800 group-hover:-translate-x-1 transition-all duration-200" />
        </button>
      </div>
      
      {/* Subject Page */}
      <SubPage subject={subjectData} />
    </div>
  )
}

export default SubjectPageWrapper