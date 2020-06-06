import React from 'react'
import {
	MDBCol,
	MDBCardTitle,
	MDBCard,
	MDBCardBody,
	MDBCardText
} from 'mdbreact'

const FeaturesCard = props => {
	return (
		<MDBCol md='4' className='my-2'>
			<MDBCard wide cascade className='h-100'>
				<MDBCardBody cascade className='text-center'>
					<MDBCardTitle className='card-title'>
						<i className={`fa-3x ${props.iconClass}`}></i>
					</MDBCardTitle>

					<p className='font-weight-bold text-blue text-uppercase'>{props.cardTitle}</p>

					<MDBCardText>{props.cardText}</MDBCardText>
				</MDBCardBody>
			</MDBCard>
		</MDBCol>
	)
}

export default FeaturesCard
