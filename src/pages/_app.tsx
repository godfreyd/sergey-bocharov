import { useEffect } from 'react';
import '../styles/globals.scss';
import { GoogleMetrics } from '../services/MetricsService/metrics/Google/GoogleMetrics';
import MetricsService from '../services/MetricsService';
import type { AppProps } from 'next/app';
import {useRouter} from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    useEffect(() => {
        const services = [];
        services.push(new GoogleMetrics(process.env.GOOGLE_ANALYTICS_ID || ''));

        MetricsService.init(services);
    }, []);

    useEffect(() => {
        const handleRouteChange = (url: string) => {
          const cleanedUrl = url.split(/[\?\#]/)[0];
          // @ts-ignore
          gtag('event', 'pageview', {
            event_label: cleanedUrl,
          });
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
          router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return <Component {...pageProps} />;
}

export default MyApp;
