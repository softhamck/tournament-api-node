# Tournament API (Node.js)

Prototipo de API REST para la gestión de campeonatos de fútbol.

## Tecnologías
- Node.js
- Express
- Arquitectura por capas
- Persistencia en memoria

## Ejecutar proyecto

Instalar dependencias

npm install

Ejecutar servidor

npm start

Servidor disponible en
http://localhost:3000/api

## Endpoints principales

Crear campeonato
POST /api/championships

Registrar equipo
POST /api/championships/{id}/teams

Generar grupos
POST /api/championships/{id}/groups

Generar calendario
POST /api/championships/{id}/schedule

Registrar resultado
POST /api/matches/{matchId}/result

Ver tabla
GET /api/championships/{id}/standings
