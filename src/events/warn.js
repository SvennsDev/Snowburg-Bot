module.exports = {
	name: 'warn',
	execute(info) {

        console.log(`\u001b[1;33m[WARNING]` + `\u001b[0m${info}`);        
        
	},
};