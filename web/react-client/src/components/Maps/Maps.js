import React, { useState, useEffect } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
// import { Icon } from 'leaflet'

import {
	MDBContainer,
	MDBCard,
	MDBCardBody,
	MDBCol,
	MDBFormInline,
	MDBIcon,
	MDBRow,
	MDBListGroup,
	MDBListGroupItem,
	MDBBtn
} from 'mdbreact'

import HeatmapLayer from './HeatmapLayer'

import './Maps.css'

import parkData from './features.js' // dummy
import { addressPoints } from './realworld.10000' // dummy

import {
	API_URL_OPENSTREETMAPS,
	API_COVID19_SUMMARY,
	API_COVID19_COUNTRY_DATA
} from '../../config'

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

	return (
		<MDBContainer fluid>
			<div className='mt-4 z-depth-1-half map-container'>
				<MDBRow className='position-relative'>
					<MDBCol
						className='position-absolute w-100 d-flex mt-2'
						style={{
							zIndex: 500
						}}>
						<MDBCard
							style={{ width: '22rem', maxWidth: '75%', margin: 'auto' }}>
							<MDBCardBody className='py-0 pr-0'>
								<MDBFormInline className='md-form my-2'>
									<MDBIcon icon='search' />
									<input
										className='form-control form-control-sm ml-3 w-75'
										type='text'
										placeholder='Search'
										aria-label='Search'
										value={searchQuery}
										onChange={e => {
											setSearchQuery(e.target.value)
										}}
									/>
								</MDBFormInline>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
				{searchSuggestions.length > 0 ? (
					<MDBRow>
						<MDBCol
							className='position-absolute w-100 d-flex mt-5'
							style={{
								zIndex: 500
							}}>
							<MDBCard style={{ width: '22rem', margin: 'auto' }}>
								<MDBCardBody className='p-0 mt-3'>
									<MDBListGroup style={{ width: '22rem' }}>
										{searchSuggestions.map(searchSuggestion => (
											<MDBListGroupItem
												id={searchSuggestion}
												onClick={e => setCurrentCountry(e.target.id)}>
												{searchSuggestion}
											</MDBListGroupItem>
										))}
									</MDBListGroup>
								</MDBCardBody>
							</MDBCard>
						</MDBCol>
					</MDBRow>
				) : (
					<></>
				)}

				<MDBRow>
					<MDBCol
						className='position-absolute w-100 d-flex'
						style={{
							zIndex: 501,
							bottom: '1rem',
							right: '1rem'
						}}>
						<MDBBtn
							style={{
								marginLeft: 'auto',
								borderRadius: '50%',
								padding: '1rem 1.4rem'
							}}
							onClick={getOwnGeolocation}
							color='elegant'>
							<i
								style={{ color: '#f0f0f0' }}
								className='fas fa-2x fa-map-marker-alt'></i>
						</MDBBtn>
					</MDBCol>
				</MDBRow>

				<Map center={currentPosition} zoom={12}>
					<TileLayer
						url={API_URL_OPENSTREETMAPS}
						// attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
