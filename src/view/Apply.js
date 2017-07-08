import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {List, InputItem, Checkbox, WhiteSpace, Button, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';

import http from '../util/http';

class Apply extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            customer_id_card: this.props.customer.customer_id_card,
            customer_money: this.props.customer.customer_money
        });
    }

    componentWillUnmount() {

    }

    formatDate(strTime) {
        var date = new Date(strTime);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (values.customer_id_card === '') {
                Toast.fail('请输入身份证号', 1)
                return;
            }

            if (values.customer_money === '') {
                Toast.fail('请输入借款金额', 1)
                return;
            }

            if (values.customer_fang === '') {
                Toast.fail('请选择是否名下有房', 1)
                return;
            }

            if (values.customer_che === '') {
                Toast.fail('请选择是否名下有车', 1)
                return;
            }

            if (values.customer_xin === '') {
                Toast.fail('请选择是否有信用卡', 1)
                return;
            }

            if (values.customer_shou === '') {
                Toast.fail('请选择是否有寿险保单', 1)
                return;
            }

            if (values.customer_dai === '') {
                Toast.fail('请选择是否有微粒贷', 1)
                return;
            }

            if (values.customer_gong === '') {
                Toast.fail('请选择是否有公积金', 1)
                return;
            }

            if (!errors) {
                if (this.props.customer.customer_name === '' || this.props.customer.customer_phone === '' || this.props.customer.customer_birthday === '' || this.props.customer.customer_city === '' || this.props.customer.customer_sex === '') {
                    Toast.fail('请返回填写完整信息', 1)

                    return;
                }

                new Promise(function (resolve, reject) {
                    this.props.dispatch({
                        type: 'customer/fetch',
                        data: {
                            customer_id_card: values.customer_id_card,
                            customer_money: values.customer_money
                        }
                    });

                    resolve();
                }.bind(this)).then(function () {
                    Toast.loading('加载中..', 0);

                    http.request({
                        url: '/feijiu/fast/customer/save',
                        data: {
                            customer_name: this.props.customer.customer_name,
                            customer_phone: this.props.customer.customer_phone,
                            customer_birthday: this.formatDate(new Date(this.props.customer.customer_birthday)),
                            customer_city: this.props.customer.customer_city,
                            customer_sex: this.props.customer.customer_sex,
                            customer_id_card: this.props.customer.customer_id_card,
                            customer_money: this.props.customer.customer_money,
                            customer_fang: this.props.customer.customer_fang,
                            customer_che: this.props.customer.customer_che,
                            customer_xin: this.props.customer.customer_xin,
                            customer_shou: this.props.customer.customer_shou,
                            customer_dai: this.props.customer.customer_dai,
                            customer_gong: this.props.customer.customer_gong
                        },
                        success: function (data) {
                            this.props.dispatch({
                                type: 'customer/fetch',
                                data: {
                                    customer_name: '',
                                    customer_phone: '',
                                    customer_birthday: '',
                                    customer_city: '',
                                    customer_sex: '',
                                    customer_id_card: '',
                                    customer_money: '',
                                    customer_fang: '',
                                    customer_che: '',
                                    customer_xin: '',
                                    customer_shou: '',
                                    customer_dai: '',
                                    customer_gong: ''
                                }
                            });

                            Toast.hide();

                            this.props.dispatch(routerRedux.push({
                                pathname: '/sucess',
                                query: {},
                            }));
                        }.bind(this),
                        complete: function () {

                        }
                    });
                }.bind(this));

            }
        });
    }

    handleChangeFang(customer_fang) {
        if (this.props.customer.customer_fang === customer_fang) {
            customer_fang = '';
        }

        this.props.dispatch({
            type: 'customer/fetch',
            data: {
                customer_fang: customer_fang
            }
        });
    }

    handleChangeChe(customer_che) {
        if (this.props.customer.customer_che === customer_che) {
            customer_che = '';
        }

        this.props.dispatch({
            type: 'customer/fetch',
            data: {
                customer_che: customer_che
            }
        });
    }

    handleChangeXin(customer_xin) {
        if (this.props.customer.customer_xin === customer_xin) {
            customer_xin = '';
        }

        this.props.dispatch({
            type: 'customer/fetch',
            data: {
                customer_xin: customer_xin
            }
        });
    }

    handleChangeShou(customer_shou) {
        if (this.props.customer.customer_shou === customer_shou) {
            customer_shou = '';
        }

        this.props.dispatch({
            type: 'customer/fetch',
            data: {
                customer_shou: customer_shou
            }
        });
    }

    handleChangeDai(customer_dai) {
        if (this.props.customer.customer_dai === customer_dai) {
            customer_dai = '';
        }

        this.props.dispatch({
            type: 'customer/fetch',
            data: {
                customer_dai: customer_dai
            }
        });
    }

    handleChangeGong(customer_gong) {
        if (this.props.customer.customer_gong === customer_gong) {
            customer_gong = '';
        }

        this.props.dispatch({
            type: 'customer/fetch',
            data: {
                customer_gong: customer_gong
            }
        });
    }

    render() {
        const {getFieldProps} = this.props.form;
        const AgreeItem = Checkbox.AgreeItem;

        return (
            <div>
                <img style={{width: '100%'}} src={require('../image/00.jpg')} alt=""/>
                <List style={{marginTop: '0px'}}>
                    <InputItem
                        {...getFieldProps('customer_id_card', {
                            rules: [{
                                required: true,
                                message: '不能为空',
                            }],
                            initialValue: '',
                        })}
                        clear
                        placeholder="请输入身份证号"
                    >身份证号</InputItem>
                    <InputItem
                        {...getFieldProps('customer_money', {
                            rules: [{
                                required: true,
                                message: '不能为空',
                            }],
                            initialValue: '',
                        })}
                        clear
                        placeholder="请输入借款金额"
                    >借款金额</InputItem>
                    <List.Item>
                        名下有房
                        <div style={{position: 'absolute', top: '0px', left: '76px', width: '80px'}}>
                            <AgreeItem checked={this.props.customer.customer_fang === '是'}
                                       onChange={this.handleChangeFang.bind(this, '是')}>
                                是
                            </AgreeItem>
                        </div>
                        <div style={{position: 'absolute', top: '0px', left: '176px', width: '80px'}}
                             onChange={this.handleChangeFang.bind(this, '否')}>
                            <AgreeItem checked={this.props.customer.customer_fang === '否'}>
                                否
                            </AgreeItem>
                        </div>
                    </List.Item>
                    <List.Item>
                        名下有车
                        <div style={{position: 'absolute', top: '0px', left: '76px', width: '80px'}}>
                            <AgreeItem checked={this.props.customer.customer_che === '是'}
                                       onChange={this.handleChangeChe.bind(this, '是')}>
                                是
                            </AgreeItem>
                        </div>
                        <div style={{position: 'absolute', top: '0px', left: '176px', width: '80px'}}
                             onChange={this.handleChangeChe.bind(this, '否')}>
                            <AgreeItem checked={this.props.customer.customer_che === '否'}>
                                否
                            </AgreeItem>
                        </div>
                    </List.Item>
                    <List.Item>
                        有信用卡
                        <div style={{position: 'absolute', top: '0px', left: '76px', width: '80px'}}>
                            <AgreeItem checked={this.props.customer.customer_xin === '是'}
                                       onChange={this.handleChangeXin.bind(this, '是')}>
                                是
                            </AgreeItem>
                        </div>
                        <div style={{position: 'absolute', top: '0px', left: '176px', width: '80px'}}
                             onChange={this.handleChangeXin.bind(this, '否')}>
                            <AgreeItem checked={this.props.customer.customer_xin === '否'}>
                                否
                            </AgreeItem>
                        </div>
                    </List.Item>
                    <List.Item>
                        有寿险保单
                        <div style={{position: 'absolute', top: '0px', left: '76px', width: '80px'}}>
                            <AgreeItem checked={this.props.customer.customer_shou === '是'}
                                       onChange={this.handleChangeShou.bind(this, '是')}>
                                是
                            </AgreeItem>
                        </div>
                        <div style={{position: 'absolute', top: '0px', left: '176px', width: '80px'}}
                             onChange={this.handleChangeShou.bind(this, '否')}>
                            <AgreeItem checked={this.props.customer.customer_shou === '否'}>
                                否
                            </AgreeItem>
                        </div>
                    </List.Item>
                    <List.Item>
                        有微粒贷
                        <div style={{position: 'absolute', top: '0px', left: '76px', width: '80px'}}>
                            <AgreeItem checked={this.props.customer.customer_dai === '是'}
                                       onChange={this.handleChangeDai.bind(this, '是')}>
                                是
                            </AgreeItem>
                        </div>
                        <div style={{position: 'absolute', top: '0px', left: '176px', width: '80px'}}
                             onChange={this.handleChangeDai.bind(this, '否')}>
                            <AgreeItem checked={this.props.customer.customer_dai === '否'}>
                                否
                            </AgreeItem>
                        </div>
                    </List.Item>
                    <List.Item>
                        有公积金
                        <div style={{position: 'absolute', top: '0px', left: '76px', width: '80px'}}>
                            <AgreeItem checked={this.props.customer.customer_gong === '是'}
                                       onChange={this.handleChangeGong.bind(this, '是')}>
                                是
                            </AgreeItem>
                        </div>
                        <div style={{position: 'absolute', top: '0px', left: '176px', width: '80px'}}
                             onChange={this.handleChangeGong.bind(this, '否')}>
                            <AgreeItem checked={this.props.customer.customer_gong === '否'}>
                                否
                            </AgreeItem>
                        </div>
                    </List.Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <List.Item>
                        <Button type="primary" style={{marginTop: '8px', marginBottom: '8px'}}
                                onClick={this.handleSubmit.bind(this)}>立即申请</Button>
                    </List.Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <img style={{width: '100%', marginTop: '8px', marginBottom: '8px'}} src={require('../image/01.jpg')}
                         alt=""/>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <img style={{width: '100%', marginTop: '8px', marginBottom: '8px'}} src={require('../image/02.jpg')}
                         alt=""/>
                </List>
                <WhiteSpace size="lg"/>
            </div>
        );
    }
}

Apply = createForm()(Apply);

export default connect(({customer}) => ({customer}))(Apply);
