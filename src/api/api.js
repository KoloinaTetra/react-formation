import apiClient from './client';


const getProduct=async()=>{
    try{
        const response = await apiClient.get('/products');
        
        return response.data

    } catch(error)
    {
        return []
    }
}

export default getProduct ;