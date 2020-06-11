import React from 'react'
import { MDBContainer, MDBFooter, MDBRow, MDBCol } from 'mdbreact'

const Footer = () => (
  <MDBFooter color='elegant-color' className='font-small pt-4 mt-4'>
    <MDBContainer>
      <MDBRow>
        <MDBCol className='text-center'>
          <p className='h5 text-uppercase font-weight-normal'>Regards</p>
          <p className='text-justify'>
            ENVIDSTAT is a real time data providing web app which will help the
            users to take precautions for the novel corona virus by using the
            weather statistics. It is easily accessible and comprehensible by
            anyone. From this web app user can easily see the risk predictions
            of stepping out. Here, real time environmental data like
            temperature, wind-speed has been used to predict the risk of
            spreading of the virus to that region. Moreover,the web ap ENVIDSTAT
            is a real time data providing web app which will help the users to
            take precautions for the novel corona virus by using the weather
            statistics. Therefore, this Web-app will notify people by mailing
            them if they subscribe in the web-App . This app will automatically
            send report of his location regularly by email and Subscriber will
            definitely get information easily and regularly.
          </p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <div className='footer-copyright text-center py-3 bg-dark'>
      <MDBContainer>
        Copyright BRACU Duronto &copy; {new Date().getFullYear()}
      </MDBContainer>
    </div>
  </MDBFooter>
)

export default Footer
