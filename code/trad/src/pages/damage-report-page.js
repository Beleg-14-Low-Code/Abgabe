import "./damage-report-page.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Form from 'react-bootstrap/Form';
import { Card, Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import React, {useState } from "react";

const propTypes = {
    showNextPage: PropTypes.func,
    showPreviousPage: PropTypes.func,
    type: PropTypes.string,
    setType: PropTypes.func,
  };

const DamageReportPage = (props) => {
    
    const {damages, setDamages} = props;
    const [rect, setRect] = useState({});
    const [popupState, setPopupState] = useState(false);
    const [uploaderId, setUploaderId] = useState(-1);

    const handleMouseDown = (e) => {
        setDamages(prevDamages => { console.log(rect); return [...prevDamages, {"x": e.clientX - rect.left, 
                                                            "y": e.clientY - rect.top,
                                                            "upload": [],
                                                            "expanded": true, 
                                                            "notes": false,
                                                            "note_content": ""
                                                        }]});
    }

    const togglePopup = (e, i) => {
        e.preventDefault();
        setPopupState(prevState => {return prevState? false : true})
        setUploaderId(i)
    }

    const handleChange = (e, i) => {
        e.preventDefault();
        setDamages(prevDamages => {
            return prevDamages.map(damage =>{
                if (prevDamages.indexOf(damage) !== i) {return damage} 
                return {
                    ...damage,
                    note_content: e.target.value
                }
            })
        })
    }

    const handleFileUpload = (e) => {
        e.preventDefault();
        if(uploaderId !== -1) {
            setDamages(prevDamages => {
                return prevDamages.map(damage =>{
                    if (prevDamages.indexOf(damage) !== uploaderId) {return damage} 
                    return {
                        ...damage,
                        upload: e.target.files
                    }
                })
            })
        } 
    }

    const toggleBoolState = (idx, choice) => {
            setDamages(prevDamages => {
                return prevDamages.map(damage =>{
                    if (prevDamages.indexOf(damage) !== idx) {return damage} 
                    if ( choice === 1) {
                        return {
                            ...damage,
                            expanded: damage.expanded? false : true,
                            notes: false
                        }
                    } else if (choice === 2) {
                        return {
                            ...damage,
                            notes: damage.notes? false : true
                        }
                    }
                    return []
                })
            })
    }

    const deleteDamages = (idx) => {
        setDamages(prevDamages => {
            let newDamages;
            if(idx !== -1) {
                newDamages = [...prevDamages];
                newDamages.splice(idx, 1);
            } else {newDamages = prevDamages}
            return newDamages
        });
    }

    function createDamageMarkers() {
        var damageDivs = [];
        for (let i = 0; i < damages.length; i++) {
            const newStyle =    {position: "absolute",
                                left: damages[i].x + rect.left - 10 + "px",
                                top: damages[i].y + rect.top - 10 + "px"}
            console.log("createDamageMarkers - damages.x: " + damages[i].x + " rect.x: " + rect.left);
            console.log("createDamageMarkers - damages.y: " + damages[i].y + " rect.y: " + rect.top);
            damageDivs.push(
                <div className="damage-div" style={newStyle} key={i}>{i + 1}</div>
            )
        }
        return damageDivs
    }

    function createListItem() {
        var detailListItems = [];
        for (let i = 0; i < damages.length; i++) {
            detailListItems.push(
                <li className="detail-item" key={i}>
                    <hr className="list-divider" />
                    <h5 className="detail-head">Damage location {i + 1}</h5>
                    <button 
                        className="compact-details">
                            <img 
                                src={damages[i].expanded? require("./down_arrow.png") : require("./up_arrow.png")}
                                alt="compact"
                                className="compact-icon"
                                onClick={() => {toggleBoolState(i, 1)}} />
                        </button>
                    <button    
                        className="delete-damage">
                            <img 
                                src={require("./delete_icon_512x512.png")}
                                alt="delete"
                                className="delete-icon"
                                onClick={() => {deleteDamages(i)}} />
                        </button>
                    {damages[i].expanded && <div className="hideable-content">
                        <p className="detail-pic">Pictures</p>
                        <p className="detail-href" onClick={(e) => togglePopup(e, i)}>Upload</p>
                        <p className="detail-notes">Want to add notes?</p>
                        <Form.Check
                            className="notes-switch"
                            type="switch"
                            onChange={() => {toggleBoolState(i, 2)}}
                            checked={damages[i].notes}
                        />
                        {damages[i].notes &&
                            <div className="note-block">
                                <Form.Label className="note-label">Notes</Form.Label>
                                <Form.Control as="textarea" className="notes-input" onChange={(e) => handleChange(e, i)} key={i}>
                                    {damages[i].note_content}
                                </Form.Control>
                            </div>
                        }
                        </div>
                    }
                </li>
            )
        }
        return detailListItems
    }

    React.useEffect(() => {
        console.log(damages);
    },[damages]);

    return (
        <div>
        <div className="App">
            <h5>This will help us to better understand the extent of the damages</h5>
            <h3>Can you tell us where the car is damaged and provide some pictures?</h3>
        </div>
            <div>
                <Row>
                    <Col>
                        <Card className="mb-3" style={{ width: "45vw" }}>
                            <h4>Damage locations</h4>
                            <h6>Click the image to add damage locations...</h6>
                            <div className="image-wrapper">
                                <img 
                                    className="damage-image" 
                                    src={require("./damage_location.png")} 
                                    alt="damage locations"
                                    style={{width: "40vw", height: "55vh"}}
                                    onMouseDown={handleMouseDown}
                                    onLoad={(e) => {setRect(e.target.getBoundingClientRect());}} />
                            </div>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="mb-3" style={{ width: "45vw" }}>
                            <h4>Details</h4>
                            <ul className="detail-list">
                                {damages !== [] && createListItem()}
                            </ul>
                        </Card>
                    </Col>
                </Row>
            </div>
            {damages !== [] && createDamageMarkers()}
            {popupState && 
            <div className="popup-wrapper">
                <div className="popup-bg"></div>
                <div className="file-popup">
                    <button onClick={(e) => togglePopup(e, -1)}>X</button>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Vehicle claims - Supporting images</Form.Label>
                        <Form.Control type="file" multiple onChange={(e) => {handleFileUpload(e)}}/>
                    </Form.Group>
                    <button className="submit-btn" onClick={(e) => togglePopup(e, -1)}>Finished</button>
                </div>
            </div>
            }
        </div>
    );
};

export { DamageReportPage };
DamageReportPage.propTypes = propTypes;