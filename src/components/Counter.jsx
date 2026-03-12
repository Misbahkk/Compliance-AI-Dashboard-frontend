import { useState, useEffect, useRef } from "react";

function Counter({ to, suffix = "", prefix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return; ref.current = true;
    const dur = 1800, step = 16;
    let cur = 0;
    const iv = setInterval(() => {
      cur += (to / (dur / step));
      if (cur >= to) { setVal(to); clearInterval(iv); }
      else setVal(Math.floor(cur));
    }, step);
    return () => clearInterval(iv);
  }, [to]);
  return <span>{prefix}{val.toLocaleString()}{suffix}</span>;
}

export default Counter;
