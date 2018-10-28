import { ILocationMySuffix } from 'app/shared/model//location-my-suffix.model';

export interface IDepartmentMySuffix {
    id?: number;
    departmentName?: string;
    location?: ILocationMySuffix;
}

export class DepartmentMySuffix implements IDepartmentMySuffix {
    constructor(public id?: number, public departmentName?: string, public location?: ILocationMySuffix) {}
}
