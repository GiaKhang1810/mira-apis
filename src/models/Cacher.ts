import db, { Model } from "../database/db";

const Cacher: Model<typeof db.define> = db.define("Cacher", {
    email: {
        type: "String",
        required: true,
        unique: true
    },
    verifyCode: {
        type: "String",
        required: true,
        unique: false
    },
    expiresAt: {
        type: "Number",
        required: true,
        unique: false
    }
});

export default Cacher;