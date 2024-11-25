'use client';

import { ReactNode } from 'react';

// next
import { SessionProvider } from 'next-auth/react';

// project import
import ThemeCustomization from 'themes';

import Locales from 'components/Locales';
import ScrollTop from 'components/ScrollTop';
import RTLLayout from 'components/RTLLayout';
import Notistack from 'components/third-party/Notistack';

import { ConfigProvider } from 'contexts/ConfigContext';
import { SnackbarProvider } from 'components/@extended/SnackbarContext';
// import SessionCheck from 'components/third-party/SessionCheck';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function ProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider>
      <ThemeCustomization>
        <RTLLayout>
          <Locales>
            <ScrollTop>
              <SessionProvider refetchInterval={0}>
                {/* <SessionCheck /> */}
                <Notistack>
                  <SnackbarProvider>{children}</SnackbarProvider>
                </Notistack>
              </SessionProvider>
            </ScrollTop>
          </Locales>
        </RTLLayout>
      </ThemeCustomization>
    </ConfigProvider>
  );
}
