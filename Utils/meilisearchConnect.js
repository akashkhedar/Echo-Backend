const { MeiliSearch } = require("meilisearch");
const User = require("../models/user");

const client = new MeiliSearch({
  host: "https://meilisearch-v1-8-swzw.onrender.com", // your Render URL
  apiKey: "frm8dmsaiu9gr449wxi1k1khncq7c1wy", // <-- must be passed!
});

const uploadBulk = async () => {
  const users = await User.find({});

  // Upload documents with _id as the primary key
  await client.index("users").addDocuments(users, { primaryKey: "_id" });

  // Set searchable attributes
  await client
    .index("users")
    .updateSearchableAttributes(["fullname", "username"]);

  // Set filterable attributes
  await client.index("users").updateFilterableAttributes(["username"]);

  console.log("Users uploaded and index settings updated.");
};

const getAllUser = async () => {
  try {
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

const existingUser = async (username, userId) => {
  const res = await client.index("users").search("", {
    filter: `username = "${username.toLowerCase()}"`,
    limit: 1,
  });

  const hit = res.hits[0];

  return hit && hit._id !== userId;
};

module.exports = { uploadBulk, addUser, getUser, getAllUser, existingUser };
