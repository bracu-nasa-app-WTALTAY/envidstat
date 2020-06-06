import React from 'react'

import { useLocation } from 'react-router-dom'

import Routes from './Routes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import './App.css'

const App = () => {
	const location = useLocation()

	return (
		<>
			<Navbar pathname={location.pathname} />
			<div
				className={location.pathname === '/' ? '' : 'mt-5 pt-4'}
				style={{ minHeight: '85vh' }}>
				<Routes />
			</div>
			<Footer />
		</>
	)
}

export default App
