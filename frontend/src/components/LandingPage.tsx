import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartApplication = () => {
    navigate('/kyc-form');
  };

  const handleCheckStatus = () => {
    navigate('/status');
  };

  // const handleAdminDashboard = () => {
  //   navigate('/admin');
  // };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white mt-0 pt-0">
      {/* Hero Section */}
<div
  className="text-white"
  style={{
    background: 'linear-gradient(90deg, #177cc0, #71b03e)'
  }}
>        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Start?
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100">
              Complete your KYC verification in just a few minutes
            </p>
            <button
              onClick={handleStartApplication}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Start Application
            </button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 
            className="text-3xl font-bold text-center mb-12"
            style={{
              background: 'linear-gradient(90deg, #177cc0, #71b03e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center transform hover:-translate-y-3 transition-all duration-300 ease-in-out group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg">
                <span className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                Complete Form
              </h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Enter your personal information
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center transform hover:-translate-y-3 transition-all duration-300 ease-in-out group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg">
                <span className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                Upload Documents
              </h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Submit identity verification docs
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center transform hover:-translate-y-3 transition-all duration-300 ease-in-out group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg">
                <span className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                Queue Processing
              </h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Join fair processing queue
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center transform hover:-translate-y-3 transition-all duration-300 ease-in-out group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg">
                <span className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                Get Approved
              </h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Receive verification status
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div 
        className="py-16"
        style={{
          background: 'linear-gradient(135deg, rgba(23, 124, 192, 0.05) 0%, rgba(113, 176, 62, 0.05) 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 
            className="text-3xl font-bold text-center mb-12"
            style={{
              background: 'linear-gradient(90deg, #177cc0, #71b03e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Why Choose Our KYC Platform?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out group">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center group-hover:text-green-600 transition-colors duration-300">
                Fast Processing
              </h3>
              <p className="text-gray-600 text-center group-hover:text-gray-700 transition-colors duration-300">
                Get your KYC verified within 24 hours with our streamlined process
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out group">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center group-hover:text-blue-600 transition-colors duration-300">
                Secure & Private
              </h3>
              <p className="text-gray-600 text-center group-hover:text-gray-700 transition-colors duration-300">
                Your documents are encrypted and handled with utmost security
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out group">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center group-hover:text-purple-600 transition-colors duration-300">
                Real-time Updates
              </h3>
              <p className="text-gray-600 text-center group-hover:text-gray-700 transition-colors duration-300">
                Track your application status in real-time with live updates
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        className="py-16 text-white"
        style={{
          background: 'linear-gradient(135deg, #177cc0 0%, #71b03e 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Join thousands of businesses who have completed their KYC with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartApplication}
              className="px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              style={{
                backgroundColor: 'white',
                color: '#177cc0',
                border: '2px solid rgba(255, 255, 255, 0.8)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#177cc0';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#177cc0';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Start Application
            </button>
            <button
              onClick={handleCheckStatus}
              className="px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              style={{
                backgroundColor: 'white',
                color: '#177cc0',
                border: '2px solid rgba(255, 255, 255, 0.8)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#177cc0';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#177cc0';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Check Status
            </button>
          </div>
        </div>
      </div>

      {/* Admin Access */}
      {/* <div className="py-8 bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm mb-2">Admin Access</p>
          <button
            onClick={handleAdminDashboard}
            className="text-blue-400 hover:text-blue-300 underline text-sm"
          >
            Review Dashboard →
          </button>
        </div>
      </div>
 */}
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h3 
                className="text-lg font-semibold mb-4"
                style={{
                  background: 'linear-gradient(90deg, #177cc0, #71b03e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Product
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors" style={{ transition: 'color 0.3s' }}>Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors" style={{ transition: 'color 0.3s' }}>Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors" style={{ transition: 'color 0.3s' }}>Security</a></li>
              </ul>
            </div>
            <div className="md:col-span-1">
              <h3 
                className="text-lg font-semibold mb-4"
                style={{
                  background: 'linear-gradient(90deg, #177cc0, #71b03e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Company
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors" style={{ transition: 'color 0.3s' }}>About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors" style={{ transition: 'color 0.3s' }}>Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors" style={{ transition: 'color 0.3s' }}>Careers</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 
                className="text-lg font-semibold mb-4"
                style={{
                  background: 'linear-gradient(90deg, #177cc0, #71b03e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Support
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors" style={{ transition: 'color 0.3s' }}>Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors" style={{ transition: 'color 0.3s' }}>Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors" style={{ transition: 'color 0.3s' }}>Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2026 KYC Pipeline. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
