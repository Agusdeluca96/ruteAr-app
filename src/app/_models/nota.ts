import { User } from ".";

export class Nota {
    constructor(
        public id?: any,
        public categoria?: string,
        public descripcion?: string,
        public autor?: User
    ) { }
}
