
const Product = ({ product, handleCart, handleQuantity }) => {
  const { id, price, quantity, name, originalquantity ,color} = product;
  return (
    <>
      <div className="card" style={{ border: "1px solid red", margin: "2px" }}>
        <div class="card-body" >
          <img
            src={`https://placehold.co/50x50/black/white?text=${name}`}
            style={
              {                
                marginTop:"10%",
                marginLeft:"30%"
              }
            }
          />
          <h5 class="card-title">{`${name}`}</h5>
          <h5 class="card-title">{`${price}`}</h5>
          {quantity !== originalquantity && quantity !== 0 ? (
            <div>
              <button onClick={() => handleQuantity(id, "inc")}>+</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantity(id, "dec")}>-</button>
            </div>
          ) : quantity === originalquantity && originalquantity !== 0 ? (
            <button onClick={() => handleCart(id)}>add to Cart</button>
          ) : (
            <button onClick={null}>out of stock</button>
          )}
        </div>
      </div>
    </>
  );
};
export default Product;
