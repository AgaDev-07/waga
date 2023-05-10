type validateFn = (origin: string, callback?: (err: Error | null, allow?: boolean) => void) => boolean;
type Options = {
    origin?: validateFn;
    methods?: string;
};
declare const _default: (options?: Options) => (req: any, res: any, next: any) => void;
export = _default;
