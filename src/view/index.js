import React, {Component} from 'react';
import { NavBar, Icon, Carousel, WhiteSpace, WingBlank, SegmentedControl, List  } from 'antd-mobile';
import {connect} from 'dva';
import {createForm} from 'rc-form';

import http from '../util/http';
import constant from '../util/constant';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        if (!this.props.index.is_load) {
            this.handleLoad();
        }
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
                this.props.dispatch({
                    type: 'index/fetch',
                    data: {
                        product_category_list: data.product_category_list,
                        product_list: data.product_list
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

    onChange = (e) => {
        let selectedIndex = e.nativeEvent.selectedSegmentIndex;
        let product_category_id = this.state.product_category_list[selectedIndex].product_category_id;
        this.handleLoadProduct(product_category_id);
        this.setState({
            selectedIndex: selectedIndex
        })
    }

    render() {
        const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
        const Item = List.Item;
        const Brief = Item.Brief;

        return (
            <div>
                <div>
                    <NavBar
                            mode="light"
                            onLeftClick={() => console.log('onLeftClick')}
                            rightContent={[
                                <Icon key="0" style={{color: '#0066ff'}} type="ellipsis" />,
                             ]}
                    >极速贷款</NavBar>
                </div>

                <Carousel
                    className="my-carousel"
                    autoplay={true}
                    infinite
                    selectedIndex={1}
                    swipeSpeed={35}
                >
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
                </Carousel>

                <WhiteSpace size="lg" />
                <WingBlank size="lg" className="sc-example">
                    <SegmentedControl selectedIndex={this.state.selectedIndex}
                                      values={this.props.product_category_name_list}
                                      onChange={this.onChange}/>
                </WingBlank>
                {
                    this.props.product_list.map(product => {
                        return (
                            <span key={product.product_id}>
                                <WhiteSpace size="xs" />
                                <List className="my-list">
                                    <Item
                                        arrow="horizontal"
                                        thumb={constant.host + product.product_image_file.file_path}
                                        multipleLine
                                        onClick={() => {}}
                                    >
                                        {product.product_name}
                                        <Brief style={{marginTop: '0px'}}>{product.product_content}</Brief>
                                        <Brief style={{marginTop: '0px'}}>申请人数 <span style={{color: 'red'}}>{product.product_applicant_quantity}人</span></Brief>
                                    </Item>
                                </List>
                            </span>
                        )
                    })
                }
            </div>
        );
    }
}

Index = createForm()(Index);

export default connect(({index}) => ({index}))(Index);