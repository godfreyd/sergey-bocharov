/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class MetricInstance {
    abstract changedPage(url: string, options: any): void;
}

export type Constructor<T> = new (...args: any[]) => T;

class MetricsService {
    modules: MetricInstance[] = [];

    private isInit = false;

    private initedCbs: Function[] = [];

    init = (modules: MetricInstance[]) => {
        this.modules = modules;
        this.isInit = true;
        this.OnInitedHandler();
    };

    OnInited = (cb: Function) => {
        if (this.isInit) cb();
        else this.initedCbs.push(cb);
    };

    changedPage = (url: string, options?: any) => {
        this.modules.forEach(metric => metric.changedPage(url, options));
    };

    get<TInput = any, TResult = TInput>(
        typeOfMetrics: Constructor<TInput>,
    ): TResult | null {
        const module = this.modules.find(
            metric => metric instanceof typeOfMetrics,
        );

        if (!module) return null;

        // TODO: add typing
        return module as any;
    }

    private OnInitedHandler = () => {
        this.initedCbs.forEach(cb => {
            cb();
        });
    };
}

export default new MetricsService();
