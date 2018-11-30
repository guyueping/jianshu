import axios from 'axios'
import * as constants from './constants'
import { fromJS } from 'immutable'

const getDtailAction = (data) => ({
    type: constants.GET_DETAIL,
    data: fromJS(data)
})

export const getDetailInfo = (id) => {
    return (dispatch) => {
        axios.get('/api/detail.json?id=' + id).then((res) => {
            const data  = res.data.data
            dispatch(getDtailAction(data))
        })
    }
}