import React, { useEffect } from 'react'

import Home from './HomeComponent'
import Menu from './MenuComponent'
import About from './AboutComponent'
import Contact from './ContactComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import DishDetail from './DishdetailComponent'

import {
	Routes,
	Route,
	Navigate,
	useParams,
	useLocation,
} from 'react-router-dom'
import { useDispatch, useStore } from 'react-redux'
import {
	postComment,
	postFeedback,
	fetchDishes,
	fetchComments,
	fetchPromos,
	fetchLeaders,
} from '../redux/ActionCreators'
import { actions } from 'react-redux-form'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const Main = (props) => {
	let location = useLocation()
	const dispatch = useDispatch()
	const { comments, dishes, leaders, promotions } = useStore().getState()

	useEffect(() => {
		initialLoading()
	}, [])

	const initialLoading = () => {
		dispatch(fetchDishes())
		dispatch(fetchComments())
		dispatch(fetchPromos())
		dispatch(fetchLeaders())
	}

	const resetFeedbackForm = () => {
		dispatch(actions.reset('feedback'))
	}

	const HomePage = () => {
		return (
			<Home
				dish={dishes.dishes.filter((dish) => dish.featured)[0]}
				dishesLoading={dishes.isLoading}
				dishErrMess={dishes.errMess}
				promotion={
					promotions.promotions.filter(
						(promotion) => promotion.featured
					)[0]
				}
				promoLoading={promotions.isLoading}
				promoErrMess={promotions.errMess}
				leader={leaders.leaders.filter((leader) => leader.featured)[0]}
				leaderLoading={leaders.isLoading}
				leaderErrMess={leaders.errMess}
			/>
		)
	}

	const AboutUsPage = () => {
		return (
			<About
				leaders={leaders}
				leaderLoading={leaders.isLoading}
				leaderErrMess={leaders.errMess}
			/>
		)
	}

	const DishWithId = () => {
		let { dishId } = useParams()
		return (
			<DishDetail
				dish={
					dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0]
				}
				isLoading={dishes.isLoading}
				errMess={dishes.errMess}
				comments={comments.filter(
					(comment) => comment.dishId === parseInt(dishId, 10)
				)}
				commentsErrMess={comments.errMess}
				postComment={postComment}
			/>
		)
	}

	return (
		<div>
			<Header></Header>
			<TransitionGroup>
				<CSSTransition
					key={location.key}
					classNames='page'
					timeout={300}
				>
					<Routes>
						<Route path='/home' element={<HomePage />} />
						<Route
							exact
							path='/menu'
							element={<Menu dishes={dishes} />}
						/>
						<Route path='/menu/:dishId' element={<DishWithId />} />
						<Route
							exact
							path='/contactus'
							element={
								<Contact
									resetFeedbackForm={resetFeedbackForm}
									postFeedback={postFeedback}
								/>
							}
						/>
						<Route
							exact
							path='/aboutus'
							element={<AboutUsPage />}
						/>
						<Route
							path='*'
							element={<Navigate replace to='/home' />}
						/>
					</Routes>
				</CSSTransition>
			</TransitionGroup>

			<Footer></Footer>
		</div>
	)
}

export default Main
