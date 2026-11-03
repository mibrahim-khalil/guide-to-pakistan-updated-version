import { useEffect, useState } from 'react'
import { publicDestinationsApi } from '../api/publicDestinationsApi'
import { mapPlaceToCard } from '../utils/mapApiToUi'

export function useRegionPlaces(regionSlug) {
  const [regionName, setRegionName] = useState('')
  const [heroImage, setHeroImage] = useState('')
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    setLoading(true)
    publicDestinationsApi
      .getRegionPage(regionSlug)
      .then((data) => {
        if (!alive) return
        if (!data) {
          setError('not_found')
          setPlaces([])
          return
        }
        setRegionName(data.name || '')
        setHeroImage(data.heroImage || '')
        setPlaces(data.places || [])
        setError('')
      })
      .catch(() => {
        if (!alive) return
        setError('failed')
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [regionSlug])

  return { regionName, heroImage, places, loading, error }
}

export function usePlaceDetails(regionSlug, placeSlug) {
  const [place, setPlace] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    setLoading(true)
    publicDestinationsApi
      .getPlaceDetails(regionSlug, placeSlug)
      .then((data) => {
        if (!alive) return
        setPlace(data)
        setError(data ? '' : 'not_found')
      })
      .catch(() => {
        if (!alive) return
        setError('failed')
        setPlace(null)
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [regionSlug, placeSlug])

  return { place, loading, error }
}
