
import { Input } from "@chakra-ui/react";
const Search = ({ data, setData, query, setQuery }) => {
  console.log("in search");
  const handleSearch = (e) => {
    let val = e.target.value;
    setQuery(val);
    setData(
      data?.map((item) => {
        if (
          item.name.toLowerCase().includes(val) ||
          item.type.toLowerCase().includes(val) ||
          item.color.toLowerCase().includes(val)
        ) {
          item.show = true;
          return item;
        }
        item.show = false;
        return item;
      })
    );
  };
  return (
    <>
      <Input
        placeholder="search"
        value={query}
        onChange={handleSearch}
        left="1rem"
        top="0rem"
        pos="sticky"
        maxW="20%"
      />
    </>
  );
};
export default Search;
