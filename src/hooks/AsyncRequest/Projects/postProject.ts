import axios from "axios";
import useRoute from "@/hooks/useRoute.ts";

interface postedProjectInfo {
    title: string,
    content: string,
    link: string
}

export default async function (form: postedProjectInfo) {
    try {
        const response = await axios({
            method: "POST",
            url: `${useRoute.BackEnd}/projects`,
            params: {
                title: form.title,
                content: form.content,
                link: form.link
            }
        })
        if (response.data.status == 200) {
            return '项目添加成功'
        }
        return '添加失败，请稍后再试'
    } catch (err) {
        throw new Error('--服务器状态异常，请稍后再试--');
    }
}