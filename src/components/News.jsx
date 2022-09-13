import React, { useState } from "react"
import { Select, Typography, Row, Col, Card, Spin } from "antd"
import moment from "moment"

import { useGetCryptoNewsQuery } from "../services/newsApi"
import { useGetCryptosQuery } from "../services/cryptoApi"
const { Text, Title } = Typography
const { Option } = Select

const demoUrl =
  "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=110&h=110&dpr=1"

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency")
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 15,
  })
  const { data } = useGetCryptosQuery(100)
  if (!cryptoNews?.value) return <Spin size="large" />
  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Typography.Title level={1}>News</Typography.Title>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) => {
                return option.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase())
              }}
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>

              {data?.data?.coins.map((coin) => (
                <Option value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )}

        {cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoUrl}
                    alt={news.name}
                  />
                </div>
                <p>{news.description}</p>
                <div className="provider-container">
                  <div>
                    <Text className="provider-name">
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default News
