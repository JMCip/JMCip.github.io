
export interface ModelItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  image: string;
}

export const models: ModelItem[] = [
  // Ejemplo (bórralo o edítalo cuando subas el tuyo):
    {
     id: 'Hospital-v1',
     title: 'Modelo ER - Sistema de Gestión de Hospital',
     description: 'Primera versión del modelo, incluye entidades de pacientes y medico',
     date: '2026',
     image: '/models/Modelo ER-Hospital.png',
   },

   {
    id: 'Aerolinea-v1',
    title: 'Modelo ER - Sistema de Gestión de Aerolínea',
    description: 'Primera versión del modelo, incluye entidades de vuelos, tripulación, avion y vuelo',
    date: '2026',
    image: '/models/Modelo ER-Aerolínea.png',
   },

   {
    id: 'Biblioteca-v1',
    title: 'Modelo ER - Sistema de Gestión de Biblioteca',
    description: 'Primera versión del modelo, incluye entidades de socio y libro',
    date: '2026',
    image: '/models/Modelo ER-Biblioteca.png',
   },

   {
    id: 'Streaming-v1',
    title: 'Modelo ER - Sistema de Gestión de Streaming',
    description: 'Primera versión del modelo, incluye entidades de usuarios y contenido',
    date: '2026',
    image: '/models/Modelo ER-Streaming.png',
   },

    {
    id: 'Torneo-Futbol-v1',
    title: 'Modelo ER - Sistema de Gestión de Torneo de Futbol',
    description: 'Primera versión del modelo, incluye entidades de equipos, jugadores y partidos',
    date: '2026',
    image: '/models/Modelo ER-Torneo Futbol.png',
   },
   
];