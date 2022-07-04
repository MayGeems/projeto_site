const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/projeto_site";

mongoose.connect(uri);

module.exports = mongoose;