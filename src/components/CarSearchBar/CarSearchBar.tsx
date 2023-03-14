import { TextInput, View } from "vcc-ui";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce.hook";

interface IProps {
  searchCars: (search: string) => void;
}

/**
 * Search bar for cars preview list
 *
 * @param searchCars - callback to search in cars list
 */
export const CarSearchBar = ({ searchCars }: IProps) => {
  const [search, setSearch] = useState('');

  const debouncingSearch = useDebounce<string>(search, 500);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // Debounce search to avoid multiply re-renders
  useEffect(() => {
    searchCars(debouncingSearch);
  }, [debouncingSearch])

  return (
    <View marginBottom={5}>
      <TextInput
        label="Search"
        type="text"
        value={search}
        onChange={onChange} />
    </View>
  )
}
