import * as constants from './constants'
import axios from 'axios'
import  { fromJS } from 'immutable'

const changeList = (data) => ({
    type: constants.CHANGE_LIST,
    //这里派发给reducer的data类型需是immutable类型
    data: fromJS(data),
    totalPage: Math.ceil(data.length / 10)
})

export const searchFocus = () => ({
    type: constants.SEARCH_FOCUS
})

export const searchBlur = () => ({
    type: constants.SEARCH_BLUR
})

export const mouseEnter = () => ({
    type: constants.MOUSE_ENTER
})

export const mouseLeave = () => ({
    type: constants.MOUSE_LEAVE
})

export const getNewList = (page) => ({
    type: constants.NEW_LIST,
    page
})

export const getList = () => {
    //在该函数里处理一些异步请求
    return (dispatch) => {
        axios.get('/api/headerList.json').then((res) => {
            const data = res.data
            // console.log(data.data)
            dispatch(changeList(data.data))
        }).catch(() => {
            console.log('error')
        })
    }
}
