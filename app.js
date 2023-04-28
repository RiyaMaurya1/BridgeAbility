const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const URI = 'mongodb+srv://admin-kalpikha:ibPYdEMS7zKWmcJE@cluster0.2x6duiz.mongodb.net/asd?retryWrites=true';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`CONNECTED TO MONGO!`);
    })
    .catch((err) => {
        console.log(`MONGO CONNECTION ERROR!`);
        console.log(err);
    });


const User = mongoose.model('user', mongoose.Schema({
    name : String,
    email :String,
    password : String
}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

app.get('/about', function(req, res){
    res.sendFile(__dirname + '/about.html');
})

app.get('/text-to-speech', function(req,res){
    res.sendFile(__dirname +'/public/TextToSpeech/index.html');
})

app.get('/parent-guide', function(req,res){
    res.sendFile(__dirname +'/public/Guide/parental_guide_2.html');
})

app.get('/login', function(req,res){
    res.sendFile(__dirname +'/public/Login/index.html');
})

app.post('/login', function(req,res){

    console.log(req.body);

    if( req.body.btn === 'login'){

        const requestedEmail = req.body.email;
        const requestedPassword = req.body.password;

        User.find({ email: requestedEmail, password: requestedPassword })
            .then(function (foundItem) {

                // if not found
                if ( Object.keys(foundItem).length == 0) {
                    console.log('Incorrect Username Password')
                    res.redirect('/login');
                }
                else {
                    res.redirect('/#services')
                }
            })
            .catch(function (err) {
                console.log(err);
                res.redirect('/login');
            });

    }
    else if(req.body.btn === 'register'){

        const requestedEmail = req.body.email;
        const requestedPassword = req.body.password;
        const requestedName= req.body.name;

        const newUser = new User({
            name : requestedName,
            email: requestedEmail,
            password :requestedPassword
        });

        newUser.save();
        console.log('User registeration successful')
        res.redirect('/');
    }

});

app.get('/games/mix-or-match', function(req,res){
    res.sendFile(__dirname +'/public/games/Mix-Or-Match/match.html');
})

app.get('/games/drum-kit', function(req,res){
    res.sendFile(__dirname +'/public/games/Drum-Kit/drumKit.html');
})

app.get('/games/simon-game', function(req,res){
    res.sendFile(__dirname +'/public/games/Simon-Game/simon.html');
})

app.get('/games/sorting-list', function(req,res){
    res.sendFile(__dirname +'/public/games/sorting-list/sort.html');
})

app.get('/to-do-list', function(req, res){

    res.sendFile(__dirname + '/public/to-do-list/dist/index.html');
});



app.listen(3000 || process.env.PORT, function(){
    console.log('Server is up and runnning !');
});