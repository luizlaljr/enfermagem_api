const express = require('express');
const cors = require('cors');
const routes = require('./routes');

require('./server');

const api = express();

api.use(cors());
api.use(express.json());
api.use(routes);



api.listen(process.env.PORT || 3333);
