import React, { useState } from "react";
import {Button,Carousel, Modal } from "react-bootstrap";
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
                            <h3 className="caroHead">Adding Courses</h3>
                            <Carousel.Caption>
                                <p className="caroPara">To add a course, click on the Add New Course Button. You will then be prompted to search for a course.
                                    You can start by selecting a department (type or use the dropdown menu), or you can directly search for a 
                                    course in the Course Search box. The course description and prerequisites will be visible once the course
                                    is selected. Click add course to add the course to the respective semester.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item id="item">
                            <h3 className="caroHead">Adding Semesters</h3>
                            <Carousel.Caption>
                                <p className = "caroPara">To add a new semester to the plan, click on the Add Semester button. This will add a 
                                new semester table to the end of your current plan. You can edit the Year and Season of the added semester with
                                the Edit Semester button.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item id="item">
                            <h3 className="caroHead">Saving Schedule</h3>
                            <Carousel.Caption>
                                <p className="caroPara">There are 2 ways to save your schedule. For editing convienience, clicking the Save
                                Schedule button will store your schedule within the website. If you reload the page after clicking Save Schedule,
                                your plan will still be there. For sharing with an adivsor, clicking the Download Plan button will create a csv file 
                                to download onto your computer. 
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item id="item">
                            <h3 className="caroHead">Uploading Schedule</h3>
                            <Carousel.Caption>
                                <p className="caroPara">After saving a schedule, the schedule can be imported to the website to automatically
                                fill your plan by clicking the Upload Schedule button, and selecting your file to be uploaded. Be sure not to edit this file when you download it, as it may cause unexpected
                                outcomes on the website.
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