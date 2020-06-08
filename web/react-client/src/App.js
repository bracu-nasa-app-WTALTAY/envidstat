import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'

import Home from './components/Home/Home'
import Maps from './components/Maps/Maps'
import Statistics from './components/Statistics/Statistics'
import About from './components/About/About'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

import './App.css'

const App = () => {
	const { pathname } = useLocation()

	const spacingClasses = pathname === '/' ? '' : 'mt-5 pt-4'

	return (
		<>
			<Navbar pathname={pathname} />
			<div className={`componentsContainer ${spacingClasses}`}>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/maps' component={Maps} />
					<Route exact path='/statistics' component={Statistics} />
					<Route exact path='/about' component={About} />
				</Switch>
			</div>
			<Footer />
		</>
	)
}

export default App
