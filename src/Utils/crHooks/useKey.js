import { useState, useEffect, useRef } from "react";



// Handles keypress events
function useKey(key, cb) {
    const callbackRef = useRef(cb);

    useEffect(() => {
        callbackRef.current = cb;
    });

    useEffect(() => {

        function handle(event) {
            if(event.code === key) {
               callbackRef.current(event); 
            }
        }
        document.addEventListener("keypress", handle);
        return () => document.removeEventListener("keypress", handle);
    }, [key]);
};

export default useKey;