import React, { useState, useEffect, useContext } from 'react'
// import { Icon } from 'leaflet'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
// import HeatmapLayer from 'react-leaflet-heatmap-layer'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'

import { API_URL_OPENSTREETMAPS } from '../../config'

import { StatisticsContext } from '../Statistics/StatisticsContext'
import GeolocationButton from './GeoLocationButton'
import SearchAutoComplete from './SearchAutoComplete'

import './Maps.css'

const DEFAULT = {
  country: {
    country: 'Your Location',
    countryInfo: { lat: 23.8, long: 90.4 }
  },
  coordinates: [23.8, 90.4],
  geoJSON: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          country: 'country'
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        }
      }
    ]
  }
}

const Maps = () => {
  const { countries } = useContext(StatisticsContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPosition, setCurrentPosition] = useState(DEFAULT.coordinates)
  const [currentCountry, setCurrentCountry] = useState(DEFAULT.country)
  const [geoJSON, setGeoJSON] = useState(DEFAULT.geoJSON)
  const [countryBubble, setCountryBubble] = useState(null)

  const setGPSLocation = () =>
    navigator.geolocation
      ? navigator.geolocation.getCurrentPosition(pos => {
          const { latitude, longitude } = pos.coords
          setCurrentPosition([pos.coords.latitude, pos.coords.longitude])
          setCurrentCountry({
            country: 'country',
            countryInfo: { lat: latitude, long: longitude }
          })
        })
      : console.log('GPS Not Supported')

  useEffect(() => {
    setGeoJSON({
      // TODO: merge geoJSON with global
      type: 'FeatureCollection',
      features: countries.map((country = {}) => {
        const { countryInfo = {} } = country
        const { lat, long } = countryInfo
        return {
          type: 'Feature',
          properties: {
            ...country
          },
          geometry: {
            type: 'Point',
            coordinates: [long, lat]
          }
        }
      })
    })
  }, [countries])

  useEffect(() => {
    const { lat, long } = currentCountry.countryInfo
    setCurrentPosition([lat, long])
    setSearchQuery('')
  }, [currentCountry])

  const onSearchQueryChange = event => setSearchQuery(event.target.value)
  const onSearchSuggestionClicked = autocompleteEvent =>
    setCurrentCountry(JSON.parse(autocompleteEvent.target.id))

  return (
    <MDBContainer>
      <div className='mt-4 z-depth-1-half map-container position-relative'>
        <MDBRow>
          <MDBCol>
            <h2 className='text-center font-weight-bold text-uppercase'>
              Map
            </h2>
          </MDBCol>
        </MDBRow>
        <SearchAutoComplete
          query={searchQuery}
          onQueryChange={onSearchQueryChange}
          onSuggestionClicked={onSearchSuggestionClicked}
          autocompleteData={countries}
          autocompleteKey='country'
        />

        <GeolocationButton onClick={setGPSLocation} />

        <Map center={currentPosition} zoom={12}>
          <TileLayer
            url={API_URL_OPENSTREETMAPS}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* <HeatmapLayer
            // fitBoundsOnLoad
            // fitBoundsOnUpdate
            points={addressPoints}
            latitudeExtractor={m => m[0]}
            longitudeExtractor={m => m[1]}
            intensityExtractor={m => parseFloat(m[2])}
          />
          */}
          <Marker
            position={currentPosition}
            onClick={() => {
              const feature = { ...DEFAULT.geoJSON.features[0] }
              feature.properties = {
                country: 'Your Location',
                cases: 0
              }
              feature.geometry.coordinates = [
                currentPosition[1],
                currentPosition[0]
              ]
              setCountryBubble(feature)
            }}
          />
          {geoJSON.features.map((feature, i) => (
            <Marker
              key={i}
              position={[
                feature.geometry.coordinates[1],
                feature.geometry.coordinates[0]
              ]}
              onClick={() => setCountryBubble(feature)}
            />
          ))}
          {countryBubble && (
            <Popup
              position={[
                countryBubble.geometry.coordinates[1] + 0.02,
                countryBubble.geometry.coordinates[0]
              ]}
              onClose={() => {
                setCountryBubble(null)
              }}>
              <div>
                <h2>{countryBubble.properties.country}</h2>
                <p>{countryBubble.properties.cases}</p>
              </div>
              countryBubble
            </Popup>
          )}
        </Map>
      </div>
    </MDBContainer>
  )
}

export default Maps
