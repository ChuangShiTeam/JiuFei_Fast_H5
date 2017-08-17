import React, {Component} from 'react';
import {NavBar, Icon, List, Popover, ActivityIndicator} from 'antd-mobile';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import Menu from '../Menu';

import http from '../../util/http';
import constant from '../../util/constant';

class CreditCardIndex extends Component {
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
            url: '/mobile/feijiu/fast/credit/card/list',
            data: {},
            success: function (data) {
                if (data && data.length > 0) {
                    this.setState({
                        credit_card_list: data,
                    });
                }
                this.props.dispatch({
                    type: 'credit_card/fetch',
                    data: {
                        is_load: true,
                        credit_card_list: data,
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

    handleClick(credit_card_link) {
        if (credit_card_link !== '') {
            window.location.href = credit_card_link;
        }
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <NavBar
                    mode="light"
                    onLeftClick={this.handleBack.bind(this)}
                    rightContent={<Menu/>}
                >信用卡办理</NavBar>
                <div style={{borderBottom: '1px solid #ddd', backgroundColor: '#ffffff'}}>
                    {
                        this.props.credit_card.credit_card_list.map((item, index) => {
                            return (
                                <div key={item.credit_card_id}
                                     className={'credit_cart_item ' + (index % 2 === 0 ? '' : 'credit_cart_item_right')}
                                     onClick={this.handleClick.bind(this, item.credit_card_link)}>
                                    <img src={constant.host + item.credit_card_image} style={{
                                        width: '40px',
                                        height: '40px',
                                        position: 'absolute',
                                        top: 15,
                                        left: 15
                                    }} alt=""/>
                                    <div style={{position: 'absolute', top: 16, left: 65}}>{item.credit_card_name}</div>
                                    <div style={{
                                        position: 'absolute',
                                        top: 40,
                                        left: 65,
                                        fontSize: '12px',
                                        color: '#8d8d8d'
                                    }}>{item.credit_card_content}</div>
                                </div>
                            )
                        })
                    }
                    <div className="clear"></div>
                </div>
                <div className={'loading-mask ' + (this.props.credit_card.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(({credit_card}) => ({credit_card}))(CreditCardIndex);