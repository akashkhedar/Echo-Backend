const { getUser } = require("../Utils/meilisearchConnect");

const searchUser = async (req, res) => {
  try {
    const query = req.query.q;
    const user = await getUser(query);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = searchUser;
