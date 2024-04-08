import axios from "axios";
import useRoute from "@/hooks/useRoute.ts";

export default async function (id: string) {
    try {
        const response = await axios({
            method: "DELETE",
            url: `${useRoute.BackEnd}/articles`,
            params: {
                id,
            }
        })
        if (response.data.status == 200) {
            return '文章删除成功'
        }
        return '删除失败，请稍后再试'
    } catch (err) {
        throw new Error('--服务器状态异常，请稍后再试--');
    }
}