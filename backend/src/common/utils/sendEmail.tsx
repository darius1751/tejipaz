import React from "react";
import { render } from "@react-email/components";
import { createTransport } from "nodemailer";
import { emailConfig } from "../config/email.config";

type Args = {
    from?: string;
    to: string;
    subject?: string;
    EmailComponent: React.ReactNode;
}
const transport = createTransport(emailConfig.transport);
export const sendEmail = async ({ from = 'sender@server.com', to, subject, EmailComponent }: Args) => {
    const email = await render(EmailComponent);
    await transport.sendMail({
        from,
        to,
        subject,
        html: email,
    })
}
