const env = process.env;
const config = {
            db:{
            host: env.DB_HOST || 'localhost',
            user: env.DB_USER || 'root',
            password: env.DB_PASSWORD || '',
            database: env.DB_NAME || 'techlearn',
            port: env.DB_PORT || 3306
        },
        salt:76547,
        privatekey: "the website private key is very secure"
}

module.exports = config;