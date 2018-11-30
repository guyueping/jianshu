import React, { PureComponent } from 'react'
import { ListItem, ListInfo, LoadMore } from '../style'
import { connect } from 'react-redux'
import { actionCreators } from '../store'
import { Link } from 'react-router-dom'

class List extends PureComponent {
    render() {
        const { list, handleBtnClick, page } = this.props
        return (
            <div>
                {
                    list.map((item, index) => (
                        <Link to={'/detail/' + item.get('id')} key={index}>
                            <ListItem >
                                <img className='pic' src={item.get('imgUrl')} alt="aa" />
                                <ListInfo>
                                    <h3 className='title'>{item.get('title')}</h3>
                                    <p className='desc'>{item.get('desc')}</p>
                                </ListInfo>
                            </ListItem>
                        </Link>                     
                    ))
                }
            <LoadMore onClick={() => handleBtnClick(page)}>阅读更多</LoadMore> 
            </div>
        )
    }
}

const mapState = (state)  => ({
    list: state.getIn(['home', 'articleList']),
    page: state.getIn(['home', 'articlePage'])
})

const mapDispatch = (dispatch) => ({
    handleBtnClick(page) {
        dispatch(actionCreators.getMoreList(page + 1))
    }
})
export default connect(mapState, mapDispatch)(List)