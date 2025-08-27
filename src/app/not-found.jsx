"use client";

import Link from 'next/link'
import MainLayout from '../components/layouts/MainLayout';

export default function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="relative">
              <div className="text-8xl font-bold text-purple opacity-20">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-purple"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Page Not Found
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              Oops! The page you&apos;re looking for doesn&apos;t exist.
              It might have been moved, deleted, or you entered the wrong URL.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-purple text-white font-semibold rounded-lg hover:bg-purple transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Go Home
              </Link>

              <button
                onClick={handleGoBack}
                className="inline-flex items-center px-6 py-3 border-2 border-purple text-purple font-semibold rounded-lg hover:bg-purple transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Go Back
              </button>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  )
}
