import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const validValue = Object.values(data).every(el => el)

    useEffect(() => {
        if (!(location?.state?.data?.success)) {
            navigate("/")
        }

        if (location?.state?.email) {
            setData((preve) => {
                return {
                    ...preve,
                    email: location?.state?.email
                }
            })

        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    console.log("data reset", data)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.newPassword !== data.confirmPassword) {
            toast.error("Password not match")
        }


        try {
            const response = await Axios({
                ...SummaryApi.ResetPassword,
                data: data
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/login",)
                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                })

            }
        } catch (error) {
            AxiosToastError(error)
        }


    }

    return (
        <section className=' w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>

                <p className='font-semibold text-lg mb-3'>Enter your Password</p>

                <form className='grid gap-2 py:4' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor="newpassword">New Password:</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='newpassword'
                                className='w-full outline-none'
                                name='newPassword'
                                value={data.newPassword}
                                onChange={handleChange}
                                placeholder='Enter your new password'
                            />

                            <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showPassword ? (
                                        <IoEyeOutline />
                                    ) : (
                                        <FaRegEyeSlash />

                                    )
                                }

                            </div>
                        </div>
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='password'
                                className='w-full outline-none'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Enter your confirm password'
                            />

                            <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showConfirmPassword ? (
                                        <IoEyeOutline />
                                    ) : (
                                        <FaRegEyeSlash />

                                    )
                                }

                            </div>
                        </div>
                    </div>


                    <button disabled={!validValue} className={`${validValue ? "bg-green-600 hover:bg-green-800" : "bg-gray-500"} text-white py-2 rounded font-semibold mt-3 tracking-wide `}>Change Password</button>
                </form>


                <p>
                    Already have an account ? <Link to={'/login'} className='font-semibold text-blue-400 hover:text-blue-700'>Login</Link>
                </p>
            </div>
        </section>
    )
}

export default ResetPassword
