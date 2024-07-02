const Siswa = require('./model/siswa')


const tambahSiswa = async () => {
    try {
        await require('./utils/db')
        const newData = new Siswa({
            nama:"Redin",
            nisn: 3059892297,
            tanggalLahir:"2005-01-05",
            tempatLahir:"Bekasi",
            jenisKelamin:"Laki-Laki",
            kelas:"X",
            noHP:"081317749443",
            email:"muhammadredin.b@gmail.com"
        })
        await newData.save()
        console.log('SUKSES')
    } catch (error) {
        console.log('Data Gagal', error)
    }
}

tambahSiswa();