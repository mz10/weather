import React from "react";

type IfBase = { children: React.ReactNode };
type IfAnd = IfBase & { is: boolean | number; and: boolean | number; or?: never };
type IfOr  = IfBase & { is: boolean | number; or:  boolean | number; and?: never };
type IfIs  = IfBase & { is: boolean | number; and?: never; or?: never };

export type IfProps = IfAnd | IfOr | IfIs;

export const If: React.FC<IfProps> = ({ is, and, or, children }) => {
  const truthy = (v: boolean | number | undefined) => Boolean(v);
  let show = truthy(is);

  if (and !== undefined) show = truthy(is) && truthy(and);
  else if (or  !== undefined) show = truthy(is) || truthy(or);

  return show ? <>{children}</> : null;
};