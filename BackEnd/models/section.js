import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  sec_Id: { type: String, required: true, unique: true },
  sectionS: { type: String, required: true },
  sectionE: { type: String, required: true }
});

sectionSchema.index({ sectionS: 1, sectionE: 1 }, { unique: true });

sectionSchema.pre("save", async function (next) {
  try {
    const existing = await this.constructor.findOne({
      sectionS: this.sectionS,
      sectionE: this.sectionE
    });

    if (existing) {
      const error = new Error("Section with same start and end already exists");
      return next(error);
    }

    next();
  } catch (err) {
    next(err);
  }
});

const Section = mongoose.model("Section", sectionSchema);
export default Section;
