import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Popover, Icon} from 'antd-mobile';

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

    handleSelect(option) {
        this.props.dispatch(routerRedux.push({
            pathname: option.props.value,
            query: {}
        }));
    }

    handlePopoverChange(visible) {
        this.setState({
            visible,
        });
    };

    render() {
        const Item = Popover.Item;

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
                         (<Item key="1" value="/index"
                                icon={<img src={require('../image/home.png')} style={{width: '20px'}} alt=""/>}
                                data-seed="logId">我要申请</Item>),
                         (<Item key="2" value="/credit/card/index"
                                icon={<img src={require('../image/recharge.png')} style={{width: '20px'}} alt=""/>}
                                style={{whiteSpace: 'nowrap'}}>申请信用卡</Item>),
                         (<Item key="3" value="/article/index"
                                icon={<img src={require('../image/upstage.png')} style={{width: '20px'}} alt=""/>}
                         >
                             <span style={{marginRight: 5}}>贷款攻略</span>
                         </Item>),
                         (<Item key="4" value="/about"
                                icon={<img src={require('../image/friend.png')} style={{width: '20px'}} alt=""/>}
                         >
                             <span style={{marginRight: 5}}>关于我们</span>
                         </Item>),
                     ]}
                     align={{
                         overflow: {adjustY: 0, adjustX: 0},
                         offset: [offsetX, 15],
                     }}
                     onSelect={this.handleSelect.bind(this)}
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
