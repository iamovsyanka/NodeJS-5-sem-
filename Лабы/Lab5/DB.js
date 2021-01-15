var util = require('util');
var events = require('events');

var dbData = [
				{id: 0, name: 'Иванов И.И.', bday: '2001-01-01'},
				{id: 1, name: 'Иванов А.И.', bday: '2001-01-02'},
				{id: 2, name: 'Иванов К.И.', bday: '2001-01-03'},
				{id: 3, name: 'Иванов С.И.', bday: '2001-01-04'},
				{id: 4, name: 'Иванов П.И.', bday: '2001-01-05'}
			];

function DB() {
	this.getIndex = () => {
		return dbData.length;
	};

    this.select = () => {
        return dbData;
    };

    this.insert = (row) => {
        dbData.push(row);
    };

    this.update = (row) => {
        let upIndex = dbData.findIndex(element => element.id === row.id);
            
        if (upIndex !== -1) {
            dbData[row.id] = row;
        }
        else {
	    	return JSON.parse('{"error": "no index"}');    	
		}
    };
    
    this.delete = (id) => {
	    let delIndex = dbData.findIndex(element => element.id === id);

	    if(delIndex !== -1) {
	        dbData.splice(delIndex, 1);
	    } 
	    else {
	    	return JSON.parse('{"error": "no index"}');    	
		}
    };

    this.commit = () => {}
}

util.inherits(DB, events.EventEmitter);
exports.DB = DB;		