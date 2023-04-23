import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  companyId: Number,
  company: String,
  headline: String,
  description: String,
  primaryText: String,
  imgUrl: String
});
const Company = mongoose.model("Company", CompanySchema);
export default Company;
