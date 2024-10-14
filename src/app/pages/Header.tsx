import Link from 'next/link';

const Header = () => {
	return (
		<header className="bg-gray-800 p-4">
			<nav className="container mx-auto flex justify-between items-center">
				<Link href="/" className="text-white text-xl font-bold">MyApp</Link>
				<ul className="flex space-x-4">
					<li>
						<Link
							href="/"
							className="text-gray-300 hover:text-white"
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							href="/login"
							className="text-gray-300 hover:text-white"
						>
							Login
						</Link>
					</li>
					<li>
						<Link
							href="/register"
							className="text-gray-300 hover:text-white"
						>
							Register
						</Link>
					</li>
					<li>
						<Link
							href="/logout"
							className="text-gray-300 hover:text-white"
						>
							Logout
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
