import React from "react";
import './button.css';

interface ButtonProps {
  primary?: boolean;
  disabled?:boolean;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label: string;
  check: string;
  onClick?: () => any;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  disabled=false,
  size = "medium",
  backgroundColor,
  label,
  check,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";
    
const active = disabled && "storybook-button-disable";
    
  return (
    <button
      type="button"
      className={`storybook-button storybook-button--${size} ${mode} ${active}`}
      style={{ backgroundColor }}
      {...props} disabled={disabled} onClick={()=>{
       alert("button clicked")
      }}>
      {label} {check}
    </button>
  );
};
