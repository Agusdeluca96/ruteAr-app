import { User } from ".";

export class Ruta {
    constructor(
        public id?: any,
        public nombre?: string,
        public descripcion?: string,
        public privacidad?: string,
        public recorrido?: any,
        public formato?: string,
        public distancia?: any,
        public dificultad?: string,
        public tiempo?: any,
        public fecha?: any,
        public calificacionPromedio?: any,
        public cantUsuariosRecorrieron?: any,
        public fotos?: Array<File>,
        public calificaciones?: any,
        public notas?: any,
        public actividad?: any,
        public creador?: User,
        public isRecorrida?: any
    ) { }
}
