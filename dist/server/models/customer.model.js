"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
;
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
exports.default = mongoose.model('User', UserSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvc3JjL21vZGVscy9jdXN0b21lci5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFxQztBQUNyQyx1Q0FBc0Q7QUFNckQsQ0FBQztBQUVGLE1BQU0sVUFBVSxHQUFXLElBQUksaUJBQU0sQ0FBQztJQUNsQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUNyRCxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7Q0FDN0MsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsUUFBUSxDQUFDLEtBQUssQ0FBUSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUEifQ==