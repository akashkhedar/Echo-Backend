const { getUser } = require("../Utils/meilisearchConnect");

const searchUser = async (req, res) => {
  try {
    const query = req.query.q;
    const user = await getUser(query);
    res.status(200).send(user);
  } catch (error) {
    console.log("error");
    res.status(500).send(error.message);
  }
};

module.exports = searchUser;
