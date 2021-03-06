const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const https = require('https');
const fs = require('fs');
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.get('/api/test', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log("ROOT HIT");
    res.send('Hello World!');

})

app.get('/api/healthcheck', (req, res) => {

    console.log("Health Checkaszz");
    res.send('Health Checkers');

})
 

app.post('/api/sendMail', (req, res) => {
    /*
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true);
    */
    console.log("POST SERVER HIT");
    console.log(req.headers);
    res.send("RECEIVED POST");
    
    var smtpTransport = nodemailer.createTransport({

        service: 'Gmail',
        port: 465,
        auth: {
            user: 'ramraja.portfolio@gmail.com',
            pass: 'Diablos07'
        }

    });

    var mailOptions = {
        from: req.body.email,
        to: 'ramraja.vii@gmail.com',
        subject: 'Message from portfolio',
        html: `<p>NAME: ${req.body.name}</p>
                <p>SUBJECT: ${req.body.subject}</p>
                <p>EMAIL: ${req.body.email}</p>
                <p>MESSAGE: ${req.body.message}</p>`
    };

    smtpTransport.sendMail(mailOptions,
        (error, res) => {
            
            if(error) {
                
                res.send(error);
                console.log("Error in msg");

            }else {
                
                console.log("MESSAGE SENT");
                res.send("MESSAGE SENT");

            }

            smtpTransport.close();

    });
    
})
/*
https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
    passphrase: 'Diablos07'
}, app).listen(port, () => console.log("HTTPS server listening on port 3000"));
*/
app.listen(port, () => console.log(`Server app listening on port ${port}!`))