import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { Platform } from "../hooks/useGames";
import usePlatforms from "../hooks/usePlatforms";
import { ItemPredicate, ItemRenderer, Select } from "@blueprintjs/select";
import { Button } from "@blueprintjs/core";

interface Props {
  onSelectPlatform: (platform: Platform) => void;
  selectedPlatform: Platform | null;
}

const PlatformSelector = ({ onSelectPlatform, selectedPlatform }: Props) => {
  const { data, error } = usePlatforms();

  if (error) return null;

  const filterPlatform: ItemPredicate<Platform> = (
    query,
    platform,
    _index,
    exactMatch
  ) => {
    const normalizedTitle = platform.name.toLowerCase();
    const normalizedQuery = query.toLowerCase();
    if (!query) {
      return true;
    }

    return normalizedTitle.startsWith(normalizedQuery);
  };

  const renderPlatform: ItemRenderer<Platform> = (
    platform,
    { handleClick, handleFocus, modifiers, query }
  ) => {
    return (
      <MenuItem
        disabled={modifiers.disabled}
        key={platform.id}
        onClick={handleClick}
        onFocus={handleFocus}
      >
        {platform.name}
      </MenuItem>
    );
  };
  return (
    <Menu>
      {/* <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedPlatform?.name || "Platforms"}
      </MenuButton>
      <MenuList>
        {data.map((platform) => (
          <MenuItem
            onClick={() => onSelectPlatform(platform)}
            key={platform.id}
          >
            {platform.name}
          </MenuItem>
        ))}
      </MenuList> */}
      <Select<Platform>
        items={data}
        itemPredicate={filterPlatform}
        itemRenderer={renderPlatform}
        noResults={<MenuItem disabled={true}>{"No results."}</MenuItem>}
        onItemSelect={onSelectPlatform}
      >
        <Button
          text={selectedPlatform?.name || "Platforms"}
          rightIcon="caret-down"
          large
        />
      </Select>
    </Menu>
  );
};

export default PlatformSelector;
