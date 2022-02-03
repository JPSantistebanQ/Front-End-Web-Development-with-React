import React, { useState } from 'react'
import {
	Button,
	Card,
	CardImg,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
	CardBody,
	CardText,
	Col,
	Label,
	Modal,
	ModalHeader,
	ModalBody,
	Row,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form'

const required = (val) => val && val.length //value > 0
const maxLength = (len) => (val) => !val || val.length <= len
const minLength = (len) => (val) => val && val.length >= len

const CommentForm = (props) => {
	const [state, setState] = useState({
		isCommentFormModalOpen: false,
	})

	const handleCommentFormSubmit = (values) => {
		alert('Current State is: ' + JSON.stringify(values))
	}

	const toggleCommentFormModal = () => {
		setState({
			isCommentFormModalOpen: !state.isCommentFormModalOpen,
		})
	}

	return (
		<React.Fragment>
			<Button outline onClick={toggleCommentFormModal}>
				<span className='fa fa-comments fa-lg'></span> Submit Comment
			</Button>
			<Modal
				isOpen={state.isCommentFormModalOpen}
				toggle={toggleCommentFormModal}
			>
				<ModalHeader toggle={toggleCommentFormModal}>
					{' '}
					Submit Comment{' '}
				</ModalHeader>
				<ModalBody>
					<LocalForm
						onSubmit={(values) => handleCommentFormSubmit(values)}
					>
						<Row className='form-group'>
							<Label htmlFor='rating' md={12}>
								Rating
							</Label>
							<Col md={12}>
								<Control.select
									model='.rating'
									className='form-control'
									name='rating'
									id='rating'
									validators={{
										required,
									}}
								>
									<option>Please Select</option>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</Control.select>
								<Errors
									className='text-danger'
									model='.author'
									show='touched'
									messages={{
										required: 'Required',
									}}
								/>
							</Col>
						</Row>

						{/* author */}
						<Row className='form-group'>
							<Label htmlFor='author' md={12}>
								{' '}
								Your Name{' '}
							</Label>
							<Col md={12}>
								<Control.text
									model='.author'
									id='author'
									name='author'
									placeholder='First Name'
									className='form-control'
									validators={{
										required,
										minLength: minLength(3),
										maxLength: maxLength(15),
									}}
								/>
								<Errors
									className='text-danger'
									model='.author'
									show='touched'
									messages={{
										required: 'Required',
										minLength:
											'Must be greater than 2 characters',
										maxLength:
											'Must be 15 characters or less',
									}}
								/>
							</Col>
						</Row>

						<Row className='form-group'>
							<Label htmlFor='comment' md={12}>
								Comment
							</Label>
							<Col md={12}>
								<Control.textarea
									model='.comment'
									id='comment'
									name='comment'
									rows='6'
									className='form-control'
									validators={{
										required,
									}}
								/>
								<Errors
									className='text-danger'
									model='.author'
									show='touched'
									messages={{
										required: 'Required',
									}}
								/>
							</Col>
						</Row>

						<Row className='form-group'>
							<Col>
								<Button type='submit' color='primary'>
									Submit
								</Button>
							</Col>
						</Row>
					</LocalForm>
				</ModalBody>
			</Modal>
		</React.Fragment>
	)
}

const RenderDish = ({ dish }) => {
	if (dish != null) {
		return (
			<div className='col-12 col-md-5 m-1'>
				<Card>
					<CardImg width='100%' src={dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle> {dish.name}</CardTitle>
						<CardText> {dish.description} </CardText>
					</CardBody>
				</Card>
			</div>
		)
	} else {
		return <div></div>
	}
}

const RenderComments = ({ dish, comments }) => {
	if (comments == null) {
		return <div></div>
	}
	const cmnts = comments.map((comment) => {
		return (
			<li key={comment.id}>
				<p>{comment.comment}</p>
				<p>
					-- {comment.author}, &nbsp;
					{new Intl.DateTimeFormat('en-US', {
						year: 'numeric',
						month: 'long',
						day: '2-digit',
					}).format(new Date(comment.date))}
				</p>
			</li>
		)
	})
	return (
		<div className='col-12 col-md-5 m-1'>
			<h4> Comments </h4>
			<ul className='list-unstyled'>{cmnts}</ul>
			<CommentForm dish={dish} comments={comments} />
		</div>
	)
}

const DishDetail = (props) => {
	const dish = props.dish

	if (dish == null) {
		return <div></div>
	}

	return (
		<div className='container'>
			<div className='row'>
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to='/menu'>Menu</Link>
					</BreadcrumbItem>
					<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
				</Breadcrumb>

				<div className='col-12'>
					<h3> {props.dish.menu}</h3>
					<hr />
				</div>
			</div>

			<div className='row'>
				<RenderDish dish={props.dish} />
				<RenderComments dish={props.dish} comments={props.comments} />
			</div>
		</div>
	)
}

export default DishDetail
