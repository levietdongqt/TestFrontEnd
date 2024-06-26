'use client'
import cn from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { StatsEmpty } from '../content/stats-empty';
import { Loading } from '@components/ui/loading';
import { variants } from '../user/user-header';
import { UserCard } from './user-card';
import type { StatsType } from '../view/view-content-stats';
import type { StatsEmptyProps } from '../content/stats-empty';
import {User} from "@models/user";

type FollowType = 'following' | 'followers';

type CombinedTypes = StatsType | FollowType;

type UserCardsProps ={
  data: User[] | null;
  type: CombinedTypes;
  follow?: boolean;
  loading: boolean;
};

type NoStatsData = Record<CombinedTypes, StatsEmptyProps>;

const allNoStatsData: Readonly<NoStatsData> = {
  retweets: {
    title: 'Amplify Tweets you like',
    imageData: { src: '/assets/no-retweets.png', alt: 'No retweets' },
    description:
      'Share someone else’s Content on your timeline by Retweeting it. When you do, it’ll show up here.'
  },
  likes: {
    title: 'No Content Likes yet',
    imageData: { src: '/assets/no-likes.png', alt: 'No likes' },
    description: 'When you like a Content, it’ll show up here.'
  },
  following: {
    title: 'Be in the know',
    description:
      'Following accounts is an easy way to curate your timeline and know what’s happening with the topics and people you’re interested in.'
  },
  followers: {
    title: 'Looking for followers?',
    imageData: { src: '/assets/no-followers.png', alt: 'No followers' },
    description:
      'When someone follows this account, they’ll show up here. Tweeting and interacting with others helps boost followers.'
  }
};

export function UserCards({
  data,
  type,
  follow,
  loading
}: UserCardsProps): JSX.Element {
  const noStatsData = allNoStatsData[type];
  const modal = ['retweets', 'likes'].includes(type);

  return (
    <section
      className={cn(
        modal && 'h-full overflow-y-auto [&>div:first-child>a]:mt-[52px]',
        loading && 'flex items-center justify-center'
      )}
    >
      {loading ? (
        <Loading className={modal ? 'mt-[52px]' : 'mt-5'} />
      ) : (
        <AnimatePresence mode='popLayout'>
          {data?.length ? (
            data.map((userData,index) => (
              <motion.div layout='position' key={index} {...variants}>
                <UserCard {...userData} follow={follow} modal={modal} />
              </motion.div>
            ))
          ) : (
            <StatsEmpty {...noStatsData} modal={modal} />
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
