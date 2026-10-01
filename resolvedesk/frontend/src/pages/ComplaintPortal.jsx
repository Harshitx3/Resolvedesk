import { useParams } from 'react-router-dom'

export default function ComplaintPortal() {
  const { companySlug } = useParams()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Raise a Complaint
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Company: <span className="font-semibold text-indigo-600">{companySlug}</span>
        </p>
      </div>
    </div>
  )
}
