import React, { useState, useEffect } from "react"
import millify from "millify"
import { Link } from "react-router-dom"
import { Card, Row, Col, Input, Typography } from "antd"
import { useGetCryptosQuery } from "../services/cryptoApi"
import Loader from "./Loader"

const CryptoCurrency = ({ simplified }) => {
  const count = simplified ? 10 : 100
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)

  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const filterdata = cryptosList?.data.coins?.filter((coin) => {
      return coin.name.toLowerCase().includes?.(searchTerm.toLowerCase())
    })
    setCryptos(filterdata)
  }, [cryptosList, searchTerm])

  if (isFetching) return <Loader />

  return (
    <>
      {!simplified && (
        <>
          <Typography.Title level={1}>CryptoCurrencies</Typography.Title>
          <div className="search-crypto">
            <Input
              placeholder="Search Cryptocurrency"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </>
      )}

      <Row gutter={[20, 20]} className="crypto-card-container">
        {cryptos?.map((currency, i) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={i}>
            <Card
              title={`${currency.rank}. ${currency.name}`}
              extra={
                <Link to={`/crypto/${currency.uuid}`}>
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt={`${currency.name}`}
                  />
                </Link>
              }
              hoverable
            >
              <p>Price: {millify(currency.price)}</p>
              <p>Market Cap: {millify(currency.marketCap)}</p>
              <p>Daily Change: {millify(currency.change)}%</p>

              <div className="crypto-exchange-market">
                <Link to={`/exchanges/${currency.uuid}`}>
                  <strong>Coin Exchnages</strong>
                </Link>

                <Link to={`/markets/coin/${currency.uuid}`}>
                  <strong>Coin Markets</strong>
                </Link>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default CryptoCurrency
