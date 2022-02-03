import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'

import './App.css'
import Main from './components/MainComponent'
import { ConfigureStore } from './redux/configStore'

const store = ConfigureStore()
class App extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div>
						<Main />
					</div>
				</BrowserRouter>
			</Provider>
		)
	}
}

export default App
