import React, { FunctionComponent, ReactNode, Children } from "react";
import "./UIElements.css";

/* A lot of these are just kind of portable css */
export const PaddedList: FunctionComponent<{ items: ReactNode[] }> = ({
  items
}) => (
  <ol className="padded-list">
    {items.map(item => (
      <PaddedLI>{item}</PaddedLI>
    ))}
  </ol>
);

export const PaddedLI: FunctionComponent<{}> = ({ children }) => (
  <li className="padded-li">{children}</li>
);

export const Card: FunctionComponent = ({ children }) => (
  <div className="card">{children}</div>
);

export const Spinner = ({ text = "Loading" }: { text?: string }) => (
  <div className="spinner">
    <svg viewBox="-10 -10 70 70">
      <mask id="myMask">
        <rect x="0" y="0" width="50" height="50" fill="aliceblue" />
        <path d="M25,25 L0,-25 L0,25 Z" fill="black" />
      </mask>
      <circle
        cx="25"
        cy="25"
        r="20"
        mask="url(#myMask)"
        stroke="lightgreen"
        fill="none"
        strokeWidth="5"
      />
    </svg>
    {text}
  </div>
);

interface WaitForLoadedProps<T> {
  item: T | null | undefined;
  children: (item: T) => ReactNode;
}

export const WaitForLoaded = function<T>(props: WaitForLoadedProps<T>) {
  const item = props.item;
  if (item) {
    return <div>{props.children(item)}</div>;
  }
  return <Spinner />;
};
