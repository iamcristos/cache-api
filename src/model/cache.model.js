import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cacheSchema = new Schema({
  key: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
  },
}, { timestamps: true, versionKey: false });

cacheSchema.index({ key: 1 });

cacheSchema.pre('save', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

const cache = model('cache', cacheSchema);

export default cache;
