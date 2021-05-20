import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const contactPersonSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  telephone: {
    type: String,
    required: true,
    trim: true,
  },
}, { strict: false, timestamps: true, versionKey: false });

contactPersonSchema.index({ email: 1 });

contactPersonSchema.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('email must be unique'));
  } else {
    next();
  }
});

const ContactPerson = model('contactPerson', contactPersonSchema);

export default ContactPerson;
