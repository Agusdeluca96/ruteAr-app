import { User } from "./";

export class Note {
    constructor(
        public id?: any,
        public categoria?: string,
        public descripcion?: string,
        public autor?: User
    ) { }
}
