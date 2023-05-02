// Module imports
import { Link } from "react-router-dom";
import { useState } from "react";
import { Col, Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
// Style
import "../index.css";
import { getCatColor } from "./HelperFunctions";

function CategoryBar() {
    const [category, setCategory] = useState('News');
    const categories = ['latest','local','crime','politics','sports','international','business'];
    return (
        <Navbar sticky="top" className="shadow-sm mb-3 fs-6 py-0 nb">
            <Container sticky="top" style={{maxWidth:"1100px"}}>
                <Row style={{overflow:"auto", whiteSpace:"nowrap"}} className="flex-row flex-nowrap py-2">
                    <Col xs="auto">
                        <Link to="/home" onClick={() => setCategory('News',"LIMIT 10")} style={{ textDecoration:"none" }} className="fw-bold">Home</Link>
                    </Col>
                    {categories.map((cat) =>
                        <Col key={"nav-"+cat} xs="auto"> 
                            <Link to={"/category/"+cat} onClick={() => setCategory(cat,"")} style={{textDecoration:"none", textTransform:"capitalize"}} className="fw-bold">{cat}</Link>
                        </Col>
                    )}
                </Row> 
            </Container>
        </Navbar>
    )
}
export default CategoryBar;