import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import { createForm } from 'rc-form';
import { Result, Icon, WhiteSpace, Button } from 'antd-mobile';

class Sucess extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleHome() {
        this.props.dispatch(routerRedux.push({
            pathname: '/home',
            query: {},
        }));
    }

    render() {
        return (
            <div>
                <WhiteSpace />
                <Result
                    img={<Icon type="check-circle" className="icon" style={{ width: '50px', height: '50px', fill: '#de5603' }} />}
                    title="申请成功"
                    message="所提交内容已成功申请完成"
                />
                <Button type="primary" style={{margin: '20px 8px 8px 8px'}} onClick={this.handleHome.bind(this)}>返回首页</Button>
            </div>
        );
    }
}

Sucess = createForm()(Sucess);

export default connect(({customer}) => ({customer}))(Sucess);
