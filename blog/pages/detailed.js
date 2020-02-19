import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'

import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

const Detailed = () => {

  let markdown = `
  # blog
  # admin
  # service

  ### 有序、无序、任务列表

  #### 无序列表
  
  - Java
    - Spring
      - IoC
      - AOP
  - Go
    - gofmt
    - Wide
  - Node.js
    - Koa
    - Express
  
  #### 有序列表
  
  1. Node.js
     1. Express
     2. Koa
  2. Go
     1. gofmt
     2. Wide
  3. Java
     1. Latke
     2. IDEA
  
  #### 任务列表
  
  - [X] 发布 Sym
  - [X] 发布 Solo
  - [ ] 预约牙医
  
  ### 表格
  
  如果需要展示数据什么的，可以选择使用表格。
  
  | header 1 | header 2 |
  | -------- | -------- |
  | cell 1   | cell 2   |
  | cell 3   | cell 4   |
  | cell 5   | cell 6   |
  
  ### 隐藏细节
  
  <details>
  <summary>这里是摘要部分。</summary>
  这里是细节部分。
  </details>
  
  ### 段落
  
  空行可以将内容进行分段，便于阅读。（这是第一段）
  
  使用空行在 Markdown 排版中相当重要。（这是第二段）
  

  `

  return (
    <>
      <Head>
        <title>Hans | Detail</title>
        <meta name="description" content="详情 | HansKing技术博客"></meta>
        <link rel="icon" href="../static/favicon.ico" mce_href="../static/favicon.ico" type="image/x-icon" />
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>项目列表</Breadcrumb.Item>
                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">
                🚀React Hooks + Next.js + Egg.js + MySql + Ant Design 博客系统
                  </div>

              <div className="list-icon center">
                <span><Icon type="calendar" /> 2019-12-12</span>
                <span><Icon type="folder" /> 开源项目</span>
                <span><Icon type="fire" /> 549人</span>
              </div>

              <div className="detailed-content" >
                <div className="detailed-content" >
                  <ReactMarkdown
                    source={markdown}
                    escapeHtml={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <MarkNav
                className="article-menu"
                source={markdown}
                ordered={false}
              />
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />

    </>
  )
}

export default Detailed