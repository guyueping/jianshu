import * as constants from './constans'
import axios from 'axios'
import { fromJS} from 'immutable'

export const getHomeAction = (data) => ({
    type: constants.HOME_DATA,
    data
})

export const getMoreListAction = (data, page) => ({
    type: constants.MORE_LIST_DATA,
    data: fromJS(data),
    page
})
export const toggleShowScroll = (data) => ({
    type: constants.SHOW_SCROLL,
    data
})
export const getHomeData = () => {
    return (dispatch) => {
        axios.get('/api/home.json').then((res) => {
            const data = res.data.data
            dispatch(getHomeAction(data))
        })
    }
} 

export const getMoreList = (page) => {
    return (dispatch) => {
        axios.get('api/homeList.json?page=' + page).then((res) => {
            const data = res.data.data
            dispatch(getMoreListAction(data, page))
        })
    }
}