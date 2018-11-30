import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from './store'
import { Link } from 'react-router-dom'
import { actionCreators as loginActionCreators } from '../../pages/login/store'
import { 
    HeaderWrapper, 
    Logo,
    Nav,
    NavItem,
    NavSearch,
    Addition,
    Button,
    SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    SearchInfoList
 } from './style'


class Header extends PureComponent {
    getInfoList() {
        const { focused, list, handleMouseEnter, handleMouseLeave, mouseIn, page, totalPage, handleBtnClick } = this.props
        //list是immutable的对象，要转成js数组才能list[]这样使用
        const jsList = list.toJS()
        const newList = []
        if (jsList.length) {
            for (let i = (page - 1) * 10; i < page * 10; i++ ) {
                newList.push(<SearchInfoItem key={jsList[i]}>{jsList[i]}</SearchInfoItem>)
            }
        }
        
        if (focused || mouseIn) {
            return (
                <SearchInfo 
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}>
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch 
                            onClick={() => handleBtnClick(page, totalPage, this.spinIcon)}
                        >
                            <i 
                                className={focused ? 'focused iconfont' : 'iconfont'}
                                ref={(icon) => {this.spinIcon = icon}}
                            >
                                &#xe851;
                            </i>
                            换一换
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        { newList }
                    </SearchInfoList>
                </SearchInfo>
            )
        } else {
            return null
        }
    }
    render() {
        const { focused, handleInputFocus, handleInputBlur, list, login,logout } = this.props
        return (
            <HeaderWrapper>
                <Link to='/'>
                    <Logo></Logo>
                </Link>
                <Nav>
                    <NavItem className="left active">首页</NavItem>
                    <NavItem className="left">下载App</NavItem>
                    {
                        login ? 
                            <NavItem onClick={logout} className="right">退出</NavItem> :
                            <Link to='/login'><NavItem className="right">登录</NavItem></Link>
                    }
                    
                    <NavItem className="right">
                        <i className="iconfont">&#xe636;</i>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            timeout={200}
                            in={focused}
                            classNames="slide"
                        >
                            <NavSearch 
                                className={focused ? 'focused' : ''}
                                onFocus={() => handleInputFocus(list)}
                                onBlur={handleInputBlur}
                            >                       
                            </NavSearch>
                        </CSSTransition>
                        
                        <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe64a;</i>
                        {this.getInfoList(focused)}
                    </SearchWrapper>                    
                </Nav>
                <Addition>
                    <Link to='/write'>
                        <Button className="writting">
                            <i className="iconfont">&#xe610;</i>
                            写文章
                        </Button>
                    </Link>
                    <Button className="reg">注册</Button>                    
                </Addition>
            </HeaderWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // focused: state.get('header').get('focused')
        focused: state.getIn(['header', 'focused']),
        list: state.getIn(['header', 'list']),
        mouseIn: state.getIn(['header', 'mouseIn'] ),
        totalPage: state.getIn(['header', 'totalPage']),
        page: state.getIn(['header', 'page']),
        login: state.getIn(['login', 'login'])
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus(list) {
            (list.size === 0) && dispatch(actionCreators.getList())
            dispatch(actionCreators.searchFocus())
        },
        handleInputBlur() {
            dispatch(actionCreators.searchBlur())
        },
        handleMouseEnter() {
            dispatch(actionCreators.mouseEnter())
        },
        handleMouseLeave() {
            dispatch(actionCreators.mouseLeave())
        },
        handleBtnClick(page, totalPage, spin) {
            // spin.style.transform = 'rotate(360deg)'
            let originAngle = spin.style.transform.replace(/[^0-9]/ig, '')
            if (originAngle) {
                originAngle = parseInt(originAngle, 10)
                
            } else {
                originAngle = 0
            }
            spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)'
            if (page < totalPage) {
                page++
            } else {
                page = 1
            }
            dispatch(actionCreators.getNewList(page))
        },
        logout() {
            dispatch(loginActionCreators.logout())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)