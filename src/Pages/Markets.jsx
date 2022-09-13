import React from "react"
import { useParams } from "react-router-dom"
import millify from "millify"
import Loader from "../components/Loader"
import { Row, Col, Typography, Avatar, Collapse } from "antd"

import { useGetCryptoMarketsQuery } from "../services/cryptoApi"

const { Panel } = Collapse

const Markets = () => {
  const { coinId } = useParams()
  const { data, isFetching } = useGetCryptoMarketsQuery(coinId)

  const marketsList = data?.data?.markets

  if (isFetching) return <Loader />

  return (
    <>
      <Typography.Title level={1}>Coin Markets</Typography.Title>
      <Row>
        <Col span={4}>Exchange</Col>
        <Col span={4}>24h Volume</Col>
        <Col span={4}>Btc Price</Col>
        <Col span={4}> Market Share</Col>
        <Col span={4}>Price</Col>
        <Col span={4}>Symbol</Col>
      </Row>

      <Row>
        {marketsList.map((market) => (
          <Col span={24} key={market.uuid}>
            <Collapse>
              <Panel
                showArrow={false}
                key={market.uuid}
                header={
                  <Row key={market.uuid}>
                    <Col span={4}>
                      <Typography.Text>{market.rank}.</Typography.Text>
                      <Avatar
                        className="exchange-image"
                        src={market.exchange.iconUrl}
                      />
                      <Typography.Text>{market.exchange.name}</Typography.Text>
                    </Col>
                    <Col span={4}>${millify(market?.["24hVolume"])}</Col>
                    <Col span={4}>{market.btcPrice}</Col>
                    <Col span={4}>{market.marketShare}%</Col>
                    <Col span={4}>{millify(market.price)}</Col>
                    <Col span={4}>{market.quote.symbol}</Col>
                  </Row>
                }
              ></Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Markets
