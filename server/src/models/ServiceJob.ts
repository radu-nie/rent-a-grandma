//import mongoose = require("mongoose");
import { Document, Schema, Model, model } from "mongoose";
//import { ServiceJob } from '../helpers/ServiceJob';

//var Schema = mongoose.Schema;

var serviceJobSchema = new Schema({ name: String, description: String });
//type ServiceJobType = ServiceJob & mongoose.Document;
//type ServiceJobType = ServiceJob & Document;


//var ServiceJobModel = mongoose.model<ServiceJobType>("ServiceJob", serviceJobSchema);
//mongoose.exports = ServiceJobModel;
//const ServiceJobModel = model<ServiceJobType>("ServiceJob", serviceJobSchema);
//export { ServiceJobModel }

var ServiceJob = mongoose.model("Serviceob", serviceJobSchema);
mongoose.exports = ServiceJob;

