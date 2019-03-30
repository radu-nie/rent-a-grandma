"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
/** Service Job Provider Schema */
const AddressSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true }
});
exports.default = mongoose.model('Address', AddressSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvbW9kZWxzL2FkZHJlc3MubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBcUM7QUFDckMsdUNBQTJDO0FBaUIzQyxrQ0FBa0M7QUFDbEMsTUFBTSxhQUFhLEdBQVcsSUFBSSxpQkFBTSxDQUFDO0lBQ3JDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUN0QyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDN0MsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0NBQ3hELENBQUMsQ0FBQztBQUVILGtCQUFlLFFBQVEsQ0FBQyxLQUFLLENBQVcsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDIn0=