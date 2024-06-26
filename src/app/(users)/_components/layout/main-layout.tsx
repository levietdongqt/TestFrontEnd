'use client';
import { SWRConfig } from 'swr';
import { fetchJSON } from '@lib/config/SwrFetcherConfig';
import { WindowContextProvider } from '../../../../context/window-context';
import { Sidebar } from '../sidebar/sidebar';
import type { LayoutProps } from './common-layout';
import { RecoilRoot } from 'recoil';
export function MainLayout({ children }: LayoutProps) {
  return (
    <div className='flex w-full justify-center gap-0 lg:gap-4'>
        <RecoilRoot>
          <WindowContextProvider>
            <Sidebar />
            <SWRConfig value={{ fetcher: fetchJSON,revalidateOnFocus: false,refreshInterval:0}}>
                {children}
            </SWRConfig>
          </WindowContextProvider>
        </RecoilRoot>
    </div>
  );
}
