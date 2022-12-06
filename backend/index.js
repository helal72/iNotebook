const connectToMongo = require('./db');
const express = require("express");
// const helmet = require("helmet");
// const morgan = require("morgan");
connectToMongo();

const app = express()
var cors = require('cors')
const port = 5000

app.use(express.json());
app.use(cors())
// app.use(helmet());
// app.use(morgan("common"));

app.use('/api/auth' , require('./routes/auth'))
app.use('/api/notes',require('./routes/note'))

app.listen(port, () => {
  console.log(`iNotebook backend on port ${port}`)
})