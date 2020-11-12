import { createReducer } from 'typesafe-actions'
import { actions, Actions } from './../action/auth'

type State = {
  username: string
  userid: string
  access_token: string
  refresh_token: string
  server_verified: boolean
}

const InitialState: State = {
  username: '',
  userid: '',
  access_token: '',
  refresh_token: '',
  server_verified: false
}

export const AuthReducer = createReducer<State, Actions>(InitialState)
