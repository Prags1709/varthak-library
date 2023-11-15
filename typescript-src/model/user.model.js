"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
var UserRole;
(function (UserRole) {
    UserRole["Creator"] = "CREATOR";
    UserRole["Viewer"] = "VIEWER";
    UserRole["ViewAll"] = "VIEW_ALL";
})(UserRole || (UserRole = {}));
const userSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: [String],
        enum: [UserRole.Creator, UserRole.Viewer, UserRole.ViewAll],
        default: [UserRole.Viewer],
    },
});
const UserModel = (0, mongoose_1.model)('user', userSchema);
exports.UserModel = UserModel;
