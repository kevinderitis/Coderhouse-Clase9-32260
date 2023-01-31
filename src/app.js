const express =  require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('views', './views')

let usuarios = [
    { nombre: "Pirulo", apellido: "Gomez", edad: 25 },
    { nombre: "Lucia", apellido: "Martinez", edad: 30},
    { nombre: "Lucas", apellido: "Gonzalez", edad: 22 },
    { nombre: "Agustin", apellido: "Galindez", edad: 20 }
]

let food = [
    { name: 'Milanesa', price: 2500},
    { name: 'Tacos', price: 3000},
    { name: 'Sushi', price: 8000},
    { name: 'Burritos', price: 5000},
    { name: 'Pizza', price: 2000}
]

app.get('/', (req, res) => {
    res.render('index', {usuarios})
})

app.get('/user/:pos', (req, res) => {
    let usuario = usuarios[req.params.pos]
    res.render('user', usuario)
})

app.get('/food', (req, res) => {
    let testUser = {
        name: 'User1',
        role: 'admin'
    }
    res.render('food', 
    {   food,
        style: 'index.css',
        testUser,
        admin: testUser.role == 'admin' 
    })
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    let user = req.body;
    res.render('user', { nombre: user.user[0]})
})

const PORT = 8080;
const server = app.listen(PORT, () => console.log('Server running on PORT 8080'))
server.on('error', error => console.log(error))