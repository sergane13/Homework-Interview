import { useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
    setContent: (newContent: string) => void;
}

const SearchBar = ({setContent}: SearchBarProps) => {
    
    const [queryText, setQueryText] = useState<string>('')

    return (
        <div className="bar">
            <input
                className="input-status"
                type="text"
                value={queryText}
                onChange={(event) => setQueryText(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        setContent(queryText)
                    }
                }}
        />
        <p> Query: <strong> {queryText} </strong></p>
    </div>);
}

export default SearchBar;