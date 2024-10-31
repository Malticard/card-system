import React from 'react'
// import { Chart, CategoryScale } from 'chart.js/auto';
import { Col, Row } from "react-bootstrap";
import ClassComponent from './components/ClassComponent';
import DashCard from './components/DashCard';
import { DashboardItem } from '@/interfaces/DashboardItem';
import { Skeleton } from '@mui/material';
import { UserModel } from '@/interfaces/AuthenticatedUserModel';
// Chart.register(
//   CategoryScale,
// );

const Dashboardecommerce = () => {
  // loader
  const [loading, setLoading] = React.useState<boolean>(false);
  // loading class data
  const [classLoading, setClassLoading] = React.useState<boolean>(false);

  // data handler
  const [data, setData] = React.useState<DashboardItem[]>([]);
  const user: UserModel = JSON.parse(localStorage.getItem('card_user') as string)
  React.useEffect(() => {
    // fetch dashcards data
    setLoading(true);
    // fetchDashboardMetaData().then((data) => {
    //   setData(data);
    //   setLoading(false);
    // }).catch((err) => {
    //   console.log(err);
    //   setLoading(false);
    // });
    // fetch classes data
    setClassLoading(true);
    // fetchDashBoardData().then((res) => {
    //   setClassLoading(false);
    //   setClassData(res);
    // }).catch((err) => {
    //   setClassLoading(false);
    //   console.log(err);
    // });
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
                width={300}
                height={200}
              />
            </Col>

          )) : data.map((item, index) => (<DashCard key={index} label={item.label} value={item.value} url={item.page} />))
        }

      </Row>


    </div>
  )
}

export default Dashboardecommerce