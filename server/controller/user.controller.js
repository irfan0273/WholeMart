import sendEmail from "../config/sendEmail.js"
import userModel from "../model/user.model.js"
import bcrypt, { truncates } from "bcryptjs"
import verfiyEmailTemplate from "../utils/verifyEmailTemplate.js"
import generatedAccessToken from "../utils/generatedAccessToken.js"
import generatedRefreshToken from "../utils/generatedRefreshToken.js"
import uploadImageClodinary from "../utils/uploadImageClodinary.js"
import generatedOtp from "../utils/generatedOtp.js"
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js"
import jwt from "jsonwebtoken"

export async function registerUserController (request,response){
    try{
        const { name, email, password}= request.body

        if (!name || !email ||!password){
            return response.status(400).json({
                message:"Please provide Email, name, password",  
                error:true,
                success:false
            })
        }
        const user =await userModel.findOne({email})
         
        if(user){
            return response.json({
                message:"User already exist",
                error:true,
                success:false
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const payload ={
            name,
            email,
            password: hashPassword
        }
        const newUser =new userModel(payload)
        const save =await newUser.save()

         const VerifyEmailUrl =`${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`


        const verfiyEmail =await sendEmail({
            sentTO : email,
            subject:"Verify your email",
            html :verfiyEmailTemplate({
                name,
                url: VerifyEmailUrl
            })
        })
        return response.json({
            message: "User register successfully",
            error:false,
            success:true,
            data:save
        })
    }
    catch (error){
        return response.status(500).json({
            message:error.message|| error,
            error:true,
            success:false
        })
    }
}
export async function verifyEmailController(request, response){
    try{
        const{code}= request.body

        const user =await userModel.findOne({_id:code})

        if (user){
            return response.status(400).json({
                message:"Invalid code",
                error:true,
                success:false
            })
 
       }
const updateUser =await userModel.updateOne({_id:code},{verify_email:true})
return response.json({
    message:"Email verify successfully",
    error:false,
    success:true,
    data:updateUser
})
    }
    catch (error){
        return response.status(500).json({
            message:error.message|| error,
            error:true,
            success:false
        })
    }

}
//Login Controller
export async function loginController(request,response){
    try{
        const {email,password}= request.body

        if (!email || !password){
            return response.status(400).json({
                message:"Please provide email and password",
                error:true,
                success:false
            })
        }

        const user = await userModel.findOne({email})

        if(!user){
            return response.status(400).json({
                message:"User not found",
                error:true,
                success:false
            })
        }
        if (user.status !=="Active"){
            return response.status(400).json({
                message:"Contact to admin",
                error:true,
                success:false
            })
        }
        const cheackPassword = await bcrypt.compare(password,user.password)

        if(!cheackPassword){
            return response.status(400).json({
                message:"Invalid password",
                error:true,
                success:false
            })
        }

        const accesstoken =await generatedAccessToken(user._id)
        const refreshtoken =await generatedRefreshToken(user._id)   

        const updateUser = await userModel.findByIdAndUpdate(user?._id,{
            last_login_date : new Date()
        })

        const cookieOption={
            httpOnly: true,
            secure: true,
            samesite: "none",
           
        }
response.cookie('accesstoken',accesstoken,cookieOption)
response.cookie('refreshtoken',refreshtoken ,cookieOption)

return response.json({
    message:"Login successfully",
    error:false,
    success:true,
    data: {
        accesstoken,
        refreshtoken
    }
})

}     catch (error){
            return response.status(500).json({
                message:error.message|| error,
                error:true,
                success:false
            })
        }

}
// logout controller

export async function logoutController (request,response){
    try {
        const userid =request.userId
         const cookieOption={
            httpOnly: true,
            secure: true,
            samesite: "none",
         }

         response.clearCookie("accesstoken",cookieOption)
         response.clearCookie("refreshToken",cookieOption)

         const removeRefreshToken =await userModel.findByIdAndUpdate(userid,{
            refresh_token:""
         })

          return response.json({
            message:"Logout Succesfully",
            error:false,
            success:true
          })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error : true,
            success: false
        })
    }
}

//Upload User Avatar

export async function uploadAvatar(request, response) {
    try {
        const userId = request.userId;
        const image = request.file;

        const upload = await uploadImageClodinary(image)

        const updateUser =await userModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        });

        if (!image) {
            return response.status(400).json({
                message: "No file uploaded",
                success: false,
                error: true,
            });
        }


        if (!upload?.url) {
            return response.status(500).json({
                message: "Image upload failed",
                success: false,
                error: true,
            });
        }


        return response.json({
            message: "Image upload successfully",
            success:true,
            error:false,
            data: {
                _id: userId,
                avatar: upload.url
            }
        });
    } catch (error) {
        console.error("Upload Error:", error);
        return response.status(500).json({
            message: error.message || "Upload failed",
            error: true,
            success: false,
        });
    }
}

// update user details
export async function updateUserDetails(request,response){
    try {
        const userId = request.userId
        const {name, mobile, email, password}= request.body 

        let hashPassword =""
         
        if(password){
            const salt = await bcrypt.genSalt(10)
            hashPassword = await bcrypt.hash(password,salt)

        }

        const updateUser= await userModel.updateOne ({_id:userId},{
            ...(name && {name : name}),
            ...(mobile && {mobile : mobile}),
            ...(email && {email : email}),
            ...(password && {password : password})
        })

return response.json({
    message:"Update successfully",
    error:false,
    success:true,
    data:updateUser
})

    } catch (error) {
        return response.status(500).json({
            message : error.message|| error,
            error : true,
            success: false
        })
    }
}

//Forgot password controller

export async function forgotPasswordController(request,response){
    try {
        const {email}=request.body

        const user =await userModel.findOne({email})

        if(!user){
            return response.status(400).json({
                message:"User not found",
                error:true,
                success:false
            })
        }
         
        const otp = generatedOtp()
        const expireTime = new Date()+ 6*60*1000

        const update = await userModel.findByIdAndUpdate(user._id,{
            forgot_password_otp: otp,
            forgot_password_expired:new Date(expireTime).toISOString()
        })
 
        await sendEmail({
            sentTO: email,
            subject: "Forgot Password",
            html: forgotPasswordTemplate({
                name : user.name,
                otp : otp
            })
        })

        return response.json({
            message: "Otp send successfully",
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success:false
        })
    }
}

//Verify forgot password otp

export async function verifyForgotPasswordOtp(request,response){
    try {
        const {email, otp}= request.body

        if(!email || !otp){
            return response.status(400).json({
                message:"Provide email and otp",
                error:true,
                success:false
            })
        }

        const user =await userModel.findOne({email})

        if(!user){
            return response.status(400).json({
                message:"User not found",
                error:true,
                success:false
            })
        }
        
        const currentTime =new Date()

        if(user.forgot_password_expire < currentTime){
            return response.status(400).json({
                message:"Otp expired",
                error:true,
                success:false
            })
        }
 
        if (otp !==user.forgot_password_otp){
            return response.status(400).json({
                message:"Invalid otp",
                error:true,
                success:false
            })
        }

        const updateUser = await userModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp: "",
            forgot_password_expired: ""})

        return response.json({
            message:"Otp verified successfully",
            error:false,
            success:true
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success:false
        })
    }
}

//reset password

export async function resetPassword(request,response){
    try {
        const {email,newPassword, confirmPassword}= request.body

        if(!email ||!newPassword || !confirmPassword){
            return response.status(400).json({
                message: "provide required fields email, NewPassword, Confirm Password",
            
            })
        }

        const user =await userModel.findOne({email})

        if(!user){
            return response.status(400).json({
                message:" Email is not found",
                error : true,
                success:false
            })
        }
 
        if(newPassword !==confirmPassword){
            return response.status(400).json({
                message:"Password not match",
                error : true,
                success:false
            })
        }

        const salt =await bcrypt.genSalt(10)
        const hashPassword =await bcrypt.hash(newPassword,salt)

        const update =await userModel.findByIdAndUpdate(user._id,{
            password:hashPassword
        })
         
        return response.json({
            message:"Password reset successfully",
            error:false,
            success:true
        })


        } catch (error) {
        return response.status(500).json({
            message: error.message|| error,
            error:true,
            success:false
        })
        
    }

}

//refresh token controller
export async function refreshToken(request,response){
    try {
        const refreshtoken = request.cookies.refreshtoken  || request?.header?.authorization?.split(" ")[1];

        if(!refreshtoken){
            return response.status(401).json({
                message:"Refresh token not found",
                error:true,
                success:false
            })
        }
        const verifyToken = await jwt.verify(refreshtoken, process.env.SECRET_KEY_REFRESH_TOKEN)

        if(!verifyToken){
            return response.status(401).json({
                message:"Refresh token not valid",
                error:true,
                success:false
            })
        }
         
        
        const userId = verifyToken._id

        const newAccessToken =await generatedAccessToken(userId)

        const cookieOption={
            httpOnly: true,
            secure: true,
            samesite: "none",
           
        }

        response.cookie('accesstoken',newAccessToken,cookieOption)

       return response.json({
        message:"New access token generated successfully",
        error:false,
        success:true,
        data:{
            accesstoken : newAccessToken
        }
        
       })


    } catch (error) {
        return response.status(500).json({
            message: error.message||error,
            error:true,
            success:false
        })
    }
}

//get login user details
export async function userDetails(request,response){
    try {
        const userId = request.userId

        const user =await userModel.findById(userId).select('-password -refresh_token ')

        return response.json({
            message:"User Details",
            data :user,
            error:false,
            success:true
        })
    } catch (error) {
        return response.status(500).json({
            message: "Something is wrong",
            error:true,
            success:false
        })
    }
}