import { checkAdminAPI } from "@/api/UserAPI.ts";
import { noticeError } from "@/hooks/useNoticeMessageHook.ts";

export const routerCheckAdminHook = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const checkAdminRes = await checkAdminAPI();
    if (!checkAdminRes.data) {
      noticeError(checkAdminRes.message);
    }
    return checkAdminRes.data;
  } catch (e) {
    noticeError("很抱歉，您没有权限访问该页面");
    return false;
  }
};
