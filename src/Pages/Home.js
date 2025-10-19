import React, { useState, useEffect,useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Play, FileText, MessageCircleQuestion, CheckCircle, ArrowRight, BookOpen, Users, Smile } from 'lucide-react'
import { AuthContext } from '../context/AuthContext' 

const Home = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const location = useLocation()
  const { totalCount, answeredCount } = useContext(AuthContext)

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const statistics = [
    {
      icon: <FileText className="h-8 w-8 text-gray-600" />,
      number: "50+",
      label: "Files Available",
      description: "Study materials and resources"
    },
    {
      icon: <MessageCircleQuestion className="h-8 w-8 text-gray-600" />,
      number: totalCount+"+",
      label: "Questions Received",
      description: "Community engagement"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-gray-600" />,
      number: answeredCount+"+",
      label: "Questions Solved",
      description: "Problems resolved"
    }
  ]

  const ctaButtons = [
    {
      id: 'journey',
      title: 'Start Your Journey',
      subtitle: 'Join our community today',
      icon: <ArrowRight className="h-5 w-5" />,
      route: '/login',
      bgColor: 'bg-gray-700',
      hoverColor: 'hover:bg-gray-800',
      textColor: 'text-white'
    },
    {
      id: 'doubt',
      title: 'Post Your Doubt',
      subtitle: 'Get help from batchies and seniors',
      icon: <MessageCircleQuestion className="h-5 w-5" />,
      route: '/submit',
      bgColor: 'bg-gray-600',
      hoverColor: 'hover:bg-gray-700',
      textColor: 'text-white'
    },
    {
      id: 'study',
      title: 'Padlo Bhai',
      subtitle: 'Access study materials',
      icon: <BookOpen className="h-5 w-5" />,
      route: '/acads',
      bgColor: 'bg-gray-800',
      hoverColor: 'hover:bg-gray-900',
      textColor: 'text-white'
    }
  ]

  const handleVideoPlay = () => {
    setIsVideoPlaying(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Video Section - Top Priority */}
      <section className="relative">
        <div className="w-full">
          {/* Video Container */}
          <div className="relative w-full h-screen max-h-96 lg:max-h-[500px] overflow-hidden bg-gray-900">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="hero.mp4" type="video/mp4" />
            </video>
            
            {/* Video Overlay with Text */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                  KGP Arkive
                </h1>
                <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
                  Connect, Learn, and Grow together with other KGPians
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Welcome to KGP Arkive
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-justify">
            Access study materials, get your <b>doubts cleared</b>, and be part of an amazing academic community where students help each other succeed. Some of the study materials are available in KGPallence and SWG app or website, but these are not the main purpose of <b>KGP Arkive</b>. It is different from them. You can post your doubts related to Academics or personal life, and KGPians will reply to them. It's not like chatting, more like commenting on YouTube or Insta.
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-justify">
          There are very few people who will clear your doubt without explaining more than you need 😅. Let's make it happen here. Just post you doubts related to CDC or academics, there are many who will reply to you.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our community is making a difference in academic success - Let's make the numbers huge together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors duration-200 shadow-sm">
                <div className="flex justify-center mb-6">
                  {stat.icon}
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-gray-700 mb-2">
                  {stat.label}
                </div>
                <div className="text-gray-600">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Buttons Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your path and join thousands of students already benefiting from our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {ctaButtons.map((button) => (
              <Link
                key={button.id}
                to={button.route}
                className={`group relative p-8 rounded-xl ${button.bgColor} ${button.hoverColor} ${button.textColor} transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                  location.pathname === button.route ? 'scale-105 shadow-xl' : ''
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-white bg-opacity-20 rounded-full">
                    {button.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {button.title}
                  </h3>
                  <p className="text-sm opacity-90">
                    {button.subtitle}
                  </p>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="py-16 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Users className="h-8 w-8 text-gray-600 mr-3" />
            <span className="text-2xl font-bold text-gray-900">Join Our Growing Community</span>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Be part of a supportive academic environment where students help each other succeed. 
            Your journey to academic excellence starts here.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home