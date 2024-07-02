const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { body, validationResult, cookie } = require('express-validator')
const app = express()

const bodyParser = require('body-parser')
const path = require('path')
const methodOverride = require('method-override');

const port = 3000

const { format } = require('date-fns');

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

app.use(methodOverride('_method'));

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

app.get('/datasiswa', async (req, res) => {
    const siswa = await Siswa.find({})
    res.render('datasiswa', {
        layout: 'layouts/main-layout.ejs',
        siswa
    })
})

app.get('/datasiswa/tambah', (req, res) => {
    res.render('tambahsiswa', {
        layout: 'layouts/main-layout.ejs',
    })
})

app.get('/datasiswa/:nisn', async (req, res) => {
    const siswa = await Siswa.findOne({nisn: req.params.nisn})

    res.render('detailsiswa', {
        layout: 'layouts/main-layout.ejs',
        siswa,
        formattedTL: format(new Date(siswa.tanggalLahir), 'dd MMMM yyyy')
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
            nohp: req.body.noHP,
            email: req.body.email,
        })
        await newData.save()
        res.redirect('/datasiswa')
    } catch (err) {
        res.send('Gagal')
        console.log(err)
    }
})

app.delete('/datasiswa/:id', async (req, res) => {
    try {
        await Siswa.findByIdAndDelete(req.params.id);
        res.redirect('/datasiswa')
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(port, () => {
	console.log(`Server is listening on https://127.0.0.1:3000`)
})