


export type RegisterDataType = {
	names: string;
	phone: string;
	email: string;
	password: string;
	gender: string;
};



export type PlanDataType = {
	userId?: number;
	title: string;
	people_to_save_with:Date;
	target:string;
	auto_save:string;
	saving_frequency:string;
	start:Date;
	amount_to_save:number;
	when_to_start_saving:Date;
	period_of_saving:Date;
	start_date:Date;
	end_date:Date;
	relation_type:string;


}


export type FnResponseDataType = {
	status: boolean;
	message: string;
	data?: any;
};

export type InviteDataType = {
	data:InviteObjectType[],
	planId?: number;
	userId?: number;
	id?: number;

}

export type InviteObjectType = {
	emails: string;
	

}

export type InviteResponseDataType = {
	yes:string;
	no:string;
}
export type AuthPayloadDataType = {
	id: number;
	names: string;
	phone: string;
	email: string;
	status?: string;
	type?: string;
};

export type TokenDataType = {
	type: 'token' ;
	token: string;
	user?: AuthPayloadDataType;
	admin?: AuthPayloadDataType;
};