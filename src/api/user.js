// 关于用户接口方法

import request from "@/utils/request";

// 注册请求
export function registerAPI(data) {
  return request({
    url: "/h5/user/register",
    method: "post",
    data,
  });
}

// 登录请求
export function loginAPI(data) {
  return request({
    url: "/h5/user/login",
    method: "post",
    data,
  });
}
