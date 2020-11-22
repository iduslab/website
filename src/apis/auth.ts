import { AxiosResponse } from 'axios'
import { access } from 'fs'
import { Req, ReqAuth } from './basic'

export const GetOAuthLink = (): Promise<AxiosResponse> =>
  Req().get('/auth/link', {
    params: {
      redirect_uri: process.env.REACT_APP_DISCORD_REDIRECT_URI
    }
  })

export const OAuthExchange = (code: string): Promise<AxiosResponse> =>
  Req().get('/auth/', {
    params: {
      code,
      redirect_uri: process.env.REACT_APP_DISCORD_REDIRECT_URI
    }
  })

export const OAuthSignIn = (
  access_token: string,
  refresh_token: string
): Promise<AxiosResponse> =>
  Req().post('/auth/token', {
    access_token,
    refresh_token
  })

export const GetRoles = (): Promise<AxiosResponse> => Req().get('/auth/roles')

export interface ISetup {
  nickname: string
  join_with: string
  want_to_do: string
  message: string
  roles: string[]
}

export const Setup = (
  accessToken: string,
  reqBody: ISetup
): Promise<AxiosResponse> => ReqAuth(accessToken).post('/auth/setup', reqBody)

export const IsMember = (accessToken: string): Promise<AxiosResponse> =>
  ReqAuth(accessToken).get('/auth/ismember')
