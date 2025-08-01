import React, { useState } from 'react'
import { addNewEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Employee = () => {
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email:''
    });

    const [loading,setLoading] = useState(false);
    
    const navigate = useNavigate();

   
    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            if(formData.firstName === '' || formData.lastName === '' || formData.email === ''){
                setLoading(false);
                toast.warning('Please fill the form!');

            }
            else{
                setLoading(true);
                const res = await axios.post(process.env.ADD_EMPLOYEE,formData);
            
                const data = res.data;

                if(data.success===false){
                    setLoading(false);
                    return;
                }

                setLoading(false);
             
                console.log(data);

                navigate('/');
            }
        }catch(err){
            console.log(err);
            setLoading(true);
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
    console.log(formData)


    return (
        <div className='flex flex-col items-center max-w-2/3 mx-auto p-10'>
            <form 
                className='flex flex-col gap-7 p-20  rounded-md border-2 border-slate-300'
                onSubmit={handleSubmit}
                >
                <div className='text-center font-bold text-2xl'>Add New Employee</div>

                <div className='flex flex-col justify-start gap-8 items-center'>
                    <div className='flex gap-8 items-center'>
                        <label>First name:</label>
                        <input
                            id="firstName"
                            value={formData.firstName}
                            placeholder='text here...'
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

    export default Employee
