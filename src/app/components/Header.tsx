"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		// Check if a user is logged in
		const loggedInUser = localStorage.getItem('user');

		try {
			if (loggedInUser) {
				setUser(JSON.parse(loggedInUser)); // Only parse if loggedInUser is not null
			} else {
				setUser(null); // Set to null if there's no user
			}
		} catch (error) {
			console.error('Failed to parse user from localStorage', error);
			setUser(null); // Reset user state in case of parsing error
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('user');
		setUser(null);
		// Redirect to home page or any other page
		window.location.href = '/';
	};

	return (
		<header className="bg-gray-800 p-4">
			<nav className="container mx-auto flex justify-between items-center">
				<Link href="/" className="text-white text-xl font-bold">TestApp</Link>
				<ul className="flex space-x-4">
					<li>
						<Link href="/" className="text-gray-300 hover:text-white">Home</Link>
					</li>
					{user ? (
						<>
							<li className="text-gray-300">{user.username}</li>
							<li>
								<button
									onClick={handleLogout}
									className="text-gray-300 hover:text-white"
								>
									Logout
								</button>
							</li>
						</>
					) : (
						<>
							<li>
								<Link href="/register" className="text-gray-300 hover:text-white">Register</Link>
							</li>
							<li>
								<Link href="/login" className="text-gray-300 hover:text-white">Login</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
