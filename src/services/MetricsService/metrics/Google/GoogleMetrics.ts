import ReactGA from 'react-ga';

import MetricsService, { MetricInstance } from '../../index';

export class GoogleMetrics extends MetricInstance {
    code: string;

    constructor(code: string) {
        super();

        this.code = code;
        this.initialize();
    }

    initialize = () => {
        ReactGA.initialize(this.code, {
            debug: false,
        });
    };

    changedPage = (url: string) => {
        ReactGA.pageview(url);
    };

    setUserID = (userId: string) => {
        ReactGA.set({ userId });
    };
}

export function setGoogleMetricUserID(userID: string) {
    MetricsService.get(GoogleMetrics)?.setUserID(userID);
}
