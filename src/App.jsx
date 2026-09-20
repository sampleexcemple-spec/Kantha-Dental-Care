import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './lib/useAuth'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileCallBar from './components/MobileCallBar'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Services from './pages/Services'
import Doctors from './pages/Doctors'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

import Login from './admin/Login'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import ManageDoctors from './admin/ManageDoctors'
import ManageOffers from './admin/ManageOffers'
import ManageGallery from './admin/ManageGallery'
import ManageSettings from './admin/ManageSettings'

function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen pb-14 md:pb-0">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileCallBar />
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <AuthProvider>
      {isAdmin ? (
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="doctors" element={<ManageDoctors />} />
            <Route path="offers" element={<ManageOffers />} />
            <Route path="gallery" element={<ManageGallery />} />
            <Route path="settings" element={<ManageSettings />} />
          </Route>
        </Routes>
      ) : (
        <PublicLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PublicLayout>
      )}
    </AuthProvider>
  )
}
