import db from "../db";

const User = db.define("User", {
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

export default async function (): Promise<Record<string, any>> {
    await User.sync();
    return User;
}