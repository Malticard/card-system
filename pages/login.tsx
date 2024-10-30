import { Button, Col, Form, Row, Alert, Container, Card } from 'react-bootstrap';
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.scss'
import { useState } from 'react';
import Link from "next/link";
import { ChangeEvent } from 'react';
import Seo from '@/shared/layout-components/seo/seo';
import { loginUser } from '@/utils/data_fetch';
import React from 'react';
import { StaffLogin } from '@/interfaces/StaffLogin';


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const { email, password } = data;
  let navigate = useRouter();
  React.useEffect(() => {
    // const user = localStorage.getItem("skooltym_user");
  }, [])
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setError("");
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    loginUser(email, password).then((res) => {
      localStorage.setItem("skooltym_user", JSON.stringify(res.data));
      setLoading(false);
      // handle axios response 
      if (res.status === 200 || res.status === 201) {
        const loginData: StaffLogin = res.data;
        if (loginData.role == 'Admin' || loginData.role == 'Finance') {
          // console.log(`Current session for first time is ${context.read<FirstTimeUserController>().state}`);
          if (loginData.isNewUser === true) {
            navigate.replace('/dashboard/ChangePassword');
          } else {
            navigate.replace('/dashboard');
          }
        } else {
          setError("You are not authorized to access this page");
        }

      } else {
        setError("Failed to login");
      }
    }).catch((err) => {
      setError("Server Offline");
      setLoading(false);
    });
  }

  return (
    <div className={styles.container}>
      <Seo title='Login' />
      <div className="page main-signin-wrapper">
        <Row className="signpages text-center" >
          <Col md={12}>
            <Card>
              <Row className="row-lg">
                <Col
                  lg={12}
                  xl={5}
                  className="d-none d-lg-block text-center bg-primary details"
                >
                  <div className="pl-10 pt-5 my-auto p-2 position-absolute">
                    <img
                      src={`/imgs/login.png`}
                      className="pl-3 header-brand-img mb-4"
                      width={250}
                      height={250}
                      alt="logo-light"
                    />
                    <div className="clearfix"></div>

                    <h5 className="mt-4 font-satoshi font-bold text-white">Skooltym</h5>
                    <span className="text-white-6 text-md font-normal">
                      Monitor student drop offs and pickups
                    </span>
                  </div>
                </Col>
                <Col lg={12} xl={7} xs={12} sm={12} className="login_form ">
                  <Container fluid>
                    <Row className="row-sm">
                      <Card.Body className="mt-2 mb-2">
                        <div className="clearfix"></div>
                        {err && <Alert variant="danger">{err}</Alert>}
                        <Form onSubmit={handleLogin}>
                          <h5 className="text-start font-bold text-xl mb-2">
                            SignIn to Your Account
                          </h5>
                          <p className="mb-4 text-muted fs-13 ms-0 text-start">
                            Sign In to create, discover and connect with the global
                            community
                          </p>
                          <Form.Group className="text-start form-group" controlId="formEmail">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              className="form-control"
                              placeholder="Enter your registered contact"
                              name="email"
                              type='text'
                              value={email}
                              disabled={loading}
                              onChange={changeHandler}
                              required
                            />
                          </Form.Group>
                          <Form.Group
                            className="text-start form-group"
                            controlId="formpassword"
                          >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              className="form-control"
                              placeholder="Enter your password"
                              name="password"
                              type='password'
                              value={password}
                              onChange={changeHandler}
                              disabled={loading}
                              required
                            />
                          </Form.Group><div className="d-grid">
                            <div className="text-end mt-1 mb-2 ms-0">
                              <div className="mb-1">
                                <Link
                                  href="/forgot-password"
                                > Forgot password ?
                                </Link>
                              </div>
                            </div>
                            <Button disabled={loading} type='submit'>
                              {loading ? 'Signing in.....' : ' Sign In'}
                            </Button>
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
    </div>
  )
}


export default Home