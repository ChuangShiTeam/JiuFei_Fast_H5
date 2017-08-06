import React, {Component} from 'react';
import { NavBar, Icon, Carousel, WhiteSpace, WingBlank, SegmentedControl, RefreshControl, List  } from 'antd-mobile';
import {connect} from 'dva';
import {createForm} from 'rc-form';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['', '', ''],
            initialHeight: 200,
        };
    }

    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }

    componentWillUnmount() {

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
                    {this.state.data.map(ii => (
                        <a href="http://www.baidu.com" key={ii} style={hProp}>
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${ii || 'QcWDkUhvYIVEcvtosxMF'}.png`}
                                alt="icon"
                                onLoad={() => {

                                window.dispatchEvent(new Event('resize'));
                                this.setState({
                                    initialHeight: null,
                                    });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>

                <WhiteSpace size="sm" />
                <WingBlank size="lg" className="sc-example">
                    <SegmentedControl selectedIndex={0} values={['切换一', '切换二', '切换三']} />
                </WingBlank>
                <WhiteSpace size="xs" />

                <List className="my-list">
                    <Item
                        arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                        onClick={() => {}}
                    >
                        Title
                        <Brief style={{marginTop: '0px'}}>subtitle</Brief>
                        <Brief style={{marginTop: '0px'}}>申请人数 <span style={{color: 'red'}}>11111人</span></Brief>
                    </Item>
                </List>
                <WhiteSpace size="lg" />
                <List className="my-list">
                    <Item
                        arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                        onClick={() => {}}
                    >
                        Title
                        <Brief style={{marginTop: '0px'}}>subtitle</Brief>
                        <Brief style={{marginTop: '0px'}}>申请人数 <span style={{color: 'red'}}>11111人</span></Brief>
                    </Item>
                </List>

            </div>
        );
    }
}

Index = createForm()(Index);

export default connect(({customer}) => ({customer}))(Index);