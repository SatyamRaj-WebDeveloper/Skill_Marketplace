

const applicationTemplate = ({ user, message, dashboardLink }) => {
  return `
  <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            
            <tr>
              <td align="center" style="background-color: #4A90E2; padding: 30px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px;">New Application Received</h1>
              </td>
            </tr>

            <tr>
              <td style="padding: 40px 30px;">
                <p style="color: #555555; font-size: 16px; line-height: 1.5;">Hello Admin,</p>
                <p style="color: #555555; font-size: 16px; line-height: 1.5;">A new application to become a provider has been submitted. Please review the details below.</p>
                
                <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">
                
                <h2 style="color: #333333; font-size: 20px;">Applicant Details</h2>
                <p style="color: #555555; font-size: 16px;"><strong>Name:</strong> ${user.username}</p>
                <p style="color: #555555; font-size: 16px;"><strong>Email:</strong> ${user.email}</p>
                
                <h2 style="color: #333333; font-size: 20px; margin-top: 20px;">Message</h2>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; border: 1px solid #eeeeee;">
                  <p style="color: #555555; font-size: 16px; margin: 0; white-space: pre-wrap;">${message}</p>
                </div>

                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                  <tr>
                    <td align="center">
                      <a href="${dashboardLink}" target="_blank" style="background-color: #28a745; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px; display: inline-block;">
                        View in Admin Dashboard
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding: 20px; background-color: #eeeeee; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                <p style="color: #888888; font-size: 12px; margin: 0;">&copy; 2025 Skill Marketplace. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  `;
};

export default applicationTemplate;