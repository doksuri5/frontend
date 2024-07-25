import React from "react";

type TDescriptionWithLineBreaksProps = {
  description: string;
};

export default function DescriptionWithLineBreaks({ description }: TDescriptionWithLineBreaksProps) {
  return description.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
      <br />
    </React.Fragment>
  ));
}
