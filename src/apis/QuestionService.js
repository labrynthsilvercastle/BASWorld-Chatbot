import httpCommons from "./http-commons";


export const getAllQuestion=async()=>{
    try {
        const response = await httpCommons.get(`/bot/all`)

        return response.data.questions;
      } catch (error) {
        console.error("There was an error making the GET request!", error);
        throw error;
      }
}
export const addQuestion=async(newQuestion, newAnswer)=>{
    try {
        const response = await httpCommons.post(`/bot`,{
            description:newQuestion,
            answer:newAnswer,
            category:1
        })
        
        return response.data.questions;
      } catch (error) {
        console.error("There was an error making the GET request!", error);
        throw error;
      }
}