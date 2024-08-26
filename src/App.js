import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import Navbar from "./Navbar";
const url =
  "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //intersted is the array of filtered options like selected filters like black,men,200
  const [intersted, setIntersted] = useState([]);
  //intersted names is the array of selected filter names like color,price,gender
  const [interstednames, setInterstednames] = useState([]);
  // values r initial unique set of all colors,prices,type,gender
  const [values, setValues] = useState({
    color: [],
    gender: [],
    price: [],
    type: [],
  });
  const [selectedvalues, setSelectedvalues] = useState({
    color: [],
    gender: [],
    price: [],
    type: [],
  });
  const [query, setQuery] = useState("");
  const [initialcart, setInitialcart] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartcount, setCartcount] = useState(0);  
  const handleChange = (e) => {
    const { name, value} = e.target;
    if (!intersted.includes(value)) {
      setIntersted((prev) => {
        let newprev = [...prev, value];
        return newprev;
      });
    } else {
      setIntersted((prev) => {
        let newprev = prev.filter((item) => item !== value);
        return newprev;
      });
    }

    if (!interstednames.includes(name)) {
       setInterstednames([...interstednames, name]);
    }
    //if intersted is not having values of particular name we can remove that name from intersted names
    //values.colors.filter(item => intersted.includes(item))
    //if that arr length is 0 we can remove that name from interstednames
    // else {
    // console.log(intersted,interstednames, "if interstedname included");
    //  console.log(values[name].map((item) => intersted.includes(item)));

    // }

    if (selectedvalues[name].includes(value)) {
      setSelectedvalues((prev) => {
        let newprev = {
          ...prev,
          [name]: prev[name].filter((item) => item !== value),
        };
        console.log(newprev, "selectedvalues");
        return newprev;
      });
      if (selectedvalues[name].length === 1) {
        setInterstednames((prev) => {
          let newprev = prev.filter((interstedname) => interstedname !== name);         
          return newprev;
        });
      }
    } else {
      setSelectedvalues((prev) => {
        let newprev = {
          ...prev,
          [name]: [...prev[name], value],
        };
        return newprev;
      });
    }
    setData((prev) => {
      let newdata = data
        .map((item) => {
          if (item[name].toString() === value) {
            if (item.matchobj[name] === false) {
              return {
                ...item,
                matchobj: { ...item.matchobj, [name]: value },
              };
            } else {
              return {
                ...item,
                matchobj: {
                  ...item.matchobj,
                  [name]: false,
                },
              };
            }
          }

          return item;
        });
      return newdata;
    });
  };
  const fetchData = async () => {
    const response = await fetch(url);
    const shirts = await response.json();
    setData(
      shirts.map((pro) => {
        return {
          ...pro,
          originalquantity: pro.quantity,
          show: true,
          matchobj: {
            color: false,
            type: false,
            gender: false,
            price: false,
          },
        };
      })
    );
    setInitialcart(
      shirts.map((pro) => {
        return {
          ...pro,
          quantity: 0,
          dd: false,
          originalquantity: pro.quantity,
        };
      })
    );
    setValues({
      color: [...new Set(shirts.map((item) => item.color))],
      gender: [...new Set(shirts.map((item) => item.gender))],
      type: [...new Set(shirts.map((item) => item.type))],
      price: [...new Set(shirts.map((item) => item.price))],
    });
    setLoading(false);
    console.log(initialcart);
  };
  const handleTotal = (newcart) => {
    setCartProducts(newcart.filter((q) => q.quantity > 0));
    setTotal(
      newcart
        .filter((q) => q.quantity > 0)
        .reduce((ac, cu) => {
          return cu.quantity * cu.price + ac;
        }, 0)
        .toFixed(2)
    );
  };
  const handleQuantity = (idhere, action) => {
    setData((prev) => {
      let newdata = data.map((product) => {
        if (product.id === idhere) {
          if (action === "inc") {
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          } else
            return {
              ...product,
              quantity: product.quantity + 1,
            };
        }
        return product;
      });
       return newdata;
    });
    setInitialcart((pre) => {
      let newcart = pre?.map((product) => {
        if (product.id === idhere) {
          if (action === "inc")
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          else
            return {
              ...product,
              quantity: product.quantity - 1,
            };
        }
        return product;
      });
      handleTotal(newcart);
      return newcart;
    });
  };
  const handleCart = (idhere) => {
    setData(
      data.map((product) =>
        product.id === idhere
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
    setInitialcart((pre) => {
      let newcart = pre?.map((product) => {
        if (product.id === idhere) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      setCartcount(newcart.filter((q) => q.quantity > 0).length);
      handleTotal(newcart);
      return newcart;
    });
  };
  const handleDelete = (idhere) => {
    setData(
      data.map((product) =>
        product.id === idhere
          ? { ...product, quantity: product.originalquantity }
          : product
      )
    );
    setInitialcart((pre) => {
      let newcart = pre?.map((product) => {
        if (product.id === idhere) {
          return {
            ...product,
            quantity: 0,
          };
        }
        return product;
      });      
      handleTotal(newcart);
      setCartcount(newcart.filter((q) => q.quantity > 0).length);
      return newcart;
    });
  };
  const handleCheckout = (idhere, val) => {
    setData(
      data.map((product) =>
        product.id === idhere
          ? { ...product, quantity: product.originalquantity - val }
          : product
      )
    );
    setInitialcart((pre) => {
      let newcart = pre?.map((product) => {
        if (product.id === idhere) {
          return {
            ...product,
            quantity: val,
          };
        }
        return product;
      });
      handleTotal(newcart);
      return newcart;
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) return <h4>Loading...</h4>;
  return (
    <>
      <Navbar cartcount={cartcount} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              handleCart={handleCart}
              handleQuantity={handleQuantity}
              //data={data.filter((member) => member.show)}
              data={data}
              values={values}
              intersted={intersted}
              setData={setData}
              handleChange={handleChange}
              interstednames={interstednames}
              query={query}
              setQuery={setQuery}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartProducts={cartProducts}
              total={total}
              handleDelete={handleDelete}
              handleCheckout={handleCheckout}
            />
          }
        />
      </Routes>
    </>
  );
}
export default App;
