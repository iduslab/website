import Axios, { AxiosInstance } from 'axios'

export const Req = (): AxiosInstance =>
  Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
  })

export const ReqAuth = (token: string): AxiosInstance =>
  Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
