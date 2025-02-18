import axios from 'axios'
import { getUserdetails, userdetail } from '../apiEndPoint/EnpPoint'

const token = localStorage.getItem('token') || sessionStorage.getItem('token');

export const getUserDetails = async (id) => {
    try {
        const response = await axios.get(`${userdetail}?id=${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const getUsersAllDetails = async (id) => {
    try {
        const response = await axios.get(`${getUserdetails}?id=${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}