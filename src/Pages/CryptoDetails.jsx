import React, { useState } from "react"
import { useParams } from "react-router-dom"
import millify from "millify"
import HTMLReactParser from "html-react-parser"
import { Col, Row, Typography, Select } from "antd"
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons"
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi"
import LineChart from "../components/LineChart"
import Loader from "../components/Loader"

const { Option } = Select
const { Title, Text } = Typography

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState("7d")
  const { data: details, isFetching } = useGetCryptoDetailsQuery(coinId)
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod })

  const cryptoDetails = details?.data?.coin
  if (isFetching) return <Loader />
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"]

  const stats = [
    {
      id: 1,
      title: "Price to USD",
      value: `$${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      id: 2,
      title: "Rank",
      value: cryptoDetails?.rank,
      icon: <NumberOutlined />,
    },
    {
      id: 3,
      title: "24h Volume",
      value: `$${
        cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      id: 4,
      title: "Market Cap",
      value: `$${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      id: 5,
      title: "All-time-high(daily avg.)",
      value: `$${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ]

  const genericStats = [
    {
      id: 6,
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      id: 7,
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      id: 8,
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      id: 9,
      title: "Total Supply",
      value: `$${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      id: 10,
      title: "Circulating Supply",
      value: `$${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ]

  return (
    <>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={1} className="coin-name">
            {cryptoDetails.name}({cryptoDetails.slug}) Price
          </Title>
          <p>
            {cryptoDetails.name} live price in US dollars. View value
            statistics, market cap and supply.
          </p>
        </Col>
        <Select
          defaultValue="7d"
          className="select-timeperiod"
          placeholder="Select Timeperiod"
          onChange={(value) => setTimePeriod(value)}
        >
          {time.map((date, i) => {
            return <Option key={i}>{date}</Option>
          })}
        </Select>
        {/* line chart */}
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails?.price)}
          coinName={cryptoDetails?.name}
        />
        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={2} className="coin-details-heading">
                {cryptoDetails.name} Value Statistics
              </Title>
              <p>An overview showing the stats of {cryptoDetails.name}</p>
            </Col>
            {stats.map(({ icon, title, value, id }) => (
              <Col className="coin-stats" key={id}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>

          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title level={2} className="coin-details-heading">
                Other Statistics
              </Title>
              <p>An overview showing the stats of all cryptocurrencies</p>
            </Col>
            {genericStats.map(({ icon, title, value, id }) => (
              <Col className="coin-stats" key={id}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
              What is {cryptoDetails.name}?
              {HTMLReactParser(cryptoDetails.description)}
            </Title>
          </Row>
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Links
            </Title>
            {cryptoDetails.links.map((link, i) => (
              <Row className="coin-link" key={i}>
                <Title level={2} className="link-name">
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                </Title>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </>
  )
}

export default CryptoDetails
