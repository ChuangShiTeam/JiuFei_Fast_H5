import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Popover, Icon, List} from 'antd-mobile';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            selected: '',
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleClickIndex() {
        this.props.dispatch(routerRedux.push({
            pathname: '/index',
            query: {}
        }));
    }

    handleClickCreditCart() {
        this.props.dispatch(routerRedux.push({
            pathname: '/credit/card/index',
            query: {}
        }));
    }

    handleClickArticle() {
        this.props.dispatch(routerRedux.push({
            pathname: '/article/index',
            query: {}
        }));
    }

    handleClickAbout() {
        this.props.dispatch(routerRedux.push({
            pathname: '/about',
            query: {}
        }));
    }

    handlePopoverChange(visible) {
        this.setState({
            visible,
        });
    };

    render() {
        const Item = List.Item;

        let offsetX = -10; // just for pc demo
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
            offsetX = -26;
        }

        return (
            <Popover mask
                     overlayClassName="fortest"
                     overlayStyle={{color: 'currentColor'}}
                     visible={this.state.visible}
                     overlay={[
                         (<Item key="1" value="scan"
                                onClick={this.handleClickIndex.bind(this)}
                                icon={<Icon type={require('../image/home.png')} />}
                                data-seed="logId">我要申请</Item>),
                         (<Item key="2" value="special"
                                onClick={this.handleClickCreditCart.bind(this)}
                                icon={<Icon type={require('../image/home.png')} />}
                                style={{whiteSpace: 'nowrap'}}>申请信用卡</Item>),
                         (<Item key="3" value="button ct"
                                icon={<Icon type={require('../image/home.png')} />}
                                onClick={this.handleClickArticle.bind(this)}
                         >
                             <span style={{marginRight: 5}}>贷款攻略</span>
                         </Item>),
                         (<Item key="4" value="button ct"
                                icon={<Icon type={require('../image/home.png')} />}
                                onClick={this.handleClickAbout.bind(this)}
                         >
                             <span style={{marginRight: 5}}>关于我们</span>
                         </Item>),
                     ]}
                     align={{
                         overflow: {adjustY: 0, adjustX: 0},
                         offset: [offsetX, 15],
                     }}
                     onVisibleChange={this.handlePopoverChange.bind(this)}
            >
                <div style={{
                    height: '100%',
                    padding: '0 0.3rem',
                    marginRight: '-0.3rem',
                    display: 'flex',
                    alignItems: 'center',
                }}
                >
                    <Icon type="ellipsis"/>
                </div>
            </Popover>
        );
    }
}

Menu.propTypes = {};

export default connect(() => ({}))(Menu);
