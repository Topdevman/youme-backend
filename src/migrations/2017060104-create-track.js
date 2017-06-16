module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tracks', {        
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
        part: {
            allowNull: false,
            type: Sequelize.STRING
        },        
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        episodeId: {
            type: Sequelize.UUID,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
            model: 'Episodes',
            key: 'id',
            as: 'episodeId',
            }
        }       
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Tracks'),
};