import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {NavBar, ActivityIndicator} from 'antd-mobile';

import Menu from './Menu';

class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        };
    }

    componentDidMount() {
        this.setState({
            is_load: true
        });
    }

    componentWillUnmount() {

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
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(({about}) => ({about}))(About);
