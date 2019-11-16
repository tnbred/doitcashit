exports.schemas = {
	user: {
		id           : "",
		name         : "",
		email        : "",
		birth_date   : new Date(),
		password     : "",
		approved     : false,
		created_at   : "",
		updated_at   : "",
		logincount   : 0,
		lastlogin_at : ""

	},

	challenge: {
		id                   : "",
		user_id              : null,             // id of the user submitting the challenge
		name                 : null,
		goal                 : null,
		pic_url              : null,
		total_pledges_so_far : 0,   // total amount the users of the site gave to the challenge
		currency             : "USD",           // currency of the money pledged
		money_pledged        : 0,          // amount due to see the challenge executed
		description          : null,         // description of the challenge
		created_at           : null,
		updated_at           : null
	},

	follow: {
		id           : "",
		user_id      : "",               // id of the user following the challenge (with id = challenge_id )
		challenge_id : "",          // id of the followed challenge
		created_at   : "",
		updated_at   : ""
	},

	pledge: {  
		id           : "",
		user_id      : "",               // id of the user making the pledge to the challenge (with id = challenge_id )
		challenge_id : "",          // id of the pledged challenge
		amount       : 0,                // amount of the pledge
		currency     : "USD",           // currency of the pledge
		created_at   : "",
		updated_at   : ""
	},

}
