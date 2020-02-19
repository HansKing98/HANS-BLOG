import React from 'react'
import Head from 'next/head'
import { Row, Col } from 'antd'
import Header from '../components/Header'

const List = () => (
  <>
      <Head>
        <title>Hans | List</title>
        <meta name="description" content="List | HansKing技术博客"></meta>
        <link rel="icon" href="../static/favicon.ico" mce_href="../static/favicon.ico" type="image/x-icon" / >
      </Head>
    <Header />
    <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
        左侧
      </Col>

      <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
        右侧
      </Col>
    </Row>

  </>
)

export default List