const { default: mongoose } = require("mongoose");
let Mongoogse = require("mongoose");


const employeeSchema = Mongoogse.Schema(
    {
        name: String,
        position: String,
        location: String,
        salary: Number
    }
);

let employeeModel = Mongoogse.model("employeeDetails", employeeSchema);
module.exports = employeeModel;