import { Icon, Flex } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ cartcount }) => {
  const mystyle = {
    marginLeft: -3,
  };
  return (
    <Flex top="1rem" pos="sticky" direction={"row-reverse"}>
      <Link to="/cart">
        <Icon as={FaShoppingCart} style={{ marginBottom: -10 }} />
        {cartcount > 0 && <span style={mystyle}>{cartcount} </span>}
      </Link>
      <Link to="/" style={{ padding:10 }}>
        products
      </Link>
    </Flex>
  );
};
export default Navbar;
