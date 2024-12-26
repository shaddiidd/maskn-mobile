const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // Adjust the path to your database connection file
const Contract = require('./contract');

const ContractAdditionalTerms = sequelize.define("contractAdditionalTerms", {
    contract_id :{
        type : DataTypes.TEXT,
        references : {
            model : Contract,
            key : "contract_id"
        },
        allowNull : false
    },
    term : {
        type : DataTypes.STRING,
        allowNull : false
    }
}, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "contractAdditionalTerms",
  } 
)

module.exports = ContractAdditionalTerms