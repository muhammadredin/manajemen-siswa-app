const mongoose = require('mongoose')

const siswaSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    nisn: {
        type: String,
        required: true,
    },
    tanggalLahir: {
        type: Date,
        required: true,
    },
    tempatLahir: {
        type: String,
        required: true,
    },
    jenisKelamin: {
        type: String,
        required: true,
    },
    kelas: {
        type: String,
        required: true,
    },
    nohp: {
        type: String
    },
    email: {
        type: String
    },
}, { collection: 'datasiswa' })

const Siswa = mongoose.model('datasiswa', siswaSchema)

module.exports = Siswa