import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DbContext } from '../DbProvider'
import { Container, Col, Row, Figure } from "react-bootstrap";
import {CommentsComponent} from "../components/comments"
// Helper function
import { fixParagraph, getColumn, getImgUrl, getCatColor, getSourceLogo }from "../components/HelperFunctions"
import ShareDropdown from "../components/ShareDropdown";
import '../styles/styles.scss';

function ArticlePage() {
    const { id } = useParams();
    const { loading, db } = useContext(DbContext);

    const [databaseStatus,setDatabaseStatus] = useState(true)
    const [articlecontent, setArticleContent] = useState([]);

    useEffect(()=>{
        window.scrollTo(0, 0)
        if (!loading) {
            try{
                const results = db.exec("SELECT * FROM articles WHERE id = '" + id + "'");
                setArticleContent(results[0]);
                setDatabaseStatus(loading) 
            } catch(err) {
                console.log(err);
            } 
        }
    },[loading]);

    if (databaseStatus) return <pre>Loading...</pre>;
    else {
        const columns = getColumn(articlecontent.columns);
        const row = articlecontent.values[0];
     return (
        <Container style={{maxWidth:"1200px"}}>
            <Row className="p-0">
                <Col xs={12} md={8}>
                    <Container key={row[columns.id]} fluid className="p-0">
                        <Figure className="w-100">
                            <Figure.Image style={{maxHeight:"25rem", objectFit:"cover", objectPosition:"top"}} src= {getImgUrl('article',row[columns.source],row[columns.imgurl])} width="100%"  alt="Article image" rounded/>
                        </Figure>
                        <Row className="d-flex justify-content-start mb-3">
                            <Col xs="auto">
                                <a style={ { fontWeight:"500"} } target="_blank" rel="noreferrer noopener" href={row[columns.href]}>
                                    <img alt="" src={process.env.PUBLIC_URL + "/" + getSourceLogo(row[columns.source])} className="d-inline-block align-top logos" height="30"/>{' '}
                                </a>
                            </Col>
                            <Col xs="auto" className="flex-grow-1 text-end">
                                <ShareDropdown article={{row,columns}}/>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-start">
                            <Col xs="auto">
                                <div className="fs-5" style={ { fontWeight:"700", color:getCatColor(row[columns.category]) } }>{row[columns.category]}</div>
                            </Col>
                            <Col xs="auto">
                                <div className="fs-5" style={ { fontWeight:"400" } }>{new Date(row[columns.datetime]).toLocaleTimeString('en-US', {weekday:'long', month:'long', day:'2-digit', hour: '2-digit', minute: '2-digit'})}</div>
                            </Col>
                        </Row>
                        <hr></hr>
                        <h1 className="my-3" style={ { fontWeight:"700"} }>{row[columns.title]}</h1>
                        <div className="fs-5" style={ { fontWeight:"600"} }>{row[columns.paragraph]}</div>
                        <hr></hr>
                        <div className="fs-5" dangerouslySetInnerHTML={{ __html: fixParagraph(row[columns.summary]) }} />
                        <a className="fs-5" style={ { fontWeight:"600"} } target="_blank" rel="noreferrer noopener" href={row[columns.href]}>Read the full story here</a>
                        <div className="py-5 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f8cc08" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8"/>
                            </svg>
                        </div>
                    </Container>
                </Col>
                <Col xs={12} md={4}>
                    <CommentsComponent commentid={"ID-"+row[columns.id]}/>
                    <div className="py-5 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f8cc08" className="bi bi-circle-fill" viewBox="0 0 16 16">
                            <circle cx="8" cy="8" r="8"/>
                        </svg>
                    </div>
                </Col>
            </Row>
        </Container>
    )}
}
export default ArticlePage;

