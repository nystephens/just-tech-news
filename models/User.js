const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our user model
class User extends Model { }

// define table columns and configuration
User.init(
    {
        // TABLE COLUMN DEFINITIONS GO HERE
        // define an id column
        id: {
            // use the special Sequelize DataTypes object to provide what type of data it is
            type: DataTypes.INTEGER,
            // this is the equivalent of SQL's 'NOT NULL' option
            allowNull: false,
            // instruct that this is the PRIMARY KEY
            primaryKey: true,
            //  turn on autoincrement
            autoIncrement: true
        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define email column 
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be a duplicate email values in this table
            unique: true,
            // if allowNull is set to false, we can run our data through validation
            validate: {
                isEmail: true
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // min length of pass
                len: [4]
            }
        }
    },
    {
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
        // pass in our imported sequelize connection (the direct connection to our database 
        sequelize,
        // dont automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // dont pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing 
        underscored: true,
        // make it so our model name stays lowercase in database
        modelName: 'user'
    }
);

module.exports = User;