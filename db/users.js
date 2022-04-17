const client = require("./client");

const createUser = async ({ username, password }) => {
  // const SALT_COUNT = 10;

  // bcrypt.hash(password, SALT_COUNT, function(err, hashedPassword) {
  //   createUser({
  //     username,
  //     password: hashedPassword // not the plaintext
  //   });
  // });
  
  // // inside of getUser({username, password})
  // const user = await getUserByUserName(username);
  // const hashedPassword = user.password;
  
  // bcrypt.compare(password, hashedPassword, function(err, passwordsMatch) {
  //   if (passwordsMatch) {
  //     // return the user object (without the password)
  //   } else {
  //     throw SomeError;
  //   }
  // });

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
    const user = await client.query(`
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
  getUser,
  getUserByUsername
};
