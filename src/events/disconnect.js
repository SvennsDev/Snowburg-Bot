module.exports = {
	name: 'disconnect',
	execute(disconnect) {

        console.log(`\u001b[1;31m[DISCONNECTED]` + `\u001b[0m${disconnect}`);        
        
	},
};