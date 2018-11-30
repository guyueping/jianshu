import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { LoginWrapper, LoginBox, Input, Button } from './style'
import { actionCreators } from './store';
import { Redirect } from 'react-router-dom'

class Login extends PureComponent {
    render() {
        const { handleBtnClick, login } = this.props
        if (!login) {
            return (
                <LoginWrapper>
                    <LoginBox>
                        <Input innerRef={(account) => this.accountEle = account} placeholder="账号"/>
                        <Input innerRef={(password) => this.passwordEle = password} placeholder="密码"/>
                        <Button onClick={() => handleBtnClick(this.accountEle, this.passwordEle)}>登录</Button>
                    </LoginBox>
                </LoginWrapper>
            )
        } else {
           return <Redirect to='/'/>
        }
        
    }
}

const mapState = (state) => ({
    login: state.getIn(['login', 'login'])
})

const mapDispatch = (dispatch) => ({
    handleBtnClick(accountEle, passwordEle) {
        dispatch(actionCreators.login(accountEle.value, passwordEle.value))
    }
})
export default connect(mapState, mapDispatch)(Login)