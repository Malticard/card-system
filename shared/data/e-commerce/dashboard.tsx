import React from 'react'
// import { Chart, CategoryScale } from 'chart.js/auto';
import { Col, Row } from "react-bootstrap";
import ClassComponent from './components/ClassComponent';
import DashCard from './components/DashCard';
import { DashboardItem } from '@/interfaces/DashboardItem';
import { Skeleton } from '@mui/material';
import { UserModel } from '@/interfaces/AuthenticatedUserModel';
import { DashboardController } from '@/lib/controllers/dashboard.controller';
import axios from 'axios';
// Chart.register(
//   CategoryScale,
// );

const Dashboardecommerce = () => {
  // loader
  const [loading, setLoading] = React.useState<boolean>(false);
  // data handler
  const [data, setData] = React.useState<DashboardItem[]>([]);
  // 
  const fetchData = () => {
    axios.get('/api/dashboard').then((res) => {
      console.log(res);
      setData(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }
  React.useEffect(() => {
    // fetch dashcards data
    setLoading(true);
    fetchData();
  }, []);
  return (
    <div>
      <Row className="row-sm">
        {
          loading ? Array.from({ length: 4 }).map((x, index) => (
            <Col className='mx-10' sm={12} md={6} lg={6} xl={3}>
              <Skeleton
                key={index}
                className='mx-4'
                variant="rounded"
                width={250}
                height={200}
              />
            </Col>

          )) : data.map((item, index) => (<DashCard key={index} label={item.label} icon={item.icon} value={item.value} url={item.page} />))
        }

      </Row>


    </div>
  )
}

export default Dashboardecommerce