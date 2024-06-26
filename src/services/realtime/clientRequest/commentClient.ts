'use client'
import {fetcherParams} from "@lib/config/SwrFetcherConfig";
import {ServiceDestination} from "@lib/enum/ServiceDestination";


export function getCommentByPost (postId: string): fetcherParams {
    return [`/posts/comments/${postId}`, 'GET', null, ServiceDestination.REALTIME];
}
export function getCountCommentByParentId(parentId:string):fetcherParams {
    return [`/posts/commentsParentIdCount/${parentId}`, 'GET', null, ServiceDestination.REALTIME];
}
export function getCommentByParentId(parentId:string):fetcherParams {
    return [`/posts/commentsParentId/${parentId}`, 'GET', null, ServiceDestination.REALTIME];
}