var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MachineSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    number: Int16Array,
    serialNumber: Int16Array,
    machineType: String,
    cabinetType: String,
    mdi: String
})

var Machine = mongoose.model('Machine', MachineSchema);
module.exports = Machine;
