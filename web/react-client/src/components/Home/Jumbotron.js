import React from 'react'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import Counter from 'react-countup'

import './Jumbotron.css'

const Jumbotron = props => {
	const backgroundImage = `url('${process.env.PUBLIC_URL}/assets/img/jumbotron.png')`

	return (
		<div style={{ backgroundImage }} className='jumbotron-full'>
			<div className='d-flex align-items-center jumbotron-full-overlay'>
				<div className='w-100 h-100 text-light'>
					<MDBContainer className='headings'>
						<MDBRow>
							<MDBCol>
								<h1>People are suffering around the world</h1>
							</MDBCol>
						</MDBRow>
					</MDBContainer>
					<MDBContainer>
						<MDBRow>
							<MDBCol sm='3' lg='2'>
								<h3 className='text-success'>
									<Counter end={props.globalData.TotalRecovered} />
								</h3>
								<h6 className='text-success'>Recovered</h6>
							</MDBCol>
							<MDBCol sm='3' lg='2'>
								<h3 className='text-warning'>
									<Counter end={props.globalData.TotalConfirmed} />
								</h3>
								<h6 className='text-warning'>Confirmed</h6>
							</MDBCol>
							<MDBCol sm='3' lg='2'>
								<h3 className='text-danger'>
									<Counter end={props.globalData.TotalDeaths} />
								</h3>
								<h6 className='text-danger'>death</h6>
							</MDBCol>
							<MDBCol sm='3' lg='2'>
								<h3>
									<Counter end={props.globalData.TotalDeaths / 2} />
								</h3>
								<h6>Critical</h6>
							</MDBCol>
						</MDBRow>
					</MDBContainer>
				</div>
			</div>
		</div>
	)
}

export default Jumbotron
