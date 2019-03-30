"use strict";
// export { }
Object.defineProperty(exports, "__esModule", { value: true });
// var mongoose = require("mongoose");
// const BaseUser = require("../models/User");
// var Schema = mongoose.Schema;
// const ServiceJobProviderSchema = BaseUser.discriminator("ServiceJobProvider", new Schema({
//     services: [{ type: Schema.Types.ObjectId, ref: "ServiceJob" }]
// }));
// exports = mongoose.model("ServiceJobProvider", ServiceJobProviderSchema);
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
/** Service Job Provider Schema */
const ServiceJobProviderSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true }
});
exports.default = mongoose.model('ServiceJob', ServiceJobProviderSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZUpvYlByb3ZpZGVyLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2VydmVyL3NyYy9tb2RlbHMvc2VydmljZUpvYlByb3ZpZGVyLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxhQUFhOztBQUViLHNDQUFzQztBQUN0Qyw4Q0FBOEM7QUFFOUMsZ0NBQWdDO0FBRWhDLDZGQUE2RjtBQUM3RixxRUFBcUU7QUFDckUsT0FBTztBQUVQLDRFQUE0RTtBQUU1RSxxQ0FBcUM7QUFDckMsdUNBQTRDO0FBVTVDLGtDQUFrQztBQUNsQyxNQUFNLHdCQUF3QixHQUFXLElBQUksaUJBQU0sQ0FBQztJQUNoRCxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDdEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQzdDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtDQUN4RCxDQUFDLENBQUM7QUFFSCxrQkFBZSxRQUFRLENBQUMsS0FBSyxDQUFjLFlBQVksRUFBRSx3QkFBd0IsQ0FBQyxDQUFDIn0=