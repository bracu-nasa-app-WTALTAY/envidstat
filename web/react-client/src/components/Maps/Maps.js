import React, { useState, useEffect } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
// import { Icon } from 'leaflet'

import { MDBContainer } from 'mdbreact'

import HeatmapLayer from './HeatmapLayer'

import './Maps.css'

import parkData from './features.js' // dummy
import { addressPoints } from './realworld.10000' // dummy

import {
  API_URL_OPENSTREETMAPS,
  API_COVID19_SUMMARY,
  API_COVID19_COUNTRY_DATA
} from '../../config'

import GeolocationButton from './GeoLocationButton'
import SearchAutoComplete from './SearchAutoComplete'

const match = (s, arr) => {
  if (s.length > 0) s = s.charAt(0).toUpperCase() + s.slice(1)
  const p = Array.from(s).reduce((a, v, i) => `${a}[^${s.substr(i)}]*?${v}`, '')
  const re = RegExp(p)

  return arr.filter(v => v.match(re))
}

const Maps = () => {
  const [activePark, setActivePark] = useState(null)
  const [currentCountry, setCurrentCountry] = useState('')
  const [currentPosition, setCurrentPosition] = useState([23.8, 90.4])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [summaryData, setSummaryData] = useState({ Countries: [] })
  const [countries, setCountries] = useState([])

  const getOwnGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos =>
        setCurrentPosition([pos.coords.latitude, pos.coords.longitude])
      )
      setSearchQuery('')
      setCurrentCountry('')
    }
  }

  useEffect(() => {
    getOwnGeolocation()
    setTimeout(
      () =>
        fetch(API_COVID19_SUMMARY)
          .then(res => res.json())
          .then(res => {
            setSummaryData(res)
            const tempCountries = []
            if (res.Countries)
              res.Countries.map(country => tempCountries.push(country.Country))
            setCountries(tempCountries)
          }),
      2000
    )
  }, [])

  useEffect(() => {
    if (searchQuery.length > 0)
      setSearchSuggestions(match(searchQuery, countries).slice(0, 5))
    else setSearchSuggestions([])
  }, [searchQuery, countries])

  useEffect(() => {
    let countryCode = ''

    if (currentCountry.length > 0) {
      summaryData.Countries.map(countryinfo =>
        countryinfo.Country === currentCountry
          ? (countryCode = countryinfo.Slug)
          : false
      )

      fetch(`${API_COVID19_COUNTRY_DATA}${countryCode}`)
        .then(res => res.json())
        .then(res => {
          if (res.length > 0) {
            setCurrentPosition([res[0].Lat, res[0].Lon])
          }
        })
      setSearchQuery('')
    }
  }, [currentCountry, summaryData])

  const onSearchQueryChange = event => setSearchQuery(event.target.value)
  const onSearchSuggestionClicked = event => setCurrentCountry(event.target.id)

  return (
    <MDBContainer>
      <div className='mt-4 z-depth-1-half map-container position-relative'>
        <SearchAutoComplete
          searchQuery={searchQuery}
          onSearchQueryChange={onSearchQueryChange}
          searchSuggestions={searchSuggestions}
          onSearchSuggestionClicked={onSearchSuggestionClicked}
        />

        <GeolocationButton onClick={getOwnGeolocation} />

        <Map center={currentPosition} zoom={12}>
          <TileLayer
            url={API_URL_OPENSTREETMAPS}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <HeatmapLayer
            // fitBoundsOnLoad
            // fitBoundsOnUpdate
            points={addressPoints}
            latitudeExtractor={m => m[0]}
            longitudeExtractor={m => m[1]}
            intensityExtractor={m => parseFloat(m[2])}
          />
          <Marker
            key={32}
            position={currentPosition}
            onClick={() => {
              setActivePark({
                type: 'Feature',
                properties: {
                  PARK_ID: 32,
                  NAME: 'Bangladesh',
                  DESCRIPTIO: '20K'
                },
                geometry: {
                  type: 'Point',
                  coordinates: currentPosition
                }
              })
            }}
          />
          {parkData.features.map(park => (
            <Marker
              key={park.properties.PARK_ID}
              position={[
                park.geometry.coordinates[1],
                park.geometry.coordinates[0]
              ]}
              onClick={() => {
                setActivePark(park)
              }}
            />
          ))}
          {activePark && (
            <Popup
              position={[
                activePark.geometry.coordinates[1],
                activePark.geometry.coordinates[0]
              ]}
              onClose={() => {
                setActivePark(null)
              }}>
              <div>
                <h2>{activePark.properties.NAME}</h2>
                <p>{activePark.properties.DESCRIPTIO}</p>
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </MDBContainer>
  )
}

export default Maps
