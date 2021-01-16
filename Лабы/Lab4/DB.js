const util = require('util');
const events = require('events');

let dbData = [
	{id: 0, name: 'Иванов И.И.', bday: '2001-01-01'},
	{id: 1, name: 'Иванов А.И.', bday: '2001-01-02'},
	{id: 2, name: 'Иванов К.И.', bday: '2001-01-03'},
	{id: 3, name: 'Иванов С.И.', bday: '2001-01-04'},
	{id: 4, name: 'Иванов П.И.', bday: '2001-01-05'}
];

function DB() {
	this.getIndex = () => { return dbData.length; };
    this.select = () => { return dbData; };
    this.insert = row => { dbData.push(row); };

    this.update = row => {
		console.log(row.bday);
        let upIndex = dbData.findIndex(element => element.id === row.id);
        if (upIndex !== -1) {
            dbData[upIndex] = row;
        }
        else {
	    	return JSON.parse('{"error": "no index"}');
		}
    };

    this.delete = id => {
		console.log(id);
	    let delIndex = dbData.findIndex(element => element.id === id);
		console.log(delIndex);
	    if(delIndex !== -1) {
	        dbData.splice(delIndex, 1);
	    }
	    else {
	    	return JSON.parse('{"error": "no index"}');
		}
    };
}

//производный от EventEmitter объект приобретает функциональность,
// позволяющую генерировать и прослушивать события
util.inherits(DB, events.EventEmitter);
exports.DB = DB;
