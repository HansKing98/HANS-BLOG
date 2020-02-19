import React from 'react'
import '../static/style/components/header.css'
import Link from 'next/link'
import { Row, Col, Menu, Icon } from 'antd'

const Header = () => (
    <div className="header">
        <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className="header-logo">HansKing</span>
                <span className="header-txt">web前端爱好者</span>
            </Col>

            <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode="horizontal">
                    <Menu.Item key="home">
                        <Link href={{ pathname: '/' }}>
                            <a><Icon type='home' /> 博客首页</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="video">
                        <Link href={{ pathname: '/detailed' }}>
                            <a><Icon type="chrome" />项目</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="life">
                        <Link href={{ pathname: '/list' }}>
                            <a><Icon type="paper-clip" />学习</a>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>
)

export default Header