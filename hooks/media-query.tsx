import { useState, useEffect } from "react";

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        setMatches(mediaQuery.matches);

        const handleChange = () => setMatches(mediaQuery.matches);

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [query]);

    return matches;
}

export default useMediaQuery;
