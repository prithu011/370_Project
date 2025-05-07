import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import ManagerList from '../Dashboard/sidebar/ManagerList'
import PlayerList from '../Dashboard/sidebar/playerlist'
import ClubList from '../Dashboard/sidebar/ClubList'
import './admin.css'

const AdminPage = () => {
  const [selectedTable, setSelectedTable] = useState(null) // Selected table name
  const [tableData, setTableData] = useState([]) // Data for the selected table
  const [userEmail, setUserEmail] = useState('') // Logged-in user's email
  const [updatedRow, setUpdatedRow] = useState({}) // Row being updated
  const [editingRowId, setEditingRowId] = useState(null) // ID of the row being edited

  const isAdmin = [
    'tanjum.ibnul.mahmud@g.bracu.ac.bd',
    'tohanahin121@gmail.com',
  ].includes(userEmail)

  // Fetch data for the selected table
  const fetchTableData = async (tableName) => {
    try {
      const response = await axios.get(`/api/admin/fetch${tableName}`, {
        data: { email: userEmail },
      })
      setSelectedTable(tableName)
      setTableData(response.data)
    } catch (error) {
      console.error(`Error fetching data for table ${tableName}:`, error)
    }
  }

  // Handle updates to a row
  const handleEditRow = (rowId) => {
    const rowToEdit = tableData.find((row) => row.id === rowId)
    setUpdatedRow(rowToEdit || {})
    setEditingRowId(rowId) // Set the row ID being edited
  }

  const handleInputChange = (key, value) => {
    setUpdatedRow({ ...updatedRow, [key]: value })
  }

  // Submit updated row to the backend
  const handleSubmitUpdate = async () => {
    try {
      await axios.post(`/api/admin/update${selectedTable}`, {
        data: updatedRow,
        email: userEmail,
      })
      alert(`Row updated successfully in ${selectedTable}!`)
      fetchTableData(selectedTable) // Refresh the table data
      setEditingRowId(null) // Exit editing mode
    } catch (error) {
      console.error(`Error updating row in ${selectedTable}:`, error)
      alert('Failed to update the row. Please check the constraints.')
    }
  }

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email)
      } else {
        setUserEmail('')
      }
    })

    return () => unsubscribe()
  }, [])

  if (!isAdmin) {
    return <h1 className="access-denied">Access Denied</h1>
  }

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <div className="tables-section">
        <h2>Tables</h2>
        <ul>
          <li>
            <button onClick={() => fetchTableData('Managers')}>Managers</button>
          </li>
          <li>
            <button onClick={() => fetchTableData('Players')}>Players</button>
          </li>
          <li>
            <button onClick={() => fetchTableData('Clubs')}>Clubs</button>
          </li>
        </ul>
      </div>
      {selectedTable === 'Managers' && (
        <ManagerList
          data={tableData}
          onEditRow={handleEditRow}
          editingRowId={editingRowId}
          updatedRow={updatedRow}
          onInputChange={handleInputChange}
          onSubmitUpdate={handleSubmitUpdate}
        />
      )}
      {selectedTable === 'Players' && (
        <PlayerList
          data={tableData}
          onEditRow={handleEditRow}
          editingRowId={editingRowId}
          updatedRow={updatedRow}
          onInputChange={handleInputChange}
          onSubmitUpdate={handleSubmitUpdate}
        />
      )}
      {selectedTable === 'Clubs' && (
        <ClubList
          data={tableData}
          onEditRow={handleEditRow}
          editingRowId={editingRowId}
          updatedRow={updatedRow}
          onInputChange={handleInputChange}
          onSubmitUpdate={handleSubmitUpdate}
        />
      )}
      {selectedTable &&
        selectedTable !== 'Managers' &&
        selectedTable !== 'Players' &&
        selectedTable !== 'Clubs' && (
          <div className="selected-table">
            <h2>Table: {selectedTable}</h2>
            <table>
              <thead>
                <tr>
                  {Object.keys(tableData[0] || {}).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id}>
                    {Object.keys(row).map((key) => (
                      <td key={key}>
                        {editingRowId === row.id ? (
                          <input
                            type="text"
                            value={updatedRow[key] || ''}
                            onChange={(e) =>
                              handleInputChange(key, e.target.value)
                            }
                          />
                        ) : (
                          row[key]
                        )}
                      </td>
                    ))}
                    <td>
                      {editingRowId === row.id ? (
                        <button onClick={handleSubmitUpdate}>Save</button>
                      ) : (
                        <button onClick={() => handleEditRow(row.id)}>
                          Edit
                        </button>
                      )}
                    </td>
                    <td>
                      {editingRowId === row.id ? (
                        <button
                          className="save-button"
                          onClick={handleSubmitUpdate}
                        >
                          Save
                        </button>
                      ) : (
                        <button onClick={() => handleEditRow(row.id)}>
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  )
}

export default AdminPage
