import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://toko.ox-sys.com'
})

