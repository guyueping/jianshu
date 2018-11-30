import { fromJS } from 'immutable'
// import {  } from './constans'
import { GET_DETAIL } from './constants'

const defaultState = fromJS({
    title: '',
    content: ''
})

export default (state = defaultState, action) => {
    switch(action.type) {
        case GET_DETAIL : 
            return state.merge({
                'title': action.data.get('title'),
                'content': action.data.get('content')
            })
        default : 
            return state
    }
}