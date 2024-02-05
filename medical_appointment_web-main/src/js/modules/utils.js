//Clases
export class Patient {
    constructor(dni, apellido, nombre, email, telefono) {
        this.dni = dni;
        this.apellido = apellido;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
    }
}
export class Choice {
    constructor(area, dia, hora, obra) {
        this.area = area;
        this.dia = dia;
        this.hora = hora;
        this.obra = obra;
    }
}
//Objetos >FORM 2<
export const APPOINTMENT_SCHEDULE = [
    {
        area: "ODONTOLOGIA",
        dia: "Lunes",
        hora: "9:00am",
        hora2: "9:30am",
        hora3: "10:00am",
        hora4: "10:30am",
        hora5: "11:00am",
        hora6: "11:30am",
        hora7: "12:00am",
        hora8: "12:30am",
        
    },
    {
        area: "ODONTOLOGIA",
        dia: "Martes",
        hora: "9:00am",
        hora2: "9:30am",
        hora3: "10:00am",
        hora4: "10:30am",
        hora5: "11:00am",
        hora6: "11:30am",
        hora7: "12:00am",
        hora8: "12:30am",
    },
    {
        area: "ODONTOLOGIA",
        dia: "Miercoles",
        hora: "9:00am",
        hora2: "9:30am",
        hora3: "10:00am",
        hora4: "10:30am",
        hora5: "11:00am",
        hora6: "11:30am",
        hora7: "12:00am",
        hora8: "12:30am",
    },
    {
        area: "ODONTOLOGIA",
        dia: "Jueves",
        hora: "9:00am",
        hora2: "9:30am",
        hora3: "10:00am",
        hora4: "10:30am",
        hora5: "11:00am",
        hora6: "11:30am",
        hora7: "12:00am",
        hora8: "12:30am",
    },
    {
        area: "ODONTOLOGIA",
        dia: "Viernes",
        hora: "9:00am",
        hora2: "9:30am",
        hora3: "10:00am",
        hora4: "10:30am",
        hora5: "11:00am",
        hora6: "11:30am",
        hora7: "12:00am",
        hora8: "12:30am",
    },
];

export const HEALTH_INSURANCES = [
    { nombre: "PARTICULAR" },
    { nombre: "OSDE" },
    { nombre: "OSEP" },
    { nombre: "SWEETMEDICAL" },
    { nombre: "SANCOR" },
    { nombre: "GALENO" },
];
