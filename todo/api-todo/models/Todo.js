const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

// Sequelize maps JS camelCase field names to snake_case DB columns
// when underscored: true is set (e.g. dueDate → due_date, createdAt → created_at).
const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  priority: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'medium',
    validate: {
      isIn: [['low', 'medium', 'high']],
    },
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'General',
  },
  dueDate: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  tableName: 'todos',
  underscored: true,  // maps camelCase JS ↔ snake_case DB columns
  timestamps: true,   // manages createdAt / updatedAt automatically
});

module.exports = Todo;
