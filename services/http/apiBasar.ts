import axios from "axios"


export const apiBasar=axios.create({
    baseURL:'/api/'
})