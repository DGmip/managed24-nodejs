import express from 'express'
import mongodb from 'mongodb'
import { Request, Response } from 'express'
import cors from 'cors'

// mongodb configuration
const MongoClient = mongodb.MongoClient
const password = 'password25'
const uri = `mongodb+srv://admin:${ password }@cluster0-9l3qd.gcp.mongodb.net/test?retryWrites=true`
const client = new MongoClient(uri, { useNewUrlParser: true })

client.connect(err => {
  if (err) {
    console.error('could not connect to the db', err)
    return
  }
  console.log('connected to mongodb')
  // client.close()
})

// expressjs configuration
const port = 4220
const host = '0.0.0.0'

const app = express()
app.use(cors({
  origin: [
    'http://localhost:4200',
    'http://localhost:9876'
  ]
}))

// list the names in the db
app.get('/names', (req: express.Request, res: express.Response) => {
  const names = client.db('manage24').collection('names')
  const cursor = names.find({})
  cursor.toArray()
    .then((array) => {
      console.log('the array', array)
      res.send(array)
    })
})

// insert the names into the db
const insertNames = async function(): Promise<any> {
  const collectionRef = client.db('manage24').collection('names')
  try {
    const result = await collectionRef.insertMany(names)
    return Promise.resolve(result)
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

// insert names route
app.get('/insert-names', (req: express.Request, res: express.Response) => {
  insertNames().then(data => {
    console.log('inserted name', data)
    res.status(200).send(data)
  }, (error) => {
    const err = error.error
    console.error('could not add the names', err)
    res.status(500).send({ 'error': 'could not add the names, ' + err })
  })
})

app.get('/*', (req: express.Request, res: express.Response) => {
  res.status(404).send({ message: 'Route' + req.url + ' Not found.' })
})

app.listen(port, host)
console.log('listening on ', port, host)

const names = [
  { name: "Paula Gowin" },
  { name: "Lemuel Crown" },
  { name: "Ellen Draughn" },
  { name: "Alise Kaminsky" },
  { name: "Sharleen Wesson" },
  { name: "Janell Philpott" },
  { name: "Verna Montanez" },
  { name: "Rayna Branton" },
  { name: "Paulita Perera" },
  { name: "Priscila Pesce" },
  { name: "Renae Pizano" },
  { name: "Latarsha Mccallion" },
  { name: "Myrna Millay" },
  { name: "Marlen Gaynor" },
  { name: "Mollie Ormand" },
  { name: "Sunni Holtzman" },
  { name: "Korey Vencill" },
  { name: "Micheline Hopple" },
  { name: "Regine Giron" },
  { name: "Leonard Woodell" },
  { name: "Bertie Guntrum" },
  { name: "Frieda Weekly" },
  { name: "Kendra Ragusa" },
  { name: "Milly Shipman" },
  { name: "Luciana Buttram" },
  { name: "Maryjo Faulcon" },
  { name: "Myriam Murrill" },
  { name: "Nikia Carbonell" },
  { name: "Estelle Anspach" },
  { name: "Edie Delosreyes" },
  { name: "Lorilee Knowles" },
  { name: "Aracely Noakes" },
  { name: "Alina Gould" },
  { name: "Domitila Fralick" },
  { name: "Amelia Wehner" },
  { name: "Terrell Wilds" },
  { name: "Cortney Vescio" },
  { name: "Tommye Mcniel" },
  { name: "Erich Hoy" },
  { name: "Alissa Dunson" },
  { name: "Dagmar Ayoub" },
  { name: "Shane Bomba" },
  { name: "Darcey Wulff" },
  { name: "Robbie Tauber" },
  { name: "Tawanna Cheek" },
  { name: "Pamula Pettis" },
  { name: "Paul Rucks" },
  { name: "Lael Weber" },
  { name: "Torrie Troupe" },
  { name: "Etha Thornton" }
]
