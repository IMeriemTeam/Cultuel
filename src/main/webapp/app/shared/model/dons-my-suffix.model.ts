import { Moment } from 'moment';

export interface IDonsMySuffix {
    id?: number;
    don?: number;
    dateDons?: Moment;
    donsUserId?: number;
}

export class DonsMySuffix implements IDonsMySuffix {
    constructor(public id?: number, public don?: number, public dateDons?: Moment, public donsUserId?: number) {}
}
