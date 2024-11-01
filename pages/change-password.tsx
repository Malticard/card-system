import React, { Fragment } from 'react'
import Seo from '@/shared/layout-components/seo/seo'
import Link from "next/link"
import { Row, Col, Card, Container, Form } from "react-bootstrap";

const ResetPassword = () => {
    interface DemoChangerElement extends HTMLElement {
        style: CSSStyleDeclaration;
    }

    function remove() {
        let demoChanger: DemoChangerElement | null = document.querySelector(".demo_changer")
        if (demoChanger) {
            demoChanger.style.right = "-270px";
        }
        document.querySelector(".demo_changer")?.classList.remove("active");
    }
    return (
        <div>
            <Seo title="Reset Password" />
            {/* <!-- Row --> */}
            <Fragment>
                <div className="page main-signin-wrapper">

                    <Row className="signpages text-center"
                        onClick={() => remove()}
                    >
                        <Col md={12}>
                            <Card>
                                <Row className="row-sm">
                                    <Col
                                        lg={6}
                                        xl={5}
                                        className="d-none d-lg-block text-center bg-primary details"
                                    >
                                        <div className="mt-5 pt-5 p-2 position-absolute">

                                            <h5 className="mt-4 text-fixed-white">Reset Your Password</h5>
                                            <span className="text-white-6 fs-13 mb-5 mt-xl-0">
                                                Signup to create, discover and connect with the global
                                                community
                                            </span>
                                        </div>
                                    </Col>
                                    <Col lg={6} xl={7} xs={12} sm={12} className=" login_form ">
                                        <Container fluid>
                                            <Row className=" row-sm">
                                                <Card.Body className="mt-2 mb-2">

                                                    <div className="clearfix"></div>
                                                    <h5 className="text-start mb-2">Reset Your Password</h5>
                                                    <p className="mb-4 text-muted fs-13 ms-0 text-start">
                                                        {` It's`} free to signup and only takes a minute.
                                                    </p>
                                                    <Form>
                                                        <Form.Group
                                                            className="text-start form-group"
                                                            controlId="formNewPassword"
                                                        >
                                                            <Form.Label>New Password</Form.Label>
                                                            <Form.Control
                                                                placeholder="Enter your password"
                                                                type="password"
                                                            />
                                                        </Form.Group>
                                                        <Form.Group
                                                            className="text-start form-group"
                                                            controlId="formpassword"
                                                        >
                                                            <Form.Label>Confirm Password</Form.Label>
                                                            <Form.Control
                                                                placeholder="Enter your password"
                                                                type="password"
                                                            />
                                                        </Form.Group>

                                                        <div className="d-grid">
                                                            <Link href={`/components/authentication/signin`} className="btn btn-primary">Update Password</Link>
                                                        </div>

                                                    </Form>

                                                </Card.Body>
                                            </Row>
                                        </Container>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </div>

                {/* <!-- End Row --> */}
            </Fragment>
            {/* <!-- End Row --> */}
        </div>
    )
}
ResetPassword.layout = "Authenticationlayout"

export default ResetPassword