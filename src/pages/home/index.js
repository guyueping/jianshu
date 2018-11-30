import React, { PureComponent } from 'react'
import { HomeWrapper, HomeLeft, HomeRight, HomeBack } from './style'
import Topic from './components/topic'
import List from './components/list'
import Recommend from './components/recommend'
import Writer from './components/writer'
import { actionCreators } from './store/index'
// import store from '../../store'
import { connect } from 'react-redux'

class Home extends PureComponent {
    handleScrollTop() {
        window.scrollTo(0, 0)
    }
    render() {
        return (
            <HomeWrapper>
                <HomeLeft>
                    <img src="https://upload.jianshu.io/admin_banners/web_images/4581/8cfb95afa4ac98683ce1b9ab0f835f425e6a7df5.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" 
                        className="banner-img"
                        alt=""
                    />
                    <Topic></Topic>
                    <List></List>                   
                </HomeLeft>
                <HomeRight>
                    <Recommend></Recommend>
                    <Writer></Writer>
                </HomeRight>
                { this.props.showScroll ? <HomeBack onClick={this.handleScrollTop}>回到顶部</HomeBack> : ''}
            </HomeWrapper>
        )
    }

    componentDidMount() {
        this.props.changeHomeData()
        this.bindEvents()
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.changeshowScroll)
    }
    bindEvents() {
        window.addEventListener('scroll', this.props.changeshowScroll)
    }
}
const mapState = (state) => ({
    showScroll: state.getIn(['home', 'showScroll'])
})
const mapDistpatch = (dispatch) => ({
    changeHomeData() {
        dispatch(actionCreators.getHomeData())
    },
    changeshowScroll() {
        if (document.documentElement.scrollTop > 100 ) {
            dispatch(actionCreators.toggleShowScroll(true))
        } else {
            dispatch(actionCreators.toggleShowScroll(false))
        }
    }
})
export default connect(mapState, mapDistpatch)(Home)