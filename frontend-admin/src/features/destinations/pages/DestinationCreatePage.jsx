import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import DestinationForm from '../components/DestinationForm'
import { destinationsApi } from '../api/destinationsApi'

export default function DestinationCreatePage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const created = await destinationsApi.create(values)
      toast.success('Destination created in database')
      navigate('/destinations/' + created.id + '/edit')
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message || 'Failed to create')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Add destination</h1>
          <p className="text-sm text-gray-500 mt-1">Saved to MongoDB via backend API.</p>
        </div>
        <Link to="/destinations" className="text-sm text-gray-600 hover:text-gray-900">Back to list</Link>
      </div>
      <DestinationForm onSubmit={onSubmit} submitting={submitting} />
    </div>
  )
}
