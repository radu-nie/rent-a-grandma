"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const baseuser_model_1 = require("./baseuser.model");
/** Service Job Provider Schema */
const ServiceJobProviderSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true }
});
baseuser_model_1.default.discriminator("ServiceJobProvider", new mongoose_1.Schema({
    serviceJobProperty: String
}));
exports.default = mongoose.model('ServiceJob', ServiceJobProviderSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZUpvYlByb3ZpZGVyLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2VydmVyL3NyYy9tb2RlbHMvc2VydmljZUpvYlByb3ZpZGVyLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXFDO0FBQ3JDLHVDQUE0QztBQUU1QyxxREFBd0M7QUFTeEMsa0NBQWtDO0FBQ2xDLE1BQU0sd0JBQXdCLEdBQVcsSUFBSSxpQkFBTSxDQUFDO0lBQ2hELElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUN0QyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDN0MsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0NBQ3hELENBQUMsQ0FBQztBQUVILHdCQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixFQUFFLElBQUksaUJBQU0sQ0FBQztJQUNwRCxrQkFBa0IsRUFBRSxNQUFNO0NBQzdCLENBQUMsQ0FBQyxDQUFDO0FBRUosa0JBQWUsUUFBUSxDQUFDLEtBQUssQ0FBYyxZQUFZLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyJ9