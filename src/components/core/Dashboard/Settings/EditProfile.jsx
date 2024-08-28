import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../../../services/operations/SettingsAPI'
import IconBtn from '../../HomePage/Common/IconBtn'

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

const EditProfile = () => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm()
  
    const submitProfileForm = async (data) => {
      // console.log("Form Data - ", data)
      try {
        dispatch(updateProfile(token, data,navigate))
        // navigate("/dashboard/my-profile");
      } catch (error) {
        console.log("ERROR MESSAGE - ", error.message)
      }
    }
    return (
      <>
        <form onSubmit={handleSubmit(submitProfileForm)}>
          {/* Profile Information */}
          <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-5 md:p-8 md:px-12">
            <h2 className="text-lg font-semibold text-richblack-5">
              Profile Information
            </h2>
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="firstName" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter first name"
                  style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
               className="w-full outline-none rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                  {...register("firstName", { required: true })}
                  defaultValue={user?.firstName}
                />
                {errors.firstName && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your first name.
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="lastName" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter Last name"
                  style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
               className="w-full outline-none rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                  {...register("lastName", { required: true })}
                  defaultValue={user?.lastName}
                />
                {errors.lastName && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your last name.
                  </span>
                )}
              </div>
            </div>
  
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="dateOfBirth" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
               className="w-full outline-none rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                  {...register("dateOfBirth", {
                    required: {
                      value: true,
                      message: "Please enter your Date of Birth.",
                    },
                    max: {
                      value: new Date().toISOString().split("T")[0],
                      message: "Date of Birth cannot be in the future.",
                    },
                  })}
                  defaultValue={user?.additionalDetails?.dateOfBirth}
                />
                {errors.dateOfBirth && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.dateOfBirth.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="gender" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Gender
                </label>
                <select
                  type="text"
                  name="gender"
                  id="gender"
                  style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
               className="w-full outline-none rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                  {...register("gender", { required: true })}
                  defaultValue={user?.additionalDetails?.gender}
                >
                  {genders.map((ele, i) => {
                    return (
                      <option key={i} value={ele}>
                        {ele}
                      </option>
                    )
                  })}
                </select>
                {errors.gender && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your Date of Birth.
                  </span>
                )}
              </div>
            </div>
  
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="contactNumber" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  id="contactNumber"
                  placeholder="Enter Contact Number"
                  style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
               className="w-full outline-none rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                  {...register("contactNumber", {
                    required: {
                      value: true,
                      message: "Please enter your Contact Number.",
                    },
                    maxLength: { value: 12, message: "Invalid Contact Number" },
                    minLength: { value: 10, message: "Invalid Contact Number" },
                  })}
                  defaultValue={user?.additionalDetails?.ContactNumber}
                />
                {errors.contactNumber && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.contactNumber.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="about" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  About
                </label>
                <input
                  type="text"
                  name="about"
                  id="about"
                  placeholder="Enter Bio Details"
                  style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
               className="w-full outline-none rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                  {...register("about", { required: true })}
                  defaultValue={user?.additionalDetails?.about}
                />
                {errors.about && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your About.
                  </span>
                )}
              </div>
            </div>
          </div>
  
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                navigate("/dashboard/my-profile")
              }}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Cancel
            </button>
            <IconBtn type="submit" text="Save" />
          </div>
        </form>
      </>
    )
}

export default EditProfile
