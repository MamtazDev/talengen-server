const User = require("./user.model");
const bcrcypt = require("bcryptjs");
const randomstring = require("randomstring");
const { generateToken, sendVerificationCode, sendVerificationCodeForReset } = require("../../utils/auth");

const registerUser = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });
    const isVerified = isExist?.isVerified;

    if (isExist && isVerified === true) {
      return res.status(403).send({
        message: `${req.body.email} is already Exist!`,
        status: 403,
      });
    } else if (isExist && isVerified === false) {
      const password = bcrcypt.hashSync(req.body.password);
      const otp = randomstring.generate({ length: 5, charset: "numeric" });

      isExist.password = password;
      isExist.otp = otp;

      const updatedUser = await isExist.save();
      await sendVerificationCode(updatedUser.email, otp);

      res.status(200).send({
        message: "We have sent you verification code. Please check your email!",
        status: 200,
      });
      console.log(req.body)
    } else {

      const otp = randomstring.generate({ length: 5, charset: "numeric" });
      const newUser = req.body.role === "Student" ? new User({
        role: req.body.role,
        email: req.body.email,
        username: req.body.username,
        password: bcrcypt.hashSync(req.body.password),
        otp,

        institution: req.body.institution,
        graduation: req.body.graduation
      }) : new User({

        role: req.body.role,
        email: req.body.email,
        username: req.body.username,
        password: bcrcypt.hashSync(req.body.password),
        otp,

        registrationNumber: req.body.registrationNumber,
        currentPosition: req.body.currentPosition,
        contact: req.body.contact
      });

      const user = await newUser.save();
      await sendVerificationCode(user.email, otp);

      res.status(200).send({
        message: "We have sent you verification code. Please check your email!",
        status: 200,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// get user info by token verified => email
const getUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req?.user?._id });
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const emailVerification = async (req, res) => {
  try {
    // const { email, otp } = req.body;

    const email = req.query.email; // Get email from the query parameter
    const otp = req.query.otp;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "User not found!",
        status: 200,
      });
    }
    if (user?.otp !== otp) {
      return res.status(400).send({
        success: false,
        message: "Invalid OTP",
        status: 200,
      });
    } else {
      user.isVerified = true;
      await user.save();

      const token = await generateToken(user);
      // res.send({
      //   message: "User Verified successfully",
      //   user,
      //   accessToken: token,
      //   status: 200,
      // });
      const htmlResponse = `
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
                            
      
                            <table role="presentation">
                              <tr>
                                <td>
                                  <p>
                                    We've successfully registered for TalenGen account associated with
                                    ${email}
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
      
      </html>`;

      // Set the Content-Type header to indicate that you're sending HTML
      res.setHeader('Content-Type', 'text/html');

      // Send the HTML markup as the response
      res.status(200).send(htmlResponse);


    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const resendForRegister = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });
    
    if (req.body.email && !req.body.otp) {

      const otp = randomstring.generate({ length: 5, charset: "numeric" });

      isExist.otp = otp;
      await isExist.save();

      
      await sendVerificationCode(req.body.email ,otp);
      res.status(200).send({
        message:
          "We have sent you verification code. Please check your email!",
        status: true,
      });



      // if (isExist || isExist.isVerified !== true) {
        
      // } else if (isExist) {
      //   res.status(200).send({
      //     message: "Account Not Found",
      //     status: false,
      //   });
      // } else {
      //   res.status(200).send({
      //     message: "Email Not Verified",
      //     status: false,
      //   });
      // }
    } else if (req.body.email && req.body.otp && !req.body.password) {
      if (isExist.otp === req.body.otp) {
        res.send({
          message: "Change Your Password",
          status: true,
        });
      } else {
        res.send({
          message: "OTP is incorrect",
          status: false,
        });
      }
    } else if (req.body.password) {
      isExist.password = bcrcypt.hashSync(req.body.password);
      await isExist.save();

      const token = await generateToken(isExist);
      res.send({
        message: "Password Changed successfully",
        isExist,
        accessToken: token,
        status: 200,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user?.isVerified === false) {
      return res.status(401).send({
        message: "Please Verify you email.",
      });
    }
    if (
      user &&
      bcrcypt.compareSync(req.body.password, user.password) &&
      user?.isVerified === true
    ) {
      const accessToken = await generateToken(user);
      return res.send({
        message: "Logged in successfully",
        status: 200,
        user,
        accessToken,
      });
    } else {
      res.status(401).send({
        message: "Invalid user or password",
        status: 401,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      data: users,
      status: 200,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id })
      .exec()
      .then((result) => {
        res.status(200).send({
          message: `${result.name} is successfully removed!`,
          status: 200,
        });
      })
      .catch((err) => {
        res.send({
          message: err.message,
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, {
      name: 1,
      email: 1,
      isVerified: 1,
    });
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });
    console.log(isExist)
    if (req.body.email && !req.body.otp) {
      if (isExist && isExist.isVerified === true) {
        const otp = randomstring.generate({ length: 5, charset: "numeric" });
        isExist.otp = otp;
        const updatedUser = await isExist.save();
        await sendVerificationCodeForReset(updatedUser);
        res.status(200).send({
          message:
            "We have sent you verification code. Please check your email!",
          status: true,
        });
      } else if (isExist) {
        res.status(200).send({
          message: "Account Not Found",
          status: false,
        });
      } else {
        res.status(200).send({
          message: "Email Not Verified",
          status: false,
        });
      }
    } else if (req.body.email && req.body.otp && !req.body.password) {
      if (isExist.otp === req.body.otp) {
        res.send({
          message: "Change Your Password",
          status: true,
        });
      } else {
        res.send({
          message: "OTP is incorrect",
          status: false,
        });
      }
    } else if (req.body.password) {
      isExist.password = bcrcypt.hashSync(req.body.password);
      await isExist.save();

      const token = await generateToken(isExist);
      res.send({
        message: "Password Changed successfully",
        isExist,
        accessToken: token,
        status: 200,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const resendForResetPassword = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });
    console.log(isExist)
    if (req.body.email && !req.body.otp) {
      if (isExist && isExist.isVerified === true) {
        const otp = randomstring.generate({ length: 5, charset: "numeric" });
        isExist.otp = otp;
        const updatedUser = await isExist.save();
        await sendVerificationCodeForReset(updatedUser);
        res.status(200).send({
          message:
            "We have sent you verification code. Please check your email!",
          status: true,
        });
      } else if (isExist) {
        res.status(200).send({
          message: "Account Not Found",
          status: false,
        });
      } else {
        res.status(200).send({
          message: "Email Not Verified",
          status: false,
        });
      }
    } else if (req.body.email && req.body.otp && !req.body.password) {
      if (isExist.otp === req.body.otp) {
        res.send({
          message: "Change Your Password",
          status: true,
        });
      } else {
        res.send({
          message: "OTP is incorrect",
          status: false,
        });
      }
    } else if (req.body.password) {
      isExist.password = bcrcypt.hashSync(req.body.password);
      await isExist.save();

      const token = await generateToken(isExist);
      res.send({
        message: "Password Changed successfully",
        isExist,
        accessToken: token,
        status: 200,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};



const changePassword = async (req, res) => {
  const { new_password } = req.body;
  console.log("Body Data: ", req.body)

  // console.log("User Identity:", req.params.email)
  try {
    // const user = await User.findById({ _id: req.params.id });
    const user = await User.findOne({ email: req.params.email });
    // console.log("user", user)

    if (!user) {
      res.status(404).json({ message: "User not found." });
    }
    // const isPasswordMatch = bcrcypt.compareSync(
    //   old_password,
    //   user.password
    // );
  
      user.password = bcrcypt.hashSync(new_password);
      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully.",
      });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUserAndCollections = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({
      success: true,
      message: "User account and associated collections deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

const checkIsExistEmail = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });
    if (isExist) {
      res.status(201).json({
        success: false,
        message: "Email Already in use",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Email is Unique",
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const isExist = await User.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Company Info Update successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: false,
        message: "Update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  emailVerification,
  getUser,
  getUserInfo,
  forgetPassword,
  changePassword,
  deleteUserAndCollections,
  checkIsExistEmail,
  updateUserInfo,
  resendForResetPassword,
  resendForRegister
};
