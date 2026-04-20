import { useState, useEffect } from "react";

function useFadeIn() {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpacity(1);
        }, 200);

        return () => clearTimeout(timer);
    } , []);

    return opacity;
}

export default useFadeIn;