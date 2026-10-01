import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import ComplaintPortal from './pages/ComplaintPortal.jsx'
import MainLayout from './layouts/MainLayout.jsx'

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/c/:companySlug" element={<ComplaintPortal />} />
        <Route path="/company/login" element={
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Company Login</h1>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>
        } />
        <Route path="/company/dashboard" element={
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Company Dashboard</h1>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>
        } />
        <Route path="/company/tickets" element={
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Tickets</h1>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>
        } />
        <Route path="/company/agents" element={
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Agents</h1>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>
        } />
        <Route path="/company/settings" element={
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Settings</h1>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>
        } />
        <Route path="/admin/login" element={
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Login</h1>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>
        } />
        <Route path="/admin/dashboard" element={
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>
        } />
        <Route path="/admin/companies" element={
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Companies</h1>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>
        } />
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-xl text-gray-600">Page Not Found</p>
            </div>
          </div>
        } />
      </Routes>
    </MainLayout>
  )
}
