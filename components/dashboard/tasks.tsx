"use client";

import * as React from "react";
import Listening from "./listening";
import Speaking from "./speaking";
import {Writing} from "./writing";

export default function Tasks({ params }: { params: string[] }) {
  const [category] = params;

  if (category === "listening") {
    return <Listening />;
  } else if (category === "speaking") {
    return <Speaking />;
  }else if(category === "writing" || "reading"){
    return <Writing />
  }
}
