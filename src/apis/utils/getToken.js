const getToken = () => {
    return localStorage.getItem("jwtToken")
};

export default getToken;

