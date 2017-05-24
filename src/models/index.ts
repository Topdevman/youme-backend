
import * as Sequelize from 'sequelize';

let sequelize = new Sequelize('postgres://postgres:root@localhost:5432/youme');

export default sequelize;