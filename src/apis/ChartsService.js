import httpCommons from "./http-commons"

export const CustomerResponse = async (startDate, endDate) => {

    try {
        return await httpCommons.get(`/feedback/customer?startDate=${startDate}&endDate=${endDate}`)

    }
    catch (error){
        console.error("There was an error making the GET    request!", error);

        throw error;
    }
};

export const EmployeeResponse = async (startDate, endDate) => {

    try {
        return await httpCommons.get(`/feedback/employee?startDate=${startDate}&endDate=${endDate}`)

    }
    catch (error){
        console.error("There was an error making the GET    request!", error);

        throw error;
    }
};
export const response = async (startDate, endDate) => {

    try {
        return await httpCommons.get(`/bot/statistics?startDate=${startDate}&endDate=${endDate}`)

    }
    catch (error){
        console.error("There was an error making the GET    request!", error);

        throw error;
    }
};

