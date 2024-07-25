import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateEmployee = () => {
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email:''
    });

    // Truyền id từ url xuống
    const {id} = useParams();

    const [loading,setLoading] = useState(false);
    
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchEmployeeDetails = async() =>{
            try{
                const res = await axios.get(`${process.env.GET_EMPLOYEE}/${id}`);

                setFormData({
                    firstName:res.data.firstName,
                    lastName:res.data.lastName,
                    email:res.data.email
                });

            }catch(err){
                console.log(err);
            }
        }

        fetchEmployeeDetails();
    },[id]);

    console.log('Current data' + formData);

   
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);

        try{
            await axios.put(`${process.env.UPDATE_EMPLOYEE}/${id}`,formData);

            toast.success('Updated Successfully!');
            setLoading(false);
            navigate('/');

        }
        catch(err){
            console.log(err);
            setLoading(false);
        }

    }

    function handleOnChange(e){
        setFormData(
            {
                ...formData,
                [e.target.id]: e.target.value
            }
        )

    }

    return (
        <div className='flex flex-col items-center max-w-2/3 mx-auto p-10'>
            <form 
                className='flex flex-col gap-7 p-20  rounded-md border-2 border-slate-300'
                onSubmit={handleSubmit}
                >
                <div className='text-center font-bold text-2xl'>Update Employee</div>

                <div className='flex flex-col justify-start gap-8 items-center'>
                    <div className='flex gap-8 items-center'>
                        <label>First name:</label>
                        <input
                            id="firstName"
                            value={formData.firstName}
                            placeholder="text here..."
                            onChange={handleOnChange}
                            className='border p-3'/>
                    </div>

                    <div className='flex gap-8 items-center'>
                        <label>Last name:</label>
                        <input
                            id="lastName"
                            placeholder='text here...'
                            value={formData.lastName}
                            onChange={handleOnChange}
                            className='border p-3'/>
                    </div>

                    <div className='flex gap-x-16 items-center'>
                        <label>Email:</label>
                        <input
                            id="email"
                            value={formData.email}
                            placeholder='text here...'
                            onChange={handleOnChange}
                            className='border p-3'/>
                    </div>
                </div>

                <button 
                    className='bg-slate-500 p-3 rounded-md text-white mt-5 hover:opacity-90'
                    disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Submit'}
                </button>

                <ToastContainer/>
                
            </form>
        </div>
    
    )
}

export default UpdateEmployee
