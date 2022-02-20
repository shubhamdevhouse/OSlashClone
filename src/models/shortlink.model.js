const mongoose = require('mongoose');

const { toJSON } = require('./plugins');
const shortlinkSchema = mongoose.Schema(
    {
      shortlink: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
        private: true,
      },
      url: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      tags: [{
        type: String,
        required: false,
        trim: true,
      }],
    },
    {
      timestamps: true,
    }
  );
shortlinkSchema.plugin(toJSON);
shortlinkSchema.statics.isShortlinkTaken = async function (link) {
  const shortlink = await this.findOne({ shortlink:link });
  return !!shortlink;
};

const Shortlink = mongoose.model('Shortlink', shortlinkSchema);
module.exports = Shortlink;