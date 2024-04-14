import { Input, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { InputGroup } from "@blueprintjs/core";
interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form>
      {/* <InputLeftElement children={<BsSearch />} />
      <Input placeholder="Search games..." type="search" /> */}

      <InputGroup
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search games..."
        large
        type="search"
      />
    </form>
  );
};

export default SearchInput;
