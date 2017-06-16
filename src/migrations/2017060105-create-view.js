module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Views', {        
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
        ordering: {
            allowNull: false,
            type: Sequelize.INTEGER
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
        momentId: {
            type: Sequelize.UUID,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
            model: 'Moments',
            key: 'id',
            as: 'mommentId',
            }
        }       
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Moments'),
};