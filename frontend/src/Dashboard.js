import React, { useState, useEffect } from 'react';
import { Navbar, Container, Row, Col, Card } from 'react-bootstrap';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

// const mapData = {
//     "BZ": 75.00,
//     "US": 56.25,
//     "AU": 15.45,
//     "GB": 25.00,
//     "RO": 10.25,
//     "GE": 33.25
// }

const Dashboard = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mechanicsCount = await axios.get('http://localhost:3001/mechanics/count');
                // Similar requests for users and predictions tables
                setData({
                    labels: ['Mechanics'],
                    datasets: [{
                        label: 'Data Count',
                        data: [mechanicsCount.data.count],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1,
                    }]
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
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
                        <div>
                            <h2>Data Counts</h2>
                            <Bar
                                data={data}
                                options={{
                                    scales: {
                                        y: {
                                            beginAtZero: true
                                        }
                                    }
                                }}
                            />
                        </div>
                        <Card>
                            <Card.Body>
                                <Card.Title>Dashboard Card</Card.Title>
                                <Card.Text>
                                    This is a sample card for your dashboard.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
