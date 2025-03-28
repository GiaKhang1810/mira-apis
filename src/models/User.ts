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
    accessToken: {
        type: "String",
        required: false,
        unique: true,
        defaultValue: ""
    }
});

export default User;