let fs = require("fs");

class IdFactory {
	constructor() {
		this._FIRST_OID = 0;
		this._path = null;
		this._data = null;
	}

	addFilePath(path) {
		this._path = path;
		this._init();
	}

	getNextId() {
		this._data.id++;
		this._saveFile();

		return this._data.id;
	}

	_loadFile() {
		let file = fs.readFileSync(this._path, "utf-8");

		if(file.length === 0) {
			return false;
		} else {
			return JSON.parse(file);
		}
	}

	_saveFile() {
		fs.writeFileSync(this._path, JSON.stringify(this._data));
	}
	

	_init() {
		this._data = this._loadFile();

		if(this._data === false) {
			this._data = { id: this._FIRST_OID };
			this._saveFile();
			this._data = this._loadFile();
		}
	}
}

module.exports = new IdFactory();