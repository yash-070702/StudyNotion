import React, { useState } from 'react'
import { FiTrash2 } from "react-icons/fi"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProfile } from '../../../../services/operations/SettingsAPI';
import ConfirmationModal from '../../HomePage/Common/ConfirmationModal';
const DeleteAccount = () => {
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [confirmationModal,setConfirmationModal]=useState(null);
  
    async function handleDeleteAccount() {
      try {
        dispatch(deleteProfile(token, navigate))
      } catch (error) {
        console.log("ERROR MESSAGE - ", error.message)
      }
    }

    const DeleteAccountHandle=()=>{
      setConfirmationModal({
        text1: "Are You Sure ?",
        text2: "Your Account Will be Deleted Permanently ?",
        btn1Text: "Delete",
        btn2Text: "Cancel",
        btn1Handler: () => handleDeleteAccount(),
        btn2Handler: () => setConfirmationModal(null),
      })
    }
  
    return (
      <>
        <div className="my-10 pt-3 flex flex-col md:flex-row gap-x-5 items-center lg:items-start rounded-md border-[1px] border-pink-700 bg-pink-900  md:p-8 md:px-12">
          <div className="flex aspect-square h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-pink-700">
            <FiTrash2 className="text-3xl text-pink-200"/>
          </div>
          <div className="flex flex-col items-center  lg:items-start space-y-2">
            <h2 className="text-lg font-semibold text-richblack-5">
              Delete Account
            </h2>
            <div className="lg:w-3/5 px-4 lg:px-0 text-center lg:text-start text-pink-25">
              <p>Would you like to delete account?</p>
              <p>
                This account may contain Paid Courses. Deleting your account is
                permanent and will remove all the contain associated with it.
              </p>
            </div>
            <button
              type="button"
              className="w-fit cursor-pointer italic pb-10 lg:pb-0 text-pink-300"
              onClick={DeleteAccountHandle}
            >
              I want to delete my account.
            </button>
          </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </>
    )
}

export default DeleteAccount
