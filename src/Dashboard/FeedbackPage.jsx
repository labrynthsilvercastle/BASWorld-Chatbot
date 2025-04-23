import React, { useState } from 'react';
import { Box, CssBaseline } from "@mui/material";
import CustomerElements from "../CustomerSupportPanel/CustomerElements.jsx";
import './FAQPage.css';
import axios from 'axios';

const FeedbackPage = () => {
    const [reducingQueries, setReducingQueries] = useState('');
    const [comment, setComment] = useState('');
    const [accuracy, setAccuracy] = useState('');
    const [usability, setUsability] = useState('');
    const [improvements, setImprovements] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const jwtToken = localStorage.getItem('jwtToken');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!reducingQueries || reducingQueries === 'select') {
            setErrorMessage('Please select an answer for the first question.');
            return;
        }

        if (reducingQueries === 'no' && !comment) {
            setErrorMessage('Please provide details for the comment.');
            return;
        }

        if (!accuracy || accuracy === 'select' || !usability || usability === 'select') {
            setErrorMessage('Please select answers for all additional questions.');
            return;
        }
        const userData = {
            reducingQueriesQuestion: reducingQueries,
            reducingQueriesComment: comment,
            accuracy: accuracy,
            usability: usability,
            improvements: improvements
        };
        axios.post(`http://localhost:8080/feedback/employee`, userData, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }

        });


    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <CustomerElements />
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "100px" }}>
                <div>
                    <h2>Frequently Asked Questions</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="reducing-queries">Has the chatbot effectively reduced repetitive or unnecessary inquiries from customers?</label><br />
                        <select id="reducing-queries" name="reducing-queries" value={reducingQueries} onChange={(e) => setReducingQueries(e.target.value)}>
                            <option value="select">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="not-sure">Not Sure</option>
                        </select><br />

                        {reducingQueries === 'no' && (
                            <div>
                                <label htmlFor="comment">If no or not sure, please provide details:</label><br />
                                <textarea id="comment" name="comment" rows="4" cols="50" value={comment} onChange={(e) => setComment(e.target.value)}></textarea><br />
                            </div>
                        )}
                        <h2>Additional Feedback:</h2>

                        <label htmlFor="accuracy">How accurate do you find the responses provided by the chatbot?</label><br />
                        <select id="accuracy" name="accuracy" value={accuracy} onChange={(e) => setAccuracy(e.target.value)}>
                            <option value="select">Select</option>
                            <option value="very-accurate">Very Accurate</option>
                            <option value="accurate">Accurate</option>
                            <option value="neutral">Neutral</option>
                            <option value="inaccurate">Inaccurate</option>
                            <option value="very-inaccurate">Very Inaccurate</option>
                        </select><br />

                        <label htmlFor="usability">How easy is it for you to find and use the information provided by the chatbot?</label><br />
                        <select id="usability" name="usability" value={usability} onChange={(e) => setUsability(e.target.value)}>
                            <option value="select">Select</option>
                            <option value="very-easy">Very Easy</option>
                            <option value="easy">Easy</option>
                            <option value="neutral">Neutral</option>
                            <option value="difficult">Difficult</option>
                            <option value="very-difficult">Very Difficult</option>
                        </select><br />

                        <label htmlFor="improvements">What improvements would you suggest for the chatbot?</label><br />
                        <textarea id="improvements" name="improvements" rows="4" cols="50" value={improvements} onChange={(e) => setImprovements(e.target.value)}></textarea><br />

                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </Box>
        </Box>
    );
};

export default FeedbackPage;
