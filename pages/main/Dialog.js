import React, { cloneElement, useState } from "react";
import {
  useFloating,
  useInteractions,
  useClick,
  useRole,
  useDismiss,
  useId,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager
} from "@floating-ui/react-dom-interactions";
export default function(props){
  console.log("Dialog ======")
  console.log(props)
  let {
    open,
    onOpenChange,children
  }=props
  const { reference, floating, context } = useFloating({
    open,
    onOpenChange: onOpenChange
  });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context)
  ]);
  // console.log("open=",open)
  // console.log(reference,floating,context,getReferenceProps,getFloatingProps)
  // console.log(id);
  return (
    <>
      <FloatingPortal>
        {open && (
          <FloatingOverlay
            lockScroll
            style={{
              display: "grid",
              placeItems: "center",
              background: "rgba(25, 25, 25, 0.8)"
            }}
          >
            <FloatingFocusManager context={context}>
              <div
                {...getFloatingProps({
                  ref: floating,
                  className: "Dialog",
                  "aria-labelledby": labelId,
                  "aria-describedby": descriptionId
                })}
              >
                {
                  children
                }
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  );
};