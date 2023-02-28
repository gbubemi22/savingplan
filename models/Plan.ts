const {Sequelize, DataTypes} = require("sequelize");



export default function (sequelize: any, Sequelize: any) {
    const Plans = sequelize.define(
        'plans',
        {
            title: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            people_to_save_with: [{
                type: DataTypes.NUMBER(),
                max: 5,
                min: 0,
                allowNull: false,
            }],
            target: {
                type: DataTypes.ENUM('YES', 'NO'),
            },
            auto_save: {
               type: DataTypes.ENUM('YES', 'NO'),
            },

            saving_frequency: {
               type: DataTypes.ENUM('DAILY','WEEKLY', 'MONTHLY'),
            },
            start: {
               type: DataTypes.DATE(),
            },
            amount_to_save: {
               type: DataTypes.NUMBER(),
               default:0.00
            },
            when_to_start_saving:{
                type: DataTypes.DATE(),
            },

            period_of_saving:{
                type: DataTypes.ENUM('3months','6months',
                '1year'),
            },
            start_date:{
                type: DataTypes.DATE(),
            },
            end_date:{
                type: DataTypes.DATE(),
            },
            relation_type:{
                type: DataTypes.STRING(),
            }
        },
        {
            freezeTableName: true,
        }
    );

    Plans.associate = function(models: any) {
        models.plans.belongsTo(models.users, {
            foreignKey: {
                allowNull: false,
            },
        });
    }

    return Plans;
}