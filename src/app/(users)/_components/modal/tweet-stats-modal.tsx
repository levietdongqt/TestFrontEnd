import { MainHeader } from '../home/main-header';
import type { ReactNode } from 'react';
import type { StatsType } from '../view/view-content-stats';

type TweetStatsModalProps = {
  children: ReactNode;
  statsType: StatsType | null;
  handleClose: () => void;
};

export function TweetStatsModal({
  children,
  statsType,
  handleClose
}: TweetStatsModalProps): JSX.Element {
  return (
    <>
      <MainHeader
        useActionButton
        disableSticky
        tip='Close'
        iconName='XMarkIcon'
        className='absolute flex w-full items-center gap-6 rounded-tl-2xl'
        title={`${statsType === 'likes' ? 'Liked' : 'Retweeted'} by`}
        action={handleClose}
      />
      {children}
    </>
  );
}
