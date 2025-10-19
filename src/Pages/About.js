import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Users, MessageCircle, Lightbulb, Target, Heart } from 'lucide-react'

const About = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Header with animation */}
        <div className='text-center mb-16'>
          <div className='inline-block mb-4 px-6 py-2 bg-gray-800 text-white rounded-full text-sm font-semibold shadow-lg'>
            Welcome to KGP Arkive
          </div>
          <h1 className='text-5xl md:text-6xl font-bold text-gray-800 mb-4'>About Us</h1>
          <div className='w-24 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto mb-4'></div>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
            Building a collaborative knowledge ecosystem for the IIT Kharagpur community
          </p>
        </div>

        {/* Mission Cards - Three column layout */}
        <div className='grid md:grid-cols-3 gap-6 mb-12'>
          <div className='bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500'>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
              <BookOpen className='w-6 h-6 text-blue-600' />
            </div>
            <h3 className='text-xl font-bold text-gray-800 mb-2'>Share Knowledge</h3>
            <p className='text-gray-600 text-sm'>
              Access and contribute quality notes, resources, and study materials
            </p>
          </div>

          <div className='bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-green-500'>
            <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4'>
              <Users className='w-6 h-6 text-green-600' />
            </div>
            <h3 className='text-xl font-bold text-gray-800 mb-2'>Build Community</h3>
            <p className='text-gray-600 text-sm'>
              Connect with peers, share experiences, and grow together
            </p>
          </div>

          <div className='bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-purple-500'>
            <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4'>
              <MessageCircle className='w-6 h-6 text-purple-600' />
            </div>
            <h3 className='text-xl font-bold text-gray-800 mb-2'>Ask & Answer</h3>
            <p className='text-gray-600 text-sm'>
              Get your doubts cleared by the community in a KGPfied way
            </p>
          </div>
        </div>

        {/* Main Content Cards */}
        <div className='grid md:grid-cols-2 gap-8 mb-12'>
          <div className='bg-white shadow-lg rounded-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-2 h-12 bg-gradient-to-b from-blue-600 to-blue-800 rounded-full'></div>
              <h2 className='text-3xl font-bold text-gray-800'>Who is Arka in Arkive?</h2>
            </div>
            <div className='space-y-4 text-gray-700 leading-relaxed text-justify'>
              <div className='flex items-start gap-3'>
                <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg'>
                  AG
                </div>
                <div>
                  <p className='font-semibold text-gray-900 text-lg'>Arka Ghosh</p>
                  <p className='text-sm text-gray-600'>Nehru Hall | Electrical Engineering (Instrumentation)</p>
                </div>
              </div>
              <p>
                Hi there! I'm <span className='font-semibold text-gray-900'>Arka Ghosh</span>, from Nehru Hall of Residence, Department of Electrical Engineering, specializing in <span className='font-semibold text-gray-900'>Instrumentation Engineering</span>.
              </p>
              <p>
                While Electrical Engineering isn't always my primary passion, I find genuine interest in areas like Analog and Digital Electronics, and Control Systems. Though I'll admit, highly calculative topics like Signals and Systems can be challenging!
              </p>
              <p>
                Life isn't always about doing what we love—sometimes we tackle what's necessary. If you're not a TI aspirant, embrace it with positivity! Focus during exams and remember to enjoy the journey.
              </p>
            </div>
            <div className='mt-6 pt-6 border-t border-gray-200'>
              <a 
                href='https://www.linkedin.com/in/arka-ghosh-2729b529a/'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105'
              >
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'/>
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className='bg-white shadow-lg rounded-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-2 h-12 bg-gradient-to-b from-purple-600 to-purple-800 rounded-full'></div>
              <h2 className='text-3xl font-bold text-gray-800'>Why KGP Arkive?</h2>
            </div>
            <div className='space-y-4 text-gray-700 leading-relaxed text-justify'>
              <div className='bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border-l-4 border-purple-500'>
                <div className='flex items-center gap-2 mb-2'>
                  <Target className='w-5 h-5 text-purple-600' />
                  <p className='font-semibold text-gray-900'>Our Vision</p>
                </div>
                <p className='text-sm'>
                  Creating a centralized knowledge repository for the IIT Kharagpur community
                </p>
              </div>
              <p>
                There are KGPallence and SWG app and website to get your study materials, but those are mostly some old notes and drives that are not completely populated with proper data. So I thought of posting my own notes, and obviously some good notes will be collected from your side also.
              </p>
              <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-l-4 border-blue-500'>
                <div className='flex items-center gap-2 mb-2'>
                  <Lightbulb className='w-5 h-5 text-blue-600' />
                  <p className='font-semibold text-gray-900'>What Makes Us Different?</p>
                </div>
                <p className='text-sm'>
                  We obviously have Reddit or Social media platforms to post our doubts and get answered, let's think <span className='font-semibold text-gray-900'>KGP Arkive a KGPfied version</span> of that.
                </p>
              </div>
              <div className='flex gap-3 mt-6'>
                <Link 
                  to='/contact' 
                  className='flex-1 text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200'
                >
                  Contact Us
                </Link>
                <Link 
                  to='/questions' 
                  className='flex-1 text-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-medium hover:from-purple-700 hover:to-purple-900 transition-all duration-200 shadow-md hover:shadow-lg'
                >
                  Ask Questions
                </Link>
              </div>
            </div>
          </div>
        </div>


        {/* Footer Quote */}
        <div className='text-center'>
          <div className='max-w-3xl mx-auto bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16'></div>
            <div className='absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12'></div>
            <div className='relative z-10'>
              <Heart className='w-8 h-8 text-red-400 mx-auto mb-4' />
              <p className='text-2xl italic mb-3 font-light'>"Knowledge shared is knowledge multiplied"</p>
              <p className='text-gray-400 text-sm'>– The KGP Arkive Team</p>
              <div className='mt-6 pt-6 border-t border-gray-700'>
                <p className='text-sm text-gray-300'>
                  Join us in building a stronger, more connected KGP community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About