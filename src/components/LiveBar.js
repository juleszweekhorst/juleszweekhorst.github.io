// Module imports
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
// Style
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.scss';

function LiveBar() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=25.0480&longitude=-77.3554&daily=sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=kn&precipitation_unit=inch&timezone=America%2FNew_York")
        .then(res => res.json())
        .then(
            (result) => {
            setData(result);
            setIsLoaded(true);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setIsLoaded(false);
                setError(error);
            }
        )
    }, [])
    if (isLoaded) {
        return (
            <Row className="p-0 mb-2" style={{ fontSize:"small"}}>
                <Col xs="auto" className="pe-0">
                    <a target="_blank" rel="noreferrer noopener" href={"https://radarbui.com"} style={{textDecoration:"none"}}>
                        {new Date().toLocaleDateString("en-US",{ weekday: 'long', month: 'long', day: 'numeric' })}
                    </a>
                </Col>
                <Col xs="auto">
                    <a target="_blank" rel="noreferrer noopener" href={"https://radarbui.com"} style={{textDecoration:"none"}}>
                    <Row>
                        <Col xs="auto" className="ps-2 pe-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-thermometer-half" viewBox="0 0 16 16">
                            <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z" fill="#ed1c24"/>
                            <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z"/>
                            </svg> {data.current_weather.temperature}°
                        </Col>
                        <Col xs="auto" className="p-0 pe-3">
                            <svg style={{transform: "rotate(" + data.current_weather.winddirection + "deg)"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                            </svg> {data.current_weather.windspeed}kn
                        </Col>
                        <Col xs="auto" className="p-0 pe-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sunrise-fill" viewBox="0 0 16 16">
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708l1.5-1.5zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                            </svg> {new Date(data.daily.sunrise[0]).toLocaleTimeString('en-GB', {hour: '2-digit',minute: '2-digit'})}
                        </Col>
                        <Col xs="auto" className="p-0 pe-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-sunset-fill icons" viewBox="0 0 16 16">
                                <path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708l1.5 1.5zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                            </svg> {new Date(data.daily.sunset[0]).toLocaleTimeString('en-GB', {hour: '2-digit',minute: '2-digit'})}
                        </Col>
                    </Row>
                    </a>
                </Col>
            </Row>
        )
    } else {
        return (
            <div className="shadow-sm rounded" style={{backgroundColor:"#ffffff"}}>
                Loading...
            </div>
        )
    }
}
export default LiveBar;
