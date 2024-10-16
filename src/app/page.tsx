'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import Image from 'next/image'; // Import Next.js image component for optimized image loading

export default function Home() {
	const services = [
		{
			title: 'Service 1',
			description: 'Description for service 1. We provide excellent quality and service.',
			image: '/home.png',
		},
		{
			title: 'Service 2',
			description: 'Description for service 2. We are dedicated to providing the best.',
			image: '/marker.png',
		},
		{
			title: 'Service 3',
			description: 'Description for service 3. Our team ensures top-notch performance.',
			image: '/envelope.png',
		},
	];

	return (
		<>
			<Header />
			<div className="relative w-full h-[500px]">
				<Image
					src="/banner.jpg"
					alt="Banner"
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<div className="container mx-auto py-12">
				<h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{services.map((service, index) => (
						<div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
							<div className="flex justify-center items-center mb-4">
								<Image
									src={service.image}
									alt={service.title}
									width="50"
									height="50"
								/>
							</div>
							<h3 className="text-xl font-semibold mb-2">{service.title}</h3>
							<p className="text-gray-600">{service.description}</p>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</>
	);
}
