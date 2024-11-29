const app = require('./app');
const config = require('./app/config');
const mongoose = require('./app/utils/mongodb');
const AccountService = require('./app/services/account.service');

const accountService = new AccountService();
async function StartServer() {
    try {
        await mongoose.connect(config.db.uri);
        console.log('MongoDB Connected');

        await accountService.createDefaultAdmin();

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
