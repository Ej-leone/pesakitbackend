import jsonfile from 'jsonfile';

import ENV from '@src/common/ENV';
import { NodeEnvs } from '@src/common/constants';
import { IUser } from '@src/models/User';
import { IProduct } from '@src/models/Products';
import { ICart } from '@src/models/Cart';


/******************************************************************************
                                Variables
******************************************************************************/

const DB_FILE_NAME = (
  ENV.NodeEnv === NodeEnvs.Test 
    ? 'database.test.json' 
    : 'database.json'
);


/******************************************************************************
                                Types
******************************************************************************/

interface IDb {
  users: IUser[];
  products: IProduct[];
  cart: ICart[];
}


/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Fetch the json from the file.
 */
function openDb(): Promise<IDb> {
  return jsonfile.readFile(__dirname + '/' + DB_FILE_NAME) as Promise<IDb>;
}

/**
 * Update the file.
 */
function saveDb(db: IDb): Promise<void> {
  return jsonfile.writeFile((__dirname + '/' + DB_FILE_NAME), db);
}


/******************************************************************************
                                Export default
******************************************************************************/

export default {
  openDb,
  saveDb,
} as const;
