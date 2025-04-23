import axios from "axios";



export const getUser = async (userId)=>{
    try {
        const response = await httpCommons.get(`/profile/${userId}`)

        return response.data;
      } catch (error) {
        console.error("There was an error making the GET request!", error);
        throw error;
      }
}