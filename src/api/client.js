import axios from 'axios';
import BaseUrl from "./baseUrl.js"

export default axios.create({
    baseURL: BaseUrl,
});
