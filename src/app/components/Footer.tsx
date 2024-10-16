// src/app/components/Footer.tsx

import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
                <ul className="flex justify-center space-x-4 mt-2">
                    <li>
                        <a href="/privacy-policy" className="text-gray-300 hover:text-white">
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a href="/terms-of-service" className="text-gray-300 hover:text-white">
                            Terms of Service
                        </a>
                    </li>
                    <li>
                        <a href="/contact" className="text-gray-300 hover:text-white">
                            Contact Us
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
