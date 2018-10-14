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
    seleccionCategoria: "Seleccione un tipo de curso*"

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
    titulo: "Título",
    descripcion: "Descripción",
    nuevoAlumno: "Nuevo alumno",
    nuevoInstructor: "Nuevo instructor",
    nuevaSala: "Nueva sala",
    edicionAlumno: "Edición de alumno",
    nuevoContacto: "Nuevo Contacto",
    nuevoCurso: "Nuevo Curso",
    editarContacto: "Editar Contacto",
    nombreCurso: "Nombre del curso",
    temario: "Temario",
    curso: "Curso",
    tipoCurso: "Tipo de curso",
    agregarTipoCurso: "Nuevo tipo de curso",
    tituloInscipcion: "Nueva Inscripción",
    seleccionCurso: "Seleccione un Curso",
    seleccionAlumno: "Seleccione un Alumno",
    inscribir: "Inscribir",
    inscribiendo: "Inscribiendo a ",
    fechaInicio: "Fechan de inicio",
    fechaFin: "Fecha de fin",
    filtroTipoCurso: "Filtrar por tipo de curso",
    inscribirAlumno: "Inscribir alumno",
    nuevaCursada: "Nueva cursada",
    crear: "Crear",
    bajaAlumno: "Baja de Alumno",
    elegirAlumnoLista: "Elegir alumno de la lista",
    contacto: "Contacto",
    bajaCurso: "Eliminar curso",
    editarCurso: "Editar curso",
    seguroEliminarCurso: "¿Seguro quiere eliminar el curso " + cadena + "?",

    seleccion: {
        curso: "Seleccione un curso",
        cursada: "Seleccione una cursada",
        instructor: "Seleccione un instructor",
        sala: "Seleccione una sala",
        alumno: "Seleccione un alumno"
    }
}

export const HVR ={
    nuevo: "nuevo",
    editar: "Editar",
    eliminar: "Eliminar",
    temario: "Ver tamario",
    editarCurso: "Editar curso",
    eliminarCurso: "Eliminar curso",
    inscribirAlumno: "Inscribir Alumno",

    
}

export function setCadena(texto){
    cadena = texto;
}