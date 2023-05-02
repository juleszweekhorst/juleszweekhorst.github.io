import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DbContext } from '../DbProvider'
import { Container, Col, Row } from "react-bootstrap";
// Helper function
import { getColumn, getImgUrl, getCatColor, getSearchQuery, getTrimmedText, getTimeAgo }from "../components/HelperFunctions"
import '../styles/styles.scss';
import ShareDropdown from "../components/ShareDropdown";

function SearchPage() {
    const { search } = useParams();
    const { loading, db } = useContext(DbContext);

    const [databaseStatus,setDatabaseStatus] = useState(true)
    const [searchcontent, setSearchContent] = useState([]);

    useEffect(()=>{
        window.scrollTo(0, 0)
        if (!loading) {
            try{
                const results = db.exec(getSearchQuery(search));
                setSearchContent(results[0]);
                setDatabaseStatus(loading) 
            } catch(err) {
                console.log(err);
            } 
        }
    },[loading,search]);

    if (databaseStatus) return <pre>Loading...</pre>;
    else {  
        var searchresults;  
        var searchnumber;

        if (searchcontent != undefined) {
            const columns = getColumn(searchcontent.columns);
            const row =  searchcontent.values[0];        
            const values = searchcontent.values;
            searchnumber = values.length;
            searchresults = values.map((row) => 
                <Row key={row[columns.id]} className="mb-3">
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
              )
        } else {
            searchnumber = 0;
            searchresults =  <p>We couldn't find what you were looking for</p>
        }
     return (
        <Container style={{maxWidth:"1000px"}}>
            <h2>{searchnumber} search results for "{search}"</h2>
            <hr></hr>
            {searchresults}
            <div className="py-5 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f8cc08" className="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                </svg>
            </div>            
        </Container>
    )}
}
export default SearchPage;

