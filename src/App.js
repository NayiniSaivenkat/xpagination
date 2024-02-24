// import React,{useEffect, useState} from 'react';
// import './App.css';

// function App() {
//   const [members,setMembers]=useState([]);
//   const [currentPage,setCurrentPage]=useState(1);
//   const [totalPages,setTotalPages]=useState(1);
 
//   useEffect(()=>{
//     fetchData();
//   },[currentPage]);
  
//   const fetchData=async ()=>{
//     try{
//       let response=await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
//     if(!response.ok){
//       throw new Error('Failed to fetch data');
      
//     }
//     const data=await response.json();
//     const totalMembers=data.length;
//     const perPage=10;
//     const totalPages = Math.ceil(totalMembers / perPage);
//     setTotalPages(totalPages);
//     const startIndex=(currentPage-1)*perPage;
//     const endIndex = Math.min(startIndex + perPage, totalMembers);
//     setMembers(data.slice(startIndex,endIndex));
//     }
//     catch(e){
//       alert('Failed to fetch data');
//       console.error("error",e);
//     }
//   };

//   const gotoNextPage=()=>{
//     setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
//   }

//   const gotoPrevPage=()=>{
//     setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
//   }
//   return (
//     <div>
//       <table>
//         <thead className='start'>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {members.map((member)=>(
//             <tr key={member.id}>
//               <td>{member.id}</td>
//               <td>{member.name}</td>
//               <td>{member.email}</td>
//               <td>{member.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button disabled={currentPage===1} onClick={gotoPrevPage}>Previous</button>
//       <button>{currentPage}</button>
//       <button disabled={currentPage===totalPages} onClick={gotoNextPage}>Next</button>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";

import "./App.css";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setEmployees(data);
      setTotalPages(Math.ceil(data.length / 10));
    } catch (error) {
      alert("Failed to fetch data");
      console.error("Error fetching data:", error);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = Math.min(startIndex + 10, employees.length);

  return (
    <div>
      <h2 className="heading">Employee Data Table</h2>
      <table>
        <thead>
          <tr>
            <th className="left-align">ID</th>
            <th className="left-align">Name</th>
            <th className="left-align">Email</th>
            <th className="left-align">Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.slice(startIndex, endIndex).map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="currentPage">{currentPage}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
