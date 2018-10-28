import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IDonsMySuffix {
    id?: number;
    uuid?: string;
    don?: number;
    dateDons?: Moment;
    dons?: IUser;
}

export class DonsMySuffix implements IDonsMySuffix {
    constructor(public id?: number, public uuid?: string, public don?: number, public dateDons?: Moment, public dons?: IUser) {}
}
