require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbInit = require('./dbInit.js')
const formRoutes = require('./routes/formRoutes.js');

const app = express();

dbInit();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/', formRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up and running on localhost:${PORT}`))


