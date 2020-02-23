import React, { useState, useEffect } from 'react';
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const { Option } = Select;
const { TextArea } = Input

function AddArticle(props) {

    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState(1) //选择的文章类别
    const [partCount, setPartCount] = useState(0) //文章的集数
    const [isLoading, setIsLoadding] = useState(false) //是否显示加载

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    //从中台得到文章类别信息
    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            header: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true
        }).then(
            res => {
                if (res.data.data == "没有登录") {
                    localStorage.removeItem('openId')
                    props.history.push('/')
                } else {
                    setTypeInfo(res.data.data)
                }
            }
        )
    }

    //选择类别后的便哈
    const selectTypeHandler = (value) => {
        setSelectType(value)
    }

    const saveArticle = () => {
        if (!selectedType) {
            message.error('必须选择文章类别')
            return false
        } else if (!articleTitle) {
            message.error('文章标题不能为空')
            return false
        } else if (!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if (!introducemd) {
            message.error('简介不能为空')
            return false
        } else if (!showDate) {
            message.error('发布日期不能为空')
            return false
        }
        message.success('检验通过')

        let dataProps = {}   //传递到接口的参数
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce = introducemd
        let datetext = showDate.replace('-', '/') //把字符串转换成时间戳
        dataProps.addTime = (new Date(datetext).getTime()) / 1000

        if (articleId == 0) {
            console.log('articleId=:' + articleId)
            dataProps.view_count = Math.ceil(Math.random() * 100) + 1000
            axios({
                method: 'post',
                url: servicePath.addArticle,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    setArticleId(res.data.insertId)
                    if (res.data.isScuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('文章保存失败');
                    }

                }
            )
        } else {
            dataProps.id = articleId
            axios({
                method: 'post',
                url: servicePath.updateArticle,
                header: { 'Access-Control-Allow-Origin': '*' },
                data: dataProps,
                withCredentials: true
            }).then(
                res => {

                    if (res.data.isScuccess) {
                        message.success('文章修改成功')
                    } else {
                        message.error('文章修改失败');
                    }
                }
            )
        }
    }

    useEffect(() => {
        getTypeInfo()
    }, [])

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10} >
                        <Col span={20}>
                            <Input
                                placeholder="博客标题"
                                onChange={e => { setArticleTitle(e.target.value) }}
                                size="large" />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item, index) => {
                                        return (<Option key={index} value={item.Id}>{item.typeName}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea
                                value={articleContent}
                                className="markdown-content"
                                rows={35}
                                onChange={changeContent}
                                onPressEnter={changeContent}
                                placeholder="文章内容"
                            />
                        </Col>
                        <Col span={12}>
                            <div
                                className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }} >
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Col span={24}>
                        <Row>
                            <Col span={24}>
                                <Button size="large">暂存文章</Button>&nbsp;
                                <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                                <br />
                            </Col>
                            <Col span={24}>
                                <br />
                                <TextArea
                                    rows={4}
                                    value={introducemd}
                                    onChange={changeIntroduce}
                                    onPressEnter={changeIntroduce}
                                    placeholder="文章简介"
                                />
                                <br /><br />
                                <div
                                    className="introduce-html"
                                    dangerouslySetInnerHTML={{ __html: '文章简介：' + introducehtml }} >
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="date-select">
                                    <DatePicker
                                        onChange={(date, dateString) => setShowDate(dateString)}
                                        placeholder="发布日期"
                                        size="large"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Row>
        </div>
    )
}
export default AddArticle