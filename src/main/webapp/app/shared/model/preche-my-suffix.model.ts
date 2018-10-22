import { Moment } from 'moment';

export interface IPrecheMySuffix {
    id?: number;
    title?: string;
    imam?: string;
    date?: Moment;
}

export class PrecheMySuffix implements IPrecheMySuffix {
    constructor(public id?: number, public title?: string, public imam?: string, public date?: Moment) {}
}
