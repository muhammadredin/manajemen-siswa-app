const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { body, validationResult, cookie} = require('express-validator')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 3000

// FLash Msg
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

// DB Connection
require('./utils/db')

// DB Model
const Siswa = require('./model/siswa')

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Konfigurasi Flash
app.use(cookieParser('secret'))
app.use(
	session({
		cookie: { maxAge: 6000 },
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
	})
)
app.use(flash())

app.get('/datasiswa', (req, res) => {
    res.render('datasiswa', {
        layout: 'layouts/main-layout.ejs',
    })
})

app.get('/datasiswa/tambah', (req, res) => {
    res.render('tambahsiswa', {
        layout: 'layouts/main-layout.ejs',
    })
})

app.post('/datasiswa/tambah', async (req, res) => {
    try {
        const newData = new Siswa({
            nama: req.body.nama,
            nisn: req.body.nisn,
            tanggalLahir: req.body.tanggalLahir,
            tempatLahir: req.body.tempatLahir,
            jenisKelamin: req.body.jenisKelamin,
            kelas: req.body.kelas,
            noHP: req.body.noHP,
            email: req.body.email,
        })
        await newData.save()
        res.redirect('/datasiswa')
    } catch (err) {
        res.send('Gagal')
        console.log(err)
    }
})

app.listen(port, () => {
	console.log(`Server is listening on port $`)
})