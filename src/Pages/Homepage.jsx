import React from "react"
import { Typography, Row, Col, Statistic } from "antd"
import { useGetCryptosQuery } from "../services/cryptoApi"
import millify from "millify"
import { Link } from "react-router-dom"

import CryptoCurrency from "../components/CryptoCurrency"
import News from "../components/News"
import Loader from "../components/Loader"

const { Title } = Typography

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10)

  const globalStats = data?.data?.stats

  if (isFetching) return <Loader />

  return (
    <>
      <Title level={1} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col xs={24} sm={12} lg={8}>
          <Statistic
            title="Total Cryptocurrencies"
            value={millify(globalStats.total)}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <CryptoCurrency simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/newspage">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  )
}

export default Homepage
