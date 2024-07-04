const connectDB = require('./src/configs/index.configs')
const app = require('./src/server');
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await connectDB()
        .then(() => { console.log('DB connected')})
        .catch((err) =>  console.log(err))
    console.log('server listening on port ', PORT)
})
