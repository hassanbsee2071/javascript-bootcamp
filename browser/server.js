'use strict';

const express = require('express')
const fetch = require("node-fetch")
const cors = require("cors")
const redis = require('redis')

const ProxyAgent = require('proxy-agent')

// Constants
const PORT = 8080
const HOST = '0.0.0.0'

// App
const app = express()
app.use(cors())
app.use(express.json())

// Redis Connection
let client    = redis.createClient({
    port      : 6379,
    host      : 'self-service-redis.self-service-web-form-ns.svc.cluster.local',
    })

client.on('error', err => {
    console.log('Error ' + err);
})

const usRotation = {
    0: { name: "Morgan Walker", email: "morgan.walker@spglobal.com" },
    1: { name: "Sireesha Maddineni", email: "sireesha.maddineni@spglobal.com" }
}

const apacRotation = {
    0: { name: "Andrei Florea", email: "andrei.florea@spglobal.com" },
    1: { name: "Parth Gandhi", email: "parth.gandhi@spglobal.com" },
    2: { name: "Shahroze Malik", email: "shahroze.malik@spglobal.com" },
    3: { name: "Hassam Malik", email: "hassam.malik@spglobal.com" },
    4: { name: "Laviniu Morgovan", email: "laviniu.morgovan@spglobal.com" },
    5: { name: "Syed Hassan", email: "syed.hassan@spglobal.com" },
    6: { name: "Paul Nistor", email: "paul.nistor@spglobal.com" },
    7: { name: "Dmitrijs Popovs", email: "dmitrijs.popovs@spglobal.com" },
    8: { name: "Hamza ejaz Malik", email: "hamza.ejaz.malik@spglobal.com" }
}

let totalUSEmployees = Object.keys(usRotation).length
let totalAPACEmployees = Object.keys(apacRotation).length

// discern whether current UTC time falls into US or APAC working hours
const currentTimeWindow =()=> {
    let currentUTCHour = new Date().getHours()
    console.log("current UTC hour: " + currentUTCHour)
    if (currentUTCHour >= 15 || currentUTCHour < 3) return "us"
    else return "apac"
}

app.options("/", function(req, res, next){
    console.log("in the OPTIONS method")
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  });

app.get('/nextup/us', (req, res) => {
    client.get('us', (err, reply) => {
        if (err) throw err;
        let usMember = usRotation[reply]

        res.statusCode = 200;
        res.send(JSON.stringify(usMember));
    });
})

app.get('/nextup/apac', (req, res) => {
    client.get('apac', (err, reply) => {
        if (err) throw err;
        let apacMember = apacRotation[reply]

        res.statusCode = 200;
        res.send(JSON.stringify(apacMember));
    });
})

app.get('/nextup/now', (req, res) => {
    let region = currentTimeWindow()
    console.log('nextup/now ' + region)
    if (region == 'us') {
        client.get(region, (err, reply) => {
            if (err) throw err;
            let usMember = usRotation[reply]

            res.statusCode = 200;
            res.send(JSON.stringify(usMember));
        });
    } else if (region == 'apac') {
        client.get(region, (err, reply) => {
            if (err) throw err;
            let apacMember = apacRotation[reply]

            res.statusCode = 200;
            res.send(JSON.stringify(apacMember));
        });
    }
})

app.post('/', (req, res) => {
    let apiURL = "https://vsrm.dev.azure.com/spglobal/DevOps%20Shared%20Framework/_apis/release/releases?api-version=5.0"
    let username = process.env.ADO_USERNAME
    let pat = process.env.ADO_PAT

    let creds = username + ":" + pat
    let buff = new Buffer(creds)
    let token = buff.toString('base64')
    console.log(JSON.stringify(req.body))

    let platformOwnerName
    let platformOwnerEmail

    let region = currentTimeWindow()
    if (region == 'us') {
        client.get(region, (err, reply) => {
            if (err) throw err;
            platformOwnerName = usRotation[reply].name
            platformOwnerEmail = usRotation[reply].email

            console.log("Onboarding request recieved. Assigning onboarding to " + platformOwnerName)

            let newPayload1 = JSON.stringify(req.body).replace("PLATFORM OWNER EMAIL HERE!", platformOwnerEmail)
            console.log("new payload 1: " + newPayload1)
            let newPayload2 = newPayload1.replace("PLATFORM OWNER NAME HERE!", platformOwnerName)
            console.log("new payload 2: " + newPayload2)

            fetch(apiURL, {
            agent: new ProxyAgent(),
            body: newPayload2,
            headers: {
                Accept: "application/json, text/plain, */*",
                Authorization: "Basic " + token,
                "Content-Type": "application/json"
            },
            method: "POST"
            })
            .then(response => console.log(response))
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    if (data.status == "active") {
                        console.log("in success, data.status equals active")
                        res.statusCode = 200;
                        res.setHeader('Content-Type', "application/json");
                        res.send(JSON.stringify({"message": "success!"}));
                        console.log("current us key: " + reply)
                        let newUSKey = (parseInt(reply) + 1)%totalUSEmployees
                        console.log("new us key: " + newUSKey)
                        client.set(region, newUSKey, (err, reply) => {if (err) throw err;})
                        
                    } else {
                        console.log("in success, but data.status doesn't equal active")
                        res.statusCode = 503;
                        res.setHeader('Content-Type', "application/json");
                        res.send(JSON.stringify(data));
                    }
                } else {
                    console.log("in success, but there is no data.status")
                    res.statusCode = 503;
                    res.setHeader('Content-Type', "application/json");
                    res.send(JSON.stringify(data));
                }
            })
            .catch((error) => {
                console.log("in error, but there is no data.status")
                console.error('Error:', error);
                res.statusCode = 503;
                res.send(error);
            });
        });
    } else if (region == 'apac') {
        console.log("in apac block")
        client.get(region, (err, reply) => {
            if (err) throw err;
            platformOwnerName = apacRotation[reply].name
            platformOwnerEmail = apacRotation[reply].email

            console.log("Onboarding request recieved. Assigning onboarding to " + platformOwnerName)

            let newPayload1 = JSON.stringify(req.body).replace("PLATFORM OWNER EMAIL HERE!", platformOwnerEmail)
            console.log("new payload 1: " + newPayload1)
            let newPayload2 = newPayload1.replace("PLATFORM OWNER NAME HERE!", platformOwnerName)
            console.log("new payload 2: " + newPayload2)

            fetch(apiURL, {
            agent: new ProxyAgent(),
            body: newPayload2,
            headers: {
                Accept: "application/json, text/plain, */*",
                Authorization: "Basic " + token,
                "Content-Type": "application/json"
            },
            method: "POST"
            })
            .then(response => console.log(response))
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    if (data.status == "active") {
                        console.log("in success, data.status equals active")
                        res.statusCode = 200;
                        res.setHeader('Content-Type', "application/json");
                        res.send(JSON.stringify({"message": "success!"}));
                        
                        console.log("current apac key: " + reply)
                        let newAPACKey = (parseInt(reply) + 1)%totalAPACEmployees
                        console.log("new apac key: " + newAPACKey)
                        client.set(region, newAPACKey, (err, reply) => {if (err) throw err;})
                        
                    } else {
                        console.log("in success, but data.status doesn't equal active")
                        res.statusCode = 503;
                        res.setHeader('Content-Type', "application/json");
                        res.send(JSON.stringify(data));
                    }
                } else {
                    console.log("in success, but there is no data.status")
                    res.statusCode = 503;
                    res.setHeader('Content-Type', "application/json");
                    res.send(JSON.stringify(data));
                }
            })
            .catch((error) => {
                console.log("in error, but there is no data.status")
                console.error('Error:', error);
                res.statusCode = 503;
                res.send(error);
            });
        });
    } 

    // ORIGINAL FETCH CALL BELOW, WORKING BEFORE ROUND-ROBIN/REDIS COMPONENTES WERE INTEGRATED
    // KEEPING THIS FOR NOW AS REFERENCE IN CASE THINGS BREAK
    
    // fetch(apiURL, {
    // body: JSON.stringify(req.body),
    // headers: {
    //     Accept: "application/json, text/plain, */*",
    //     Authorization: "Basic " + token,
    //     "Content-Type": "application/json"
    // },
    // method: "POST"
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.status) {
    //         if (data.status == "active") {
    //             res.statusCode = 200;
    //             res.setHeader('Content-Type', "application/json");
    //             res.send(JSON.stringify({"message": "success!"}));
    //         } else {
    //             res.statusCode = 503;
    //             res.setHeader('Content-Type', "application/json");
    //             res.send(JSON.stringify(data));
    //         }
    //     } else {
    //         res.statusCode = 503;
    //         res.setHeader('Content-Type', "application/json");
    //         res.send(JSON.stringify(data));
    //     }
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    //     res.statusCode = 503;
    //     res.send(error);
    // });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);