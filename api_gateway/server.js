const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const BusDestinationRoute = require('./routes/bus_destination_route');


app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World');
})


app.use('/api/BusDestination', BusDestinationRoute)


app.listen(5191, () => {
    console.log('Server is running on port 5191');
})
