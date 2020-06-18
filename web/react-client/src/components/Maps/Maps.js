import React, { useState, useEffect, useContext } from 'react'
// import { Icon } from 'leaflet'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import HeatmapLayer from 'react-leaflet-heatmap-layer'
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

const moves = [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [0, 1], [-1, 0], [0, -1]]
const generatePointsAndPush = (lat, long, args, array) => {
	const duplicates = 9
	for(let i = 1; i <= duplicates; i++)
		for(let move = 0; move < moves.length; move++)
			array.push([lat + (i* moves[move][0] * 0.01), long + (i* moves[move][1] * 0.01), args]) //DUMMY
}

const Maps = () => {
  const { countries } = useContext(StatisticsContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPosition, setCurrentPosition] = useState(DEFAULT.coordinates)
  const [currentCountry, setCurrentCountry] = useState(DEFAULT.country)
  const [geoJSON, setGeoJSON] = useState(DEFAULT.geoJSON)

  const [countryBubble, setCountryBubble] = useState(null)
  const [isMarkerEnabled, setMarkerEnabled] = useState(false)
  const [isHeatmapEnabled, setHeatmapEnabled] = useState(false)

  const [heatmapPoints, setHeatmapPoints] = useState([
    [...DEFAULT.coordinates, 0.0]
  ])

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
	  
  useEffect(() => setGPSLocation(), [])

  useEffect(() => {
    const newHeatmapPoints = [...heatmapPoints] // Dummy
    const geoJSON = {
      // TODO: merge geoJSON with global
      type: 'FeatureCollection',
      features: countries.map((country = {}, index = 0) => {
        const { countryInfo = {} } = country
        const { lat, long } = countryInfo

		const percentage = 90
		generatePointsAndPush(lat, long, percentage, newHeatmapPoints)
			
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
    }
    setGeoJSON(geoJSON)
    setHeatmapPoints(newHeatmapPoints) //DUMMY
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <h2 className='text-center font-weight-bold text-uppercase'>Map</h2>
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

          {isHeatmapEnabled && (
            <HeatmapLayer
              // fitBoundsOnLoad
              // fitBoundsOnUpdate
              points={heatmapPoints}
              latitudeExtractor={m => m[0]}
              longitudeExtractor={m => m[1]}
              intensityExtractor={m => m[2]}
              max={100.0}
              radius={100}
            />
          )}

          {isMarkerEnabled && (
            <Marker
              position={currentPosition}
              onClick={() => {
                const feature = { ...DEFAULT.geoJSON.features[0] }
                feature.properties = {
                  country: 'Your Location',
                  cases: 'Unknown'
                }
                feature.geometry.coordinates = [
                  currentPosition[1],
                  currentPosition[0]
                ]
                setCountryBubble(feature)
              }}
            />
          )}

          {isMarkerEnabled &&
            geoJSON.features.map((feature, i) => (
              <Marker
                key={i}
                position={[
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0]
                ]}
                onClick={() => setCountryBubble(feature)}
              />
            ))}

          {isMarkerEnabled && countryBubble && (
            <Popup
              position={[
                countryBubble.geometry.coordinates[1],
                countryBubble.geometry.coordinates[0]
              ]}
              onClose={() => {
                setCountryBubble(null)
              }}>
              <div>
                <h4>{countryBubble.properties.country}</h4>
                <p>Total: {countryBubble.properties.cases}</p>
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </MDBContainer>
  )
}

export default Maps
