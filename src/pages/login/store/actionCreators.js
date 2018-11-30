import axios from 'axios'
import * as constants from './constants'

const changeLogin = () => ({
    type: constants.CHANGE_LOGIN,
    data: true
})
export const logout = () => ({
    type: constants.LOG_OUT,
    data: false
})

export const login = (account, password) => {
    return (dispatch) => {
        axios.get('/api/login.json?account=' + account + '&password=' + password).then((res) => {
            const data = res.data.data
            if (data) {
                dispatch(changeLogin())
            } else {
                alert('登录失败')
            }
        })
    }
}