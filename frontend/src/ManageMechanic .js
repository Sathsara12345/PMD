import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Navbar, Container, Row, Col, Card } from 'react-bootstrap';
import './index.css';
 
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', /* Align items to the center */
    margin: '0 auto',
    width: '300px', // Adjust width as needed
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '50%', /* Set input width to 100% */
    boxSizing: 'border-box',
    fontSize: '16px', /* Set font size */
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '50%',
    marginTop: '15px',
  },
  /* Define CSS styles for the table */
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableThTd: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  tableTh: {
    backgroundColor: '#f2f2f2',
    color: '#333',
  },
  /* Define CSS styles for the table rows */
  tableTrHover: {
    backgroundColor: '#f5f5f5',
  },
  /* Define CSS styles for the form control elements */
  formControl: {
    display: 'block',
    width: '100%',
    padding: '6px 12px',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#495057',
    backgroundColor: '#fff',
    backgroundImage: 'none',
    backgroundClip: 'padding-box',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  },
  /* Define CSS styles for the rounded corners */
  rounded2: {
    borderRadius: '0.5rem!important',
  },
  /* Define CSS styles for the custom input */
  customInput: {
    backgroundColor: '#f8f9fa',
  },
  /* Define CSS styles for the header and mechanics list */
  h2H3: {
    marginTop: '20px',
    marginBottom: '10px',
  },
  Header: {
    fontsize: '40px', /* Set font size to 20 */
    fontweight: 'bold', /* Make the text bold */
    fontfamily: 'Brush Script MT, sans-serif', /* Replace 'Your Font Style' with your desired font */
    color: '#f1efef',
    marginTop: '10px',
},


}



const ManageMechanic = () => {
  const [mechanics, setMechanics] = useState([]);
  const [newMechanic, setNewMechanic] = useState({
    name: '',
    specialty: ''
  });

  useEffect(() => {
    fetchMechanics();
  }, []);

  const fetchMechanics = async () => {
    try {
      const response = await axios.get('http://localhost:3001/fetchMechanics');
      setMechanics(response.data);
    } catch (error) {
      console.error('Error fetching mechanics:', error);
    }
  };

  const addMechanic = async () => {
    try {
      await axios.post('http://localhost:3001/addMechanic', newMechanic);
      setNewMechanic({ name: '', specialty: '',contact: '',email: '' });
      fetchMechanics();
      // window.alert('New Mechanic Added!');
    } catch (error) {
      console.error('Error adding mechanic:', error);
    }
  };

  const deleteMechanic = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteMechanic/${id}`);
      fetchMechanics();
      // window.alert('Mechanic deleted!');
    } catch (error) {
      console.error('Error deleting mechanic:', error);
    }
  
  
  };

  const updateMechanic = async (id, updatedMechanic) => {
    try {
      await axios.put(`http://localhost:3001/updateMechanic/${id}`, updatedMechanic);
      fetchMechanics();
      // window.alert('Mechanic updated!');
    } catch (error) {
      console.error('Error updating mechanic:', error);
    }
  };

  const handleRowClick = (mechanic) => {
    setNewMechanic({ ...mechanic });
  };
return (
  <div className="body">
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            background-image: url(https://emerj.com/wp-content/uploads/2018/11/ai-ml-2.jpg);
            background-repeat: no-repeat;
            background-size: cover;
          }
        `}
      </style>

    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Dashboard</Navbar.Brand>
    </Navbar>
    <Container fluid>
        <Row>
            <Col md={3}>
            <div className="dashboard">
    <Sidebar />
    {/* Other dashboard content */}
</div>
            </Col>
            <Col md={9}>
           
        
       
            <p class="text-center text-uppercase"><h2 style={styles.Header}>Manage Mechanics</h2></p>
      <div>
        <h3>Add New Mechanic</h3>
        <input
          type="text"
          style={styles.input}
          className="form-control rounded-2 custom-input"
          value={newMechanic.name}
          onChange={(e) => setNewMechanic({ ...newMechanic, name: e.target.value })}
          placeholder="Name"
        /><br></br>
        <select
        className="form-control rounded-2"
        style={styles.input}
        value={newMechanic.specialty}
        onChange={(e) => setNewMechanic({ ...newMechanic, specialty: e.target.value })}
      >
        <option value="">Select Specialty</option>
        <option value="heat dissipation">Heat Dissipation</option>
        <option value="power">Power</option>
        <option value="overstain">Overstain</option>
        <option value="Tool wear">Tool Wear</option>
        <option value="Random">Random</option>
       </select><br></br>

        <input
          type="text"
          className="form-control rounded-2 "
          style={styles.input}
          value={newMechanic.contact}
          onChange={(e) => setNewMechanic({ ...newMechanic, contact: e.target.value })}
          placeholder="contact number"
        /><br></br>
        <input
          type="text"
          className="form-control rounded-2 "
          style={styles.input}
          value={newMechanic.email}
          onChange={(e) => setNewMechanic({ ...newMechanic, email: e.target.value })}
          placeholder="email"
        /><br></br>
        <button style={styles.button} onClick={addMechanic}>Add Mechanic</button>
      </div>
      <div>
      <h3>Mechanics List</h3>
                <table style={styles.table} className="table table-striped table-dark table-hover table-bordered border-primary">
                  <thead style={styles.tableThTd}>
                    <tr>
                      <th style={styles.tableTh}>Name</th>
                      <th style={styles.tableTh}>Specialty</th>
                      <th style={styles.tableTh}>Contact</th>
                      <th style={styles.tableTh}>Email</th>
                      <th style={styles.tableTh}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mechanics.map((mechanic) => (
                      <tr key={mechanic.name} onClick={() => handleRowClick(mechanic)}>
                        <td>{mechanic.name}</td>
                        <td>{mechanic.specialty}</td>
                        <td>{mechanic.contact}</td>
                        <td>{mechanic.email}</td>
                        <td>
                          <button class="btn btn-danger" onClick={() => deleteMechanic(mechanic.id)}>Delete</button>
                          <button class="btn btn-success"  onClick={() => updateMechanic(mechanic.id, { name: newMechanic.name , specialty: newMechanic.specialty, contact: newMechanic.contact, email: newMechanic.email })}>Update</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
      </div>
    

</Col>
</Row>
</Container>
{/* </div> */}



</div>
      
    
  );
}

export default ManageMechanic;
