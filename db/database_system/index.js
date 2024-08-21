const fs = require("fs")
const path = require("path")
const Table = require("./table")

class Database {
    constructor(table_dir, table_config_dir){
        this.table_dir = path.resolve(table_dir)
        this.config_dir = path.resolve(table_config_dir)
        this.tables = {}
        this.load()
    }

    loadTable(name){
        let file = path.join(this.table_dir, name + ".json")
        let config = require(path.resolve(this.config_dir, name + ".js"))
        this.tables[name] = new Table(file, config)
    }

    listFoundTables(){
        let files = fs.readdirSync(this.table_dir)
        files = files.filter(a => a.endsWith(".json"))
        files = files.map(a => a.slice(0, -5)) //remove .json
        return files
    }

    listLoadedTables(){
        return this.tables
    }

    load(){
        let tables = this.listFoundTables()
        for(let table of tables){
            // let tableclass = require(path.join(this.table_dir, table, ".json"))
            // console.log(path.join(this.table_dir, table))
            // this.tables.push(new tableclass())
            this.loadTable(table)
        }
    }
}

module.exports = Database