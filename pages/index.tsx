import { Button, Col, Form, Row, Alert, Container, Card } from 'react-bootstrap';
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.scss'
import { useState } from 'react';
import Link from "next/link";
import { ChangeEvent } from 'react';
import Seo from '@/shared/layout-components/seo/seo';
import React from 'react';
import axios from 'axios';
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const { email, password } = data;
  let navigate = useRouter();
  const loginUser = () => {

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/api/auth/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: formData,
    };

    return axios.request(config)


  }
  React.useEffect(() => {

  }, [])
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setError("");
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    loginUser().then((res) => {
      setLoading(false);
      const { type } = res.data;
      localStorage.setItem("card_user", JSON.stringify(res.data));
      if (type == 1) {
        console.log("Admin user");
        navigate.replace('/dashboard');
      } else {
        console.log("Client user");
        // navigate.replace('/dashboard');
      }
    }).catch((err) => {
      console.log(err.response.data.message);
      setLoading(false);
      setError(err.response.data.message);
    })
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

                    <h5 className="mt-4 font-satoshi font-bold text-white">Cards</h5>
                    <span className="text-white-6 text-md font-normal">
                      {/* Monitor student drop offs and pickups */}
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
                            <Form.Label>Email</Form.Label>
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