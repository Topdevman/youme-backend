module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {        
        id: {
            primaryKey: true,
            allowNull: false,                   
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        useId: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
        },        
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        }              
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Users'),
};