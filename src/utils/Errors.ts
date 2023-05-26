const makeErrorType = (name: string) => {
    return class extends Error {
        constructor(message: string) {
            super(message);
            this.name = name;
        }
    };
}

export const InvalidMethod = makeErrorType('InvalidMethod');
export const InvalidElement = makeErrorType('InvalidElement');