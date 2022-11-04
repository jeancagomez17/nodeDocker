const {Schema, model} = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new Schema({
  name: {
    type: String,
  }, 
  email: {
    type: String
  },
  password: {
    type: String
}

 })
userSchema.methods.encryptPassword = async (pas) =>{
  const salt = await bcryptjs.genSalt(10)
  const hash = await bcryptjs.hash(pas, salt)
  return hash
}
userSchema.methods.validatePassword = function (password){
  return bcryptjs.compareSync(password, this.password)
}

 module.exports =  model('User', userSchema)