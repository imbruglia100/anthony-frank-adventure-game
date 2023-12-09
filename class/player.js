const { Food } = require('./food');

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    getItemByName(name) {
        // Retrieves an item from a player's inventory by item name
        let item;
        this.items.forEach(ele => {
            if(ele.name === name){
                item = ele
            }
        })
        return item ? item : null
    }

    takeItem(itemName) {
        // Picks up an item from the current room into the player's inventory
        this.currentRoom.items.forEach((ele, i) => {
            if (ele.name.toLowerCase() === itemName.toLowerCase()){
                this.items.push(ele)
                this.currentRoom.items.splice(i, 1)
            }
        })
    }

    dropItem(itemName) {
        // Drops an item the player is holding into their current room

        let item = this.getItemByName(itemName)
        let index = this.items.indexOf(item)

        if(item){
            this.currentRoom.items.push(item)
            this.items.splice(index, 1)
        }else{
            console.log("No Item found.\n")
        }
    }

    eatItem(itemName) {
        // Allow the player to eat food items, but not non-food items
        let food = this.getItemByName(itemName)

        if(food instanceof Food){
            this.dropItem(itemName)
        }else{
            console.log("Cannot eat this!")
        }
    }


}

module.exports = {
  Player,
};
