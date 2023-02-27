/*************************************************************************
Invite TABLE
*************************************************************************/

export default function (sequelize: any, Sequelize: any) {
	var Invites = sequelize.define(
		'invites',
		{
			emails: {
				type: Sequelize.STRING,
				allowNull: false,
			},
               status: {
                    type: Sequelize.ENUM('pending', 'accepted', 'declined'),
                    defaultValue: 'pending',
               }
		},
          
		{
			freezeTableName: true,
		}
	);

	Invites.associate = function (models: any) {
		models.invites.belongsTo(models.users, { onDelete: 'cascade', targetKey: 'id', foreignKey: 'userId' });
		models.invites.belongsTo(models.documentModels, { onDelete: 'cascade', targetKey: 'id', foreignKey: 'plainId' });
	};

	return Invites;
}