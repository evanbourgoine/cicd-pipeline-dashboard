const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const BuildMetadata = sequelize.define('BuildMetadata', {
  runId: {
    type: DataTypes.BIGINT,  // Changed from INTEGER to BIGINT
    primaryKey: true
  },
  repository: {
    type: DataTypes.STRING,
    allowNull: false
  },
  buildNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  testsPassed: DataTypes.INTEGER,
  testsFailed: DataTypes.INTEGER,
  codeCoverage: DataTypes.FLOAT,
  artifactsGenerated: DataTypes.BOOLEAN,
  deployedEnvironment: DataTypes.STRING
});

module.exports = BuildMetadata;