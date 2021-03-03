import React, { useEffect, useState } from "react";
import axios from "axios";
import formatCurrency from "../../util";
import "./admin.css";

const Admin = () => {
  const [adminData, setAdminData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token") 
    console.log(token)
    axios
      .get(
        "https://wallpaper-cart-10809-default-rtdb.firebaseio.com/orders.json?auth="+token
      )
      .then((res) => {
        // console.log(res.data);
        const data = Object.values(res.data);
        setAdminData(data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  console.log(adminData);
  return (
    <div>
      <div className="adminContainer">
        <div style={{ margin: "10px" }}>
          <h2>Previous orders</h2>
        </div>
        {adminData.map((data) => {
          return (
            <div key={data.id}>
              <div className="adminData">
                <ul>
                  <li>Name : {data.name}</li>
                  <li>Email : {data.email}</li>
                  <li>Phone : {data.phone}</li>
                  <li>Address : {data.address}</li>
                  <li>
                    Items :{" "}
                    {data.cartItems.map((item) => {
                      return (
                        <span key={item._id} className="adminItem">
                          {item.title}
                          {", "}
                        </span>
                      );
                    })}
                  </li>
                  <li>
                    Price :{" "}
                    {formatCurrency(
                      data.cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;
