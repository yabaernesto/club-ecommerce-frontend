import type { User } from 'firebase/auth'

import UserActionType from './user.action-type'

interface InitialState {
  currentUser: User | null
  isAuthenticated: boolean
}

const initialState: InitialState = {
  currentUser: null,
  isAuthenticated: false
}

const userReducer = (state = initialState, action = any) => {
  switch (action.type) {
    case UserActionType.LOGIN:
      return { ...state, currentUser: action.payload, isAuthenticated: true }
    case UserActionType.LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false
      }
    default:
      return {
        ...state
      }
  }
}

export default userReducer
