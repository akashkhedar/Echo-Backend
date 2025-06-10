const { verifyResetTkn } = require("../../Utils/redis");

const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;
    const result = await verifyResetTkn(token);

    if (result) {
      return res.status(200).json({ valid: true });
    }
    return res.status(409).json({ valid: false });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = verifyResetToken;
