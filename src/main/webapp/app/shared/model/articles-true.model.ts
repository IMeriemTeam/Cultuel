import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IArticlesTrue {
    id?: number;
    titre?: string;
    date?: Moment;
    message?: any;
    user?: IUser;
}

export class ArticlesTrue implements IArticlesTrue {
    constructor(public id?: number, public titre?: string, public date?: Moment, public message?: any, public user?: IUser) {}
}
