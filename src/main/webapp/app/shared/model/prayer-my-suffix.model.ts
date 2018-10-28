import { ILocationMySuffix } from 'app/shared/model//location-my-suffix.model';
import { IMethodsMySuffix } from 'app/shared/model//methods-my-suffix.model';
import { IDegreesMySuffix } from 'app/shared/model//degrees-my-suffix.model';

export interface IPrayerMySuffix {
    id?: number;
    sobh?: string;
    chorouq?: string;
    dohr?: string;
    asr?: string;
    maghreb?: string;
    icha?: string;
    location?: ILocationMySuffix;
    method?: IMethodsMySuffix;
    degree?: IDegreesMySuffix;
}

export class PrayerMySuffix implements IPrayerMySuffix {
    constructor(
        public id?: number,
        public sobh?: string,
        public chorouq?: string,
        public dohr?: string,
        public asr?: string,
        public maghreb?: string,
        public icha?: string,
        public location?: ILocationMySuffix,
        public method?: IMethodsMySuffix,
        public degree?: IDegreesMySuffix
    ) {}
}
