import axios from 'axios';
import { _config } from '../GlobalData';
import { LoginAccount } from '../struct/Account';
import * as Antd from "antd";

//#region AUTH API
export const login = async (e: LoginAccount, code?: string) => {
    return {
        code: 2,
        msg: '登录成功',
        data: { username: 'TEST' }
    };
};
