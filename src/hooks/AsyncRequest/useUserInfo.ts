// 从服务器获取用户信息

import axios from 'axios';
import UserInfo from "@/type/UserInfo.ts";
import useRoute from "@/hooks/useRoute.ts";

export default async function (): Promise<UserInfo> {
    let token = localStorage.getItem('token');
    if (!token) {
        throw new Error('--用户未登录--');
    }
    try {
        let response = await axios({
            method: 'GET',
            url: `${useRoute.BackEnd}/user`,
            params: {
                token: token
            }
        });
        return JSON.parse(response.data.message);
    } catch (error) {
        throw new Error('--服务器状态异常，请稍后再试--');
    }
}
