import dotenv from 'dotenv';


dotenv.config({path: process.env.ENV_FILE});

const getEnviroment = (name: string) => {
  try {
    const value = process.env[name];

    if (!value) {
      throw Error(`An enviroment variable ${name} not found`);
    }

    return value;
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    process.exit();
  }
}

export const database = {
  host: getEnviroment('DATABASE_HOST'),
  user: getEnviroment('DATABASE_USER'),
  password: getEnviroment('DATABASE_PASSWORD'),
  database: getEnviroment('DATABASE_NAME'),
};