const approvalTemplate = ({username})=>{
   return `<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 20px 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border: 1px solid #cccccc;">
                    <tr>
                        <td align="center" style="padding: 40px 0; background-color: #007bff; color: #ffffff;">
                            <h1 style="margin: 0; font-size: 28px;">{{appName}}</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #333333;">Congratulations, ${username}!</h2>
                            <p style="margin: 0 0 25px 0; color: #555555; line-height: 1.5;">
                                We are thrilled to inform you that your request to become a provider on our platform has been reviewed and officially approved. Welcome to our community of skilled professionals!
                            </p>
                            <p style="margin: 0 0 25px 0; color: #555555; line-height: 1.5;">
                                Your next step is to set up your public profile. This is where you can add your bio, services, availability, and a profile picture to attract customers.
                            </p>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <a href="{{profileLink}}" target="_blank" style="display: inline-block; padding: 15px 25px; background-color: #28a745; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                                            Complete Your Profile Now
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px; background-color: #eeeeee; text-align: center;">
                            <p style="margin: 0; color: #888888; font-size: 12px;">
                                You received this email because your provider application was approved.
                                <br>
                                &copy; 2025 Skill Marketplace All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>`
}

export {
    approvalTemplate
}