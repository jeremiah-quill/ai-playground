// 3rd party
import Link from "next/link";

// react internals
import React, { useState, useEffect } from "react";

export function Header() {
  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px. If so, set top to false to control the header's blur and shadow
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`sticky top-0 z-30 bg-opacity-70 transition duration-300 ease-in-out ${
        !top && "bg-white backdrop-blur-sm shadow-lg"
      }`}>
      <div
        className={`flex justify-between items-center py-6 max-w-6xl px-4 mx-auto
      }`}>
        <Link href="/" className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_2_21063)">
              <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01" />
              <path
                d="M12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22Z"
                stroke="#333333"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M10 12.0002V8.53613L13 10.2682L16 12.0002L13 13.7323L10 15.4643V12.0002Z"
                stroke="#333333"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_2_21063">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <h1 className="text-3xl md:text-3xl font-black">OpenAI Playground</h1>
        </Link>
      </div>
    </header>
  );
}
