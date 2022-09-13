import React from "react"
import { useParams } from "react-router-dom"
import { useGetCryptoExchangesQuery } from "../services/cryptoApi"
import { Row, Col, Card, Typography } from "antd"
import millify from "millify"
import Loader from "../components/Loader"
import { SafetyCertificateTwoTone } from "@ant-design/icons"

const Exchanges = () => {
  const { coinId } = useParams()
  const { isFetching, data } = useGetCryptoExchangesQuery(coinId)
  const cryptoexchange = data?.data?.exchanges

  if (isFetching) return <Loader />
  return (
    <>
      <Typography.Title level={1}>Coin Exchanges</Typography.Title>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptoexchange?.map((exchange) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={exchange.uuid}
          >
            <Card
              title={`${exchange.name}.`}
              extra={
                <img
                  className="crypto-image"
                  src={exchange.iconUrl}
                  alt={`${exchange.name}`}
                />
              }
              hoverable
            >
              <p>Rank: {exchange.rank}</p>
              <p>Price: {millify(exchange.price, { precision: 4 })}</p>
              <p>No. of Markets: {exchange.numberOfMarkets}</p>
              <p>
                Recommended:{" "}
                {<SafetyCertificateTwoTone twoToneColor="#0F3460" />}
              </p>
              <p>BTC Price: {millify(exchange.btcPrice, { precision: 5 })}</p>
              <div>
                <a
                  href={exchange.coinrankingUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Check Coin Ranking
                </a>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Exchanges
