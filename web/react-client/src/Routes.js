import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home/Home'
import Maps from './components/Maps/Maps'
import Statistics from './components/Statistics/Statistics'
import About from './components/About/About'

const Routes = () => (
	<Switch>
		<Route path='/' exact component={Home} />
		<Route path='/maps' exact component={Maps} />
		<Route path='/statistics' exact component={Statistics} />
		<Route path='/about' exact component={About} />
	</Switch>
)

export default Routes
