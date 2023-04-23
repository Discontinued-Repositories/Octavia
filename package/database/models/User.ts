import Mongoose from 'mongoose'
const { Schema, model } = Mongoose

export default model("User", new Schema({
  idU: { type: String }
}))