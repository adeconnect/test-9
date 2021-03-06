const DataModel = require('./data_model');

class Project {
    constructor(id, name, abstract, authors, tags, createdBy) {
        this.id = id;
        this.name = name;
        this.abstract = abstract;
        this.authors = authors;
        this.tags = tags;
        this.createdBy = createdBy;
    }
}

class Projects extends DataModel {
    validate(obj) {
        this.errors = [];
        let properties = Object.keys(obj);

      /*  for(let i = 0; i < obj.length; i++){
            if(typeof obj.authors != 'array'){
                this.errors.push('Authors should be an array');
            } if(typeof obj.tags != 'array'){
                this.errors.push('Tags should be an array')
            }
        }*/

        for(let key in obj){
            if( key == 'authors' && !Array.isArray(obj[key])){
                this.errors.push('Authors should be an array');
            }else if( key == 'tags' && !Array.isArray(obj[key])){
                this.errors.push('Tags should be an array')
            }else if(obj[key] == '' || obj[key] == [] || obj[key] == null){
                if(key !== 'authors' && key !== 'tags'){
                    this.errors.push(key + ' should not be empty');
                }
            }
        }
       

        if(this.errors.length == 0){
            return true
        }else{
            return false
        }
    }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};