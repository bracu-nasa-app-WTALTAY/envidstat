import React, { useContext } from 'react'
import {
  MDBContainer,
  MDBRow,
  MDBCardTitle,
  MDBCard,
  MDBCardBody
} from 'mdbreact'

import { StatisticsContext } from '../Statistics/StatisticsContext'

import FeaturesCard from './FeaturesCard'
import Jumbotron from './Jumbotron'

const Home = () => {
  let globalData = useContext(StatisticsContext).summaryData.Global

  return (
    <>
      <Jumbotron globalData={globalData} />
      <MDBContainer className='text-center headings my-5'>
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle className='text-uppercase'>About</MDBCardTitle>
            <MDBContainer>
              <p>
                <strong className='text-primary text-uppercase'>
                  EnvidStat{' '}
                </strong>
                elaborates to <em className='text-white'>" </em> Environment,
                Covid, Statistics<em className='text-white'>"</em>
              </p>
              <p>
                <strong className='text-primary text-uppercase'>
                  EnvidStat{' '}
                </strong>
                is a webapp which uses real time weather data (Temperature and
                Wind speed) to predict vulnerability of corona attack in a
                particular location and visualize those datas. With this now you
                get to know whether it's safe for you to go outdoors and helps
                you to make informed decision.
              </p>
              <strong className='text-primary'>
                MAKE INFORMED DECISIONS OF GOING OUTSIDE
              </strong>
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>

      <MDBContainer>
        <MDBRow>
          <FeaturesCard
            iconClass='fa fa-globe'
            cardTitle='Environment'
            cardText={`Envidstat being an webapp there is no need for downloads,
						hence, no storage required.It is a responsive webapp, which means it
						adapts to any device you use to acccess it.`}
          />
          <FeaturesCard
            iconClass='fa fa-wrench'
            cardTitle='Covid-Update'
            cardText={`EnvidStat is "Intuitive" Envidstat is full of data
						visualizations making it easier for you to process all the
						information of Covid-19 areound you.`}
          />
          <FeaturesCard
            iconClass='fas fa-chart-bar'
            cardTitle='Statistics'
            cardText={`EnvidStat is Providing probable Statictical report of Covid-19
						based on the real-time Environment.`}
          />
        </MDBRow>
      </MDBContainer>
    </>
  )
}

export default Home
