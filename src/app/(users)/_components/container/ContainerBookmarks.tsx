'use client'
import React, {useEffect, useMemo, useState} from 'react';
import {Button} from "@components/ui/button";
import {HeroIcon} from "@components/ui/hero-icon";
import {ToolTip} from "@components/ui/tooltip";
import {Loading} from "@components/ui/loading";
import {AnimatePresence} from "framer-motion";
import {useModal} from "@lib/hooks/useModal";
import {ActionModal} from "../modal/action-modal";
import {MainHeader} from "../home/main-header";
import {StatsEmpty} from "../content/stats-empty";
import {useUser} from "../../../../context/user-context";
import {Modal} from "../modal/modal";
import useSWR from "swr";
import {getBookmarksByUserId} from "../../../../services/realtime/clientRequest/bookmarksClient";
import {fetcherWithToken} from "@lib/config/SwrFetcherConfig";
import {getPostById, getPostListByPostId} from "../../../../services/realtime/clientRequest/postClient";
import {ContentPost} from "../content/content";
import {toast} from "react-toastify";
import {deleteAllBokMarksByUserId} from "../../../../services/realtime/ServerAction/bookmarksService";
import {SEO} from "../common/seo";
import {useRecoilState} from "recoil";
import {mutateBookmarkByPostId} from "@lib/hooks/mutateBookmarkByPostId";
import {mutateBookmark} from "@lib/hooks/mutateBookmark";

const ContainerBookmarks = () => {
    const [, setMutateBookmarkPostId] = useRecoilState(mutateBookmarkByPostId);
    const [, setMutateBookmark] = useRecoilState(mutateBookmark);
    const { currentUser } = useUser();
    const { open, openModal, closeModal } = useModal();
    const userId = useMemo(() => currentUser?.id as string, [currentUser]);
    const { data: bookmarksRef, isLoading: bookmarksRefLoading,mutate: mutateBookmarkUserId } = useSWR(getBookmarksByUserId(userId),fetcherWithToken);
    const postId = useMemo(
        () => bookmarksRef?.data?.map((item: any) => item.postId) ?? [],
        [bookmarksRef]
    );
    const { data: postData, isLoading: postLoading,mutate: mutatePost } = useSWR(getPostListByPostId(postId),fetcherWithToken);
    useEffect(() => {
        setMutateBookmarkPostId(()=>mutatePost);
    }, [mutatePost,setMutateBookmarkPostId]);
    useEffect(() => {
        setMutateBookmark(()=>mutateBookmarkUserId);
    }, [mutateBookmarkUserId,setMutateBookmark]);

    const handleClear = async (): Promise<void> => {
        await deleteAllBokMarksByUserId(userId);
        closeModal();
        toast.success('Xóa tất cả bookmarks thành công');
    };
    return (
        <>
            <Modal
                modalClassName='max-w-xs bg-main-background w-full p-8 rounded-2xl'
                open={open}
                closeModal={closeModal}
            >
                <ActionModal
                    actionReport={()=>{}}
                    title='Xóa tất cả bài post đẫ lưu'
                    description='Có thể mất tất cả bài post đã lưu không thể hồi phục'
                    mainBtnClassName='bg-accent-red hover:bg-accent-red/90 active:bg-accent-red/75 accent-tab
                            focus-visible:bg-accent-red/90'
                    mainBtnLabel='Clear'
                    action={handleClear}
                    closeModal={closeModal}
                />
            </Modal>
            <MainHeader className='flex items-center justify-between'>
                <div className='-mb-1 flex flex-col'>
                    <h2 className='-mt-1 text-xl font-bold'>Filter</h2>

                </div>
                <Button
                    className='dark-bg-tab group relative p-2 hover:bg-light-primary/10
                     active:bg-light-primary/20 dark:hover:bg-dark-primary/10
                     dark:active:bg-dark-primary/20'
                    onClick={openModal}
                >
                    <HeroIcon className='h-5 w-5' iconName='ArchiveBoxXMarkIcon' />
                    <ToolTip
                        className='!-translate-x-20 translate-y-3 md:-translate-x-1/2'
                        tip='xóa đã lưu'
                    />
                </Button>
            </MainHeader>
            <section className='mt-0.5'>
                {bookmarksRefLoading || postLoading ? (
                    <Loading className='mt-5' />
                ) : !bookmarksRef || bookmarksRef?.data?.length === 0 ? (
                    <StatsEmpty
                        title='Lưu bài post '
                        description='Đừng để bài post của bạn mất'
                        imageData={{ src:'/no-bookmarks.png', alt: 'No bookmarks' }}
                    />
                ) : (
                    <AnimatePresence mode='popLayout'>
                        {postData?.data?.map((post:any) => (
                            <ContentPost {...post} key={post.id}/>
                        ))}
                    </AnimatePresence>
                )}
            </section>
        </>
    );
};

export default ContainerBookmarks;