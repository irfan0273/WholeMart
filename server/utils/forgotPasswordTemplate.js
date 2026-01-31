const forgotPasswordTemplate =({name,otp })=>{
    return `
    <div>
    <p> Dear ${name} </p>
    <p> Youire requested for password reset. please use followning OTP code to reset your password </p>
    <div style="background-color: #4CAF50; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">
    ${otp}
    </div>
    <p>This otp is valid for 1 hour only. Enter the otp in Wholemart website to reset your password.</p>
    <br/>
    </br>
    <p>Thanks</p>
    <p>Wholemart</p>
    </div>
    `
}

export default forgotPasswordTemplate