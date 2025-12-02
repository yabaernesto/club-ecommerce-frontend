import User from '../../../types/user.types'
import UserActionType from './user.action-type'

export const loginUser = (payload: User) => ({
  type: UserActionType.LOGIN,
  payload
})

export const logout = () => ({
  type: UserActionType.LOGOUT
})
