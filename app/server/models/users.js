const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.matricNumber = matricNumber;
        this.program = program;
        this.graduationYear = graduationYear;
    }

    getFullName() {
        return this.firstname + ' ' + this.lastname;
    }
}

class Users extends DataModel {
    authenticate(email, password) {
      let authentic = this.data.find(item => item.email == email && item.password == password)
      return authentic ? true : false
    }

    getByEmail(email) {
     let foundEmail =  this.data.find(item => item.email == email);
     if(foundEmail){
         return foundEmail;
     }else{
         return null
     }

    }

    getByMatricNumber(matricNumber) {
        let foundMatric = this.data.find(item => item.matricNumber == matricNumber);
        if(foundMatric){
            return foundMatric;
        }else{
            return null
        }
    }

    validate(obj) {
        this.errors = [];
        let props = Object.keys(obj);
        let emptytest, emailtest, matrictest, pwtest = false; 

        for(let i = 0; i < props.length; i++){
            if(obj[props[i]] == ''){
                emptytest = true;
                this.errors.push(`${props[i]} cannot be empty`)
            }
        }


  //      for(let i = 0; i < this.data.length; i++){
    //        if(this.data[i].email == obj.email){
      //          emailtest = true;
        //        this.error.push(`A user with ${obj.email} address already exists`)
          //  }
        //}

        this.data.forEach(item => {
            if(item.email == obj.email){
                emailtest = true;
                this.errors.push(`A user with ${obj.email} address already exists`)
            }

        })

        for(let i = 0; i < this.data.length; i++){
            if(this.data[i].matricNumber == obj.matricNumber){
                matrictest = true;
                this.errors.push(`A user with ${obj.matricNumber} already exists`)
            }
        }

        if(obj.password.length < 7){
            pwtest = true;
            this.errors.push('Password should have at least 7 characters');
        }

        if(emptytest || emailtest || matrictest || pwtest){
            return false;
        }else{
            return true;
        }

    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};