import React from 'react'
import {
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCardTitle,
	MDBCardText,
	MDBCol,
	MDBView
} from 'mdbreact'

import './ContributorCard.css'

const ContributorCard = props => {
	return (
		<MDBCol md='4' className='my-2'>
			<MDBCard wide cascade className='h-100'>
				<MDBView cascade>
					<MDBCardImage
						className='card-img-top'
						hover
						overlay='white-light'
						src={`${process.env.PUBLIC_URL}/assets/img/${props.image}.jpg`}
						alt={props.image}
					/>
				</MDBView>
				<MDBCardBody cascade className='text-center'>
					<MDBCardTitle className='card-title blue-text'>
						<strong>{props.title}</strong>
					</MDBCardTitle>
					<MDBCardText>{props.subtitle}</MDBCardText>
				</MDBCardBody>
			</MDBCard>
		</MDBCol>
	)
}

export default ContributorCard
