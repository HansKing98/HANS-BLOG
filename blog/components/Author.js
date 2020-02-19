import { Avatar, Badge, Divider } from 'antd'
import '../static/style/components/author.css'

const Author = () => {

    return (
        <div className="author-div comm-box">
            <div> <Badge count={'9+'}> <Avatar size={100} src="http://q1.qlogo.cn/g?b=qq&nk=616882224&s=640" /> </Badge> </div>
            <div className="author-introduction">
                web前端爱好者，专注于WEB和移动前端开发。
                <Divider>社交账号</Divider>
                <Avatar size={28} icon="github" className="account" />
                <Avatar size={28} icon="qq" className="account" />
                <Avatar size={28} icon="wechat" className="account" />

            </div>
        </div>
    )

}

export default Author