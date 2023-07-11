/* eslint-disable @typescript-eslint/no-explicit-any */
// Copied from https://github.com/TheMightyPenguin/dessert-box
// The MIT License (MIT) - Copyright (c) 2021 Victor Tortolero

/* eslint-disable no-restricted-syntax */

import React, { createElement, forwardRef } from "react";
import { sprinkles } from "../../styles/sprinkles.css";

function composeClassNames(...classNames: (string | undefined)[]) {
  const classes = classNames
    .filter((className) => Boolean(className) && className !== ` `)
    .map((className) => className?.toString().trim()) as string[];
  return classes.length === 0 ? undefined : classes.join(` `);
}

interface IAtomsFnBase {
  (...args: any): string;
  properties: Set<string>;
}

function extractAtomsFromProps<AtomsFn extends IAtomsFnBase>(
  props: Record<string, unknown>,
  atomsFn: AtomsFn,
) {
  let hasAtomProps = false;
  const atomProps: Record<string, unknown> = {};
  const otherProps: Record<string, unknown> = {};
  const customProps: Record<string, unknown> = {};

  for (const key in props) {
    if (key.startsWith(`_`) && key[1] === `_`) {
      const actualKey = key.substring(2);
      customProps[actualKey] = props[key];
    } else if (atomsFn.properties.has(key)) {
      hasAtomProps = true;
      atomProps[key] = props[key];
    } else {
      otherProps[key] = props[key];
    }
  }

  return { hasAtomProps, atomProps, otherProps, customProps };
}

type HTMLProperties = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  "as" | "color" | "height" | "width" | "size"
>;

type OverrideTokens<T> = {
  [K in keyof T as K extends string ? `__${K}` : number]: any;
};

interface CreateBoxParams<AtomsFn> {
  atoms: AtomsFn;
}

function createBox<AtomsFn extends IAtomsFnBase>({
  atoms: atomsFn,
}: CreateBoxParams<AtomsFn>) {
  type Tokens = Parameters<AtomsFn>[0];
  type BoxProps = {
    as?: React.ElementType;
    children?: React.ReactNode;
    className?: string;
    style?: Record<string, any>;
  } & Tokens &
    OverrideTokens<Tokens> &
    HTMLProperties;

  const Box = forwardRef<HTMLElement, BoxProps>(
    ({ as: element = "div", className, style, ...props }: BoxProps, ref) => {
      const { atomProps, customProps, otherProps } = extractAtomsFromProps(
        props,
        atomsFn,
      );

      /* eslint-disable @typescript-eslint/no-unsafe-assignment */
      /* eslint-disable @typescript-eslint/no-unsafe-argument */
      return createElement(element, {
        ref,
        style: { ...style, ...customProps },
        ...otherProps,
        className: composeClassNames(className, atomsFn(atomProps)),
      });
      /* eslint-enable @typescript-eslint/no-unsafe-assignment */
      /* eslint-enable @typescript-eslint/no-unsafe-argument */
    },
  );

  Box.displayName = "DessertBox";

  return Box;
}

const BaseBox = createBox({ atoms: sprinkles });

type BaseBoxProps = React.ComponentPropsWithRef<typeof BaseBox>;

export interface IBoxProps extends BaseBoxProps {
  innerRef?: React.Ref<HTMLElement>;
}

export function Box({ innerRef, ...rest }: IBoxProps) {
  return <BaseBox ref={innerRef} {...rest} />;
}
