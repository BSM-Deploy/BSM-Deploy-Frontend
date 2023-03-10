import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="bg-black p-[5px] h-[54px] letter flex items-center">
      <Link href='/' className="h-full inline-flex items-center text-textLightGray text-xl font-bold hover:bg-grayHover tracking-tight px-[1.8rem]">BSM Deploy</Link>
    </header>
  );
}

export default Header;
