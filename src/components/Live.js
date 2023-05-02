import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
// Helper function
import { getColumn, getTrimmedText }from "./HelperFunctions"
// Style
import "../index.css";
import "../styles/styles.scss";

function Live({data}) {
    const columns = getColumn(data.columns);
    const values = data.values;
    return (
        <Container className="shadow-sm rounded border b-l pt-2 pb-3 dp-01">
            <Row className="align-items-center">
                <h2 style={{fontWeight:"700"}} className="main-text">Latest News <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-broadcast liveblinker" viewBox="0 0 16 16">
                    <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                </svg></h2>
            </Row>
            {values.map((row) => 
            <Row key={row[columns.id]} className="mb-4 align-items-center ps-2">
                <Col xs={2} className="d-flex flex-row-reverse">
                    <div style={ { fontSize: "small" } } className="fw-bold">
                        {new Date(row[columns.datetime]).toLocaleTimeString('en-GB', {hour: '2-digit',minute: '2-digit'})}
                    </div>
                </Col>
                <Col xs={9} className="ps-0">
                    <Link to={"/article/"+row[columns.id]} style={ { textDecoration: 'none' } } className="fs-6 link main-text" >{getTrimmedText(row[columns.title],"title")}</Link>
                </Col>
                <Col xs={1} className="p-0"> »</Col>
            </Row>
            )}
            <Row>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical text-center mb-2" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
                <Link to={"/category/latest"} className="fs-6 fw-bold link text-center main-text">Read more latest news »</Link>
            </Row>
        </Container>

    ) 
    
}
export default Live;