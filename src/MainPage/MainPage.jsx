import React, { useState } from 'react';
import styles from './MainPage.module.css';
import ChatbotComponent from "../ChatbotDependencies/ChatbotComponent.jsx";
import "../ChatbotDependencies/Chatbot.css"
import ChatIcon from './ChatIcon.jsx';
import CategoryBar from './CategoryBar.jsx';
import truck_sales from '../assets/truck_sales.jpg'
import support from '../assets/support.jpg';
import financing from '../assets/financing.jpg';
import us from '../assets/us.jpg';
import browse from '../assets/browse.jpg';
import contact from '../assets/contact.png';
import sold from '../assets/sold.jpg';
import person1 from '../assets/person1.jpg';
import person2 from '../assets/person2.jpg';
import person3 from '../assets/person3.jpg';



const MainPage = () => {
    const [showChatbot, setShowChatbot] = useState(false);

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };
    return (
        <div className={styles.mainPage}>
            <div className={styles.splitBlock}>
                <div className={styles.videoBanner}>

                    <video autoplay loop>
                        <source src="https://cms.media.basworld.com/v/basgroup/Dronebeelden_videowall_V4/mp4_480p" type="video/mp4" />
                    </video>

                    <div className={styles.titleWrapper}>

                        <h1 class="HeroBannerWithVideo_title__QEZ52 fadeInBottom">BUY VEHICLES AND MACHINERY WORLDWIDE</h1>
                    </div>
                </div>
                <div className={styles.secondSplit}>
                    <h2>Over 2.500 products in stock</h2>
                </div>
                <div className={styles.thirdSplit}>
                    <h2>Sell your vehicle or machine</h2>
                </div>
            </div>
 {/* Our Services Section */}
 <section className="mt-12">
                    <h2 className="text-3xl font-semibold text-black-600 text-center">Our Services</h2>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                            <img src={truck_sales} alt="Truck Sales" className="mx-auto rounded-md"/>
                            <h3 className="text-xl font-semibold text-gray-800 mt-4">Truck Sales</h3>
                            <p className="text-gray-600 mt-2">We offer a wide range of trucks for sale, ensuring quality and affordability.</p>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                            <img src={financing} alt="Financing Options" className="mx-auto rounded-md"/>
                            <h3 className="text-xl font-semibold text-gray-800 mt-4">Financing Options</h3>
                            <p className="text-gray-600 mt-2">Flexible financing options to help you get the truck you need.</p>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                            <img src={support} alt="After-Sales Support" className="mx-auto rounded-md"/>
                            <h3 className="text-xl font-semibold text-gray-800 mt-4">After-Sales Support</h3>
                            <p className="text-gray-600 mt-2">Comprehensive after-sales support to keep your truck in top condition.</p>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="mt-12 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 p-4">
                        <img src={us} alt="Why Choose Us" className="rounded-md shadow-lg"/>
                    </div>
                    <div className="md:w-1/2 p-4">
                        <h2 className="text-3xl font-semibold text-black-600">Why Choose Us?</h2>
                        <p className="text-gray-600 mt-4">We have a long history of satisfied customers who trust us for their truck needs.</p>
                        <p className="text-gray-600 mt-2">Our inventory consists of only the highest quality trucks to ensure your satisfaction.</p>
                    </div>
                </section>

                {/* Customer Testimonials Section */}
                <section className="mt-12">
                    <h2 className="text-3xl font-semibold text-black-600 text-center">Customer Testimonials</h2>
                    <div className="mt-8 flex flex-wrap justify-center gap-8">
                        <div className="bg-white p-6 shadow-lg rounded-lg text-center w-72">
                            <img src={person2} alt="Customer 1" className="mx-auto rounded-full"/>
                            <p className="text-gray-600 mt-4">"BasWorld provided excellent service and I am very happy with my truck purchase!"</p>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">John D.</h3>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg text-center w-72">
                            <img src={person1} alt="Customer 2" className="mx-auto rounded-full"/>
                            <p className="text-gray-600 mt-4">"The financing options were perfect for my needs. Highly recommend BasWorld!"</p>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">Sarah K.</h3>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg text-center w-72">
                            <img src={person3} alt="Customer 3" className="mx-auto rounded-full"/>
                            <p className="text-gray-600 mt-4">"Great after-sales support, they really care about their customers."</p>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">Michael R.</h3>
                        </div>
                    </div>
                </section>

                {/* Statistics Section */}
                <section className="mt-12">
                    <h2 className="text-3xl font-semibold text-black-600 text-center">Our Achievements</h2>
                    <div className="mt-8 flex flex-wrap justify-around gap-8 text-center">
                        <div className="bg-white p-6 shadow-lg rounded-lg w-48">
                            <h3 className="text-4xl font-bold text-black-700">500+</h3>
                            <p className="text-gray-600 mt-2">Trucks Sold</p>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg w-48">
                            <h3 className="text-4xl font-bold text-black-700">300+</h3>
                            <p className="text-gray-600 mt-2">Happy Customers</p>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg w-48">
                            <h3 className="text-4xl font-bold text-black-700">50+</h3>
                            <p className="text-gray-600 mt-2">Dealers Nationwide</p>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg w-48">
                            <h3 className="text-4xl font-bold text-black-700">20+</h3>
                            <p className="text-gray-600 mt-2">Years of Experience</p>
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="mt-12">
                    <h2 className="text-3xl font-semibold text-black-600 text-center">Our Process</h2>
                    <div className="mt-8 relative max-w-4xl mx-auto">
                        <div className="border-l-2 border-black-600 absolute h-full top-0 left-1/2 transform -translate-x-1/2"></div>
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <div className="w-1/2 text-right pr-8">
                                    <h3 className="text-xl font-semibold text-gray-800">Step 1: Browse Inventory</h3>
                                    <p className="text-gray-600 mt-2">Explore our wide range of trucks to find the one that meets your needs.</p>
                                </div>
                                <div className="w-1/2 pl-8 relative">
                                    <img src={browse} alt="Browse Inventory" className="rounded-md shadow-lg"/>
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-black-600 rounded-full border-2 border-white"></div>
                                </div>
                            </div>
                            <div className="flex items-center flex-row-reverse">
                                <div className="w-1/2 text-left pl-8">
                                    <h3 className="text-xl font-semibold text-gray-800">Step 2: Contact Us</h3>
                                    <p className="text-gray-600 mt-2">Get in touch with our team to discuss your requirements and options.</p>
                                </div>
                                <div className="w-1/2 pr-8 relative">
                                    <img src={contact} alt="Contact Us" className="rounded-md shadow-lg"/>
                                    <div className="absolute top-0 right-1/2 transform translate-x-1/2 w-6 h-6 bg-black-600 rounded-full border-2 border-white"></div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-1/2 text-right pr-8">
                                    <h3 className="text-xl font-semibold text-gray-800">Step 3: Financing Options</h3>
                                    <p className="text-gray-600 mt-2">We offer flexible financing options to help you purchase your truck.</p>
                                </div>
                                <div className="w-1/2 pl-8 relative">
                                    <img src={financing} alt="Financing Options" className="rounded-md shadow-lg"/>
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-black-600 rounded-full border-2 border-white"></div>
                                </div>
                            </div>
                            <div className="flex items-center flex-row-reverse">
                                <div className="w-1/2 text-left pl-8">
                                    <h3 className="text-xl font-semibold text-gray-800">Step 4: Purchase</h3>
                                    <p className="text-gray-600 mt-2">Complete the purchase and take delivery of your new truck.</p>
                                </div>
                                <div className="w-1/2 pr-8 relative">
                                    <img src={sold} alt="Purchase" className="rounded-md shadow-lg"/>
                                    <div className="absolute top-0 right-1/2 transform translate-x-1/2 w-6 h-6 bg-black-600 rounded-full border-2 border-white"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            <div className={styles.Chatbot}>
                <div className={styles.chatbotButton}>
                    {!showChatbot &&


                        <ChatIcon onClick={toggleChatbot} />
                    }
                    <ChatbotComponent showChatbot={showChatbot} setShowChatbot={setShowChatbot} />
                </div>
            </div>
        </div>

    )
}
export default MainPage;
