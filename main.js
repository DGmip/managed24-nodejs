"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiKey = 'd25d81b8-9986-4202-80da-b33a6c233580';
const mongodb_1 = __importDefault(require("mongodb"));
const cors_1 = __importDefault(require("cors"));
// mongodb configuration
const mongodbClient = mongodb_1.default.MongoClient;
const password = 'password25';
const uri = `mongodb+srv://admin:${password}@cluster0-9l3qd.gcp.mongodb.net/test?retryWrites=true`;
const client = new mongodbClient(uri, { useNewUrlParser: true });
client.connect(err => {
    if (err) {
        console.error('could not connect to the db', err);
        return;
    }
    console.log('connected to mongodb');
    // client.close()
});
// expressjs configuration
let port = 8080;
const host = '0.0.0.0';
// take an argument to change the port for local development without docker
const args = process.argv.slice(2);
args.forEach((arg) => {
    const split = arg.split('=');
    const option = split[0];
    const optionValue = parseInt(split[1], 10);
    // console.log('vars', option, optionValue, split)
    if (option === 'port') {
        port = optionValue;
    }
});
// configure the app
const app = express_1.default();
// set up cors for allowed origins
app.use(cors_1.default({
    origin: [
        // angular app port / docker angular port
        'http://localhost:4200',
        // angular testing port
        'http://localhost:9876'
    ]
}));
const checkKey = function (key) {
    return key === apiKey;
};
// names search async function
const searchNames = async function (searchTerm) {
    const collection = client.db('manage24').collection('names');
    const cursor = collection.find({ name: { $regex: searchTerm, $options: '$i' } });
    try {
        const result = await cursor.toArray();
        console.log('result', result);
        return Promise.resolve(result);
    }
    catch (err) {
        console.error(err);
        return Promise.reject(err);
    }
};
// names search endpoint
exports.namesAPICall = app.get('/names', (req, res) => {
    const searchTerm = req.query.search;
    const key = req.query.apiKey;
    // reject if there is no sufficient api key
    if (!key || !checkKey(key)) {
        const error = {
            message: `You have supplied an invalid API key. Add your key to the 'key' paramater in the request URL, for example 'http://names-app.com/?key=<your-api-key>'`,
            status: 403
        };
        res.status(403).send(error);
    }
    // reject if there is no searchterm
    if (!searchTerm) {
        const error = {
            message: `There must be a parameter of 'search' on the request URL, for example 'http://names-app.com?search=milly'`,
            status: 500
        };
        res.status(500).send(error);
    }
    // finally, search the names
    searchNames(searchTerm)
        .then((data) => {
        console.log('got data');
        res.status(200).send(data);
    }, (error) => {
        console.error('could not search the names', error.message);
        res.status(500).send(error);
    });
});
// list the names in the db - Old version created by mistake, removed since brief says 'a single endpoint'
// app.get('/all-names', (req: express.Request, res: express.Response) => {
//   const names = client.db('manage24').collection('names')
//   const cursor = names.find({})
//   cursor.toArray()
//     .then((array) => {
//       console.log('the array', array)
//       res.send(array)
//     })
// })
// insert the names into the db
// const insertNames = async function(): Promise<any> {
//   const collectionRef = client.db('manage24').collection('names')
//   try {
//     const result = await collectionRef.insertMany(names)
//     return Promise.resolve(result)
//   } catch (err) {
//     console.error(err)
//     return Promise.reject(err)
//   }
// }
// insert names route, removed since brief says 'a single endpoint'
// app.get('/insert-names', (req: express.Request, res: express.Response) => {
//   insertNames().then(data => {
//     console.log('inserted name', data)
//     res.status(200).send(data)
//   }, (error) => {
//     const err = error.error
//     console.error('could not add the names', err)
//     res.status(500).send({ 'error': 'could not add the names, ' + err })
//   })
// })
app.get('/*', (req, res) => {
    res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
});
app.listen(port, host);
console.log('listening on ', port, host);
const names = [
    { name: 'Paula Gowin' },
    { name: 'Lemuel Crown' },
    { name: 'Ellen Draughn' },
    { name: 'Alise Kaminsky' },
    { name: 'Sharleen Wesson' },
    { name: 'Janell Philpott' },
    { name: 'Verna Montanez' },
    { name: 'Rayna Branton' },
    { name: 'Paulita Perera' },
    { name: 'Priscila Pesce' },
    { name: 'Renae Pizano' },
    { name: 'Latarsha Mccallion' },
    { name: 'Myrna Millay' },
    { name: 'Marlen Gaynor' },
    { name: 'Mollie Ormand' },
    { name: 'Sunni Holtzman' },
    { name: 'Korey Vencill' },
    { name: 'Micheline Hopple' },
    { name: 'Regine Giron' },
    { name: 'Leonard Woodell' },
    { name: 'Bertie Guntrum' },
    { name: 'Frieda Weekly' },
    { name: 'Kendra Ragusa' },
    { name: 'Milly Shipman' },
    { name: 'Luciana Buttram' },
    { name: 'Maryjo Faulcon' },
    { name: 'Myriam Murrill' },
    { name: 'Nikia Carbonell' },
    { name: 'Estelle Anspach' },
    { name: 'Edie Delosreyes' },
    { name: 'Lorilee Knowles' },
    { name: 'Aracely Noakes' },
    { name: 'Alina Gould' },
    { name: 'Domitila Fralick' },
    { name: 'Amelia Wehner' },
    { name: 'Terrell Wilds' },
    { name: 'Cortney Vescio' },
    { name: 'Tommye Mcniel' },
    { name: 'Erich Hoy' },
    { name: 'Alissa Dunson' },
    { name: 'Dagmar Ayoub' },
    { name: 'Shane Bomba' },
    { name: 'Darcey Wulff' },
    { name: 'Robbie Tauber' },
    { name: 'Tawanna Cheek' },
    { name: 'Pamula Pettis' },
    { name: 'Paul Rucks' },
    { name: 'Lael Weber' },
    { name: 'Torrie Troupe' },
    { name: 'Etha Thornton' }
];
