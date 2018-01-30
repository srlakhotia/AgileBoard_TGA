const PresidentModal = require('./model');

class President {
    constructor() {
        this.findPresident = (name) => {
            const person = PresidentModal.findOne({ name }, (err, data) => {
                return data;
            });
            return person;
        };
    }
}

module.exports = {
    President
}