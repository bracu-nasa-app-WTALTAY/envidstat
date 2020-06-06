import React, { useState, useEffect } from 'react'

import { MDBContainer, MDBDataTable, MDBRow, MDBCol } from 'mdbreact'
import { Line } from 'react-chartjs-2'

import { API_COVID19_SUMMARY } from '../../config'

import prediction_data from './prediction_data'

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

	const dataLine = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: 'Spread',
				fill: true,
				lineTension: 0.3,
				backgroundColor: 'rgba(225, 204,230, .3)',
				borderColor: 'rgb(205, 130, 158)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgb(205, 130,1 58)',
				pointBackgroundColor: 'rgb(255, 255, 255)',
				pointBorderWidth: 10,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgb(0, 0, 0)',
				pointHoverBorderColor: 'rgba(220, 220, 220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [65, 59, 80, 81, 56, 55, 40]
			},
			{
				label: 'Weather',
				fill: true,
				lineTension: 0.3,
				backgroundColor: 'rgba(184, 185, 210, .3)',
				borderColor: 'rgb(35, 26, 136)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgb(35, 26, 136)',
				pointBackgroundColor: 'rgb(255, 255, 255)',
				pointBorderWidth: 10,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgb(0, 0, 0)',
				pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [28, 48, 40, 19, 86, 27, 90]
			}
		]
	}
	const data = {
		columns: [
			{
				label: 'Country',
				field: 'Country',
				sort: 'asc',
				width: 150
			},
			{
				label: 'New Confirmed',
				field: 'NewConfirmed',
				sort: 'asc',
				width: 270
			},
			{
				label: 'New Deaths',
				field: 'NewDeaths',
				sort: 'asc',
				width: 200
			},
			{
				label: 'New Recovered',
				field: 'NewRecovered',
				sort: 'asc',
				width: 100
			},
			{
				label: 'Total Confirmed',
				field: 'TotalConfirmed',
				sort: 'asc',
				width: 150
			},
			{
				label: 'Total Deaths',
				field: 'TotalDeaths',
				sort: 'asc',
				width: 100
			},
			{
				label: 'Total Recovered',
				field: 'TotalRecovered',
				sort: 'asc',
				width: 100
			}
		],
		rows: summaryData.Countries
	}

	const prediction = {
		columns: [
			{
				label: 'Country',
				field: 'Country',
				sort: 'asc',
				width: 150
			},
			{
				label: 'Wind',
				field: 'WND',
				sort: 'asc',
				width: 270
			},
			{
				label: 'Temperature',
				field: 'TEMP',
				sort: 'asc',
				width: 200
			},
			{
				label: 'Threat Level',
				field: 'THREAT_LEVEL',
				sort: 'asc',
				width: 100
			}
		],
		rows: prediction_data
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
