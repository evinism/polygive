import React from "react";
import { throttle } from "throttle-debounce";

interface SearchBarProps {
  onSearch: (query: string) => unknown;
}

class SearchBar extends React.Component<SearchBarProps> {
  throttledOnSearch: (query: string) => void;
  constructor(props: SearchBarProps) {
    super(props);
    this.throttledOnSearch = throttle(300, false, query => {
      this.props.onSearch(query);
    });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    this.throttledOnSearch(query);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleChange}
          placeholder="search..."
        />
      </div>
    );
  }
}

export default SearchBar;
