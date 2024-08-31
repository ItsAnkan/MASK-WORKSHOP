require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbInit = require('./dbInit.js')
const formRoutes = require('./routes/formRoutes.js');
const path = require('path')

const app = express();

dbInit();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
app.use('/', formRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up and running on localhost:${PORT}`))


