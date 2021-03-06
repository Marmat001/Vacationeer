import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { isAuthenticated, signOut } from './HelperFunctions'
import { Link, withRouter } from 'react-router-dom'

const BluePrint = ({ children, match }) => {
	const activeTab = (path) => {
		if (match.path === path) {
			return { color: '#000' }
		} else {
			return { color: '#fff' }
		}
	}

	const navigation = () => (
		<ul className='nav nav-tabs bg-primary p-2'>
			<li className='nav-item'>
				<Link to='/' className='text-light nav-link' style={activeTab('/')}>
					Home
				</Link>
			</li>

			{!isAuthenticated() && (
				<Fragment>
					<li className='nav-item'>
						<Link to='/signin' className='text-light nav-link' style={activeTab('/signin')}>
							Sign In
						</Link>
					</li>

					<li className='nav-item'>
						<Link to='/signup' className='text-light nav-link' style={activeTab('/signup')}>
							Sign Up
						</Link>
					</li>
				</Fragment>
			)}

			{isAuthenticated() &&
			isAuthenticated().role === 'admin' && (
				<li className='nav-item'>
					<Link to='/admin' className='nav-link' style={activeTab('/admin')}>
						{isAuthenticated().name}
					</Link>
				</li>
			)}

			{isAuthenticated() &&
			isAuthenticated().role === 'customer' && (
				<li className='nav-item'>
					<Link to='/private' className='nav-link' style={activeTab('/private')}>
						{isAuthenticated().name}
					</Link>
				</li>
			)}

			{isAuthenticated() && (
				<Route
					render={({ history }) => (
						<li className='nav-item'>
							<span
								className='nav-link'
								style={{ cursor: 'pointer' }}
								onClick={() => {
									signOut(() => {
										history.push('/')
									})
								}}
							>
								Sign Out
							</span>
						</li>
					)}
				/>
			)}
		</ul>
	)

	return (
		<Fragment>
			{navigation()}
			<div className='container'>{children}</div>
		</Fragment>
	)
}

export default withRouter(BluePrint)
