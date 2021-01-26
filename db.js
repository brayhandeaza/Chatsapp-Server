const { Sequelize } = require('sequelize')

const db = new Sequelize({
    dialect: "postgres",
    database: "chatsapp",
    username: "postgres",
    password: "Alicia01",
})

const connection = () => {
    try {
        db.authenticate();
        db.sync()
        console.log('\nConnection has been established successfully.\n');

    } catch (error) {
        console.error(`\nUnable to connect to the database: ${error}\n`);
    }
}

module.exports = {
    db,
    connection
}

