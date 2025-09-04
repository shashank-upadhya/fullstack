import axios from "axios";
// const baseUrl='http://localhost:3001/api/persons'
const baseUrl='/api/persons'

const getAll=()=>{
    return axios.get(baseUrl)
}

const postAll=nameObject=>{
    return axios.post(baseUrl,nameObject)
}

const update=(id,nameObject)=>{
    return axios.put(`${baseUrl}/${id}`,nameObject)
}

const deleteItem=(id)=>{
    return axios.delete(`${baseUrl}/${id}`)
}
export default {
    getAll,
    postAll,
    update,
    deleteItem
}

