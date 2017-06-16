module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('TrackViews', {        
        id: {
            primaryKey: true,
            allowNull: false,                   
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        title: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
        },
        type: {
            allowNull: false,
            type: Sequelize.STRING
        },
        content: {
            allowNull: false,
            type: Sequelize.TEXT
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        trackId: {
            type: Sequelize.UUID,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
            model: 'Tracks',
            key: 'id',
            as: 'trackId',
            }
        }       
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('TrackViews'),
};