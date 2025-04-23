// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
// import TrustPilot from './TrustPilot/Trust';
import Navbar from './Navbar/Navbar.jsx';
import RegisterForm from './RegistrationForm/Registration.jsx';
import ProfilePage from './ProfilePage/ProfilePage.jsx';
import ProtectedRoute from "./Routes/PrivateRoute.jsx";
import { AuthenticationProvider } from './apis/AuthApi.jsx';
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./ChatbotDependencies/config";
import ActionProvider from "./ChatbotDependencies/ActionProvider";
import MessageParser from "./ChatbotDependencies/MessageParser";
import "./ChatbotDependencies/Chatbot.css"
import Dashboard from "./Dashboard/Dashboard.jsx";
import FAQPage from "./Dashboard/DashboardFAQs.jsx";
import Dashboardtest from "./Dashboard/dashboardtest.jsx";
import SideBar from './CustomerSupportPanel/CustomerSupport.jsx';
import CustomerElements from "./CustomerSupportPanel/CustomerElements.jsx";
import FeedbackPage from "./Dashboard/FeedbackPage.jsx";
import CustomerSupportChat from "./websocket/react/CustomerSupportChat.jsx";
import CategoryBar from './MainPage/CategoryBar.jsx';
import TrustPilot from "./TrustPilot/Trust.jsx";
function App() {
    document.title = 'BAS World landing page';
    return (

        <Router>
            <AuthenticationProvider>
                <div className="app">
                    <Routes>
                        <Route path='/registration' element={<> <Navbar /><RegisterForm /></>}/>
                        <Route path='/' element={<> <TrustPilot/><MainPage /></>}/>
                        <Route path='/profile' element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
                        <Route path='/dashboard' element={<Dashboard/>}/>
                        <Route path='/faq' element={<FAQPage/>}/>
                        <Route path='/chat' element={<> <Navbar /><CustomerSupportChat /> </>}/>
                        <Route path='/faqs' element={<Dashboardtest/>}/>
                        <Route path='/support' element={<SideBar/>}/>
                        {/* <Route path='/test2' element={<CustomerElements/>}/> */}
                        <Route path='/feedback' element={<FeedbackPage/>}/>
                    </Routes>

                </div>
            </AuthenticationProvider>
        </Router>
    );

}

export default App;
