import React from 'react'
import Sidevbar from '../../Sidebar/Sidevbar'
import ReuseForm from '../ReuseForm/ReuseForm'
import { postMethod } from '../../../Utils/Apis'

const Add_Wood_Handle = () => {

    const handleHandleType = async (e) => {
        e.preventDefault();

        const handleTypeForm = {
            title: e.target.title.value.trim(),
            desc: e.target.desc.value.trim(),
            status: e.target.status.value.trim(),
        }

        console.log("Handle Type ", handleTypeForm);

        const url = "http://localhost:5000/add-handle"
        const data = await postMethod(url, handleTypeForm);
        console.log(data);


    }
    const handleWoodType = async (e) => {
        e.preventDefault();

        const woodTypeForm = {
            title: e.target.title.value.trim(),
            desc: e.target.desc.value.trim(),
            status: e.target.status.value.trim(),
        }

        console.log("Handle Type ", woodTypeForm);
        const url = "http://localhost:5000/add-wood"
        const data = await postMethod(url, woodTypeForm);
        console.log(data);

    }

    return (
        <>
            <Sidevbar />
            <div className='flex justify-center  items-center gap-15 bg-white shadow-2xl mx-auto'>
                <ReuseForm
                    headerTxt={"Add Handle Type"}
                    titlePlaceholder={"long"}
                    descPlaceholder={"long handle"}
                    onSubmit={handleHandleType}
                    buttontext='Add Handle'>
                </ReuseForm>

                <ReuseForm
                    headerTxt={"Add Wood Type"}
                    titlePlaceholder={"english"}
                    descPlaceholder={"UK wood"}
                    onSubmit={handleWoodType}
                    buttontext='Add Wood'>
                </ReuseForm>



            </div >
        </>
    )
}

export default Add_Wood_Handle