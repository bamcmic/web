import { useState , useEffect } from 'react';
import * as CFApi from './CFApi';
import { withSuccess } from 'antd/es/modal/confirm';
import { Image } from 'antd';

export const Base64ToImage = (payeecodeBase64 : string) => {
      const base64String : string = `${payeecodeBase64}`;
            return ({ render:(
                  <div style={{overflow:'hidden',boxShadow:'0 0 10px rgba(0,0,0,.3)',borderRadius:'25px'}}>
                        <Image style={{width:'200px',height:'200px',objectFit:'cover'}}
                              src={base64String}
                              alt="Base64 Image" 
                        />
                  </div>
            ),
            Success : payeecodeBase64 != null && payeecodeBase64 != '' ? true : false,
      }
      );
}


export default function PayCode({ base64code }) {
  const result = Base64ToImage(base64code)
  return result.Success ? result.render : '无收款码';
}