export interface ITaskMySuffix {
    id?: number;
    title?: string;
    description?: string;
}

export class TaskMySuffix implements ITaskMySuffix {
    constructor(public id?: number, public title?: string, public description?: string) {}
}
