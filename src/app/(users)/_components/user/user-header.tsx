'use client'
import { useParams,usePathname } from 'next/navigation';
import { doc } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';

import { useUser } from '../../../../context/user-context';
import { isPlural } from '@lib/utils';
import { UserName }  from './user-name';
import type { Variants } from 'framer-motion';

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export function UserHeader(): JSX.Element {

  const pathname = usePathname();
  const {id} = useParams();
  const { currentUser } = useUser();
  const loading = false;

  const userId = currentUser ? currentUser.id : null;
  const statsLoading = false;
  /*const { data: statsData, loading: statsLoading } = useDocument(
    doc(userStatsCollection(userId ?? 'null'), 'stats'),
    {
      allowNull: true,
      disabled: !userId
    }
  );*/

  /*const { tweets, likes } = statsData ?? {};*/

  /*const [totalTweets, totalPhotos, totalLikes] = [
    (user?.totalTweets ?? 0) + (tweets?.length ?? 0),
    user?.totalPhotos,
    likes?.length
  ];*/

  const currentPage = pathname.split('/').pop() ?? '';

  const isInTweetPage = ['[id]', 'with_replies'].includes(currentPage);
  const isInFollowPage = ['following', 'followers'].includes(currentPage);

  return (
    <AnimatePresence mode='popLayout'>
      {loading || statsLoading ? (
        <motion.div
          className='-mb-1 inner:animate-pulse inner:rounded-lg 
                     inner:bg-light-secondary dark:inner:bg-dark-secondary'
          {...variants}
          key='loading'
        >
          <div className='mb-1 -mt-1 h-5 w-24' />
          <div className='h-4 w-12' />
        </motion.div>
      ) : !currentUser ? (
        <motion.h2 className='text-xl font-bold' {...variants} key='not-found'>
          {isInFollowPage ? `@${id as string}` : 'User'}
        </motion.h2>
      ) : (
        <motion.div className='-mb-1' {...variants} key='found'>
          <UserName
            tag='h2'
            name={currentUser.fullName}
            className='-mt-1 text-xl'
            iconClassName='w-6 h-6'
            verified={currentUser.verified}
          />
          <p className='text-xs text-light-secondary dark:text-dark-secondary'>
           {/* {isInFollowPage
              ? `@${user.username}`
              : isInTweetPage
              ? totalTweets
                ? `${totalTweets} ${`Content${isPlural(totalTweets)}`}`
                : 'No Content'
              : currentPage === 'media'
              ? totalPhotos
                ? `${totalPhotos} Photo${isPlural(totalPhotos)} & GIF${isPlural(
                    totalPhotos
                  )}`
                : 'No Photo & GIF'
              : totalLikes
              ? `${totalLikes} Like${isPlural(totalLikes)}`
              : 'No Like'}*/}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
