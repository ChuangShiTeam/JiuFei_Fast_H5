import React, {Component} from 'react';
import { NavBar, Icon, Carousel, WhiteSpace, WingBlank, SegmentedControl, RefreshControl, List, Flex} from 'antd-mobile';
import {connect} from 'dva';
import {createForm} from 'rc-form';

import http from '../../util/http';
import constant from '../../util/constant';

class CreditCardIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			credit_card_list: []
		};
	}

	componentDidMount() {
		this.handleLoad();
	}

	componentWillUnmount() {

	}

	handleLoad() {
		http.request({
			url: '/mobile/feijiu/fast/credit/card/list/all',
			data: {},
			success: function (data) {
				if (data && data.length > 0) {
					this.setState({
						credit_card_list: data,
					});
				}
			}.bind(this),
			complete: function () {

			}.bind(this)
		});
	}

	render() {
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
					>信用卡办理</NavBar>
				</div>
				<Flex wrap="wrap">
					{
						this.state.credit_card_list.map(credit_card => {
							return (
								<List className="my-list" style={{width: '50%'}}>
									<Item
										arrow="horizontal"
										thumb={constant.host + credit_card.credit_card_image_file.file_path}
										multipleLine
										onClick={() => {}}
									>
										{credit_card.credit_card_name}
										<Brief style={{marginTop: '0px'}}>{credit_card.credit_card_content}</Brief>
									</Item>
								</List>
							)
						})
					}
				</Flex>
			</div>
		);
	}
}

CreditCardIndex = createForm()(CreditCardIndex);

export default connect(({credit_card}) => ({credit_card}))(CreditCardIndex);