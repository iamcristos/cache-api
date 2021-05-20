import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const departmentSchema = new Schema({
  name: {
    type: String,
    required: [true, 'department name is required'],
    trim: true,
  },
  apiKey: {
    type: String,
    required: [true, 'apiKey is required'],
    trim: true,
  },
  contactPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'contactPerson',
  },
}, { strict: false, timestamps: true, versionKey: false });

departmentSchema.index({ '$**': 'text' });

const Department = model('department', departmentSchema);

export default Department;
