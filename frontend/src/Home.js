import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './Home.css'; 
import { Navbar, Container, Row, Col, Card } from 'react-bootstrap';

const styles = {
  body: {
    backgroundImage: `url(${require('./assets/images/Background/Pred2.jpg')})`,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
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
    width: '50%',
    boxSizing: 'border-box',
  },
  Card: {
    marginBottom: '10px',
    marginTop:'10px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '50%',
    boxSizing: 'border-box',
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

};

function Home() {
  const [formData, setFormData] = useState({
    Type: '',
    Air_temperature_K: '',
    Process_temperature_K: '',
    Rotational_speed_rpm: '',
    Torque_Nm: '',
    Tool_wear_min: ''
  });
  const [predictions, setPredictions] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the prediction request to the ML model
      const response = await axios.post('http://localhost:5000/predict', formData);
      console.log(response.data);
      setPredictions(response.data);
  
      // If predictions are received, store the input and output data in the database
  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    
    <div>

            <style>
        {`
          body {
            margin: 0;
            padding: 0;
            background-image: url(https://www.thefastmode.com/media/k2/items/src/af2864d5db2fb08efc85debcce8aeed9.jpg?t=20211217_010029);
            background-repeat: no-repeat;
            background-size: cover;
          }
        `}
      </style>
    {/* <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Dashboard</Navbar.Brand>
    </Navbar> */}
    <Container fluid>
        <Row>
            <Col md={3}>
            <div className="dashboard">
    
    {/* Other dashboard content */}
</div>
            </Col>
            <Col md={9}>
            <div>
        
            <Sidebar />
       
                  
            <h1 style={{ textAlign: 'center', color: 'white' }}>Predictive Maintenance</h1>
      <form onSubmit={handleSubmit}>
      <label style={styles.label} title="This is the type of the input field.">Type:</label><br />
        <select style={styles.input} name="Type" value={formData.Type} onChange={handleChange}>
          <option value="0">Low</option>
          <option value="1">Medium</option>
          <option value="2">High</option>
        </select><br />

      <label style={styles.label} title="This is the air temperature in Kelvin.">Air temperature (K):</label><br />
      <input style={styles.input} type="number" name="Air_temperature_K" value={formData.Air_temperature_K} onChange={handleChange} /><br />

      <label style={styles.label} title="This is the process temperature in Kelvin.">Process temperature (K):</label><br />
      <input style={styles.input} type="number" name="Process_temperature_K" value={formData.Process_temperature_K} onChange={handleChange} /><br />

      <label style={styles.label} title="This is the rotational speed in revolutions per minute (rpm).">Rotational speed (rpm):</label><br />
      <input style={styles.input} type="number" name="Rotational_speed_rpm" value={formData.Rotational_speed_rpm} onChange={handleChange} /><br />

      <label style={styles.label} title="This is the torque in Newton-meters (Nm).">Torque (Nm):</label><br />
      <input style={styles.input} type="number" name="Torque_Nm" value={formData.Torque_Nm} onChange={handleChange} /><br />

      <label style={styles.label} title="This is the tool wear in minutes.">Tool wear (min):</label><br />
      <input style={styles.input} type="number" name="Tool_wear_min" value={formData.Tool_wear_min} onChange={handleChange} /><br />

  <button type="submit" style={styles.button}>Predict</button>
</form>
      
      
          </div> 

      
      {/* <Card style={styles.Card}>
    <Card.Body>
        <Card.Title><h2>Predictions</h2></Card.Title>
        <Card.Text> */}
        {predictions && (
        <div>
     <Card style={styles.Card}>
<p>Target Prediction: {predictions.target_prediction === 1 ? 'Failure Machine' : 'Not a Failure Machine'}</p>
<p>Failure Prediction: {
  predictions.failure_prediction === 1 ? 'No Failure' :
  predictions.failure_prediction === 0 ? 'Heat Dissipation Failure' :
  predictions.failure_prediction === 2 ? 'Overstain Failure' :
  predictions.failure_prediction === 3 ? 'Power Failure' :
  predictions.failure_prediction === 4 ? 'Random Failures' :
  predictions.failure_prediction === 5 ? 'Tool Wear Failure' :
  'Unknown'
}</p>
</Card>
</div>

      )}
        {/* </Card.Text>
    </Card.Body>
</Card> */}

</Col>
</Row>
</Container>
{/* </div> */}



</div>

    
    
  );
}

export default Home;
