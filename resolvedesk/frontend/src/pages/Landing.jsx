import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          ResolveDesk
        </h1>
        <p className="text-2xl text-gray-600 mb-12">
          Customer Support Made Simple
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/company/login"
            className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
          >
            Company Login
          </Link>
          <button
            className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow-md border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            Raise a Complaint
          </button>
        </div>
      </div>
    </div>
  )
}
