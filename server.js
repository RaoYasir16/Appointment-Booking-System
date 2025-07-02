const app = require('./app');
const {sequelize} = require('./models');

const port = process.env.PORT || 3001

const startServer = async()=>{
    try {
        await sequelize.authenticate();
    console.log('Database connected Successfully');

    app.listen(port,()=>{
        console.log(`Server Running on Port:${port}`)
    });
    } catch (error) {
        console.error('Unable to connected To the Database',error)
    }
}

startServer()