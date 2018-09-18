import { User } from "./user";

export class Ruta {
    constructor(
        public id: any,
        public nombre: string,
        public descripcion: string,
        public privacidad: string,
        public recorrido: string,
        public formato: string,
        public distancia: any,
        public dificultad: string,
        public tiempo: any,
        public fecha: any,
        public fotos: any,
        public calificaciones: any,
        public notas: any,
        public actividad: any,
        public creador?: User
    ) { }
}
