import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import ListEmployee from './components/ListEmployee'
import Employee from './components/AddEmployee'
import UpdateEmployee from './components/UpdateEmployee'

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListEmployee/>}/>
        <Route path='/list' element={<ListEmployee/>}/>
        <Route path='/add-new-employee' element={<Employee/>}/>
        <Route path='/update/:id' element={<UpdateEmployee/>}/>
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
