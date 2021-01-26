const { Sequelize } = require('sequelize')

let db;
const production = true

if (production) {
    db = new Sequelize("postgres://qjsyxwqtmzijgv:5c603533f689405a248ff26f6a9375c55458f9304c9e8823d106327c1484aa30@ec2-52-200-119-0.compute-1.amazonaws.com:5432/d8b0a4lrcno9pc")

} else {
    db = new Sequelize({
        dialect: "postgres",
        database: "chatsapp",
        username: "postgres",
        password: "Alicia01",
    })
}


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

