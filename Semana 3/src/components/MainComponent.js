import React from 'react'

import Home from './HomeComponent'
import Menu from './MenuComponent'
import About from './AboutComponent'
import Contact from './ContactComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import DishDetail from './DishdetailComponent'

import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { useStore } from 'react-redux'

const Main = (props) => {
	const { comments, dishes, leaders, promotions } = useStore().getState()

	const HomePage = () => {
		return (
			<Home
				dish={dishes.filter((dish) => dish.featured)[0]}
				promotion={
					promotions.filter((promotion) => promotion.featured)[0]
				}
				leader={leaders.filter((leader) => leader.featured)[0]}
			/>
		)
	}

	const AboutUsPage = () => {
		return <About leaders={leaders} />
	}

	const DishWithId = () => {
		let { dishId } = useParams()
		return (
			<DishDetail
				dish={
					dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0]
				}
				comments={comments.filter(
					(comment) => comment.dishId === parseInt(dishId, 10)
				)}
			/>
		)
	}

	return (
		<div>
			<Header></Header>

			<Routes>
				<Route path='/home' element={<HomePage />} />
				<Route exact path='/menu' element={<Menu dishes={dishes} />} />
				<Route path='/menu/:dishId' element={<DishWithId />} />
				<Route exact path='/contactus' element={<Contact />} />
				<Route exact path='/aboutus' element={<AboutUsPage />} />
				<Route path='*' element={<Navigate replace to='/home' />} />
			</Routes>

			<Footer></Footer>
		</div>
	)
}

export default Main
