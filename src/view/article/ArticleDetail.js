import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {NavBar, ActivityIndicator} from 'antd-mobile';

import Menu from '../Menu';

import http from '../../util/http';
import validate from '../../util/validate';

class ArticleDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            article: {},
        };
    }

    componentDidMount() {
        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/mobile/article/find',
            data: {
                article_id: this.props.params.article_id
            },
            success: function (data) {
                document.title = data.article_name;

                data.article_content = validate.unescapeHtml(data.article_content);

                this.setState({
                    is_load: true,
                    article: data
                });

                // wechat.share(constant.host + data.article_image_file.file_path, data.article_name, data.article_summary, 'http://h5.jiyiguan.nowui.com/#/story/detail/' + this.props.params.article_id);
            }.bind(this),
            complete: function () {

            }.bind(this),
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
                >贷款攻略</NavBar>
                <div>
                    <div className="article-content"
                         dangerouslySetInnerHTML={{__html: this.state.article.article_content}}></div>
                </div>
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(({article}) => ({article}))(ArticleDetail);
