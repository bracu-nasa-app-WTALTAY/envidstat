import React from 'react'
import { MDBCol, MDBRow, MDBBtn } from 'mdbreact'

const GeolocationButton = ({ onClick }) => {
  const position = { bottom: '0.5rem' }

  return (
    <MDBRow
      className='position-absolute w-100 z-index-501 mx-0'
      style={position}>
      <MDBCol className='d-flex justify-content-end'>
        <MDBBtn
          style={{
            borderRadius: '50%',
            padding: '1rem 1.4rem'
          }}
          onClick={onClick}
          color='elegant'>
          <i
            style={{ color: '#f0f0f0' }}
            className='fas fa-2x fa-map-marker-alt'></i>
        </MDBBtn>
      </MDBCol>
    </MDBRow>
  )
}

export default GeolocationButton
