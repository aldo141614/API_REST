'use strict'

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001

const app = express()
const Facts = require('./models/facts')

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

//Consultar toda la tabla
app.get('/api/fact', (req, res) =>{
  Facts.find({}, (err, facts) =>{
    if(err) return res.status(500).send({ message: `Error al realizar la petición: ${err}`})
    if(!facts) return res.status(404).send({ message: 'El producto no existe'})

    res.send(200, {facts})
  })
})

//Consultar por id
app.get('/api/fact/:factId', (req, res) =>{
  let factId= req.params.factId

  Facts.findById(factId, (err, facts) => {
    if(err) return res.status(500).send({ message: `Error al realizar la petición: ${err}`})
    if(!facts) return res.status(404).send({ message: 'El producto no existe'})

    res.status(200).send({ facts })
  })
})

//Insertar datos
app.post('/api/fact', (req, res) =>{
  console.log('POST/api/fact')
  console.log(req.body)

  let fact = new Facts()
  fact.vehicle_id = req.body.vehicle_id
  fact.position_longitude = req.body.position_longitude
  fact.position_latitude = req.body.position_latitude
  fact.trip_route_id = req.body.trip_route_id
  fact.vehicle_label = req.body.vehicle_label
  fact.trip_id = req.body.trip_id
  fact.alcaldia = req.body.alcaldia

  fact.save((err, factStored) =>{
    if(err) res.status(500).send({ message: 'Error al guardar en la base de datos'})

    res.status(200).send({ fact: factStored })
  })
})

//Actualizar registro
app.put('/api/fact/:factId', (req, res) =>{
  let factId= req.params.factId
  let update = req.body

  Facts.findByIdAndUpdate( factId, update, (err, factsUpdate) =>{
    if(err) res.status(500).send({ message: `Error al actualizar el registro ${err}`})

    res.status(200).send({ fact: factsUpdate })
  })
})

//Eliminar registro
app.delete('/api/fact/:factId', (req, res) =>{
  let factId= req.params.factId

  Facts.findById(factId, (err, fact) => {
   if(err) res.status(500).send({ message: `Error al borrar el registro ${err}`})

   fact.remove(err =>{
      if(err) res.status(500).send({ message: `Error al borrar el registro ${err}`})

      res.status(200).send({ message: 'El producto ha sido eliminado' })
   })
  })
})


mongoose.connect('mongodb://localhost:27017/fact', (err, res) =>{
  if(err) {
    return console.log(`Error al conectar a la base de datos: ${err}` )
  }
  console.log('Conexión a la base de datos exitosa')

  app.listen(port, () =>{
       console.log(`API REST Corriendo en http://localhost: ${port}`)
  })

})
