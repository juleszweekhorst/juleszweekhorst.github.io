// Module imports
import React from "react";
import { Link } from "react-router-dom";
// Components
import Feed from "../components/Feed";
import { getCatColor } from "./HelperFunctions"
// Style
import { Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function CategoryBlock({category,data}) {

    return (
        <>
            <hr className="my-4"></hr>
            <Link className="h2 pb-2" style={{ textDecoration:"none",fontWeight:"700",color:getCatColor(category), textTransform:"capitalize" }} to={"/category/"+category}>{category}</Link>
            <Feed data={data}/>
            <Row>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical text-center mb-4" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
                <Link className="fs-6 fw-bold text-center" to={"/category/"+category} style={{ color:getCatColor(category) }}>Read more {category} news »</Link>
            </Row>
        </>
    );
    
}

export default CategoryBlock