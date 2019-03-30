"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const baseuser_model_1 = require("./baseuser.model");
;
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
baseuser_model_1.default.discriminator("Customer", new mongoose_1.Schema({
    customerProperty: String
}));
exports.default = mongoose.model('User', UserSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvc3JjL21vZGVscy9jdXN0b21lci5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFxQztBQUNyQyx1Q0FBc0Q7QUFDdEQscURBQXdDO0FBTXZDLENBQUM7QUFFRixNQUFNLFVBQVUsR0FBVyxJQUFJLGlCQUFNLENBQUM7SUFDbEMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDckQsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0NBQzdDLENBQUMsQ0FBQTtBQUVGLHdCQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxJQUFJLGlCQUFNLENBQUM7SUFDMUMsZ0JBQWdCLEVBQUUsTUFBTTtDQUMzQixDQUFDLENBQUMsQ0FBQztBQUVKLGtCQUFlLFFBQVEsQ0FBQyxLQUFLLENBQVEsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDIn0=