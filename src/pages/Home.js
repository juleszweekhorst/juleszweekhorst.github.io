// Module imports
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
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
import MyFormcarry from "../ContactForm";
import CategoryBlock from "../components/CategoryBlock";

function Home() {
    const { loading, db } = useContext(DbContext);
    const [databaseStatus,setDatabaseStatus] = useState(true)

    const [feedcontent, setFeedContent] = useState([]);
    const [localcontent, setLocalContent] = useState([]);
    const [crimecontent, setCrimeContent] = useState([]);
    const [politicscontent, setPoliticsContent] = useState([]);
    const [sportscontent, setSportsContent] = useState([]);
    const [internationalcontent, setInternationalContent] = useState([]);
    const [businesscontent, setBusinessContent] = useState([]);


    const [livecontent, setLiveContent] = useState([]);
    const { category } = useParams();
    
    useEffect(()=>{
        if (!loading) {
            try{
                var resultsfeed = db.exec(getQuery('home',"LIMIT 10"));
                var resultslocal = db.exec(getQuery('local',"LIMIT 10"));
                var resultscrime = db.exec(getQuery('crime',"LIMIT 10"));
                var resultspolitics = db.exec(getQuery('politics',"LIMIT 10"));
                var resultssports = db.exec(getQuery('sports',"LIMIT 10"));
                var resultsinternational = db.exec(getQuery('international',"LIMIT 10"));
                var resultsbusiness = db.exec(getQuery('business',"LIMIT 10"));

                var resultslive = db.exec(getQuery("latest_today","LIMIT 5"));
                if (resultslive.length==0) {
                    var resultslive = db.exec(getQuery("latest","LIMIT 5"));   
                }

                if (category!='latest') {
                    shuffleArray(resultsfeed[0].values);
                    shuffleArray(resultslocal[0].values);
                    shuffleArray(resultscrime[0].values);
                    shuffleArray(resultspolitics[0].values);
                    shuffleArray(resultssports[0].values);
                    shuffleArray(resultsinternational[0].values);
                    shuffleArray(resultsbusiness[0].values);
                }
                setFeedContent(resultsfeed[0]);
                setLocalContent(resultslocal[0]);
                setCrimeContent(resultscrime[0]);
                setPoliticsContent(resultspolitics[0]);
                setSportsContent(resultssports[0]);
                setInternationalContent(resultsinternational[0]);
                setBusinessContent(resultsbusiness[0]);

                setLiveContent(resultslive[0]);
                setDatabaseStatus(loading) 
            } catch(err) {
                console.log(err);
            } 
        }
    },[loading,category]);

    if (databaseStatus) return <pre>Loading...</pre>;
    else return (
        <Container style={{maxWidth:"1200px"}}>
            <Row className="p-0">
                <Col xs={12} md={8}>
                    <div className="">
                    <LiveBar/>

                        <Feed data={feedcontent}/>
                        <Row>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical text-center mb-4" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            </svg>
                            <Link to={"/category/home"} className="fs-6 fw-bold link text-center">Read more general news »</Link>
                        </Row>
                        
                        <CategoryBlock category={'local'} data={localcontent}/>
                        <CategoryBlock category={'crime'} data={crimecontent}/>
                        <CategoryBlock category={'politics'} data={politicscontent}/>
                        <CategoryBlock category={'sports'} data={sportscontent}/>
                        <CategoryBlock category={'international'} data={internationalcontent}/>
                        <CategoryBlock category={'business'} data={businesscontent}/>
                        
                        <div className="container my-5 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f8cc08" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8"/>
                            </svg>
                        </div>
                    </div>
                </Col>
                <Col className="d-none d-md-block">
                    <Live data={livecontent}/>
                    <MyFormcarry/>
                </Col>
            </Row>
        </Container>
    );
}
export default Home;



