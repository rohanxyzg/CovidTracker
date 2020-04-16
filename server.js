
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = process.env.ATLAS_URI;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
  
const countriesRouter = require('./routes/countries');
const statsRouter = require('./routes/stats');

app.use('/countries',countriesRouter);
app.use('/stats',statsRouter);
 
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});