module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('AnalysisResults', {        
        id: {
            primaryKey: true,
            allowNull: false,                    
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        episode: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
        },
        moment: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
        },
        part: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
        },
        author: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
        },
        result: {
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
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('AnalysisResults'),
};