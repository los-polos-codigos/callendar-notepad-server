import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sms_api_schema = new Schema({
  status: {
    type: Number,
    require: 200,
  },
});

const sms_api = mongoose.model("sms_test", sms_api_schema);

export default sms_api;
