const { Item } = require("./item");

class Food extends Item {
    constructor(name, desc){
        super(name, desc)
    }

}

module.exports = { Food, };
