import Header from '@/components/Header/Header';
import ReduxProvider from '@/reducers/provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Header />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
