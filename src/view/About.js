import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {NavBar, ActivityIndicator} from 'antd-mobile';

import Menu from './Menu';
import http from '../util/http';

class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        };
    }

    componentDidMount() {
        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/mobile/page/find',
            data: {
                page_id: 'a68e360c5d31413ab80a10e39c1973ff'
            },
            success: function (data) {
                this.props.dispatch({
                    type: 'about/fetch',
                    data: {
                        is_load: true,
                        about: data,
                    }
                });

                this.setState({
                    is_load: true
                });
            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    }

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    onLeftClick={this.handleBack.bind(this)}
                    rightContent={<Menu/>}
                >关于我们</NavBar>
                <div>
                    <div className="article-content"
                         dangerouslySetInnerHTML={{__html: this.props.about.about.page_content}}></div>
                </div>
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(({about}) => ({about}))(About);
