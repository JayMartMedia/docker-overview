import React from "react";
import { format } from "date-fns";

function DisplayDate({ timestamp }: { timestamp: number }): JSX.Element {
  const dateString = format(new Date(timestamp), "MM/dd/yyyy");

  return <span>{dateString}</span>;
}

export default DisplayDate;