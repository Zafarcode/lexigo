"use client";

import * as React from "react";
import Listening from "./listening";
import Speaking from "./speaking";
import { Writing } from "./writing";
import Reading from "./reading";

export default function Tasks({ params }: { params: string[] }) {
  const [category] = params;

  if (category === "listening") {
    return <Listening />;
  } else if (category === "speaking") {
    return <Speaking />;
  } else if (category === "writing") {
    return <Writing />;
  } else if (category === "reading") {
    return <Reading />;
  }
}
