const express = require('express');
const session = require('express-session');
const cors = require('cors');

const { json } = require('express');
const dataService = require('./services/data.service');

const app = express();


app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))



app.use(session({
    secret: 'randomsecurestring',
    resave: false,
    saveUninitialized: false
}))



const logMiddleware = (req, res, next) => {
        console.log(req.body);
        next()
    }
    //app.use(logMiddleware);

const authMiddleware = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.json({
            status: false,
            statusCode: 401,
            message: "please login"
        })
    } else {
        next()
    }
}

app.use(express.json());

app.get('/', (req, res) => {
    res.status(444).send("get method")
})


app.post('/register', (req, res) => {
    console.log(req.body);
    dataService.register(req.body.acno, req.body.username, req.body.password)
       
        .then(result => {
            res.status(result.statusCode).json(result)
        })
        //console.log(res.status(result.statusCode).json(result));
})
app.post('/login', (req, res) => {
    console.log(req.body);
    dataService.login(req, req.body.acno, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
        //console.log(res.status(result.statusCode).json(result));
})
app.post('/deposite', authMiddleware, (req, res) => {
    console.log(req.session.currentUser);
    dataService.deposite(req, req.body.acno, req.body.password, req.body.amount)
        .then(result => {
            res.status(result.statusCode).json(result)
        })

    //console.log(res.status(result.statusCode).json(result));
})




app.post('/withdraw', authMiddleware, (req, res) => {
    console.log(req.session.currentUser);
    dataService.withdraw(req, req.body.acno, req.body.password, req.body.amount)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
        //console.log(res.status(result.statusCode).json(result));
})
app.delete('/deleteAccDetails/:acno', (req, res) => {
    dataService.deleteAccDetails(req.params.acno)
        .then(result => {
            res.status(result.statusCode).json(result)
        })

})

app.delete('/', (req, res) => {
    res.status(444).send("delete method")
})

app.listen(3000, () => {
    console.log("Listen")
})
app.put(3000, () => {
    console.log("PUT 3000")
})


app.patch('/', (req, res) => {
    res.send("patch method")
})
