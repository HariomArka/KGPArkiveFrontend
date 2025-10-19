import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import { AuthContext } from '../context/AuthContext';

const SubmitQuestion = () => {
  const { user } = useContext(AuthContext);
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  
  // API base URL - replace with your backend URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!question.trim()) {
      setError('Question cannot be empty');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/questions`, {
        question: question.trim(),
        askedBy: user.username,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSuccess('Question submitted successfully!');
      toast.success("Question submitted successfully!");
      setQuestion('');
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit question. Please try again.');
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 w-full max-w-md text-center transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
          <div className="text-6xl mb-6 text-gray-600">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-8">You must be logged in to submit a question.</p>
          <Link 
            to="/login" 
            className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 w-full max-w-2xl transform transition-all duration-500 hover:shadow-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Ask a Question</h1>
          <p className="text-gray-600">
            Welcome back, <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">{user.username}</span>! What would you like to know?
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="question" className="block text-sm font-semibold text-gray-700 mb-3">
              Your Question
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here... Be specific and clear to get the best answers."
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-gray-500 focus:ring-4 focus:ring-gray-100 transition-all duration-200 resize-none bg-gray-50 focus:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 placeholder-gray-400"
              rows={6}
              disabled={isLoading}
              maxLength={1000}
            />
            <div className="absolute bottom-3 right-4 text-xs text-gray-500">
              <span className={question.length > 800 ? 'text-gray-700 font-medium' : ''}>
                {question.length}/1000 characters
              </span>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="flex items-center p-4 bg-gray-50 border-l-4 border-gray-500 rounded-r-lg text-gray-700 animate-fadeIn">
              <span className="text-xl mr-3">⚠️</span>
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="flex items-center p-4 bg-gray-100 border-l-4 border-gray-600 rounded-r-lg text-gray-800 animate-fadeIn">
              <span className="text-xl mr-3">✅</span>
              <span className="font-medium">{success}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-4 justify-end pt-4">
            <Link
              to="/"
              className="px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading || !question.trim()}
              className={`
                px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform
                ${isLoading || !question.trim() 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-400' 
                  : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 border border-gray-700'
                }
                flex items-center gap-3
              `}
            >
              {isLoading ? (
                <>
                  <svg 
                    className="animate-spin h-5 w-5 text-gray-400" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="text-gray-400">Submitting...</span>
                </>
              ) : (
                'Submit Question'
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default SubmitQuestion;
