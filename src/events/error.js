module.exports = {
	name: 'error',
	execute(error) {

        console.log(`\u001b[1;31m[ERROR]` + `\u001b[0m${error}`);        
        
	},
};