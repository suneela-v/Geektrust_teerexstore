import { Flex,Icon,useBoolean } from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import SidebarProduct from "./SidebarProduct";

const Sidebar = ({ values, intersted, handleChange }) => {
  const [flag, setFlag] = useBoolean(false);
  return (
    <>
      <Icon
        as={FaFilter}
        display={{ base: "block", md: "none" }}
        onClick={setFlag.toggle}
        left="4rem"
        top="2rem"
        pos="sticky"
      />
      <Flex
        w="30%"
        h="100%"
        left="4rem"
        top="2rem"
        pos="sticky"
        display={{ base: "none", md: "flex" }}
        direction={"column"}
      >
        <SidebarProduct
          values={values}
          intersted={intersted}
          handleChange={handleChange}
        />
      </Flex>

      {flag && (
        <Flex
          w="30%"
          h="100%"
          top="4rem"
          left="1rem"
          pos="sticky"
          direction={"column"}
          display={{ base: "block", md: "none" }}
        >
          <SidebarProduct
            values={values}
            intersted={intersted}
            handleChange={handleChange}
          />
        </Flex>
      )}
    </>
  );
};
export default Sidebar;
