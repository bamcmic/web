import React, { useState } from "react";
import * as Antd from "antd";
import './loginPage.css';
import logo from '../../assets/cafelogo.jpg';
import * as CFApi from '../../Model/func/CFApi'
import { UserOutlined , KeyOutlined , MailOutlined ,SafetyCertificateOutlined} from '@ant-design/icons'
import { _config } from "../../Model/GlobalData";

function LoginPage() {
    const [_username, setUsername] = useState("");
    const [_password, setPassword] = useState("");
    const [regUser, setRegUser] = useState("");
    const [regPwd, setRegPwd] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);
    
    /// 保存登录状态
    var autoLogin: boolean = false;

//#region 登录逻辑
    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault();
       
        
        if (!_username.trim() || !_password.trim()) {
            Antd.message.warning("用户名和密码不能为空！");         
            return;
        }
        
         let tempCode : string;
        
        // 登录逻辑
        var loginResult = await CFApi.login({username:_username,password:_password});

        if(loginResult)

        switch(loginResult.code){
            case 2:
                // 验证成功登录
                Antd.message.info(loginResult.msg);  
                localStorage.setItem('LastLoginDate',new Date().getDay().toString());
                localStorage.setItem('CurrentUser',JSON.stringify(loginResult.data));
                window.location.reload();
            break;
            case 3:
                Antd.message.info("请输入发送到邮箱的验证码");   
                Antd.Modal.info({
                    title: '邮箱验证',
                    content: (
                      <Antd.Input
                        style={{ width: '80%', alignSelf: 'center' }}
                        placeholder="验证码"
                        variant='filled'
                        onChange={e => { tempCode = e.target.value; }}
                      />
                    ),width:'300px',
                    onOk: async() => {          
                        loginResult = await CFApi.login({username:_username,password:_password},tempCode); 
                        switch(loginResult.code){
                            case 2:
                                 localStorage.setItem('LastLoginDate',new Date().getDay().toString());
                                localStorage.setItem('CurrentUser',JSON.stringify(loginResult.data));
                                window.location.reload();
                                Antd.message.info(loginResult.msg); 
                            break;
                            default:
                                Antd.message.error(loginResult.msg);    
                            break;
                        }
                    }
                  });
                break;
        }
    };



//#endregion

const [modalOpen, setModalOpen] = useState(false);
const [tempCode, setTempCode] = useState('');


//#region 注册
    const handleRegister = async(e: React.FormEvent) => {
        e.preventDefault();
        if (!regUser.trim() || !regPwd.trim() || !regEmail.trim()) {
            Antd.message.warning("邮箱用户名和密码不能为空！");
            return;
        }
            // 简单邮箱格式校验
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailReg.test(regEmail)) {
            Antd.message.warning("请输入正确的邮箱格式！");
            return;
        }

        let tempCode : string;
        
    
    };
//#endregion

    return (
        <div className="main-box">
            <div style={{position:'fixed',bottom:'10px',color:'whitesmoke'}}>
                Copyright © 2025 { new Date().getFullYear().toString() != '2025' ? ` - ${new Date().getFullYear().toString()}` : null}  - CAFE SHOP. All rights reserved.
            </div>
         
            <div className={`login-box${isFlipped ? " flipped" : ""}`}>

                
                <div className={`logo-box${isFlipped ? " flipped" : ""}`}>        
                    <img src={logo}/>
                </div>
                {/* 登录面 */}
                <div className="login-face">
                    <div className="input-box">

                        <form className="input-form" onSubmit={handleLogin}>                         
                            <h2>登录</h2>
                            <Antd.Input
                                type="text"
                                placeholder="用户名"
                                value={_username}
                                variant='filled'
                                size="large"
                                prefix={<UserOutlined />}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <Antd.Input
                                type="password"
                                placeholder="密码"
                                value={_password}
                                variant='filled'
                                size="large"
                                prefix={<KeyOutlined/>}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Antd.Space direction='horizontal'>
                                
                                <Antd.Button htmlType="submit" style={{width:'7vw'}} type='primary'>登录</Antd.Button>
                            </Antd.Space>
                        </form>
                        <Antd.Button type="link" style={{position:'relative',marginTop:'20px' ,maxWidth:'200px',minWidth:'140px',width:'20vw',alignSelf:'center'}} onClick={() => setIsFlipped(true)}>
                            没有账号？去注册
                        </Antd.Button>
                    </div>
                </div>
                {/* 注册面 */} 
                
                <div className="register-face">
                    <div className="input-box">
                        
                        
                        <form className="input-form" onSubmit={handleRegister}>
                            <h2>注册</h2>
                             <Antd.Input
                                type="email"
                                placeholder="邮箱"
                                value={regEmail}
                                variant='filled'
                                size="large"
                                prefix={<MailOutlined/>}
                                onChange={e => setRegEmail(e.target.value)}
                            />
                            <Antd.Input
                                type="text"
                                placeholder="新用户名"
                                value={regUser}
                                variant='filled'
                                prefix={<UserOutlined />}
                                size="large"
                                onChange={e => setRegUser(e.target.value)}
                            />
                            <Antd.Input
                                type="password"
                                placeholder="新密码"
                                value={regPwd}
                                variant='filled'
                                size="large"
                                prefix={<KeyOutlined />}
                                onChange={e => setRegPwd(e.target.value)}
                            />
                            <Antd.Button htmlType="submit" style={{width:'7vw'}} type='primary'>注册</Antd.Button>
                        </form>
                        <Antd.Button type="link" style={{position:'relative',marginTop:'20px', maxWidth:'200px',minWidth:'140px',width:'20vw',alignSelf:'center'}} onClick={() => setIsFlipped(false)}>
                            已有账号？去登录
                        </Antd.Button>
                    </div>
                </div>
            </div>
            
        </div>
        
    );
}

export default LoginPage;