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
    name: "Nombre*",
    lastname: "Apellido*",
    dni: "DNI*",
    fechaNacimiento: "Fecha de nacimiento*",
    email: "Email*",
    phone:  "Teléfono*",
    nombreCurso: "Nombre del curso*",
    temario: "Temario*",
    seleccionCategoria: "Seleccione un tipo de curso*"

}

export var LABEL ={
    cancelar: "Cancelar",
    aceptar: "Aceptar",
    name: "Nombre",
    lastname: "Apellido",
    dni: "DNI",
    fechaNacimiento: "Fecha de nacimiento",
    email: "Email",
    phone:  "Teléfono",
    filtrar: "Filtrar",
    alumno: "Alumno",
    agregar: "Agregar",
    acciones: "Acciones",
    fecha: "Fecha",
    titulo: "Título",
    descripcion: "Descripción",
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
    nuevoAlumno: "Nuevo Alumno",
    elegirAlumnoLista: "Elegir alumno de la lista",
    contacto: "Contacto",
    bajaCurso: "Eliminar curso",
    editarCurso: "Editar curso",
    seguroEliminarCurso: "¿Seguro quiere eliminar el curso " + cadena + "?"


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