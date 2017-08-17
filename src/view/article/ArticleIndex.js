import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {NavBar, List, ActivityIndicator} from 'antd-mobile';

import Menu from '../Menu';

import http from '../../util/http';
import constant from '../../util/constant';

class ArticleIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/mobile/feijiu/fast/article/list',
            data: {},
            success: function (data) {
                this.props.dispatch({
                    type: 'article/fetch',
                    data: {
                        is_load: true,
                        list: data,
                    }
                });
            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    }

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
    }

    handleArticle(article_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/article/detail/' + article_id,
            query: {}
        }));
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <div>
                    <NavBar
                        mode="light"
                        onLeftClick={this.handleBack.bind(this)}
                        rightContent={<Menu/>}
                    >贷款攻略</NavBar>
                </div>
                <List>
                    {
                        this.props.article.list.map((item) => {
                            return (
                                <Item
                                    key={item.article_id}
                                    arrow="horizontal"
                                    multipleLine={true}
                                    thumb={<img src={constant.host + item.article_image} style={{width: '50px', height: '50px'}}/>}
                                    onClick={this.handleArticle.bind(this, item.article_id)}
                                >
                                    <span className="article-category">[{item.article_name}]</span> {item.article_name}
                                </Item>
                            );
                        })
                    }
                </List>
                <div className={'loading-mask ' + (this.props.article.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(({article}) => ({article}))(ArticleIndex);