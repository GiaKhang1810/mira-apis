import db, { Model } from "../database/db";

const User: Model<typeof db.define> = db.define("User", {
    userID: {
        type: "String",
        required: true,
        unique: true
    },
    username: {
        type: "String",
        required: false,
        unique: false,
        defaultValue: "User"
    },
    email: {
        type: "String",
        required: true,
        unique: true
    },
    password: {
        type: "String",
        required: true,
        unique: false
    },
    apikey: {
        type: "Object",
        required: false,
        unique: false,
        defaultValue: {}
    }
});

export default User;