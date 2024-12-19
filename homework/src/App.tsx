import React, { useState } from "react";
import Content from "./content/Content";
import SearchBar from "./search-bar/SearchBar";

function App() {
  const [content, setContent] = useState<string>('');

  return (
    <React.Fragment>
      <SearchBar setContent= {setContent } />
      <Content content={ content}/>
    </React.Fragment>
  );
}

export default App
