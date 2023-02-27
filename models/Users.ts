/*************************************************************************
USERS TABLE
*************************************************************************/

export default function (sequelize: any, Sequelize: any) {
	var Users = sequelize.define(
		'users',
		{
			names: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			
			gender: Sequelize.ENUM('MALE', 'FEMALE'),
			status: {
				type: Sequelize.ENUM('active', 'inactive'),
				defaultValue: 'inactive',
			},
			
		},
		{
			freezeTableName: true,
		}
	);

	
	

	return Users;
}
