import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Popup, List, InputItem, DatePicker, Checkbox, WhiteSpace, Button, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import moment from 'moment';

import http from '../util/http';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_send: false,
            count: 60
        };
    }


    componentDidMount() {
        this.props.form.setFieldsValue({
            customer_name: this.props.customer.customer_name,
            customer_phone: this.props.customer.customer_phone,
            customer_validate: this.props.customer.customer_validate,
            customer_birthday: this.props.customer.customer_birthday,
            customer_city: this.props.customer.customer_city
        });

        Popup.show(<div className="code-info"><img className="code-img" style={{width: '80%'}} src={require('../image/03.jpg')} alt='微店二维码' /></div>, {maskClosable:true, className: 'back'});
    }

    componentWillUnmount() {

    }


    checkPhone(phone) {
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
            return false;
        }
        return true;
    }

    handleClose(){
        Popup.hide();
    }

    handleNext() {
        this.props.form.validateFields((errors, values) => {
            if (values.customer_name === '') {
                Toast.fail('请输入中文姓名', 1);
                return;
            }

            if (values.customer_phone === '') {
                Toast.fail('请输入手机号码', 1);
                return;
            } else {
                if (!this.checkPhone(values.customer_phone)) {
                    Toast.fail('手机号码格式不对', 1);
                    return;
                }
            }

            if (values.customer_validate === '') {
                Toast.fail('请选择您的手机验证码', 1);
                return;
            }

            if (values.customer_birthday === '') {
                Toast.fail('请选择您的出生日期', 1);
                return;
            }

            if (values.customer_city === '') {
                Toast.fail('请输入所在城市', 1);
                return;
            }

            if (values.customer_sex === '') {
                Toast.fail('请选择您的性别', 1);
                return;
            }

            if (!errors) {
                Toast.loading('加载中..', 0);

                http.request({
                    url: '/mobile/feijiu/fast/captcha/check',
                    data: {
                        captcha_mobile: values.customer_phone,
                        captcha_code: values.captcha_code
                    },
                    success: function (data) {
                        Toast.hide();

                        this.props.dispatch({
                            type: 'customer/fetch',
                            data: {
                                customer_name: values.customer_name,
                                customer_phone: values.customer_phone,
                                customer_birthday: values.customer_birthday,
                                customer_city: values.customer_city
                            }
                        });

                        this.props.dispatch(routerRedux.push({
                            pathname: '/apply',
                            query: {},
                        }));
                    }.bind(this),
                    complete: function () {

                    }.bind(this)
                });
            }
        });
    }

    handleChangeSex(customer_sex) {
        if (this.props.customer.customer_sex === customer_sex) {
            customer_sex = '';
        }

        this.props.dispatch({
            type: 'customer/fetch',
            data: {
                customer_sex: customer_sex
            }
        });
    }

    handleCaptcha() {
        let customer_phone = this.props.form.getFieldValue('customer_phone');

        if (customer_phone === '') {
            Toast.fail('请输入手机号码', 1);
            return;
        } else {
            if (!this.checkPhone(customer_phone)) {
                Toast.fail('手机号码格式不对', 1);
                return;
            }
        }

        Toast.loading('加载中..', 0);

        http.request({
            url: '/mobile/feijiu/fast/captcha/send',
            data: {
                captcha_mobile: customer_phone
            },
            success: function (data) {
                Toast.hide();

                this.setState({
                    is_send: true,
                    count: 60
                });

                setTimeout(function () {
                    this.handleCount();
                }.bind(this), 60000);
            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    }

    handleCount() {
        this.setState({
            is_send: false,
            count: 60
        });
    }


    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        const AgreeItem = Checkbox.AgreeItem;

        return (
            <div>

                <img style={{width: '100%'}} src={require('../image/00.jpg')} alt=""/>
                <List style={{marginTop: '0px'}}>
                    <InputItem
                        {...getFieldProps('customer_name', {
                            rules: [{
                                required: true,
                                message: '不能为空',
                            }],
                            initialValue: '',
                        })}
                        error={!!getFieldError('customer_name')}
                        clear
                        placeholder="请输入中文姓名"
                    >您的姓名</InputItem>
                    <InputItem
                        {...getFieldProps('customer_phone', {
                            rules: [{
                                required: true,
                                message: '不能为空',
                            }],
                            initialValue: '',
                        })}
                        error={!!getFieldError('customer_phone')}
                        clear
                        placeholder="请输入手机号码"
                    >
                        您的手机
                        {
                            this.state.is_send ?
                                <Button style={{ position: 'absolute',top:'0.12rem',right:'6px' }} size="small" disabled={true}>一分钟后再尝试</Button>
                                :
                                <Button type="primary" style={{ position: 'absolute',top:'0.12rem',right:'6px' }} size="small" onClick={this.handleCaptcha.bind(this)}>获取验证码</Button>
                        }
                    </InputItem>
                    <InputItem
                        {...getFieldProps('captcha_code', {
                            rules: [{
                                required: true,
                                message: '不能为空',
                            }],
                            initialValue: '',
                        })}
                        error={!!getFieldError('captcha_code')}
                        clear
                        placeholder="手机验证码"
                    >验证码</InputItem>

                    <DatePicker
                        mode="date"
                        extra="请选择日期"
                        minDate={moment('1917-01-01', 'YYYY-MM-DD')}
                        maxDate={moment()}
                        defaultDate={moment()}
                        {...getFieldProps('customer_birthday', {
                            rules: [{
                                required: true,
                                message: '不能为空',
                            }],
                            initialValue: '',
                        })}
                        error={!!getFieldError('customer_birthday')}
                    >
                        <List.Item arrow="horizontal">出生日期</List.Item>
                    </DatePicker>
                    <InputItem
                        {...getFieldProps('customer_city', {
                            rules: [{
                                required: true,
                                message: '不能为空',
                            }],
                            initialValue: '',
                        })}
                        error={!!getFieldError('customer_city')}
                        clear
                        placeholder="请输入所在城市"
                    >所在城市</InputItem>
                    <List.Item>
                        您的性别
                        <div style={{position: 'absolute', top: '0px', left: '76px', width: '80px'}}>
                            <AgreeItem checked={this.props.customer.customer_sex === '男'} onChange={this.handleChangeSex.bind(this, '男')}>
                                男
                            </AgreeItem>
                        </div>
                        <div style={{position: 'absolute', top: '0px', left: '176px', width: '80px'}} onChange={this.handleChangeSex.bind(this, '女')}>
                            <AgreeItem checked={this.props.customer.customer_sex === '女'}>
                                女
                            </AgreeItem>
                        </div>
                    </List.Item>
                </List>
                <WhiteSpace size="lg" />
                <List>
                    <List.Item multipleLine>
                        <Button type="primary" style={{marginTop: '8px'}} onClick={this.handleNext.bind(this)}>下一步</Button>
                        <div style={{marginTop: '10px', fontSize: '12px', color: '#a5a5a4'}} className="text">
                            平台郑重承诺:<br/>
                            所有贷款申请在未成功放款之前绝不收取任何费用，为保障您的资金安全，请不要相信任何要求您支付费用的信息、邮件、电话不实信息。
                        </div>
                    </List.Item>
                </List>
                <AgreeItem checked>
                    <span style={{color: '#545454', fontSize: '12px'}}>申请有礼：送100万赔付意外险，平安出行</span>
                </AgreeItem>
            </div>
        );
    }
}

Home = createForm()(Home);

export default connect(({customer}) => ({customer}))(Home);