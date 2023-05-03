/* eslint-disable @typescript-eslint/no-explicit-any */

export type Constructor<T> = new (...args: any[]) => T;

class MetricsService {
    modules: any[] = [];

    private isInit = false;

    private initedCbs: Function[] = [];

    init = (modules: any[]) => {
        this.modules = modules;
        this.isInit = true;
        this.OnInitedHandler();
    };

    OnInited = (cb: Function) => {
        if (this.isInit) cb();
        else this.initedCbs.push(cb);
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
