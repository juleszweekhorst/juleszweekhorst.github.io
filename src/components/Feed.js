// Module imports
import React from "react";
import { Link, useParams } from "react-router-dom";
// Components
import  ShareDropdown from "./ShareDropdown"
import { getColumn, getTimeAgo, getCatColor, getImgUrl, getTrimmedText } from "./HelperFunctions"
// Style
import { Col, Figure, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.scss'

function Feed({data}) {
    const columns = getColumn(data.columns);
    const head = data.values[0];
    const values = data.values.slice(1,data.length);
    return (
        <div className="p-0">
            <div className="card border-0 h-100 mb-3" style={{maxHeight:"23rem"}}>
                <Figure className="w-100 m-0" >
                    <Figure.Image style={{maxHeight:"23rem", objectFit:"cover", objectPosition:"top"}} className="w-100 rounded m-0" src={getImgUrl('head',head[columns.source],head[columns.imgurl])}/>
                </Figure>
                <div className="card-img-overlay h-100 d-flex flex-column justify-content-end" style={{background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.1), rgba(0,0,0,0.3))"}}>
                    <Link className="fs-2 head-text" to={"/article/"+head[columns.id]} style={ { textDecoration: 'none', fontWeight:"800", position: "absolute", textTransform:"uppercase" } } >{head[columns.title]}</Link>
                </div>
            </div>   
          {values.map((row) => 
            <Row key={row[columns.id]} className="article mb-3">
                <Col xs={3}>
                <div className="rounded h-100" alt="..." 
                    style = { { backgroundImage: "url(" + getImgUrl('feed',row[columns.source],row[columns.imgurl]) + ")", backgroundSize:"cover", backgroundPosition:"top"} }></div>
                </Col>
                <Col xs={9} className="py-md-2 py-lg-0">
                    <Row>
                        <Col xs="auto">
                            <div style={ { fontSize:"small", color:getCatColor(row[columns.category]) } } className="fw-bold">{row[columns.category]}</div>
                        </Col>
                        <Col xs="auto">
                            <div className="text-muted" style={ { fontSize: "small"} }>{row[columns.source]}</div>
                        </Col>
                        <Col xs="auto" className="flex-grow-1 text-end">
                            <ShareDropdown article={{row,columns}}/>
                        </Col>
                    </Row>
                    <Link to={"/article/"+row[columns.id]} style={ { textDecoration: 'none' } } className="fs-6 fw-bold lh-sm">{getTrimmedText(row[columns.title],"title")}</Link>
                    <Link to={"/article/"+row[columns.id]} style={ { textDecoration: 'none' } } className="d-none d-lg-block lh-sm mt-2">{getTrimmedText(row[columns.paragraph],"paragraph")}</Link>
                    <div className="text-muted" style={ { fontSize: "small" } }>{getTimeAgo(new Date(row[columns.datetime]))}</div>
                </Col>
            </Row>
          )}
        </div>
    );
}
export default Feed;