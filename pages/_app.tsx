import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ul>
        <li>
          <Link href="/">default</Link>
        </li>
        <li>
          <Link href="/static">static</Link>
        </li>
        <li>
          <Link href="/server">server</Link>
        </li>
        <li>
          <Link href="/client">client</Link>
        </li>
      </ul>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
