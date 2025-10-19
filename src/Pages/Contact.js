import React, { useState, useEffect, useContext } from 'react'
import { Mail, Phone, Send, Users, MapPin, Clock, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom' // Add this import
import { AuthContext } from '../context/AuthContext' // Add this import with correct path

const ContactUs = () => {
  const { user, loading } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        alert(data.message || 'Failed to send message.');
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
// Add state for FAQ accordion
  const [openFAQ, setOpenFAQ] = useState(null);

  // Toggle FAQ function
  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const faqData = [
    {
      id: 1,
      question: "How quickly do you respond to inquiries?",
      answer: "We typically respond within 2 hours during business hours, and within 24 hours on weekends. Our support team is dedicated to providing timely assistance for all your academic needs."
    },
    {
      id: 2,
      question: "Is the platform free to use?",
      answer: "Yes! Our basic features are completely free for all students. We also offer premium features for enhanced learning experiences, but our core educational resources remain accessible to everyone."
    },
    {
      id: 3,
      question: "How do I create an account?",
      answer: "Simply click the 'Get Started' button above or visit our login page to create your free account. The registration process takes less than 2 minutes and gives you immediate access to our resources."
    },
    {
      id: 4,
      question: "What subjects and topics do you cover?",
      answer: "We offer comprehensive resources across engineering, computer science, mathematics, and related technical fields. Our content includes study materials, practice problems, project guides, and interactive learning tools."
    },
    {
      id: 5,
      question: "Can I access resources offline?",
      answer: "Many of our resources can be downloaded for offline access, including PDF guides, practice sets, and reference materials. This ensures you can continue learning even without an internet connection."
    },
    {
      id: 6,
      question: "Do you offer personalized learning paths?",
      answer: "Yes, our platform provides customized learning recommendations based on your progress, interests, and academic goals. The system adapts to your learning style and suggests relevant content."
    },
    {
      id: 7,
      question: "Is there a mobile app available?",
      answer: "Currently, our platform is web-based and fully responsive across all devices. We're developing a mobile app that will be available soon for both iOS and Android platforms."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 lg:py-28">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're here to help you succeed in your academic journey.
              Reach out to us and join our vibrant community!
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">Problem in studies?</div>
              <div className="text-gray-300 text-sm">Just post your question here</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">Know more about Campus</div>
              <div className="text-gray-300 text-sm">Ask your seniors here</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">Have resources to share?</div>
              <div className="text-gray-300 text-sm">We are at a mail distance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-white relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-900 to-transparent opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Contact Form - Takes up 2 columns */}
            <div className="lg:col-span-2" id="contact-form">
              <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>

                <div className="relative">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Any doubts or suggesstions for the website, any more componenet or any subject specific doubt you have - dont think just write and send  
                  </p>

                  {/* Success Message */}
                  {isSubmitted && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 bg-gray-50 text-gray-900 placeholder-gray-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 bg-gray-50 text-gray-900 placeholder-gray-500"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="6"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 bg-gray-50 text-gray-900 placeholder-gray-500 resize-none"
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>

                    <div>
                      <button
                        type="submit"
                        // onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full md:w-auto flex items-center justify-center space-x-3 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="lg:col-span-1 space-y-8">

              {/* Contact Details Card */}
              <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-5 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold mb-6">Contact Details</h3>
                  <div className="space-y-6  text-left">
                    <div className="flex items-start space-x-4">
                      <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-200">Email</div>
                        <div className="text-white">kgparkivehelp@gmail.com</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-200">Phone</div>
                        <div className="text-white">+91 98324 16501</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Card */}
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Users className="h-8 w-8 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Join Our Community</h3>
                  <p className="text-gray-600 mb-6">
                    Connect with fellow students and access exclusive resources.
                  </p>
                  <button
                    className="inline-flex items-center justify-center w-full bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 transform hover:scale-105"
                    onClick={() => {
                      if (user) {
                        navigate('/acads')
                      } else {
                        navigate('/login')
                      }
                    }}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Get Started'}
                  </button>

                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Quick answers to common questions about our platform and services
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <div className="group">
                  <button 
                    className="w-full px-8 py-6 text-left focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-inset"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 ml-6">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                          <svg 
                            className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                              openFAQ === faq.id ? 'rotate-180' : ''
                            }`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  {/* Collapsible Answer Section */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFAQ === faq.id 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-8 pb-6">
                      <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA with scroll functionality */}
          <div className="text-center mt-12">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-200">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Still have questions?</p>
                  <p className="text-sm text-gray-500">We're here to help you succeed</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ContactUs
