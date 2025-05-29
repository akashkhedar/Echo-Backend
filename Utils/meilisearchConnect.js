const { MeiliSearch } = require("meilisearch");
const User = require("../models/user");

const client = new MeiliSearch({
  host: "https://meilisearch-v1-8-swzw.onrender.com", // your Render URL
  apiKey: "frm8dmsaiu9gr449wxi1k1khncq7c1wy", // <-- must be passed!
});

const uploadBulk = async () => {
  const users = await User.find({});

  await client.index("users").addDocuments(users);

  await client
    .index("users")
    .updateSearchableAttributes(["fullname", "username"])
    .then((s) => console.log(s));
};

const getAllUser = async () => {
  try {
    console.log("hi");
    const search = client.index("users").search("demo");
    return search;
  } catch (error) {
    console.log(error.message);
  }
};

const addUser = async (user) => {
  await client.index("users").addDocuments(user);
};

const getUser = async (user) => {
  const result = await client.index("users").search(user, { limit: 10 });
  return result.hits;
};

const existingUser = async (username) => {
  const res = await client.index("users").search(username, { limit: 1 });
  return res;
};

module.exports = { uploadBulk, addUser, getUser, getAllUser, existingUser };
