import React, { Component } from 'react'

import Home from './HomeComponent'
import Menu from './MenuComponent'
import About from './AboutComponent'
import Contact from './ContactComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import DishDetail from './DishdetailComponent'

import { COMMENTS } from '../shared/comments'
import { DISHES } from '../shared/dishes'
import { LEADERS } from '../shared/leaders'
import { PROMOTIONS } from '../shared/promotions'

import { Routes, Route, Navigate, useParams } from 'react-router-dom'

class Main extends Component {
	constructor(props) {
		super(props)

		this.state = {
			comments: COMMENTS,
			dishes: DISHES,
			leaders: LEADERS,
			promotions: PROMOTIONS,
		}
	}

	render() {
		const HomePage = () => {
			return (
				<Home
					dish={this.state.dishes.filter((dish) => dish.featured)[0]}
					promotion={
						this.state.promotions.filter(
							(promotion) => promotion.featured
						)[0]
					}
					leader={
						this.state.leaders.filter(
							(leader) => leader.featured
						)[0]
					}
				/>
			)
		}

		const AboutUsPage = () => {
			return <About leaders={this.state.leaders} />
		}

		const DishWithId = () => {
			let { dishId } = useParams()
			return (
				<DishDetail
					dish={
						this.state.dishes.filter(
							(dish) => dish.id === parseInt(dishId, 10)
						)[0]
					}
					comments={this.state.comments.filter(
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
					<Route
						exact
						path='/menu'
						element={<Menu dishes={this.state.dishes} />}
					/>
					<Route path='/menu/:dishId' element={<DishWithId />} />
					<Route exact path='/contactus' element={<Contact />} />
					<Route exact path='/aboutus' element={<AboutUsPage />} />
					<Route path='*' element={<Navigate replace to='/home' />} />
				</Routes>

				<Footer></Footer>
			</div>
		)
	}
}

export default Main
