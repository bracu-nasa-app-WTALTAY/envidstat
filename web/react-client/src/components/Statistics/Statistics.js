import React, { useState, useEffect } from 'react'

import { MDBContainer, MDBDataTable, MDBRow, MDBCol } from 'mdbreact'
import { Line } from 'react-chartjs-2'

import { API_COVID19_SUMMARY } from '../../config'

import summaryDataColumns from './summary_data_columns'
import dataLine from './data_line'
import prediction from './prediction_data_columns'

const Statistics = () => {
	const [summaryData, setSummaryData] = useState({ Countries: [] })

	useEffect(() => {
		setTimeout(
			() =>
				fetch(API_COVID19_SUMMARY)
					.then(res => res.json())
					.then(res => {
						setSummaryData(res)
					}),
			100
		)
	}, [])

	const continuousFetch = () => {
		let retries = 0
		let data = ''
		let fetchDataTimer

		const fetchJson = () => Promise.reject({ data: false })

		const fetchData = async () => {
			const fetchedData = await fetchJson()
				.then(res => JSON.parse(res))
				.then(res => res.data)
				.catch(err => false)
			console.log('fetched', fetchedData)

			if (fetchedData) {
				clearInterval(fetchDataTimer)
				data = fetchedData
				console.log('success', 'data', data)
			} else {
				retries++
				if (retries >= 5) {
					clearInterval(fetchDataTimer)
					console.log('failed')
				}
			}
		}
		fetchDataTimer = setInterval(fetchData, 1000)
	}

	const data = {
		columns: summaryDataColumns,
		rows: summaryData.Countries
	}

	return (
		<>
			<MDBContainer>
				<h3 className='mt-5'>COVID-19 Spread Rate Visualization</h3>
				<MDBRow className='d-flex justify-content-center'>
					<MDBCol md='6'>
						<Line data={dataLine} options={{ responsive: true }} />
					</MDBCol>
				</MDBRow>
			</MDBContainer>
			<MDBContainer>
				<h3 className='mt-5'>World Data</h3>
				<MDBDataTable
					scrollY
					scrollX
					maxHeight='200px'
					striped
					bordered
					small
					data={data}
				/>
			</MDBContainer>
			<MDBContainer>
				<h3 className='mt-5'>Our Prediction</h3>
				<MDBDataTable
					scrollY
					scrollX
					maxHeight='200px'
					striped
					bordered
					small
					data={prediction}
				/>
			</MDBContainer>
		</>
	)
}

export default Statistics
