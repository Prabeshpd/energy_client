'use client';

import Header from '@/components/Header/Header';
import { FirebaseProvider } from '@/context/firebase';
import ReduxProvider from '@/reducers/provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <FirebaseProvider>
            <Header />
            {children}
          </FirebaseProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
