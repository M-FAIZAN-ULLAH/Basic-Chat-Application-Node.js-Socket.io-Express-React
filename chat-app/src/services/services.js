import Axios from "./axiosConfig"

export const getTest = async() => {
    try{
        const response = await Axios.get("/testing/result")
        return response.data
    }catch(error){
        throw error
    }
}

const api = {
    getTest,
  }
  
  export default api