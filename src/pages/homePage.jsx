import { StrictMode} from 'react'
import { Space, Timeline } from 'antd';
import { AntDesignOutlined, ClockCircleOutlined } from '@ant-design/icons'; 
import { _config } from '../Model/GlobalData';
import '../Model/func/CFApi'
import * as CFApi from '../Model/func/CFApi';

import './homePage.css'
function HomePage(){
    return (
     <>            
        <div className='card'> 
            <div style={{width:'50vw',fontSize:'20px'}}>
                    <h1>公告</h1>
                    <h2>
                        遵守俱乐部陪玩条例 <br/> 1.违反《俱乐部陪玩条例》可能会导致账户受到<span style={{color:'red'}}>禁令</span>
                    </h2>
                         <h4 style={{float:'right'}}>                        
                           &nbsp;&nbsp;&nbsp;12/5/2025&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;<AntDesignOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         </h4>
                        <br/>
                        
            </div>
        </div>
       <Space direction='horizontal'>
             <div className='card'> 
            <div style={{width:'50vw',fontSize:'20px'}}>
                    <h1>多个卡片式页面</h1>
                 
                        
            </div>
            
        </div>
             <div className='card'> 
            <div style={{width:'20vw',fontSize:'20px'}}>
                    <h1>多个卡片式页面</h1>
                 
                        
            </div>
            
        </div>
        
        </Space>
        <Space>
        <div className='card'> 
            <div style={{width:'20vw',fontSize:'20px'}}>
                    <h1>多个卡片式页面</h1>
                 
                        
            </div>
            
        </div>
            <div className='card'> 
            <div style={{width:'20vw',fontSize:'20px'}}>
                    <h1>多个卡片式页面</h1>
                 
                        
            </div>
            
        </div>
            <div className='card'> 
            <div style={{width:'20vw',fontSize:'20px'}}>
                    <h1>多个卡片式页面</h1>
                 
                        
            </div>
            
        </div>
        </Space>
     </>
    )
}


export default HomePage
 