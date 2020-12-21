
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const cloudDb = 'mongodb+srv://timur:timur@cluster0.qs62h.mongodb.net/velocycling'


// const cloudDb = `mongodb+srv://${process.env.DATABASE_LOGIN}:${process.env.DATABASE_PASSWORD}.mongodb.net/${process.env.DATABASE_NAME}`;

const dbConnect = () => {
  mongoose.connect(cloudDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};
// export default dbConnect;

module.exports = dbConnect