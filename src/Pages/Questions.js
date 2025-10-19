import React, { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, BookOpen, ChevronDown, ChevronUp, Plus, MessageSquare, Loader2, RefreshCw, Reply, Send } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'
import toast, { Toaster } from 'react-hot-toast'

const Questions = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  // State variables
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [expandedAnswers, setExpandedAnswers] = useState({})
  const [showAnswerForm, setShowAnswerForm] = useState({})
  const [answerTexts, setAnswerTexts] = useState({})
  const [submittingAnswers, setSubmittingAnswers] = useState({})
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [unansweredQuestions, setUnansweredQuestions] = useState([])
  const [showUnanswered, setShowUnanswered] = useState(false) // New state for toggling unanswered questions on mobile
  const questionRefs = useRef({})

  const QUESTIONS_PER_PAGE = 15
  const ANSWER_PREVIEW_LENGTH = 150

  // API base URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

  const { updateQuestionStats } = useContext(AuthContext);

  const fetchQuestions = async (pageNum = 1, append = false) => {
    try {
      if (pageNum === 1) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }
      setError(null)

      const response = await fetch(`${API_BASE_URL}/api/questions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const allQuestions = await response.json()

      const answered = allQuestions.filter(q => q.answers && q.answers.length > 0)
      const unanswered = allQuestions.filter(q => !q.answers || q.answers.length === 0)
      updateQuestionStats(answered.length, unanswered.length);

      answered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      unanswered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      const limitedUnanswered = unanswered.slice(0, 10)
      const startIndex = (pageNum - 1) * QUESTIONS_PER_PAGE
      const endIndex = startIndex + QUESTIONS_PER_PAGE
      const paginatedAnswered = answered.slice(startIndex, endIndex)

      if (append) {
        setAnsweredQuestions(prev => [...prev, ...paginatedAnswered])
      } else {
        setAnsweredQuestions(paginatedAnswered)
        setUnansweredQuestions(limitedUnanswered)
      }

      setHasMore(answered.length > pageNum * QUESTIONS_PER_PAGE)
    } catch (err) {
      console.error('Error fetching questions:', err)
      const errorMessage = `Failed to load questions: ${err.message}`
      setError(errorMessage)
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-right',
      })
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const scrollToQuestion = (questionId) => {
    const unansweredQuestion = unansweredQuestions.find(q => q._id === questionId)

    if (unansweredQuestion) {
      setAnsweredQuestions(prev => [unansweredQuestion, ...prev])
      setUnansweredQuestions(prev => prev.filter(q => q._id !== questionId))

      setTimeout(() => {
        const element = questionRefs.current[questionId]
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
    }
  }

  const submitAnswer = async (questionId) => {
    if (!user) {
      toast.error('Please login to answer questions')
      navigate('/login')
      return
    }

    const answerText = answerTexts[questionId]?.trim()
    if (!answerText) {
      toast.error('Answer cannot be empty')
      return
    }

    setSubmittingAnswers(prev => ({ ...prev, [questionId]: true }))

    try {
      const response = await fetch(`${API_BASE_URL}/api/questions/${questionId}/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          answer: answerText
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const updatedQuestion = await response.json()

      setAnsweredQuestions(prev => prev.map(q =>
        q._id === questionId ? updatedQuestion : q
      ))

      setUnansweredQuestions(prev => prev.filter(q => q._id !== questionId))
      setAnswerTexts(prev => ({ ...prev, [questionId]: '' }))
      setShowAnswerForm(prev => ({ ...prev, [questionId]: false }))

      toast.success('Answer submitted successfully!')
    } catch (err) {
      console.error('Error submitting answer:', err)
      toast.error('Failed to submit answer. Please try again.')
    } finally {
      setSubmittingAnswers(prev => ({ ...prev, [questionId]: false }))
    }
  }

  const toggleAnswerForm = (questionId) => {
    if (!user) {
      toast.error('Please login to answer questions', {
        duration: 3000,
        position: 'top-right',
      })
      navigate('/login')
      return
    }
    setShowAnswerForm(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }))
  }

  const handleAnswerChange = (questionId, value) => {
    setAnswerTexts(prev => ({ ...prev, [questionId]: value }))
  }

  const refreshQuestions = async () => {
    setPage(1)
    toast.promise(
      fetchQuestions(1, false),
      {
        loading: 'Refreshing questions...',
        success: 'Questions refreshed successfully! 🔄',
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

  const loadMoreQuestions = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchQuestions(nextPage, true)
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

  const getUserInitials = (name) => {
    // Add null/undefined checks before calling trim
    if (!name || typeof name !== 'string') {
      return 'U'; // Default fallback
    }

    const trimmedName = name.trim();
    if (!trimmedName) {
      return 'U'; // Default fallback for empty string
    }

    const parts = trimmedName.split(" ");
    if (parts.length >= 2) {
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    }
    return trimmedName.slice(0, 2).toUpperCase();
  };


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
    const controller = new AbortController()
    fetchQuestions()
    return () => {
      controller.abort()
    }
  }, [])

  if (loading && answeredQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 text-base">Loading questions...</p>
          <p className="text-sm text-gray-500 mt-2">
            Please wait while we fetch the latest Q&A...
          </p>
        </div>
      </div>
    )
  }

  if (error && answeredQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <MessageSquare className="w-12 h-12 text-red-300 mx-auto mb-4" />
          <h3 className="text-base font-medium text-gray-900 mb-2">
            Unable to load questions
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
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Q&A</h1>
                <p className="text-gray-600 text-sm sm:text-base font-medium mt-1">Questions and Answers</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/submit')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ask a Question
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Answered Questions */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Answered Questions ({answeredQuestions.length})
                </h2>
                <button
                  onClick={refreshQuestions}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </button>
              </div>

              {answeredQuestions.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                    No answered questions yet
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Browse through answered questions from the community
                  </p>
                  <button
                    onClick={() => navigate('/ask')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ask a Question
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {answeredQuestions.map((question) => (
                    <div
                      key={question._id}
                      ref={el => questionRefs.current[question._id] = el}
                      className="border border-gray-200 rounded-lg p-4 bg-white"
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
                        </div>
                        <p className="text-gray-800 mb-3 font-semibold text-sm sm:text-base">{question.question}</p>

                        {/* Answers */}
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

                        {/* Answer Form */}
                        <div className="mt-4 pt-3 border-t border-gray-200">
                          {!showAnswerForm[question._id] ? (
                            <button
                              onClick={() => toggleAnswerForm(question._id)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 w-full justify-center"
                            >
                              <Reply className="w-4 h-4 mr-2" />
                              Add Answer
                            </button>
                          ) : (
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-7 h-7 bg-gray-400 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-medium">
                                    {getUserInitials(user?.username)}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 text-sm">{user?.username}</p>
                                  <p className="text-xs text-gray-500">Your Answer</p>
                                </div>
                              </div>
                              <textarea
                                value={answerTexts[question._id] || ''}
                                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                                placeholder="Share your knowledge and help the community..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                                rows="4"
                              />
                              <div className="flex space-x-3">
                                <button
                                  onClick={() => submitAnswer(question._id)}
                                  disabled={submittingAnswers[question._id] || !answerTexts[question._id]?.trim()}
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex-1 justify-center"
                                >
                                  {submittingAnswers[question._id] ? (
                                    <>
                                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                      Submitting...
                                    </>
                                  ) : (
                                    <>
                                      <Send className="w-4 h-4 mr-2" />
                                      Submit Answer
                                    </>
                                  )}
                                </button>
                                <button
                                  onClick={() => toggleAnswerForm(question._id)}
                                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex-1 justify-center"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {hasMore && answeredQuestions.length > 0 && (
                <div className="text-center mt-6">
                  <button
                    onClick={loadMoreQuestions}
                    disabled={loadingMore}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Load More Questions
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Unanswered Questions - Collapsible on Mobile */}
          <div className="md:w-80">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:sticky md:top-4">
              <button
                onClick={() => setShowUnanswered(!showUnanswered)}
                className="md:hidden flex items-center justify-between w-full text-lg font-bold text-gray-900 mb-4"
              >
                <span>Questions to Answer ({unansweredQuestions.length})</span>
                {showUnanswered ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              <h3 className="hidden md:block text-lg font-bold text-gray-900 mb-4">
                Questions to Answer ({unansweredQuestions.length})
              </h3>

              <div className={`${showUnanswered ? 'block' : 'hidden'} md:block space-y-3`}>
                {unansweredQuestions.length === 0 ? (
                  <div className="text-center py-6">
                    <MessageCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">
                      All questions have been answered!
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                      Be the first to ask a question from the community!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {unansweredQuestions.map((question) => (
                      <div
                        key={question._id}
                        onClick={() => scrollToQuestion(question._id)}
                        className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all duration-200 bg-gradient-to-r from-blue-50 to-indigo-50"
                      >
                        <div className="flex items-start space-x-2">
                          <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-medium">
                              {getUserInitials(question.askedBy)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 mb-1">
                              {question.askedBy}
                            </p>
                            <p className="text-sm text-gray-700 line-clamp-3">
                              {question.question}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {formatDate(question.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Questions