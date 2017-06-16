module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Episodes', {        
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
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        seasonId: {
            type: Sequelize.UUID,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
            model: 'Seasons',
            key: 'id',
            as: 'seasonId',
            }
        }       
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Episodes'),
};