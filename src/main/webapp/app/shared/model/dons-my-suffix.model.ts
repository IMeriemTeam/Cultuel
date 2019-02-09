import { Moment } from 'moment';

export interface IDonsMySuffix {
    id?: number;
    don?: number;
    dateDons?: Moment;
    labelDon?: string;
    donsUserId?: number;
}

export class DonsMySuffix implements IDonsMySuffix {
    constructor(public id?: number, public don?: number, public dateDons?: Moment, public labelDon?: string, public donsUserId?: number) {}
}
