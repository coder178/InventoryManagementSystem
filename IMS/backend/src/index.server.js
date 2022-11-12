const express = require('express');
const env = require('dotenv');
const app =express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const locationRoutes = require('./routes/location');
const vedorRoutes = require('./routes/vendor');
const agencyRoutes = require('./routes/agency');
const maintenanceRoutes = require('./routes/maintenance');
const scrapRoutes = require('./routes/removedproduct');
const resellRoutes = require('./routes/reselleditems');


const http = require('http');
const server = http.createServer(app);
env.config();

mongoose.connect(
    `mongodb://localhost:27017/InventoryManagement`,
).then(() => {
    console.log("Database connected");
});

app.use(cors());
app.use(express.json());
app.use('/api',userRoutes);
app.use('/api',categoryRoutes); 
app.use('/api',productRoutes); 
app.use('/api',locationRoutes); 
app.use('/api',vedorRoutes ); 
app.use('/api',agencyRoutes ); 
app.use('/api',maintenanceRoutes);
app.use('/api', scrapRoutes); 
app.use('/api', resellRoutes); 

app.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'Hello from server'
    });
} );


app.post('/data', (req,res,next) => {
    res.status(200).json({
        message: req.body
    });
} );
server.listen(process.env.PORT,() => {
    console.log(`server is running on port ${process.env.PORT}`);
});