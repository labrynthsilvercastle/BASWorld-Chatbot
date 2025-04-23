import axios from "axios";


const jwtToken = localStorage.getItem('jwtToken');

const UserApi = {
    getUser: (userId) => axios.get(`http://localhost:8080/profile/${userId}`, {
        headers: { Authorization: `Bearer ${jwtToken}` }
    })
        .then(response => response.data)
}

export default UserApi;