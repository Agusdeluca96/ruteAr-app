import { Rol } from ".";

export class User {
    constructor(
        public id?: any,
        public usuario?: string,
        public contrasena?: string,
        public apellido?: string,
        public nombre?: string,
        public domicilio?: string,
        public fechaNacimiento?: any,
        public sexo?: string,
        public email?: string,
        public rol?: Rol,
        public habilitado?: any,
    ) { }
}
