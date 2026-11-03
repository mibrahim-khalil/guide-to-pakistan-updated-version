import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import DestinationForm from '../components/DestinationForm'
import { destinationsApi } from '../api/destinationsApi'

export default function DestinationEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [initial, setInitial] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    destinationsApi.getById(id).then((item) => {
      if (!item) {
        toast.error('Destination not found')
        navigate('/destinations')
        return
      }
      setInitial(item)
      setLoading(false)
    }).catch((e) => {
      toast.error(e?.response?.data?.message || 'Failed to load')
      navigate('/destinations')
    })
  }, [id, navigate])

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const updated = await destinationsApi.update(id, values)
      toast.success('Destination updated in database')
      setInitial(updated)
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message || 'Failed to update')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="text-sm text-gray-500">Loading from API...</div>

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Edit destination</h1>
          <p className="text-sm text-gray-500 mt-1">{initial?.name}</p>
        </div>
        <Link to="/destinations" className="text-sm text-gray-600 hover:text-gray-900">Back to list</Link>
      </div>
      <DestinationForm initialValues={initial} onSubmit={onSubmit} submitting={submitting} />
    </div>
  )
}
