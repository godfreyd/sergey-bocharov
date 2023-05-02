import { useEffect } from 'react';
import '../styles/globals.scss';
import { GoogleMetrics } from 'src/services/MetricsService/metrics/Google/GoogleMetrics';
import MetricsService from 'src/services/MetricsService';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        const services = [];
        services.push(new GoogleMetrics(process.env.GOOGLE_ANALYTICS_ID || ''));

        MetricsService.init(services);
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;
