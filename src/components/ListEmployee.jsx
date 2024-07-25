import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
// import { listEmployees } from '../services/EmployeeService';

const ListEmployee = () => {

  const [list,setList] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    async function getEmployeesList(){
      const res = await axios.get(process.env.EMPLOYEES_LIST);

      setList(res.data);
    }

    getEmployeesList();
  },[]);

  console.log(list);

  // useEffect(()=>{
  //   listEmployees().then(res=>setList(res.data)).catch(err=>{
  //     console.log(err);
  //   })
  // },[])

  function addNewEmployee(){
    navigate('/add-new-employee');
  }

  const handleEdit = (id) =>{
    navigate(`/update/${id}`);
  }

  const handleDelete = async (id) =>{
    try{
     await axios.delete(`${process.env.DELETE_EMPLOYEE}/${id}`);
 
     setList((prevList) => prevList.filter((employee)=> employee.id!==id));
 
     toast.success('Deleted Successfully!');
    }catch(err){
     console.log(err);
    }
   }
  

  const columns=[
    {
      field:'id',
      headerName:'ID',
      width:'110',
      headerAlign:'center',
      align:'center',
      headerClassName:'header'
    },
    {
      field:'firstName',
      headerName:'First Name',
      width:'130',
      headerAlign:'center',
      align:'center',
      headerClassName:'header'
    },
    {
      field:'lastName',
      headerName:'Last Name',
      width:'130',
      headerAlign:'center',
      align:'center',
      headerClassName:'header'
    },
    {
      field:'email',
      headerName:'Email',
      width:'150',
      headerAlign:'center',
      align:'center',
      headerClassName:'header'
    },
    {
      field:'action',
      headerName:'Action',
      width:'170',
      headerAlign:'center',
      align:'center',
      headerClassName:'header',
      renderCell: (params) => (
        <div>
          <Tooltip title="Edit">
            <EditIcon
              className="cursor-pointer mr-8 text-green-600"
              onClick={() => handleEdit(params.row.id)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteIcon
              className="cursor-pointer text-red-400"
              onClick={() => handleDelete(params.row.id)}
            />
          </Tooltip>
        </div>
      )
    },
  ]


  return (
    <div className='flex flex-col gap-7 items-center p-10'>
      <div className='font-bold text-3xl'>List Employees</div>

      <div className='flex flex-col gap-7 items-start'>

        <button 
          className="bg-slate-500 text-white border rounded-md p-3 hover:opacity-90"
          onClick={addNewEmployee}>Add Employee</button>

        <Box
           sx={{
            height: 400,
            width:'100%',
            '& .header': {
              backgroundColor: 'rgb(148 163 184)',
              color:'white',
              fontWeight: 'bold'
            },
          }}
        >
          <DataGrid 
            rows={list}
            columns={columns}
          />
        </Box>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default ListEmployee
