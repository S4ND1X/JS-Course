//* Solo se creara una instancia de alumnos, por eso sirve singleton para solo crear un objeto y no hacer mucho
const alumnos = {
  listaAlumnos: [],

  get: function (id) {
    return this.listaAlumnos[id];
  },

  crear: function (datos) {
    this.listaAlumnos.push(datos);
    return datos;
  },

  listado: function () {
    return this.listaAlumnos;
  },
};

//* Crear informacion de algun tipo de objeto
const infoAlumno = {
  nombre: "Juan",
  edad: 21,
};

const infoAlumno2 = {
  nombre: "Jorge",
  edad: 20,
};

//* Se crea una sola instancia de alumnos que contiene a todos los alumnos
alumnos.crear(infoAlumno);
alumnos.crear(infoAlumno2);

const listado = alumnos.listado();
const alumno = alumnos.get(0);

console.log(listado);
console.log(alumno);
