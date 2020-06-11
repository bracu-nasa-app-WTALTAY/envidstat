import React, { useContext } from 'react'

import { MDBContainer, MDBDataTable, MDBRow, MDBCol } from 'mdbreact'
import { Line } from 'react-chartjs-2'

import { StatisticsContext } from './StatisticsContext'

import summaryDataColumns from './datas/summary_data_columns'
import dataLine from './datas/data_line'
import prediction from './datas/prediction_data_columns'

const Statistics = () => {
  const { summaryData } = useContext(StatisticsContext)

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
