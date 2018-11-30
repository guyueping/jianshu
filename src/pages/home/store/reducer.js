import { fromJS } from 'immutable'
import { HOME_DATA, MORE_LIST_DATA, SHOW_SCROLL } from './constans'

const defaultState = fromJS({
    topicList: [],
    articleList: [],
    recommendList: [],
    articlePage: 1,
    showScroll: false
})

export default (state = defaultState, action ) => {
    switch(action.type) {
        case HOME_DATA :
            return state.merge({
                'topicList': fromJS(action.data.topicList),
                'articleList': fromJS(action.data.articleList),
                'recommendList': fromJS(action.data.recommendList)
            })
        case MORE_LIST_DATA :
            return state.merge({
                'articleList': state.get('articleList').concat(action.data.get('articleList')),
                'articlePage': action.page
            })
        case SHOW_SCROLL :
            return state.set('showScroll', action.data)
        default : 
            return state
    }
}

