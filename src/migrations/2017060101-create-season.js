module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Seasons', {        
        id: {
            primaryKey: true,
            allowNull: false,                    
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
        },
        ordering: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        introduction: {
            allowNull: false,
            type: Sequelize.TEXT
        },
        totalEpisode: {
            type: Sequelize.INTEGER,
            defaultValue: 0
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
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('seasons'),
};