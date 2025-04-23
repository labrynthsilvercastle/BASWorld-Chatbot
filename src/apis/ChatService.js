import httpCommons from "./http-commons"

export const askQuestion = async (text)=>{
try{
    const response=await httpCommons.post(`/bot/ask`,{
        question:text
    })

    return response.data.question;
}
catch (error){
    console.error("There was an error making the POST    request!", error);

    throw error;
}

}
export const getQuestion=async (id)=>{
    try{
        const response=await httpCommons.get(`/bot/${id}`)
    
        return response.data;
    }
    catch (error){
        console.error("There was an error making the GET request!", error);
    
        throw error;
    }


}
export const sentQuestion = async (question)=>{
    try{
        await httpCommons.post(`/bot/statistics`,{
            description:question
        })

    }
    catch (error){
        console.error("There was an error making the POST    request!", error);

        throw error;
    }
}
export const handleVirusTotalCheck = async (url) => {

    try {
        return await httpCommons.post(`/virusTotalProxy/urls`, {
            url: url
        })


    } catch (error) {
    return null
    }
};