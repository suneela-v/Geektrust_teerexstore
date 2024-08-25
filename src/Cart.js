import React from "react";
const Cart = ({ cartProducts, total, handleDelete, handleCheckout }) => {
  return (
    <div data-testid="cart-container">
      {cartProducts.length > 0 && (
        <>
          <table>
            <tbody data-testid="cart-body">
              {cartProducts.map(
                ({ name, price, id, originalquantity, quantity }) => (
                  <tr>
                    {" "}
                    <td style={{ padding: "10px" }}>
                      <img src={`https://placehold.co/50x50?text=${name}`} />
                    </td>
                    <td style={{ padding: "10px" }}>{name}</td>
                    <td style={{ padding: "10px" }}>{price}</td>
                    <select
                      name="cartquantity"
                      style={{
                        margin: "10px",
                        border: "1px solid black",
                        padding: "10px",
                      }}
                      onChange={(e) =>
                        handleCheckout(id, parseInt(e.target.value))
                      }
                      defaultValue={quantity}
                    >
                      {new Array(originalquantity).fill(0).map((i, ind) => (
                        <option value={ind + 1}>{ind + 1}</option>
                      ))}
                    </select>
                    {/*) : (
                    <></>
                  )} */}
                    <button
                      onClick={() => handleDelete(id)}
                      style={{ padding: "10px" }}
                    >
                      delete
                    </button>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <hr />
          <div>Total:{total}</div>
        </>
      )}
    </div>
  );
};
export default Cart;
