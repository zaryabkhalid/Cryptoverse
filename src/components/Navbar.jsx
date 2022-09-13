import React from "react"
import { Button, Menu, Typography } from "antd"
import logo from "../images/cryptocurrency.png"
import { Link, useNavigate } from "react-router-dom"
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons"
import Avatar from "antd/lib/avatar/avatar"

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="nav-container">
        <div className="logo-container">
          <Avatar src={logo} size="large" />
          <Typography.Title level={2}>
            <Link className="logo" to="/">
              Cryptoverse
            </Link>
          </Typography.Title>
          <Button className="menu-control-container">
            <MenuOutlined />
          </Button>
        </div>

        <Menu
          onClick={({ key }) => {
            navigate(key)
          }}
          items={[
            { label: "Home", key: "/", icon: <HomeOutlined /> },
            {
              label: "Cryptocurrencies",
              key: "/cryptocurrencies",
              icon: <FundOutlined />,
            },

            { label: "News", key: "/newspage", icon: <BulbOutlined /> },
          ]}
          theme="dark"
        ></Menu>
      </div>
    </>
  )
}

export default Navbar
