import React, { useEffect, useState } from "react";
import axios from "axios";
import formatCurrency from "../../util";
import "./admin.css";

const Admin = () => {
  const [adminData, setAdminData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://wallpaper-cart-10809-default-rtdb.firebaseio.com/orders.json"
      )
      .then((res) => {
        // console.log(res.data);
        const data = Object.values(res.data);
        setAdminData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(adminData);
  return (
    <div className="adminContainer">
      {adminData.map((data) => {
        return (
          <div>
            <div key={data.id} className="adminData">
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
  );
};

export default Admin;
