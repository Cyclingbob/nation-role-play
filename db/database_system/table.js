const fs = require("fs")
const path = require("path")

class Table {
    constructor(table_path, table_config){
        this.data = []
        this.path = table_path
        this.config = table_config
        this.name = path.basename(table_path).slice(0, -5)
        this.load()
    }

    load(){
        try {
            const fileData = fs.readFileSync(this.path, 'utf8');
            this.data = JSON.parse(fileData);
        } catch (error) {
            console.error('Failed to load data from table ' + this.name + ": Couldn't parse file " + this.path + "\n", error);
            this.data = [];
        }
    }

    save() {
        try {
            const fileData = JSON.stringify(this.data, null, 2);
            fs.writeFileSync(this.path, fileData, 'utf8');
        } catch (error) {
            console.error('Failed to save data:', error);
        }
    }

    readAll() {
        return this.data;
    }

    find(key, value) {
        return this.data.filter(entry => entry[key] === value);
    }

    findOne(key, value){
        return this.data.find(entry => entry[key] === value);
    }

    add(entry) {
        for(const property in entry){
            console.log(property)
        }
        // this.data.push(entry);
        // this.save();
    }

    update(key, value, updatedEntry){
        let updated = false;
        this.data = this.data.map(entry => {
            if (entry[key] === value) {
                updated = true;
                return { ...entry, ...updatedEntry };
            }
            return entry;
        });

        if (updated) {
            this.save(); // Save changes to the file
        }

        return updated;
    }

    // delete(key, value) {
    //     const originalLength = this.data.length;
    //     this.data = this.data.filter(entry => entry[key] !== value);

    //     if (this.data.length !== originalLength) {
    //         this.save(); // Save changes to the file
    //         return true;
    //     }

    //     return false;
    // }
}

module.exports = Table