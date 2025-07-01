const { uploadBulk } = require("../../Utils/meilisearchConnect");

const uploadAll = async (req, res) => {
  try {
    await uploadBulk();
    return res.status(200).json({ message: "Uploaded!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = uploadAll;
