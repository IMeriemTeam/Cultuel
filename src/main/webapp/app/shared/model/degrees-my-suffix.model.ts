export interface IDegreesMySuffix {
    id?: number;
    degree?: string;
}

export class DegreesMySuffix implements IDegreesMySuffix {
    constructor(public id?: number, public degree?: string) {}
}
