import Mongoose from 'mongoose'
const { Schema, model } = Mongoose

export default model("Guild", new Schema({
  idS: { type: String }
}))