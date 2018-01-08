const uuidv4 = require('uuid/v4');

module.exports = {
	createRandomToken:() => {
        // Creates random token for user_tokens
		const token = uuidv4();
		return token;
	},
};
