import axios from "axios";
import useRoute from "@/hooks/useRoute.ts";
import ResponseInfo from "@/type/ResponseInfo.ts";

export default async function (id: string) {
    try {
        const token = localStorage.getItem('token')
        if (!token) {
            const res: ResponseInfo = {
                status: 402,
                message: '请先进行登录'
            }
            return res
        }
        const response = await axios({
            method: "DELETE",
            url: `${useRoute.BackEnd}/projects`,
            params: {
                id,
                token
            }
        })
        return response.data
    } catch (err) {
        throw new Error('--服务器状态异常，请稍后再试--');
    }
}