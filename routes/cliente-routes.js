
const express = require('express');
const {agregarCliente, listarClientes, kpiClientes} = require('../controllers/clienteController');

const router = express.Router();

router.post('/creacliente', agregarCliente);
router.get('/listcliente', listarClientes);
router.get('/kpideclientes', kpiClientes);

module.exports={
    routers : router
}