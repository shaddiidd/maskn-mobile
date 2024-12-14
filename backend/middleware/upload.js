const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure Multer storage to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'properties', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allow only these file formats
    use_filename: true,
  },
});

const upload = multer({ storage });

module.exports = upload;
