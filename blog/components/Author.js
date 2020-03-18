import React, { useState, useEffect } from 'react'
import { Avatar, Divider, Tooltip, Tag } from 'antd'
import '../static/style/components/author.css'
import servicePath from '../config/apiUrl'
import axios from 'axios'
import CountUp from 'react-countup'

const Author = () => {

    const [all_part_count, setAll_part_count] = useState(0);
    const [all_view_count, setAll_view_count] = useState(0);

    useEffect(() => {

        fetchData()

    }, [])

    const fetchData = async () => {
        const result = await axios(servicePath.getAllPartCount).then(
            (res) => { return res.data.data }
        )
        setAll_part_count(result[0].all_part_count)
        setAll_view_count(result[0].all_view_count)
    }

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="https://q1.qlogo.cn/g?b=qq&nk=616882224&s=640" /></div>
            <div className="author-introduction">
                <div className="author-name">hAnsKing</div>
                <div>前端小白一枚，来来一起学习。</div>
                <div className="author-tag">
                    <Tag color="magenta">Coder</Tag>
                    <Tag color="green">大三</Tag>
                    <Tag color="geekblue">天津科技大学</Tag>
                    <Tag color="blue">博客<CountUp end={all_part_count} />篇</Tag>
                    <Tag color="cyan">访问<CountUp end={Math.floor(all_view_count*1.3)} />次</Tag>
                </div>

                <Divider>社交账号</Divider>
                <Tooltip title="B站 : yi条学狗">
                    <a href="https://space.bilibili.com/175371392" target="_blank">
                        <Avatar size={28} className="account my-icon icon-bilibili" />
                    </a>
                </Tooltip>
                <Tooltip title="https://github.com/HansKing98">
                    <a href="https://github.com/HansKing98" target="_blank">
                        <Avatar size={28} className="account my-icon icon-github" />
                    </a>
                </Tooltip>
                <Tooltip title="QQ:616882224">
                    <Avatar size={28} className="account my-icon icon-qq" />
                </Tooltip>
                <Tooltip title="wechat:ranxiaohao-">
                    <Avatar size={28} className="account my-icon icon-wechat" />
                </Tooltip>

            </div>
        </div>
    )

}

export default Author