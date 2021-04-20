'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const clienteRoutes = require('./routes/cliente-routes');

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        info:{
            title:'Reto Rest - Niger Arce',
            version: '1.0.0',
            description:'REST API application',
            contact: {
                name: 'Niger Arce',
                url: 'https://pe.linkedin.com/in/niger-arce',
              }
        }
    },
    apis: ['app.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

/**
 * @swagger
 * tags:
 *  name: Clientes
 *  description: API para clientes.
 */


/**
 * @swagger
 * /api/creacliente:
 *   post:
 *     tags: [Clientes]
 *     summary: Crear un nuevo cliente
 *     description: Crear nuevo cliente
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: cliente
 *         schema:
 *              type: object
 *              required:
 *                  - edad
 *              properties:
 *                  nombres:
 *                      type: string
 *                  apellidos:
 *                      type: string
 *                  edad:
 *                      type: integer
 *                  fechaNacimiento:
 *                      type: string
 *     responses: 
 *      200:
 *          description: Success
 * 
 */


/**
 * @swagger
 * /api/kpideclientes:
 *   get:
 *     tags: [Clientes]
 *     summary: Kpi edad de clientes 
 *     description: Obtener Promedio de edad y Desviación estándar 
 *     responses: 
 *      200:
 *          description: Success
 * 
 */


/**
 * @swagger
 * /api/listcliente:
 *   get:
 *     tags: [Clientes]
 *     summary: Listar todos los clientes
 *     description: Obtener lista de clientes
 *     responses: 
 *      200:
 *          description: Success
 * 
 */


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api',clienteRoutes.routers);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//app.listen(config.port, () => console.log('corriendo local puerto:'+config.port))
app.listen(process.env.PORT, () => console.log('corriendo local puerto:'+process.env.PORT))