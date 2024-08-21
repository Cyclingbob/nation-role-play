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

    checkTypes(entry){
        let bad = []
        for(const property of entry){
            if(!entry[property] instanceof this.config[property]){
                bad.push(property)
            }
        }
        return bad
    }

    load(){ //implement any decryption here
        try {
            const fileData = fs.readFileSync(this.path, 'utf8');
            this.data = JSON.parse(fileData);
        } catch (error) {
            console.error('Failed to load data from table ' + this.name + ": Couldn't parse file " + this.path + "\n", error);
            this.data = [];
        }
    }

    save() { //implement any encryption here
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

        let expecting_properties = Object.keys(this.config)
        let given_properties = Object.keys(entry)
        let missing = expecting_properties.filter(a => !given_properties.includes(a))
        let extra = given_properties.filter(a => !expecting_properties.includes(a))
        console.log(extra)

        if(extra.length > 1){
            throw new Error(`Did not expect properties ${extra.join(', ')} when adding entry in table ${this.name}.`)
        } else if(extra.length === 1){
            throw new Error(`Did not expect property ${extra[0]} when adding entry in table ${this.name}.`)
        }
        
        if(missing.length > 1){
            throw new Error(`Missing properties ${missing.join(', ')} when adding entry in table ${this.name}.`)
        } else if(missing.length === 1){
            throw new Error(`Missing property ${missing[0]} when adding entry in table ${this.name}.`)
        }

        let wrongTypeFields = this.checkTypes(entry)
        if(wrongTypeFields.length > 1){
            throw new Error(`Properties incorrect type for ${wrongTypeFields.join(', ')} when adding entry in table ${this.name}.`)
        } else if(wrongTypeFields.length === 1){
            throw new Error(`Properties incorrect type for ${wrongTypeFields.join(', ')} when adding entry in table ${this.name}.`)
        }
        
        this.data.push(entry)
        this.save()

        return entry

    }

    update(key, value, updated_entry){

        let expecting_properties = Object.keys(this.config)
        let given_properties = Object.keys(updated_entry)
        let extra = given_properties.filter(a => !expecting_properties.includes(a))

        if(extra.length > 1){
            throw new Error(`Did not expect properties ${extra.join(', ')} when updating entry in table ${table.name}.`)
        } else if(extra.length === 0){
            throw new Error(`Did not expect property ${extra[0]} when adding updating entry in table ${table.name}.`)
        }

        let updated = false;
        this.data = this.data.map(entry => {
            if (entry[key] === value) {
                updated = true
                return { ...entry, ...updatedEntry }
            }
            return entry
        });

        if (updated) {
            this.save()
        }

        return updated
    }

    delete(key, value) {
        const original_length = this.data.length
        this.data = this.data.filter(entry => entry[key] !== value)

        if (this.data.length !== original_length) {
            this.save()
            return true
        }

        return false;
    }

    getLength(){
        return this.data.length
    }
}

module.exports = Table