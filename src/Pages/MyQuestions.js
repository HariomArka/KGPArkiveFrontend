import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, BookOpen, ChevronDown, ChevronUp, User, Loader2, RefreshCw, LogIn, MessageSquare } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'
import toast, { Toaster } from 'react-hot-toast'

const MyQuestions = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [myQuestions, setMyQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedAnswers, setExpandedAnswers] = useState({})
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [unansweredQuestions, setUnansweredQuestions] = useState([])

  const ANSWER_PREVIEW_LENGTH = 150
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

  const fetchMyQuestions = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`${API_BASE_URL}/api/questions/user/${user.username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const userQuestions = await response.json()

      const answered = userQuestions.filter(q => q.answers && q.answers.length > 0)
      const unanswered = userQuestions.filter(q => !q.answers || q.answers.length === 0)

      answered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      unanswered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      setAnsweredQuestions(answered)
      setUnansweredQuestions(unanswered)
      setMyQuestions(userQuestions)
    } catch (err) {
      console.error('Error fetching questions:', err)
      const errorMessage = `Failed to load your questions: ${err.message}`
      setError(errorMessage)
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-right',
      })
    } finally {
      setLoading(false)
    }
  }

  const refreshQuestions = async () => {
    toast.promise(
      fetchMyQuestions(),
      {
        loading: 'Refreshing your questions...',
        success: 'Questions refreshed successfully!',
        error: 'Failed to refresh questions'
      },
      {
        position: 'top-right',
        style: {
          background: '#f3f4f6',
          color: '#374151',
          border: '1px solid #d1d5db'
        }
      }
    )
  }

  const toggleAnswerExpansion = (questionId, answerId) => {
    const key = `${questionId}-${answerId}`
    setExpandedAnswers(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getUserInitials = (username) => {
    if (!username) return '??'
    return username.slice(0, 2).toUpperCase()
  }

  const shouldTruncateAnswer = (answer) => {
    return answer && answer.length > ANSWER_PREVIEW_LENGTH
  }

  const getTruncatedAnswer = (answer, questionId, answerId) => {
    if (!answer) return ''
    const key = `${questionId}-${answerId}`
    const isExpanded = expandedAnswers[key]
    if (!shouldTruncateAnswer(answer) || isExpanded) {
      return answer
    }
    return answer.slice(0, ANSWER_PREVIEW_LENGTH) + '...'
  }

  useEffect(() => {
    fetchMyQuestions()
  }, [user])

  if (!user && !loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Toaster />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg shadow-md">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">My Questions</h1>
                <p className="text-gray-600 text-sm sm:text-base font-medium mt-1">View your asked questions</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <LogIn className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Login to see your questions</h2>
              <p className="text-gray-600 mb-6">
                Please login to view your question history. You need to be authenticated to access your personal questions.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Login to Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 text-base">Loading your questions...</p>
          <p className="text-sm text-gray-500 mt-2">
            Please wait while we fetch your question history...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <MessageSquare className="w-12 h-12 text-red-300 mx-auto mb-4" />
          <h3 className="text-base font-medium text-gray-900 mb-2">
            Unable to load your questions
          </h3>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={refreshQuestions}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg shadow-md">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">My Questions</h1>
                <p className="text-gray-600 text-sm sm:text-base font-medium mt-1">
                  Questions asked by {user.username}
                </p>
              </div>
            </div>
            <button
              onClick={refreshQuestions}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Questions</p>
                  <p className="text-2xl font-bold text-gray-900">{myQuestions.length}</p>
                </div>
                <MessageCircle className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Answered</p>
                  <p className="text-2xl font-bold text-gray-900">{answeredQuestions.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Awaiting Answer</p>
                  <p className="text-2xl font-bold text-gray-900">{unansweredQuestions.length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {myQuestions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No questions yet
            </h3>
            <p className="text-gray-500 mb-6">
              You haven't asked any questions yet. Start by asking your first question!
            </p>
            <button
              onClick={() => navigate('/submit')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Ask Your First Question
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {answeredQuestions.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  Answered Questions ({answeredQuestions.length})
                </h2>
                <div className="space-y-4">
                  {answeredQuestions.map((question) => (
                    <div
                      key={question._id}
                      className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-medium">
                                {getUserInitials(question.askedBy)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm sm:text-base">{question.askedBy}</p>
                              <p className="text-xs text-gray-500">{formatDate(question.createdAt)}</p>
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            {question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}
                          </span>
                        </div>
                        <p className="text-gray-800 mb-3 font-semibold text-sm sm:text-base">{question.question}</p>

                        <div className="space-y-3">
                          {question.answers && question.answers.map((answer, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-medium">
                                    {getUserInitials(answer.username)}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 text-sm">{answer.username}</p>
                                  <p className="text-xs text-gray-500">{formatDate(answer.createdAt)}</p>
                                </div>
                              </div>
                              <p className="text-gray-700 text-sm text-justify">
                                {getTruncatedAnswer(answer.answer, question._id, index)}
                              </p>
                              {shouldTruncateAnswer(answer.answer) && (
                                <button
                                  onClick={() => toggleAnswerExpansion(question._id, index)}
                                  className="text-blue-600 hover:text-blue-800 text-xs mt-2 inline-flex items-center"
                                >
                                  {expandedAnswers[`${question._id}-${index}`] ? (
                                    <>
                                      <ChevronUp className="w-3 h-3 mr-1" />
                                      Show less
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="w-3 h-3 mr-1" />
                                      Show more
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {unansweredQuestions.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  Awaiting Answers ({unansweredQuestions.length})
                </h2>
                <div className="space-y-4">
                  {unansweredQuestions.map((question) => (
                    <div
                      key={question._id}
                      className="border border-orange-200 rounded-lg p-4 bg-gradient-to-r from-orange-50 to-yellow-50"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-medium">
                            {getUserInitials(question.askedBy)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-gray-900 text-sm sm:text-base">{question.askedBy}</p>
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                              No answers yet
                            </span>
                          </div>
                          <p className="text-gray-800 font-semibold text-sm sm:text-base mb-2">{question.question}</p>
                          <p className="text-xs text-gray-500">{formatDate(question.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyQuestions