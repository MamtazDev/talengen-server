require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { client_Url, server_Url } = require("./url");

const generateToken = async (user) => {
  return jwt.sign(
    {
      name: user.name,
      email: user.email,
      _id: user?._id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "7days",
    }
  );
};

const sendVerificationCode = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mohi.opediatech@gmail.com",
      pass: "xhiqdlmcosbajqpw",
      // user: "mohisilva1@gmail.com",
      // pass: "peqprjkgjiikugvk",
    },
  });

  const mailOptions = {
    from: "mohisilva1@gmail.com",
    to: email,
    subject: "Email Verification",
    html: `
 

    <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Email Template</title>
  <style type="text/css" rel="stylesheet" media="all">
    @import url('https://fonts.googleapis.com/css?family=Roboto');

    body {
      width: 100% !important;
      height: 100%;
      margin: 0;
      -webkit-text-size-adjust: none;
    }

    td {
      word-break: break-word;
    }

    body,
    td,
    th {
      font-family: 'Roboto', sans-serif;
    }
    p{
      font-weight:"bold"
    }
  </style>
</head>

<body
  style="background-image: url(https://i.postimg.cc/25sqFTKn/Email-Body.png) !important; background-repeat: no-repeat; background-size: cover; color: white;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td style="padding: 80px;" align="center">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <!-- Email Body -->
          <tr>
            <td style="text-decoration: none;" cellpadding="0" cellspacing="0">
              <table align="center" cellpadding="0" cellspacing="0" role="presentation">
                <!-- Body content -->
                <tr>
                  <td class="content-cell">
                    <div style="text-align: center;">
                      <a href="#">
                        <img src="https://i.postimg.cc/j5Tps2K7/logo-2.png" alt="logo">
                      </a>
                      <!-- Action -->
                      <table align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td align="center">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                              <tr>
                                <td align="center">
                                  <a href="#" target="_blank"
                                    style="font-size: 24px; font-weight: 600; color: white; text-decoration: none;">
                                    Verify Your Email Address
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <table role="presentation">
                        <tr>
                          <td>
                            <p style="font-size: 22px; color: white; font-weight: 600;">
                              Please click the button below to verify your email address.
                            </p>
                            <p style="margin-top: 30px; margin-bottom: 50px; cursor:pointer;">
                           

                              <input type="hidden" name="email" value="user@example.com"> <!-- Replace with your data -->
                            
                              
                              <a href="${client_Url}/verifysuccess?email=${email}&otp=${otp}" target="_blank">
                              <button  style="text-decoration: none; background-color: #FF4700; border: 0; font-size: 16px; font-weight: 600; color: white;  padding: 10px 22px; border-radius: 20px; cursor: pointer; outline: none; border: none;">
                                VERIFY EMAIL ADDRESS
                              </button>
                              </a>
                         
                          </p>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td>
              <table align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="font-size: 22px;" >
                    <p>
                      If you did not create an account, no further action is required.
                    </p>
                    <strong>
                      Regards,
                      <br>TalenGen Malaysia
                    </strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>

</html>

    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      return true;
    }
  });

  // if (emailSent === true) {
  //   return true;
  // }
};
const sendVerificationCodeForReset = async (user, ) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mohi.opediatech@gmail.com",
      pass: "xhiqdlmcosbajqpw",
    },
  });

  const mailOptions = {
    from: "mohisilva1@gmail.com",
    to: user?.email,
    subject: "Email Verification",
    html: `
 
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
    
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      <title>Email Template</title>
      <style type="text/css" rel="stylesheet" media="all">
        @import url('https://fonts.googleapis.com/css?family=Roboto');
    
        body {
          width: 100% !important;
          height: 100%;
          margin: 0;
          background-image: url(https://i.postimg.cc/25sqFTKn/Email-Body.png);
          -webkit-text-size-adjust: none;
          font-family: 'Roboto', sans-serif;
        }
    
        td {
          word-break: break-word;
        }
    
        body,
        td,
        th {
          font-family: 'Roboto', sans-serif;
        }
      </style>
    </head>
    
    <body
      style="background-image: url(https://i.postimg.cc/25sqFTKn/Email-Body.png) !important; background-repeat: no-repeat; background-size: cover; color: white;">
    
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td style="padding: 80px;" align="center">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <!-- Email Body -->
              <tr>
                <td width="570" cellpadding="0" cellspacing="0">
                  <table align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                    <!-- Body content -->
                    <tr>
                      <td class="content-cell">
    
                        <div style="text-align: center;">
    
                          <a href="#">
                            <img src="https://i.postimg.cc/j5Tps2K7/logo-2.png" alt="logo">
                          </a>
    
                          <!-- Action -->
                          <table align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td align="center">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                  <tr>
                                    <td align="center">
                                 

                                    <a href="${client_Url}/reset?email=${user?.email}" target="_blank">
                                      <button style="text-decoration: none; background-color: #FF4700; border: 0; font-size: 16px; font-weight: 600; color: white; padding: 10px 22px; border-radius: 20px; cursor: pointer; outline: none; border: none;">
                                        Reset your password
                                      </button>
                                    </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
  
                          </table>
    
                          <table role="presentation">
                            <tr>
                              <td>
                                <p>
                                  We've receive a request to reset the password for TalenGen account associated with
                                  <b style="color: white;">${user?.email}</b>
                                </p>
                                <p>
                                  You can reset your password by clicking the link below:
                                </p>
                                <p style="display: none; margin-top: 30px; margin-bottom: 50px;">
                                  <a href="#"
                                    style="text-decoration: none; background-color: #FF4700; border: 0; font-size: 16px; font-weight: 600; color: white; padding: 10px 22px; border-radius: 20px;">
                                    RESET YOUR PASSWORD
                                  </a>
                                </p>
    
                              </td>
                            </tr>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td>
                        <p>
                          If you did not request a new password, please contact us immediately by replying to this email.
                        </p>
                        <strong>
                          Regards,
                          <br>TalenGen Malaysia
                        </strong>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    
    </html>

    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      return true;
    }
  });

  // if (emailSent === true) {
  //   return true;
  // }
};

module.exports = {
  generateToken,
  sendVerificationCode,
  sendVerificationCodeForReset
};



   // <!doctype html>
    // <html ⚡4email data-css-strict>
    
    // <head>
    //   <meta charset="utf-8">
    //   <meta name="x-apple-disable-message-reformatting">
    //   <style amp4email-boilerplate>
    //     body {
    //       visibility: hidden
    //     }
    //   </style>
    
    //   <script async src="https://cdn.ampproject.org/v0.js"></script>
    
    
    //   <style amp-custom>
    //     .u-row {
    //       display: flex;
    //       flex-wrap: nowrap;
    //       margin-left: 0;
    //       margin-right: 0;
    //     }
        
    //     .u-row .u-col {
    //       position: relative;
    //       width: 100%;
    //       padding-right: 0;
    //       padding-left: 0;
    //     }
        
    //     .u-row .u-col.u-col-100 {
    //       flex: 0 0 100%;
    //       max-width: 100%;
    //     }
        
    //     @media (max-width: 767px) {
    //       .u-row:not(.no-stack) {
    //         flex-wrap: wrap;
    //       }
    //       .u-row:not(.no-stack) .u-col {
    //         flex: 0 0 100%;
    //         max-width: 100%;
    //       }
    //     }
        
    //     body {
    //       margin: 0;
    //       padding: 0;
    //     }
        
    //     table,
    //     tr,
    //     td {
    //       vertical-align: top;
    //       border-collapse: collapse;
    //     }
        
    //     p {
    //       margin: 0;
    //     }
        
    //     .ie-container table,
    //     .mso-container table {
    //       table-layout: fixed;
    //     }
        
    //     * {
    //       line-height: inherit;
    //     }
        
    //     table,
    //     td {
    //       color: #000000;
    //     }
        
    //     #u_body a {
    //       color: #0000ee;
    //       text-decoration: underline;
    //     }
    //   </style>
    
    
    // </head>
    
    // <body class="clean-body u_body" style="margin: 0;padding: 0;background-color: #f9f9f9;color: #000000">
    //   <!--[if IE]><div class="ie-container"><![endif]-->
    //   <!--[if mso]><div class="mso-container"><![endif]-->
    //   <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
    //     <tbody>
    //       <tr style="vertical-align: top">
    //         <td style="word-break: break-word;border-collapse: collapse;vertical-align: top">
    //           <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
    
    //           <div style="padding: 0px;">
    //             <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
    //               <div class="u-row">
    
    //                 <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
    //                   <div style="width: 100%;padding:0px;">
    
    //                     <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    //                       <tbody>
    //                         <tr>
    //                           <td style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:'Cabin',sans-serif;" align="left">
    
    //                             <table width="100%" cellpadding="0" cellspacing="0" border="0">
    //                               <tr>
    //                                 <td style="padding-right: 0px;padding-left: 0px;" align="center">
    
    //                                   <amp-img alt="Image" src="https://assets.unlayer.com/projects/186707/1695754421788-infp-page-logo.png" width="292" height="138" layout="intrinsic" style="width: 32%;max-width: 32%;">
    
    //                                   </amp-img>
    //                                 </td>
    //                               </tr>
    //                             </table>
    
    //                           </td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    
    //                   </div>
    //                 </div>
    
    //               </div>
    //             </div>
    //           </div>
    
    //           <div style="padding: 0px;">
    //             <div style="max-width: 600px;margin: 0 auto;background-color: #003399;">
    //               <div class="u-row">
    
    //                 <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
    //                   <div style="width: 100%;padding:0px;">
    
    //                     <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    //                       <tbody>
    //                         <tr>
    //                           <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Cabin',sans-serif;" align="left">
    
    //                             <table width="100%" cellpadding="0" cellspacing="0" border="0">
    //                               <tr>
    //                                 <td style="padding-right: 0px;padding-left: 0px;" align="center">
    
    //                                   <amp-img alt="Image" src="https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png" width="335" height="93" layout="intrinsic" style="width: 26%;max-width: 26%;">
    
    //                                   </amp-img>
    //                                 </td>
    //                               </tr>
    //                             </table>
    
    //                           </td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    
    //                     <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    //                       <tbody>
    //                         <tr>
    //                           <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
    //                             <div style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
    //                               <p style="font-size: 14px; line-height: 140%;"><strong>T H A N K S&nbsp; &nbsp;F O R&nbsp; &nbsp;REGISTRATION !</strong></p>
    //                             </div>
    
    //                           </td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    
    //                     <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    //                       <tbody>
    //                         <tr>
    //                           <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;" align="left">
    
    //                             <div style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
    //                               <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Verify Your E-mail Address </span></strong>
    //                                 </span>
    //                               </p>
    //                             </div>
    
    //                           </td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    
    //                   </div>
    //                 </div>
    
    //               </div>
    //             </div>
    //           </div>
    
    //           <div style="padding: 0px;">
    //             <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
    //               <div class="u-row">
    
    //                 <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
    //                   <div style="width: 100%;padding:0px;">
    
    //                     <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    //                       <tbody>
    //                         <tr>
    //                           <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
    
    //                             <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
    //                               <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 22px; line-height: 35.2px;">Hi, </span></p>
    //                               <p style="font-size: 14px; line-height: 160%;"><span style="color: #636465; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-size: 14px; text-align: center; white-space: normal; background-color: #ffffff; float: none; display: inline; line-height: 22.4px;">Please use the following passcode to complete the registration process</span></p>
    //                             </div>
    
    //                           </td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    
    //                     <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    //                       <tbody>
    //                         <tr>
    //                           <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
    //                             <!--[if mso]><style>.v-button {background: transparent;}</style><![endif]-->
    //                             <div align="center">
    //                               <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:44px; v-text-anchor:middle; width:143px;" arcsize="9%"  stroke="f" fillcolor="#ff6600"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
    //                               <a target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;text-align: center;color: #FFFFFF; background-color: #ff6600; border-radius: 4px;  width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; font-size: 14px;">
    //                                 <span style="display:block;padding:14px 44px 13px;line-height:120%;">${otp}</span>
    //                               </a>
    //                               <!--[if mso]></center></v:roundrect><![endif]-->
    //                             </div>
    
    //                           </td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    
    //                   </div>
    //                 </div>
    
    //               </div>
    //             </div>
    //           </div>
    
    //           <div style="padding: 0px;">
    //             <div style="max-width: 600px;margin: 0 auto;background-color: #e5eaf5;">
    //               <div class="u-row">
    
    //                 <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
    //                   <div style="width: 100%;padding:0px;">
    
    //                     <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    //                       <tbody>
    //                         <tr>
    //                           <td style="overflow-wrap:break-word;word-break:break-word;padding:41px 55px 18px;font-family:'Cabin',sans-serif;" align="left">
    
    //                             <div style="font-size: 14px; color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;">
    //                               <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 20px; line-height: 32px;"><strong>Get in touch</strong></span></p>
    //                               <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px; color: #000000;">+11 111 333 4444</span></p>
    //                               <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px; color: #000000;">Info@turkeytrademarket.com</span></p>
    //                             </div>
    
    //                           </td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    
    //                     <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    //                       <tbody>
    //                         <tr>
    //                           <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 33px;font-family:'Cabin',sans-serif;" align="left">
    //                             <div style="text-align:center;line-height:0px">
    //                               <a href="https://facebook.com/" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:17px">
    //                                 <amp-img src="https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png" width="32" height="32" />
    //                               </a>
    //                               <a href="https://linkedin.com/" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:17px">
    //                                 <amp-img src="https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png" width="32" height="32" />
    //                               </a>
    //                               <a href="https://instagram.com/" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:17px">
    //                                 <amp-img src="https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png" width="32" height="32" />
    //                               </a>
    //                               <a href="https://youtube.com/" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:17px">
    //                                 <amp-img src="https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png" width="32" height="32" />
    //                               </a>
    //                               <a href="https://email.com/" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:0px">
    //                                 <amp-img src="https://cdn.tools.unlayer.com/social/icons/circle-black/email.png" width="32" height="32" />
    //                               </a>
    //                             </div>
    //                           </td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    
    //                   </div>
    //                 </div>
    
    //               </div>
    //             </div>
    //           </div>
    
    //           <div style="padding: 0px;">
    //             <div style="max-width: 600px;margin: 0 auto;background-color: #003399;">
    //               <div class="u-row">
    
    //                 <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
    //                   <div style="width: 100%;padding:0px;">
    
    //                     <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    //                       <tbody>
    //                         <tr>
    //                           <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
    //                             <div style="font-size: 14px; color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
    //                               <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Copyrights © Company All Rights Reserved</span></p>
    //                             </div>
    
    //                           </td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    
    //                   </div>
    //                 </div>
    
    //               </div>
    //             </div>
    //           </div>
    
    //           <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    //         </td>
    //       </tr>
    //     </tbody>
    //   </table>
    //   <!--[if mso]></div><![endif]-->
    //   <!--[if IE]></div><![endif]-->
    // </body>
    
    // </html>