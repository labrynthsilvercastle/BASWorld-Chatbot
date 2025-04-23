import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { CssBaseline, Box } from "@mui/material";

import "./Charts.css";
import CustomerElements from "../CustomerSupportPanel/CustomerElements.jsx";
import {CustomerResponse, EmployeeResponse, response} from "../apis/ChartsService.js";

Chart.register(...registerables);

const Dashboard = () => {
        const [userSatisfactionData, setUserSatisfactionData] = useState({
            startDate: '2024-05-05',
        endDate: '2024-05-12',
        data: {},
    });
    const [employeeSatisfactionData, setEmployeeSatisfactionData] = useState({
        startDate: '2024-05-02',
        endDate: '2024-05-10',
        data: {},
    });
    const [customerSatisfactionData, setCustomerSatisfactionData] = useState({
        startDate: '2024-05-02',
        endDate: '2024-05-10',
        data: {},
    });
    const [employeeData, setEmployeData] = useState({});
    const [customerData, setCustomerData] = useState({});
    const [faqData, setFaqData] = useState({});
    const [dateRange, setDateRange] = useState("week");
    const [chartTitle, setChartTitle] = useState("Current Week");
    const jwtToken = localStorage.getItem('jwtToken');

    const fetchData = async () => {
        try {
            const today = new Date();
            const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + (today.getDay() === 0 ? -5 : 1));
            const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7 + (today.getDay() === 0 ? -6 : 0));
            const startDate = startOfWeek.toISOString().split('T')[0];
            const endDate = endOfWeek.toISOString().split('T')[0];

            const mockUserSatisfactionData = {
                labels: ['Satisfied', 'Neutral', 'Dissatisfied'],
                datasets: [
                    {
                        label: 'User Satisfaction',
                        data: [25, 50, 25],
                        backgroundColor: [
                            'green',
                            'yellow',
                            'red',
                        ],
                    },
                ],
            };
            const EmployeeSatisfactionData = {
                labels: ['Satisfied', 'Neutral', 'Dissatisfied'],
                datasets: [
                    {
                        label: 'User Satisfaction',
                        data: [25, 50, 25],
                        backgroundColor: [
                            'green',
                            'yellow',
                            'red',
                        ],
                    },
                ],
            };
            const Employeeresponse = await EmployeeResponse(startDate,endDate)
            const fetchedEmployeeData = Employeeresponse.data.map(item => ({
                description: item.description,
                occurrences: item.occurrences
            }));
            if (fetchedEmployeeData && Array.isArray(fetchedEmployeeData) && fetchedEmployeeData.length > 0) {
                const labels = fetchedEmployeeData.map(item => item.description);
                const occurrences = fetchedEmployeeData.map(item => item.occurrences);

                setEmployeeSatisfactionData({
                    startDate: startDate,
                    endDate: endDate,
                    data: employeeSatisfactionData,
                });


                setEmployeData({
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Occurrences',
                                data: occurrences,
                            },
                        ],
                    },
                    description: 'Does the Chatbot reduce your queries',
                });
            }
            const Customerresponse = await CustomerResponse(startDate,endDate)
            const fetchedCustomerData = Customerresponse.data.map(item => ({
                description: item.satisfied ? 'Satisfied' : 'Not satisfied',
                occurrences: item.occurrences
            }));

            if (fetchedCustomerData && Array.isArray(fetchedCustomerData) && fetchedCustomerData.length > 0) {
                const labels = fetchedCustomerData.map(item => item.description);
                const occurrences = fetchedCustomerData.map(item => item.occurrences);

                setCustomerSatisfactionData({
                    startDate: startDate,
                    endDate: endDate,
                    data: customerSatisfactionData,
                });


                setCustomerData({
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Occurrences',
                                data: occurrences,
                            },
                        ],
                    },
                    description: 'was the usage of the chatbot satisfactory to you',
                });
            }

            const Response = await response(endDate,startDate)
            const fetchedFaqData = Response.data.map(item => ({
                description: item.description.replace(/\+/g, ' '),
                occurrences: item.occurrences
            }));

            if (fetchedFaqData && Array.isArray(fetchedFaqData) && fetchedFaqData.length > 0) {
                const labels = fetchedFaqData.map(item => item.description);
                const occurrences = fetchedFaqData.map(item => item.occurrences);

                setUserSatisfactionData({
                    startDate: startDate,
                    endDate: endDate,
                    data: mockUserSatisfactionData,
                });

                setFaqData({
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Occurrences',
                                data: occurrences,
                            },
                        ],
                    },
                    description: 'Frequently Asked Questions',
                });
            } else {
                console.error("Error: FAQ data not found or not in expected format.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleDateRangeChange = async (range) => {
        let startDate, endDate;
        const today = new Date();

        switch (range) {
            case "week":
                startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + (today.getDay() === 0 ? -5 : 1));
                endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7 + (today.getDay() === 0 ? -6 : 0));
                break;
            case "month":
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                break;
            case "year":
                startDate = new Date(today.getFullYear(), 0, 1);
                endDate = new Date(today.getFullYear(), 11, 31);
                break;
            default:
                break;
        }
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];

        setDateRange(range);
        setChartTitle(getChartTitle(range));

        try {

            const Response = await response(formattedStartDate,formattedEndDate)
            const fetchedFaqData = Response.data.map(item => ({
                description: item.description.replace(/\+/g, ' '),
                occurrences: item.occurrences
            }));

            if (fetchedFaqData && Array.isArray(fetchedFaqData) && fetchedFaqData.length > 0) {
                const labels = fetchedFaqData.map(item => item.description);
                const occurrences = fetchedFaqData.map(item => item.occurrences);
                setFaqData({
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Occurrences',
                                data: occurrences,
                            },
                        ],
                    },
                    description: 'Frequently Asked Questions',
                });
            } else {
                console.error("Error: FAQ data not found or not in expected format.");
            }

            setUserSatisfactionData({
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                data: userSatisfactionData,
            });
            const customerresponse = await CustomerResponse(formattedStartDate,formattedEndDate)
            console.log(customerresponse.data)
            const fetchedCustomerData = customerresponse.data.map(item => ({
                description: item.satisfied  ? 'Satisfied' : 'Not satisfied',
                occurrences: item.occurrences
            }));
            if (fetchedCustomerData && Array.isArray(fetchedCustomerData) && fetchedCustomerData.length > 0) {
                const labels = fetchedCustomerData.map(item => item.description);
                const occurrences = fetchedCustomerData.map(item => item.occurrences);

                setCustomerSatisfactionData({
                    startDate: startDate,
                    endDate: endDate,
                    data: customerSatisfactionData,
                });




                setCustomerData({
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Occurrences',
                                data: occurrences,
                            },
                        ],
                    },
                    description: 'was the usage of the chatbot satisfactory to you',
                });
            }

            const Employeeresponse = await EmployeeResponse(formattedStartDate,formattedEndDate)
            const fetchedEmployeeData = Employeeresponse.data.map(item => ({
                description: item.description,
                occurrences: item.occurrences
            }));
            if (fetchedEmployeeData && Array.isArray(fetchedEmployeeData) && fetchedEmployeeData.length > 0) {

                const labels = fetchedEmployeeData.map(item => item.description);
                const occurrences = fetchedEmployeeData.map(item => item.occurrences);

                setEmployeData({
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Occurrences',
                                data: occurrences,
                            },
                        ],
                    },

                    description: 'Does the Chatbot reduce your queries',
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
        setEmployeeSatisfactionData({
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            data: employeeSatisfactionData,
        });
    };

    const getChartTitle = (range) => {
        switch (range) {
            case "week":
                return "Current Week";
            case "month":
                return "Current Month";
            case "year":
                return "Current Year";
            default:
                return "";
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <CustomerElements />
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "100px" }}>

                <div className="container">
                    <div className="button-container">
                        <button onClick={(e) => {
                            e.preventDefault();
                            handleDateRangeChange("week");
                        }} disabled={dateRange === "week"}>Current Week
                        </button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            handleDateRangeChange("month");
                        }} disabled={dateRange === "month"}>Current Month
                        </button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            handleDateRangeChange("year");
                        }} disabled={dateRange === "year"}>Current Year
                        </button>
                    </div>
                    <div className="chart-container">
                        {employeeData.data && employeeData.data.labels && employeeData.data.datasets && (
                            <>
                                <p className="employee-data-desc">{employeeData.description}</p>
                                <Pie data={employeeData.data}/>

                            </>
                        )}

                    </div>
                    <div className="chart-container">
                        {customerData.data && customerData.data.labels && customerData.data.datasets && (
                            <>
                                <p className="employee-data-desc">{customerData.description}</p>
                                <Pie data={customerData.data}/>

                            </>
                        )}

                    </div>
                    <div className="chart-container">

                        {chartTitle && <h2 className="chart-title">{chartTitle}</h2>}
                        {employeeSatisfactionData && employeeSatisfactionData.data && employeeSatisfactionData.data.labels && employeeSatisfactionData.data.datasets && (
                            <>
                                <Pie data={employeeSatisfactionData.data}/>
                                <p>{employeeSatisfactionData.description}</p>
                            </>
                        )}

                        {faqData && faqData.data && faqData.data.labels && faqData.data.datasets && (
                            <Bar
                                data={faqData.data}
                                options={{
                                    scales: {
                                        x: {},
                                    },

                                    plugins: {
                                        legend: {
                                            labels: {
                                                font: {
                                                    size: 25
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>
            </Box>
        </Box>
    );
};

export default Dashboard;
