export interface IMethodsMySuffix {
    id?: number;
    method?: string;
}

export class MethodsMySuffix implements IMethodsMySuffix {
    constructor(public id?: number, public method?: string) {}
}
