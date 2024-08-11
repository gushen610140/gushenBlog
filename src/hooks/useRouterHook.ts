// 导入自己创建的router而不是useRouter，useRouter只能在setup中使用
import router from "@/router";

/**
 * 可携带函数的跳转页面
 * @param route 路由地址
 * @param func 无参数无返回值的函数，在跳转后执行
 */
export const changePageHook = (route: string, func?: () => void) => {
  router.push(route).then(() => {
    if (func) {
      func();
    }
  });
};

export const openPageHook = (route: string) => {
  const routeIntactUrl = router.resolve(route);
  window.open(routeIntactUrl.href, "_blank");
};

export const reloadPage = () => {
  router.go(0);
};
