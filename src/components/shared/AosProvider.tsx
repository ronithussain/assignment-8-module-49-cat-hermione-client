
"use client";

import dynamic from "next/dynamic";

const AosInit = dynamic(() => import("./AosInit"), {
  ssr: false,
});

export default function AosProvider() {
  return <AosInit />;
}
