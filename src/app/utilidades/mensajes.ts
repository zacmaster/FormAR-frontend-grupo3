import { EmailValidator } from "@angular/forms";
import { validateConfig } from "@angular/router/src/config";

export var cadena;

export const VALIDACION = {
    minimoTres: "Se requiere un mínimo de 3 caracteres para este campo",
    minimoSeis: "Se requiere un mínimo de 6 caracteres para este campo",
    minimoOcho: "Se requiere un mínimo de 8 caracteres para este campo",

    emailRequerido: "El campo email es obligatorio",
    emailValido: "El email ingresado no es válido",

    nombreRequerido: "El campo nombre es obligatorio",
    nombreValido: "El nombre ingresado no es válido",

    apellidoRequerido: "El campo apellido es obligatorio",
    apellidoValido: "El apellido ingresado no es válido",

    telefonoValido: "El teléfono ingresado no es válido",
    telefonoRequerido: "El campo teléfono es obligatorio",

    asuntoRequerido: "El campo asunto es obligatorio",
    descripcionRequerido: "El campo descripción es obligatorio",

    dniValido: "El DNI ingresado no es válido",
    dniRequerido: "El campo DNI es obligatorio",

    valido: {
        nombre: "El nombre ingresado no es válido",
        apellido: "El apellido ingresado no es válido",
        dni: "El DNI ingresado no es válido",
        telefono: "El teléfono ingresado no es válido",
        email: "El email ingresado no es válido",
        asunto: "El asunto ingresado no es válido"
    },

    requerido: {
        nombre: "El campo nombre es obligatorio",
        apellido: "El campo apellido es obligatorio",
        dni: "El campo DNI es obligatorio",
        telefono: "El campo teléfono es obligatorio",
        email: "El campo email es obligatorio",
        asunto: "El campo asunto es obligatorio",
        fecha: "El campo fecha es obligatorio"
    }
}

export const LABEL_REQUIRED ={
    nombre: "Nombre*",
    apellido: "Apellido*",
    dni: "DNI*",
    fechaNacimiento: "Fecha de nacimiento*",
    email: "Email*",
    telefono:  "Teléfono*",
    nombreCurso: "Nombre del curso*",
    temario: "Temario*",
    descripcion: "Descripción*",
    seleccionArea: "Seleccione un área*",
    fecha: "Fecha*",
    asunto: "Asunto*",
    capacidad:"Capacidad*"

}

export var LABEL ={
    guardar: "Guardar",
    cancelar: "Cancelar",
    aceptar: "Aceptar",
    nombre: "Nombre",
    apellido: "Apellido",
    dni: "DNI",
    fechaNacimiento: "Fecha de nacimiento",
    email: "Email",
    telefono:  "Teléfono",
    filtrar: "Filtrar",
    alumno: "Alumno",
    agregar: "Agregar",
    acciones: "Acciones",
    fecha: "Fecha",
    asunto: "Asunto",
    descripcion: "Descripción",
    estudios: "Estudios",
    dispHoraria: "Disponibilidad Horaria",
    ingreseEstudios: "Ingrese estudios",
    ingreseDescripcion: "Ingrese descripción",
    nuevoAlumno: "Nuevo alumno",
    nuevoInstructor: "Nuevo instructor",
    edicionInstructor: "Edicion de instructor",
    nuevaSala: "Nueva sala",
    edicionAlumno: "Edición de alumno",
    edicionSala: "Edicion de sala",
    nuevoContacto: "Nuevo Contacto",
    nuevoCurso: "Nuevo Curso",
    editarContacto: "Editar Contacto",
    nombreCurso: "Nombre del curso",
    temario: "Temario",
    curso: "Curso",
    area: "Área",
    areaPreferencia:"Areas de preferencia",
    agregarArea: "Nueva área",
    tituloInscipcion: "Nueva Inscripción",
    seleccionCurso: "Seleccione un Curso",
    seleccionAlumno: "Seleccione un Alumno",
    inscribir: "Inscribir",
    inscribiendo: "Inscribiendo a ",
    fechaInicio: "Fecha de inicio",
    fechaFin: "Fecha de fin",
    filtroArea: "Filtrar por área de curso",
    inscribirAlumno: "Inscribir alumno",
    nuevaCursada: "Nueva cursada",
    crear: "Crear",
    bajaAlumno: "Baja de Alumno",
    elegirAlumnoLista: "Elegir alumno de la lista",
    contacto: "Contacto",
    bajaCurso: "Eliminar curso",
    editarCurso: "Editar curso",
    bajaInstructor:"Eliminar instructor",
    bajaSala:"Eliminar Sala",
    seguroEliminarCurso: "¿Seguro quiere eliminar el curso " + cadena + "?",
    ingrese: {
        nombre: "Ingrese el nombre",
        apellido: "Ingrese el apellido",
        dni: "Ingrese el DNI",
        email: "Ingrese el email",
        telefono: "Ingrese el telefono",
        asunto: "Ingrese el titulo",
        descripcion: "Ingrese la descripción",
        temario: "Ingrese el temario",
        cantClases: "Ingrese la cantidad de clases",
        precioClase: "Ingrese el precio por clase",
        cupoMaximo: "Ingrese el cupo máximo de personas",
        cupoMinimo: "Ingrese el cupo mínimo de personas"
    },
    titulo: {
        cantClases: "Cantidad de clases",
        precioClase: "Precio por clase",
        matricula: "Importe de matrícula: $",
        cupoMinimo: "Cantidad Mínima de Inscriptos",
        cupoMaximo: "Cantidad Máxima de Inscriptos"
    },
    boton: {
        inscribir:  "Inscribir",
        editar:     "Editar",
        eliminar:   "Eliminar",
        verCursadas: "Ver cursadas del alumno"
    },
    seleccione: {
        area: "Seleccione un area",
        curso: "Seleccione un curso",
        cursada: "Seleccione una cursada",
        instructor: "Seleccione un instructor",
        sala: "Seleccione una sala",
        alumno: "Seleccione un alumno",
        dias: "Seleccione los días de cursada",
        hora: "Seleccione la hora de cursada",
        turno: "Seleccione un turno"
    },
    editar: {
        contacto: "Editar contacto"
    },
    eliminar: {
        confirmar: {
            contacto: "¿Seguro desea eliminar el contacto "
        },
        contacto: "Eliminar contacto"
    },
    info: {
        contacto: "Descripción del contacto"
    },
}

export const HVR ={
    nuevo: "nuevo",
    editar: "Editar",
    eliminar: "Eliminar",
    temario: "Ver tamario",
    estudio:"Ver estudios",
    horario:"Ver horarios",
    areasPref:"Ver areas",
    editarCurso: "Editar curso",
    eliminarCurso: "Eliminar curso",
    inscribirAlumno: "Inscribir Alumno",


}

export function setCadena(texto){
    cadena = texto;
}
