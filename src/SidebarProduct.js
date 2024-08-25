import { Box, ListItem, UnorderedList, Text } from "@chakra-ui/react";


const SidebarProduct = ({ values, intersted, handleChange }) => {
    return (
      <>
        <Box>
          <Text>Price</Text>
          <UnorderedList styleType="' '">
            {values.price?.map((item) => (
              <ListItem>
                <input
                  type="checkbox"
                  id="priceid"
                  onChange={handleChange}
                  name="price"
                  value={item}
                  checked={intersted.includes(item.toString())}
                ></input>
                <label for="priceid">{item}</label>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
        <Box>
          <Text>Color</Text>
          <UnorderedList styleType="' '">
            {values.color?.map((item) => (
              <ListItem>
                <input
                  type="checkbox"
                  id="colorid"
                  onChange={handleChange}
                  name="color"
                  value={item}
                  checked={intersted.includes(item)}
                ></input>
                <label for="colorid">{item}</label>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
        <Box>
          <Text>Type</Text>
          <UnorderedList styleType="' '">
            {values.type?.map((item) => (
              <ListItem>
                <input
                  type="checkbox"
                  id="typeid"
                  onChange={handleChange}
                  name="type"
                  value={item}
                  checked={intersted.includes(item)}
                ></input>
                <label for="typeid">{item}</label>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
        <Box>
          <Text>Gender</Text>
          <UnorderedList styleType="' '">
            {values.gender?.map((item) => (
              <ListItem>
                <input
                  type="checkbox"
                  onChange={handleChange}
                  name="gender"
                  value={item}
                  checked={intersted.includes(item)}
                ></input>
                <label>{item}</label>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </>
    );
};
export default SidebarProduct;
