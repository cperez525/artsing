const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    character_name: {
        type: String,
        required: "You must enter the character's name."
    },
    opera_show_name: {
        type: String,
        required: "You must enter the name of the opera or show."
    },
    composer: {
        type: String,
        required: "You must enter then ame of the composer of this piece."
    }
});

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;