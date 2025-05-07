// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import './agent.css'

// const AgentList = () => {
//   const [agents, setAgents] = useState([])
//   const [searchTerm, setSearchTerm] = useState('')

//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/agents') // Replace with your API endpoint
//         setAgents(response.data)
//       } catch (error) {
//         console.error('Error fetching agent data:', error)
//       }
//     }

//     fetchAgents()
//   }, [])

//   const filteredAgents = agents.filter(
//     (agent) =>
//       agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       agent.contact_info.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   return (
//     <div className="agent-list-container">
//       <h1 className="agent-list-title">All Agents</h1>

//       <input
//         type="text"
//         placeholder="Search by name, agency, or nationality..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="search-input"
//       />

//       <div className="table-container">
//         <table className="table-auto">
//           <thead className="table-header">
//             <tr>
//               {/* <th>Agent_id</th> */}
//               <th>Name</th>
//               <th>contact_info</th>
//             </tr>
//           </thead>
//           <tbody className="table-body">
//             {filteredAgents.map((agent) => (
//               <tr key={agent.Agent_id}>
//                 <td>{agent.Name}</td>
//                 <td>{agent.contact_info}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default AgentList
