import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Navbar, Container, Row, Col, Card } from 'react-bootstrap';

const styles = {
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  
  specialtySelect: {
    marginRight: '10px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  
  filterButton: {
    padding: '8px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  
  filterButtonHover: {
    backgroundColor: '#fff',
  },
  
  table: {
    width: '100%',
    maxWidth: '100%',
    marginBottom: '1rem',
    backgroundColor: 'transparent',
    borderCollapse: 'collapse',
  },
  
  'table-striped tbody tr:nth-of-type(odd)': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  
  tableDark: {
    color: 'inherit',
  },
  
  'tableDark th, .tableDark td, .tableDark thead th': {
    borderColor: '#32383e',
  },
  
  'tableDark.table-striped tbody tr:nth-of-type(odd)': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  
  'table-hover tbody tr:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.075)',
  },
  
  tableBordered: {
    border: '1px solid #dee2e6',
  },
  
  'tableBordered th, .tableBordered td': {
    border: '1px solid #dee2e6',
  },
  
  'tableBordered thead th, .tableBordered thead td': {
    borderBottomWidth: '2px',
  },
  
  tablePrimary: {
    backgroundColor: '#b8daff',
  },
  
  'tablePrimary th, .tablePrimary td': {
    backgroundColor: '#b8daff',
  },
  
  borderPrimary: {
    borderColor: '#b8daff !important',
  },
  
  thead: {
    display: 'table-header-group',
    verticalAlign: 'middle',
    borderColor: 'inherit',
  },
};

const FilterMechanicsBySpecialty = () => {
  const [specialty, setSpecialty] = useState('');
  const [mechanics, setMechanics] = useState([]);
  const [error, setError] = useState('');

  const handleFilter = () => {
    axios.post('http://localhost:3001/filterMechanicsBySpecialty', { specialty })
      .then(response => {
        setMechanics(response.data);
        setError('');
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Internal Server Error');
      });
  };

  return (
    
    <div>
            <style>
        {`
          body {
            margin: 0;
            padding: 0;
            background-image: url(https://assets-global.website-files.com/656a6f5ca4824808211181c5/6577922c8238bac9993f6c73_model-maintenance-1-1.png);
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
            <div style={styles.filterContainer} className='mt-5'>
              <select value={specialty} onChange={e => setSpecialty(e.target.value)}>
                <option value="">Select Specialty</option>
                <option value="heat dissipation">Heat Dissipation</option>
                <option value="power">Power</option>
                <option value="overstain">Overstain</option>
                <option value="tool wear">Tool Wear</option>
                <option value="random">Random</option>
              </select>
              <button className='ms-4' style={styles.filterButton} onClick={handleFilter}>Filter Mechanics</button>
            </div>
            {/* {error && <p>Error: {error}</p>} */}
            <div className='mt-5'>
            <table className="table table-striped table-dark table-hover table-bordered border-primary" style={{margintop: '200px'}}>
              <thead>
                <tr className="table-primary">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Specialty</th>
                  <th>Contact</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {mechanics.map(mechanic => (
                  <tr key={mechanic.id}>
                    <td>{mechanic.id}</td>
                    <td>{mechanic.name}</td>
                    <td>{mechanic.specialty}</td>
                    <td>{mechanic.contact}</td>
                    <td>{mechanic.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FilterMechanicsBySpecialty;
