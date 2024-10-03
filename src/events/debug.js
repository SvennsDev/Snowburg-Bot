module.exports = {
	name: 'debug',
	execute(info) {

        console.log(`\u001b[1;34m[DEBUG]` + `\u001b[0m ${info}`);        
        
	},
};