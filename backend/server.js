const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = 5000;
const employeeRoute = require('./routes/employeeRoute')

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use('/api',employeeRoute);

app.listen(PORT, () => {
    console.log(`the server is running on the port : ${PORT}`);
})