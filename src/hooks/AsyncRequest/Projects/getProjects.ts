// 从服务器获取文章信息

import axios from "axios";
import useRoute from "@/hooks/useRoute.ts";
import ProjectInfo from "@/type/ProjectInfo.ts";

export default async function (): Promise<ProjectInfo[]> {
    try {
        const response = await axios({
            method: "GET",
            url: `${useRoute.BackEnd}/projects`,
        })
        return response.data
    } catch (err) {
        throw new Error('--服务器状态异常，请稍后再试--');
    }
}