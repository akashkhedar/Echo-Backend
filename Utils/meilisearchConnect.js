const { MeiliSearch } = require("meilisearch");
const User = require("../models/user");

const client = new MeiliSearch({
  host: "https://meilisearch-sfl6.onrender.com",
  apiKey: "mastermind@260204",
});

const uploadBulk = async () => {
  const users = await User.find({});

  await client.index("users").addDocuments(users, { primaryKey: "_id" });

  await client
    .index("users")
    .updateSearchableAttributes(["fullname", "username"]);

  console.log("Uploaded users and set searchable fields!");
};

const addUser = async (user) => {
  await client.index("users").addDocuments(user, { primaryKey: "_id" });
};

const getUser = async (user) => {
  console.log(user);
  const result = await client.index("users").search(user);
  console.log(result);
  return result.hits;
};

module.exports = { uploadBulk, addUser, getUser };
