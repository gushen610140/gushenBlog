// 从服务器获取文章信息

import ArticleInfo from "@/type/ArticleInfo.ts";
import axios from "axios";
import useRoute from "@/hooks/useRoute.ts";

export default async function (): Promise<ArticleInfo[]> {
    try {
        const response = await axios({
            method: "GET",
            url: `${useRoute.BackEnd}/articles`,
        })
        return response.data
    } catch (err) {
        throw new Error('--服务器状态异常，请稍后再试--');
    }
}