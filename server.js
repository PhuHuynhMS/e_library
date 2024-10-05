const app = require('./app');
const config = require('./app/config');
const MongoDB = require('./app/utils/mongodb');

async function StartServer() {
    try {
        await MongoDB.connect(config.db.uri);
        console.log('MongoDB Connected');

        const port = config.app.port;
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    } catch (error) {
        console.log('Cannot connect to the database!', error);
        process.exit();
    }
}

StartServer();
