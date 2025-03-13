import { IUser } from '@src/models/User';
import { getRandomInt } from '@src/util/misc';
import * as bcrypt from 'bcrypt';
import orm from './MockOrm';


/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get one user.
 */
async function getOne(email: string): Promise<IUser | null> {
  const db = await orm.openDb();
  for (const user of db.users) {
    if (user.email === email) {
      return user;
    }
  }
  return null;
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: string): Promise<boolean> {
  const db = await orm.openDb();
  for (const user of db.users) {
    if (user.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all users.
 */
async function getAll(): Promise<IUser[]> {
  const db = await orm.openDb();
  return db.users;
}

/**
 * Add one user.
 */
async function add(user: IUser): Promise<void> {
  const db = await orm.openDb();
  user.id = getRandomInt().toString();
  user.passwordHash = await hashPassword(user.password);
  db.users.push(user);
  return orm.saveDb(db);
}

/**
 * Update a user.
 */
async function update(user: IUser): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === user.id) {
      const dbUser = db.users[i];
      db.users[i] = {
        ...dbUser,
        name: user.name,
        email: user.email,
      };
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one user.
 */
async function delete_(id: string): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === id) {
      db.users.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}


// **** Unit-Tests Only **** //

/**
 * Delete every user record.
 */
async function deleteAllUsers(): Promise<void> {
  const db = await orm.openDb();
  db.users = [];
  return orm.saveDb(db);
}

/**
 * Insert multiple users. Can't do multiple at once cause using a plain file 
 * for nmow.
 */
async function insertMult(
  users: IUser[] | readonly IUser[],
): Promise<IUser[]> {
  const db = await orm.openDb(),
    usersF = [ ...users ];
  for (const user of usersF) {
    user.id = getRandomInt().toString();
    user.created = new Date();
  }
  db.users = [ ...db.users, ...users ];
  await orm.saveDb(db);
  return usersF;
}



/**
 * Finds a user by their email address.
 * @param email - The email of the user to find.
 * @returns A promise that resolves to the user object or null if not found.
 */
async function findUserByEmail(email: string)
: Promise<IUser | null> {
  const db = await orm.openDb();
  const user = db.users.find(user => user.email === email);
  return user ?? null;
}




/**
 * Verifies the user's password.
 * @param user - The user object.
 * @param password - The password to verify.
 * @returns A promise that resolves'
 *  to true if the password is correct, false otherwise.
 */
async function verifyPassword(user: IUser
  , password: string): Promise<boolean> {
  const pass = user?.passwordHash ?? '';
  return    await bcrypt.compare(password,pass);
}

/**
 * Mock function to simulate password hashing.
 * @param password - The password to hash.
 * @returns A hashed password string.
 */
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}






/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getOne,
  persists,
  findUserByEmail,
  verifyPassword,
  getAll,
  add,
  update,
  delete: delete_,
  deleteAllUsers,
  insertMult,
} as const;
