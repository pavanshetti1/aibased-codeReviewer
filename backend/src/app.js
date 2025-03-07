const express  = require('express');
const app = express();
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');
const path = require('path');


app.use(express.json());    
app.use(cors());

app.get('/', (req, res) => {    
    res.send('Hello World!');  
})

app.use('/ai', aiRoutes);


if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    })
}

module.exports = app;   
