// Module imports
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
// Database provider
import { DbContext } from '../DbProvider'
// Page imports
import Feed from "../components/Feed";
import Live from "../components/Live"
// Helper Functions
import { shuffleArray, getQuery, getCatColor } from "../components/HelperFunctions";
// Styles
import { Container, Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import LiveBar from "../components/LiveBar";

function CategoryPage() {
    const { loading, db } = useContext(DbContext);
    const [databaseStatus,setDatabaseStatus] = useState(true)
    const [feedcontent, setFeedContent] = useState([]);
    const [livecontent, setLiveContent] = useState([]);
    const { category } = useParams();

    const [sort, setSort] = useState(false);
    
    const handleSortChange = () => {
        const isSort = sort === false;
        setSort(isSort ? true : false);
      };

    
    useEffect(()=>{
        window.scrollTo(0, 0)
        if (!loading) {
            try{
                var resultsfeed = db.exec(getQuery(category,""));
                var resultslive = db.exec(getQuery("latest_today",""));
                if (resultslive.length==0) {
                    var resultslive = db.exec(getQuery("latest","LIMIT 10"));   
                }
                if (category!='latest' && sort===false) {
                    shuffleArray(resultsfeed[0].values);
                }
                setFeedContent(resultsfeed[0]);
                setLiveContent(resultslive[0]);
                setDatabaseStatus(loading) 
            } catch(err) {
                console.log(err);
            } 
        }
    },[loading,category,sort]);

    if (databaseStatus) return <pre>Loading...</pre>;
    else return (
        <Container style={{maxWidth:"1200px"}}>
            <Row className="p-0">
                <Col xs={12} md={8}>
                    <LiveBar/>
                    <Row>
                        <Col>
                            <h2 style={{fontWeight:"700", textTransform:"capitalize", color:getCatColor(category)}}>{category}</h2>
                        </Col>
                        <Col className="d-flex align-items-center">
                            <Form className="ms-auto">
                                <Form.Check 
                                    type="switch"
                                    id="sorttoggle"
                                    onChange={handleSortChange}
                                    checked={sort === true}
                                    label={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-sort-numeric-down icons" viewBox="0 0 16 16">
                                        <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"/>
                                        <path fillRule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                                        <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                                        </svg>}
                                />
                            </Form>
                        </Col>
                    </Row>
                    <Feed data={feedcontent}/>
                </Col>
                <Col className="d-none d-md-block">
                    <Live data={livecontent}/>
                </Col>
            </Row>
            <div className="py-5 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f8cc08" className="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                </svg>
            </div>   
        </Container>
    );
}
export default CategoryPage;