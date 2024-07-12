/*
This is the header of web. It navigates to the corresponding path
*/
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css'
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListCustomers from "./pages/ListCustomers";
import ServicesManage from "./pages/ServicesManage";
import ListEquipments from "./pages/ListEquipments";
import Finance from "./pages/Finance";
import ProblemManage from "./pages/ProblemManage";
import Register from "./pages/Register";
import Login from "./pages/Login";

export default function Header() {
    return (
        // This is a navigation bar using React Bootstrap. Besides, it navigates items to the corresponding path
        <Router>
            <Navbar bg="light" expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand className="Logo" style={{color: "#4DD44D", fontWeight: "bold", fontSize: "25px"}}>
                        <Link class='headerLink' to='/home'>VHome</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Khách hàng" id="basic-nav-dropdown" className="nav-dropdown">
                                <NavDropdown.Item><Link class='headerLink' to='/listCustomers'>Danh sách</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link class='headerLink' to='/servicesManage'>Dịch vụ</Link></NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link><Link class='headerLink' to='/finance'>Tài chính</Link></Nav.Link>

                            <Nav.Link><Link class='headerLink' to='/listEquipments'>Tài sản</Link></Nav.Link>
                            <Nav.Link><Link class='headerLink' to='/problemManage'>Sự cố</Link></Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link><Link class='headerLink' to='/login'>Đăng nhập</Link></Nav.Link>
                            <Nav.Link><Link class='headerLink' to='/register'>Đăng ký</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/*This is where the paths render the components that correspond to the items*/}
            <Routes>
                <Route path='/home' element={<ListCustomers/>}/>
                <Route path='/listCustomers' element={<ListCustomers/>}/>
                <Route path='/servicesManage' element={<ServicesManage/>}/>
                <Route path='/listEquipments' element={<ListEquipments/>}/>
                <Route path='/finance' element={<Finance/>}/>
                <Route path='/problemManage' element={<ProblemManage/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </Router>
    );
}
