const client = require("./client");

const createUser = async ({ username, password }) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users (username, password)
            VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `,
      [username, password]
    );
    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
};

const getUser = async ({ username, password }) => {
  try {
    const {
      rows: [user],
    } = await client.query(`
            SELECT username, password
            FROM users
            WHERE username=$1;
        `, [username]);

    if (password === user.password) {
        delete user.password;
        return user;
    }
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const {
      rows: [user],
    } = await client.query(`
            SELECT * FROM users
            WHERE id=$1;
        `, [id]);
    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByUsername = async (username) => {
  try {
    const {
      rows: [user],
    } = await client.query(`
            SELECT * FROM users
            WHERE username=$1;
        `, [username]);
    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUserById,
  getUser
};
