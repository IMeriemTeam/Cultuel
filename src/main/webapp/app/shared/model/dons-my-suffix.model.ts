export interface IDonsMySuffix {
    id?: number;
    uuid?: string;
    don?: number;
}

export class DonsMySuffix implements IDonsMySuffix {
    constructor(public id?: number, public uuid?: string, public don?: number) {}
}
