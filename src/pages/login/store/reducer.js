import { fromJS } from 'immutable'
import { LOG_OUT, CHANGE_LOGIN } from './constants'

const defaultState = fromJS({
    login: false
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_LOGIN : 
            return state.set('login', action.data)
        case LOG_OUT :
            return state.set('login', action.data)
        default : 
            return state
    }
}

