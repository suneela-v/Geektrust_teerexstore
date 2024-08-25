import Product from "./Product";
import { SimpleGrid, Container, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Search from "./Search";
const Home = ({
  handleCart,
  handleQuantity,
  data,
  setData,
  values,
  intersted,
  handleChange,
  interstednames,
  query,
  setQuery,
}) => {
  return (
    <Container maxW="80%">
      <Search data={data} setData={setData} query={query} setQuery={setQuery} />
      <Flex>
        <Sidebar
          values={values}
          intersted={intersted}
          handleChange={handleChange}
        />
        <SimpleGrid w="80%" columns={{ base: 2, md: 3, lg: 4 }}>
          {data
            .filter((member) => member.show)
            .filter((item) => {
              return (
                interstednames?.filter((a) => {
                  return item.matchobj[a] !== false;
                }).length === interstednames.length
              );
            })
            .map((product) => (
              <Product
                product={product}
                handleCart={handleCart}
                handleQuantity={handleQuantity}
              />
            ))}
        </SimpleGrid>
      </Flex>
    </Container>
  );
};
export default Home;
