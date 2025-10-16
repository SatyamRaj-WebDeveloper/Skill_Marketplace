
import { Roboto } from 'next/font/google';
import './globals.css'
import { Providers } from './providers';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Skill Marketplace',
  description: 'Find the best professionals near you.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
         <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}