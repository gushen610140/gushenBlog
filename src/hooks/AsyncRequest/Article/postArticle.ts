import axios from "axios";
import useRoute from "@/hooks/useRoute.ts";

interface postedArticleInfo {
    title: string,
    content: string,
}

export default async function (article: postedArticleInfo) {
    try {
        const response = await axios({
            method: "POST",
            url: `${useRoute.BackEnd}/articles`,
            params: {
                title: article.title,
                content: article.content,
            }
        })
        if (response.data.status == 200) {
            return '文章添加成功'
        }
        return '添加失败，请稍后再试'
    } catch (err) {
        throw new Error('--服务器状态异常，请稍后再试--');
    }
}