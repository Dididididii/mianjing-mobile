// 关于面经的数据接口

import request from "@/utils/request";

// 获取面经数据接口
export function getArtcleAPI(params) {
  return request({
    url: "/h5/interview/query",
    params: params,
  });
}

// 面经详情页接口
export function artcleShowAPI(id) {
  return request({
    url: "/h5/interview/show",
    params: { id },
  });
}

// 收藏点赞接口
export function artcleLikesAPI(id, optType) {
  return request({
    url: "/h5/interview/opt",
    method: "post",
    data: { id, optType },
  });
}

// 查询收藏点赞接口
export function getArtcleLikesAPI(optType) {
  return request({
    url: "/h5/interview/opt/list",
    params: { optType },
  });
}
