import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center container-page">
      <h1 className="text-xl sm:text-2xl text-teal-900 mb-3">Page not found</h1>
      <p className="text-ink/60 mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-secondary">Back to home</Link>
    </div>
  )
}
