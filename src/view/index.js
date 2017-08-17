import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from 'rc-form';
import {NavBar, Icon, ActivityIndicator, WhiteSpace, WingBlank, SegmentedControl, List} from 'antd-mobile';

import Menu from './Menu';

import http from '../util/http';
import constant from '../util/constant';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            selected: ''
        };
    }

    componentDidMount() {
        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/mobile/feijiu/fast/index',
            data: {},
            success: function (data) {
                // if (data && data.length > 0) {
                //     this.setState({
                //         product_category_list: data,
                //         product_category_name_list: data.map(product_category => product_category.product_category_name)
                //     });
                //     let product_category_id = data[this.state.selectedIndex].product_category_id;
                //     this.handleLoadProduct(product_category_id);
                // }

                let product_category_name_list = [];
                for (let i = 0; i < data.product_category_list.length; i++) {
                    product_category_name_list.push(data.product_category_list[i].product_category_name);
                }

                let product_list = [];
                for (let i = 0; i < data.product_list.length; i++) {
                    if (data.product_list[i].product_category_id === data.product_category_list[0].product_category_id) {
                        product_list.push(data.product_list[i]);
                    }
                }

                this.props.dispatch({
                    type: 'index/fetch',
                    data: {
                        is_load: true,
                        product_category_name_list: product_category_name_list,
                        product_category_list: data.product_category_list,
                        product_all_list: data.product_list,
                        product_list: product_list
                    }
                });
            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    }

    // handleLoadProduct(product_category_id) {
    //     http.request({
    //         url: '/mobile/feijiu/fast/product/findByProductCategoryId',
    //         data: {
    //             product_category_id: product_category_id
    //         },
    //         success: function (data) {
    //             this.setState({
    //                 product_list: data
    //             });
    //         }.bind(this),
    //         complete: function () {
    //
    //         }.bind(this)
    //     });
    // }

    handleChange(event) {
        let product_category_name_index = event.nativeEvent.selectedSegmentIndex;

        let product_list = [];
        for (let i = 0; i < this.props.index.product_all_list.length; i++) {
            if (this.props.index.product_all_list[i].product_category_id === this.props.index.product_category_list[product_category_name_index].product_category_id) {
                product_list.push(this.props.index.product_all_list[i]);
            }
        }

        this.props.dispatch({
            type: 'index/fetch',
            data: {
                product_category_name_index: product_category_name_index,
                product_list: product_list
            }
        });
    }

    handleClick(product_link) {
        if (product_link !== '') {
            window.location.href = product_link;
        }
    }

    render() {
        const Item = List.Item;
        const Brief = Item.Brief;

        return (
            <div>
                <NavBar
                    mode="light"
                    iconName={null}
                    rightContent={<Menu/>}
                >极速贷款</NavBar>

                {/*<Carousel*/}
                {/*className="my-carousel"*/}
                {/*autoplay={true}*/}
                {/*infinite*/}
                {/*selectedIndex={1}*/}
                {/*swipeSpeed={35}*/}
                {/*>*/}
                {/*{this.state.data.map(ii => (*/}
                {/*<a href="http://www.baidu.com" key={ii} style={hProp}>*/}
                {/*<img*/}
                {/*src={`https://zos.alipayobjects.com/rmsportal/${ii || 'QcWDkUhvYIVEcvtosxMF'}.png`}*/}
                {/*alt="icon"*/}
                {/*onLoad={() => {*/}

                {/*window.dispatchEvent(new Event('resize'));*/}
                {/*this.setState({*/}
                {/*initialHeight: null,*/}
                {/*});*/}
                {/*}}*/}
                {/*/>*/}
                {/*</a>*/}
                {/*))}*/}
                {/*</Carousel>*/}

                <WhiteSpace size="lg"/>
                <WingBlank size="lg">
                    <SegmentedControl selectedIndex={this.props.index.product_category_name_index}
                                      values={this.props.index.product_category_name_list}
                                      onChange={this.handleChange.bind(this)}/>
                    <WhiteSpace size="md"/>
                </WingBlank>
                {
                    this.props.index.product_list.map(item => {
                        return (
                            <span key={item.product_id}>
                                <WhiteSpace size="xs"/>
                                <List className="my-list">
                                    <Item
                                        arrow="horizontal"
                                        multipleLine
                                        style={{height: '100px'}}
                                        onClick={this.handleClick.bind(this, item.product_link)}
                                    >
                                        <img src={constant.host + item.product_image} style={{
                                            width: '65px',
                                            height: '65px',
                                            position: 'absolute',
                                            top: 17,
                                            left: 0
                                        }} alt=""/>
                                        <div style={{
                                            position: 'absolute',
                                            top: 17,
                                            right: 30,
                                            left: 70,
                                        }}>
                                        {item.product_name}
                                            <Brief style={{marginTop: '0px'}}>{item.product_content}</Brief>
                                        <Brief style={{marginTop: '0px'}}>申请人数 <span
                                            style={{color: 'red'}}>{item.product_applicant_quantity}人</span></Brief>
                                        </div>
                                    </Item>
                                </List>
                            </span>
                        )
                    })
                }
                <div className={'loading-mask ' + (this.props.index.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

Index = createForm()(Index);

export default connect(({index}) => ({index}))(Index);