import React from 'react'
import {
	MDBRow,
	MDBCol,
	MDBContainer
} from 'mdbreact'

import ContributorCard from './ContributorCard'

const About = () => {
	return (
		<MDBContainer className='mt-4'>
			<MDBRow>
				<MDBCol>
					<h2 className='text-center font-weight-bold text-uppercase'>
						Contributors
					</h2>
				</MDBCol>
			</MDBRow>
			<MDBRow>
				<ContributorCard
					image='propic-abrar'
					title='Abrar Shahriar Abeed'
					subtitle='Video Editor'
				/>
				<ContributorCard
					image='propic-adnan'
					title='Adnan Hossain'
					subtitle='Data Scrapper and Modeller'
				/>
				<ContributorCard
					image='propic-mishar'
					title='Sheikh Mishar Newaz'
					subtitle='Demotivational Speaker and Noob Coder'
				/>
				<ContributorCard
					image='propic-nafis'
					title='Nafis Mostafa'
					subtitle='Data Model and Machine Learning Specialist'
				/>
				<ContributorCard
					image='propic-rawha'
					title='Rawha Mikdad'
					subtitle='UI,UX designer and Data Miner'
				/>
				<ContributorCard
					image='propic-shormi'
					title='Shanjida Habib Shormi'
					subtitle='Content Writer and Data Miner'
				/>
			</MDBRow>
		</MDBContainer>
	)
}

export default About
