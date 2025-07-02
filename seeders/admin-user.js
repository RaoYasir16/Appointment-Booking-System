const bcrypt = require("bcrypt");
const{v4:UUIDV4} = require('uuid')


module.exports ={
    async up(queryInterface, Sequelize){
        await queryInterface.bulkInsert('users',[{
            id:UUIDV4(),
            name:'Yasir',
            email:'yasir@gmail.com',
            password: await bcrypt.hash('12345',10),
            role:'admin',
            isBanned:false,
            createdAt: new Date(),
            updatedAt: new Date(),
        }])
    },
    async down(queryInterface, Sequelize){
        await queryInterface.bulkDelete('users',{email:'yasir@gmail.com'})
    }
};