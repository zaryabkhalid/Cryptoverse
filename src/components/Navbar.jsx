import React, { useState, useEffect } from "react"
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
  const [activeMenu, setActiveMenu] = useState(true)
  const [screenSize, setScreenSize] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  })

  useEffect(() => {
    screenSize < 768 ? setActiveMenu(false) : setActiveMenu(true)
  }, [screenSize])

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
          <Button
            className="menu-control-container"
            onClick={() => setActiveMenu(!activeMenu)}
          >
            <MenuOutlined />
          </Button>
        </div>

        {activeMenu && (
          <Menu
            theme="dark"
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
          ></Menu>
        )}
      </div>
    </>
  )
}

export default Navbar
