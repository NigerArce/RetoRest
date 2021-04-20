'use strict'

const firebase = require('../db');
const Cliente = require('../models/cliente');
const Kpi = require('../models/kpi');
const firestore = firebase.firestore();

const agregarCliente = async (req, res, next) => {
    try{

        const data = req.body;
        await firestore.collection('cliente').doc().set(data);
        res.send('Cliente agregado');


    }catch(error){

        res.status(400).send(error.message);
    }
}

const listarClientes = async (req, res, next) => {
    try{
        const dbcliente = await firestore.collection('cliente');
        const data = await dbcliente.get();

        const clientearray = [];

        if(data.empty){
            res.status(404).send('clientes no registrados');
        }else{
            data.forEach( doc => {
                const clie = new Cliente(
                    doc.id,
                    doc.data().nombres,
                    doc.data().apellidos,
                    doc.data().edad,
                    doc.data().fechaNacimiento
                );
                clientearray.push(clie);
            });
            res.send(clientearray);
        }
    }catch(error){

        res.status(400).send(error.message);
    }
}



const kpiClientes = async (req, res, next) => {
    try{
        const dbcliente = await firestore.collection('cliente');
        const data = await dbcliente.get();

        const kpiarray = [];

        var v_cantidad = 0;
        var v_totaledad = 0;
        var v_media = 0;
        var v_sumatoria = 0;
        var v_varianza = 0;
        var v_desviacion = 0;

        if(data.empty){
            res.status(404).send('clientes no registrados');
        }else{
            const aEdad = [];

            data.forEach( doc => {

                v_cantidad++;
                var nedad = parseInt(doc.data().edad);
                aEdad.push(nedad);
                v_totaledad = v_totaledad + nedad;
            });
            v_media = v_totaledad/v_cantidad;

            for (var i = 0; i < v_cantidad; i++) {
                v_sumatoria = Math.pow(aEdad[i] - v_media, 2);
                v_varianza = v_varianza + v_sumatoria;
            }
            v_varianza = v_varianza /(v_cantidad-1);
            v_desviacion = Math.sqrt(v_varianza);

            const kpi = new Kpi(
                v_cantidad,
                v_media,
                v_desviacion
            );
            kpiarray.push(kpi);

            res.send(kpiarray);
        }
    }catch(error){

        res.status(400).send(error.message);
    }
}

module.exports = {
    agregarCliente,
    listarClientes,
    kpiClientes
}