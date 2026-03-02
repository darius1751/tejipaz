import path from "path";
import { loadEnvFile } from "process";
import { MailerOptions } from "@nestjs-modules/mailer";
import { ReactAdapter } from "@webtre/nestjs-mailer-react-adapter";
loadEnvFile();
export const emailConfig = {
    transport: {
        service: 'gmail',
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.GOOGLE_OAUTH_CLIENT_USER,
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_OAUTH_CLIENT_REFRESH_TOKEN,
            accessToken: process.env.GOOGLE_OAUTH_CLIENT_ACCESS_TOKEN,
        },
    },
    defaults: {
        from: "Tejipaz"
    },
    template: {
        dir: path.join(__dirname, "..", "..", "emails"),
        adapter: new ReactAdapter(),
    }
} as MailerOptions
