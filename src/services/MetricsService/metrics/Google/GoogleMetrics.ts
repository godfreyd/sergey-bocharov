import ReactGA from 'react-ga4';

import MetricsService from '../../index';

export class GoogleMetrics {
    code: string;

    constructor(code: string) {
        this.code = code;
        this.initialize();
    }

    initialize = () => {
        ReactGA.initialize(this.code);
    };

    setUserID = (userId: string) => {
        ReactGA.set({ userId });
    };
}

export function setGoogleMetricUserID(userID: string) {
    MetricsService.get(GoogleMetrics)?.setUserID(userID);
}
