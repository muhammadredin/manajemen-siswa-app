const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/manajemen-siswa')
.then(() => {
	console.log('DB Connected')
})
.catch((err) => {
	console.log('Connection Failed', err)
})
