import React from 'react'
import dynamic from 'next/dynamic';
import Seo from '@/shared/layout-components/seo/seo'
import { Row, Col, Card, Container, Form } from "react-bootstrap";

import Link from "next/link"
import Image from "next/image";


const Signin = () => {

  interface DemoChangerElement extends HTMLElement {
    style: CSSStyleDeclaration;
  }
  function Swicherbutton() {
    let demoChanger: DemoChangerElement | null = document.querySelector(".demo_changer")
    if (demoChanger) {
      demoChanger.style.right = "0px";
    }
    document.querySelector(".demo_changer")?.classList.toggle("active");
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
      <Seo title="Signin" />
      <div className="page main-signin-wrapper"
      >

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
                  <div className="mt-5 pt-4 p-2 position-absolute">
                    <Link href="/components/dashboard/dashboard">
                      <img
                        src={"../../../imgs/login.png"}
                        className="header-brand-img mb-4"
                        width={100}
                        height={100}
                        alt={"logo"}
                      />
                    </Link>
                    <div className="clearfix"></div>
                    <img
                      src={"../../../assets/images/svgs/user.svg"}
                      className="ht-100 mb-0"
                      alt="user"
                    />
                    <h5 className="mt-4 text-fixed-white">Create Your Account</h5>
                    <span className="text-white-6 fs-13 mb-5 mt-xl-0">
                      Signup to create, discover and connect with the global
                      community
                    </span>
                  </div>
                </Col>
                <Col lg={6} xl={7} xs={12} sm={12} className="login_form ">
                  <Container fluid>
                    <Row className="row-sm">
                      <Card.Body className="mt-2 mb-2">
                        <img
                          src={"../../../assets/images/brand-logos/desktop-logo.png"}
                          className=" d-lg-none header-brand-img text-start float-start mb-4 error-logo"
                          alt="logo"
                        />
                        <img
                          src={"../../../assets/images/brand-logos/desktop-white.png"}
                          className=" d-lg-none header-brand-img text-start float-start mb-4 error-logo-light"
                          alt="logo"
                        />
                        <div className="clearfix"></div>
                        <Form>
                          <h5 className="text-start mb-2">
                            Signin to Your Account
                          </h5>
                          <p className="mb-4 text-muted fs-13 ms-0 text-start">
                            Signin to create, discover and connect with the global
                            community
                          </p>
                          <Form.Group className="text-start form-group" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              placeholder="Enter your email"
                              type="Email"
                            />
                          </Form.Group>
                          <Form.Group
                            className="text-start form-group"
                            controlId="formpassword"
                          >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              placeholder="Enter your password"
                              type="password"
                            />
                          </Form.Group>
                          <div className="d-grid">
                            <Link href={"/components/dashboard/dashboard"} className="btn btn-primary">
                              Sign In
                            </Link>
                          </div>

                        </Form>
                        <div className="text-start mt-5 ms-0">
                          <div className="mb-1">
                            <Link
                              href={`/components/authentication/forgot-password/`}
                            >
                              Forgot password ?
                            </Link>
                          </div>
                          <div>
                            {`Don't`} have an account?
                            <Link className='ms-2 d-inline-flex'
                              href={`/components/authentication/signup/`}
                            >
                              Register Here
                            </Link>
                          </div>
                        </div>
                      </Card.Body>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}
Signin.layout = "Authenticationlayout"

export default Signin