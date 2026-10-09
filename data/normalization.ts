export interface NormalizationStep {
  label: string; // Ej: 'Relación base', '1FN', '2FN', '3FN'
  image: string; // Ej: '/normalizacion/pedidos-1fn.png'
  explanation: string;
}

export interface NormalizationExercise {
  id: string;
  title: string;
  description?: string;
  date?: string;
  steps: NormalizationStep[];
}

export const normalizationExercises: NormalizationExercise[] = [
  {
    id: 'proyectos-empleados',
    title: 'Normalización - Proyectos y Empleados',
    description:
      'Normalización de una relación que registra qué empleados trabajan en cada proyecto y cuántas horas les dedican, desde la relación base hasta la tercera forma normal.',
    date: '2026',
    steps: [
      {
        label: 'Relación base',
        image: '/normalizacion/ejercicio1/base.png',
        explanation:
          'Relación inicial con todos los datos en una sola tabla: proyectos, empleados y las horas que cada empleado dedica a cada proyecto.\nClave primaria: (cod_proyecto, cod_empleado).\nDependencias funcionales:\n• cod_proyecto → nom_proyecto\n• cod_empleado → nom_empleado, profesion, vlr_hora\n• profesion → vlr_hora\n• (cod_proyecto, cod_empleado) → hrs_asignadas',
      },
      {
        label: '1FN',
        image: '/normalizacion/ejercicio1/1fn.png',
        explanation:
          'La relación cumple 1FN: todos los atributos son atómicos (un solo valor por celda), no hay grupos repetitivos y cada fila se identifica con la clave compuesta (cod_proyecto, cod_empleado).\nLos colores marcan la redundancia que todavía existe: el nombre de cada proyecto se repite en todas sus filas (amarillo, morado y verde) y los datos de cada empleado se repiten en cada proyecto en el que participa (naranja, verde claro y azul). Esa repetición nace de dependencias parciales de la clave, que se resuelven en 2FN.',
      },
      {
        label: '2FN',
        image: '/normalizacion/ejercicio1/2fn.png',
        explanation:
          'Una relación está en 2FN si está en 1FN y ningún atributo depende solo de una parte de la clave. Aquí nom_proyecto depende únicamente de cod_proyecto, y nom_empleado, profesion y vlr_hora dependen únicamente de cod_empleado.\nSolución: separar en tres tablas. PROYECTO (cod_proyecto, nom_proyecto), EMPLEADO (cod_empleado, nom_empleado, profesion, vlr_hora) y PROYECTO-EMPLEADO (cod_proyecto, cod_empleado, hrs_asignadas), que conserva la clave compuesta porque hrs_asignadas sí depende de ambos atributos.\nAsí se evitan las anomalías de actualización: en la relación base el empleado 2030 aparece escrito como Yamyle, Yamile y Llamile; ahora su nombre se guarda una sola vez.',
      },
      {
        label: '3FN',
        image: '/normalizacion/ejercicio1/3fn.png',
        explanation:
          'Una relación está en 3FN si está en 2FN y ningún atributo no clave depende de otro atributo no clave (no hay dependencias transitivas). En EMPLEADO, vlr_hora depende de profesion y profesion depende de cod_empleado, es decir: cod_empleado → profesion → vlr_hora.\nSolución: crear la tabla PROFESION (profesion, vlr_hora) y dejar profesion en EMPLEADO como llave foránea. Así el valor por hora de cada profesión se guarda una sola vez, y si cambia se actualiza en un único lugar en vez de en cada empleado con esa profesión.\nResultado final: PROYECTO, EMPLEADO, PROYECTO-EMPLEADO y PROFESION, todas en 3FN.',
      },
    ],
  },

    {
    id: 'miembros-cenas',
    title: 'Normalización - Miembros y Cenas',
    description:
      'Normalización de una relación que registra las cenas a las que asisten los miembros, el lugar donde se realizan y los platos servidos, desde la relación base con grupos repetitivos hasta la tercera forma normal.',
    date: '2026',
    steps: [
      {
        label: 'Relación base',
        image: '/normalizacion/ejercicio3/base.png',
        explanation:
          'Relación inicial sin normalizar: cada cena sirve varios platos, así que los datos del miembro, la cena y el lugar solo aparecen en la primera fila y las siguientes quedan vacías. Ese grupo repetitivo (FoodCode y Food Description) es lo que impide estar en 1FN.\nClave: (MemberNum, DinnerNum).\nDependencias funcionales:\n• MemberNum → MemberName, MemberAddress\n• DinnerNum → DinnerDate, VenueCode, VenueDescription\n• VenueCode → VenueDescription\n• FoodCode → Food Description',
      },
      {
        label: '1FN',
        image: '/normalizacion/ejercicio3/1fn.png',
        explanation:
          'Para pasar a 1FN se elimina el grupo repetitivo: se completan los datos del miembro, la cena y el lugar en cada fila, de modo que cada celda tenga un solo valor y cada plato quede en su propia fila. Como ahora un mismo miembro y una misma cena aparecen con varios platos, la clave pasa a ser (MemberNum, DinnerNum, FoodCode).\nCada color agrupa las filas de una misma participación (miembro + cena), por ejemplo el miembro 235 en la cena D0003. Se ve la redundancia que queda: nombre, dirección, fecha y lugar se repiten en cada plato. Esa repetición viene de dependencias parciales de la clave, que se resuelven en 2FN.',
      },
      {
        label: '2FN',
        image: '/normalizacion/ejercicio3/2fn.png',
        explanation:
          'Una relación está en 2FN si está en 1FN y ningún atributo depende solo de una parte de la clave. Aquí MemberName y MemberAddress dependen solo de MemberNum; DinnerDate, VenueCode y VenueDescription dependen solo de DinnerNum; y Food Description depende solo de FoodCode.\nSolución: separar en cuatro tablas. MEMBER (MemberNum, MemberName, MemberAddress), DINNER (DinnerNum, DinnerDate, VenueCode, VenueDescription), FOOD (FoodCode, Food Description) y MEMBER-DINNER-FOOD (MemberNum, DinnerNum, FoodCode), que conserva la clave completa y registra quién asistió a cada cena y qué platos se sirvieron.\nEn DINNER todavía queda VenueDescription dependiendo de VenueCode, que se resuelve en 3FN.',
      },
      {
        label: '3FN',
        image: '/normalizacion/ejercicio3/3fn.png',
        explanation:
          'Una relación está en 3FN si está en 2FN y no tiene dependencias transitivas. En DINNER, VenueDescription depende de VenueCode y VenueCode depende de DinnerNum, es decir: DinnerNum → VenueCode → VenueDescription.\nSolución: crear la tabla VENUE (VenueCode, VenueDescription) y dejar VenueCode en DINNER como llave foránea. Así la descripción de cada lugar se guarda una sola vez y, si cambia, se actualiza en un único sitio.\nResultado final: MEMBER, DINNER, VENUE, FOOD y MEMBER-DINNER-FOOD, todas en 3FN.',
      },
    ],
  },
];