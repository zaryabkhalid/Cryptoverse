import React from "react"
import { Routes, Route, Link } from "react-router-dom"
import { Layout, Typography, Space } from "antd"
import { Navbar } from "./components"
import "./App.css"
import Homepage from "./Pages/Homepage"
import Exchanges from "./Pages/Exchanges"
import Cryptocurrencies from "./Pages/Cryptocurrencies"
import NewsPage from "./Pages/NewsPage"
import CryptoDetails from "./Pages/CryptoDetails"
import Markets from "./Pages/Markets"

const App = () => {
  return (
    <>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/exchanges/:coinId" element={<Exchanges />} />
                <Route
                  path="/cryptocurrencies"
                  element={<Cryptocurrencies />}
                />
                <Route path="/crypto/:coinId" element={<CryptoDetails />} />
                <Route path="/newspage" element={<NewsPage />} />
                <Route path="/markets/coin/:coinId" element={<Markets />} />
              </Routes>
            </div>
          </Layout>
          <div className="footer">
            <Typography.Title
              level={5}
              style={{ color: "white", textAlign: "center" }}
            >
              Cryptosumer <br />
              All rights reserved
            </Typography.Title>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
              <Link to="/newspage">News</Link>
            </Space>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
