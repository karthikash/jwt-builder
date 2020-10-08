import 'dotenv/config';

const constants = {
    'dev': {
        ENV: process.env.ENV,
        HOST: process.env.HOST,
        PORT: process.env.PORT,
        API_VERSION: process.env.API_VERSION
    },
    'staging': {

    },
    'prod': {
        ENV: process.env.ENV,
        HOST: process.env.HOST,
        PORT: process.env.PORT,
        API_VERSION: process.env.API_VERSION
    }
}

export default constants[process.env.ENV];