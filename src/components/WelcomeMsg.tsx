import React, { useState } from "react";
import { Alert,Button,Carousel, Modal } from "react-bootstrap";
import "../App.css";



function WelcomeMsg({show, setShow}:{show:boolean, setShow:(b:boolean)=>void}): JSX.Element {
    const [slide, setSlide] = useState(0);

    const hide = () => {
        setShow(false);
        setSlide(0);
    };

    const handleClick = (nextSlide: number, e:Record<string, unknown> | null) => {
        setSlide(nextSlide);
        console.log(e);
    };

    return (
        <div>
            {show && <Modal size="lg" show={show} onHide={hide}>
                <Modal.Header>
                    <Modal.Title id="welcomeModal">UD Computer Science Degree Planner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel variant="dark" className="carousel" interval={null} activeIndex={slide} onSelect={handleClick}>
                        <Carousel.Item id = "item">
                            <Carousel.Caption>
                                <h3>Welcome to the UD Computer Science Degree Planner!</h3>
                                <p>Use this guide to use the website.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item id = "item">
                            <Carousel.Caption>
                                <h3 className="caroHead">Adding Courses</h3>
                                <p className="caroPara">To add a course, click on the Add New Course Button. You will then be prompted to search for a course.
                                    You can start by selected a department (type or use the dropdown menu), or you can directly search for a 
                                    course in the Course Search box. The course description and prerequisites will be visible one the course
                                    is selected.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item id="item">
                            <Carousel.Caption>
                                <h3 className="caroHead">Adding Semesters</h3>
                                <p className = "caroPara">

                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item id="item">
                            <Carousel.Caption>
                                <h3 className="caroHead">Saving Schedule</h3>
                                <p className="caroPara">

                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item id="item">
                            <Carousel.Caption>
                                <h3 className="caroHead">Uploading Schedule</h3>
                                <p className="caroPara">

                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Modal.Body>
                <Button onClick={hide}>
                        Close and start scheduling
                </Button>
            </Modal>}
        </div>
                
    );
}

export default WelcomeMsg;