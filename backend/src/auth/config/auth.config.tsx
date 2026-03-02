import { loadEnvFile } from 'process';
import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb'
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { admin } from 'better-auth/plugins';
import { sendEmail } from 'src/common/utils/sendEmail';
import  VerificateEmail from 'src/emails/verificateEmail';
loadEnvFile();
const client = new MongoClient(process.env.DB_URI as string, {
    auth: {
        username: process.env.USER_DB,
        password: process.env.PASSWORD_DB
    }
});
const db = client.db();
export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),

    emailVerification: {
        sendOnSignUp: true,
        async sendVerificationEmail({ token, url, user }, request) {
            void sendEmail({ to: user.email, subject: 'Verificacion de correo', EmailComponent: <VerificateEmail token={token} url={url} name={user.name} /> });
        },
    },
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
            redirectURI: 'http://localhost:3001/additional-info',
            prompt: 'select_account'
        }
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 7 * 24 * 60 * 60, // example: 5 * 60 => 5 mins
            strategy: 'jwt'

        }
    },
    plugins: [
        admin(),
    ],
});


