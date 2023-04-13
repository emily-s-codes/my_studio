import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
    }
});

export const resetPasswordEmail = async (req, res) => {
    console.log('request', req.body)
    const message = {
        from: "no-reply@mystudio.com",
        to: req.body.email,
        subject: `MyStudio — password reset request`,
        //  
        text: ``,
        html: `<h1>Reset your MyStudio password</h1><br>
        <p>You can use the link below to reset your password. If you didn't make this request you can ignore this message. Your password will not be reset.</p>
        <br>
        <br>
        <p>— ❤️MyStudio Team</p>`
    }

    transport.sendMail(message, (err, info) => {
        console.log(info)
        if (err) return res.status(500).json({ message: err })
        return res.status(200).json({ message: 'sent' })
    })
}

