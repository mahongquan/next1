import React,{
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import mergeRefs from "react-merge-refs";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useRole,
  useDismiss,
  useFloating,
  FloatingFocusManager,
  useInteractions,
  useListNavigation,
  useTypeahead,
  FloatingOverlay
} from "@floating-ui/react-dom-interactions";

export const MenuItem = forwardRef((props, ref) => {
  // console.log(props)
  return (
    <button {...props} ref={ref} role="menuitem" disabled={props.disabled}>
      {props.label}
    </button>
  );
});

// interface Props {
//   label?: string;
//   nested?: boolean;
// }

export const Menu = forwardRef(
  (props, ref) => {
    console.log("Menu=========================")
    console.log(props);
    let children=props.children;
    let open=props.open;

    const [activeIndex, setActiveIndex] = useState(null);

    // const [open, setOpen] = useState(props.open);

    const listItemsRef = useRef([]);
    const listContentRef = useRef(
      Children.map(children, (child) =>
        isValidElement(child) ? child.props.label : null
      )
    );

    const {
      x,
      y,
      reference,
      floating,
      strategy,
      refs,
      update,
      context
    } = useFloating({
      open,
      onOpenChange: props.onOpenChange,
      middleware: [offset({ mainAxis: 5, alignmentAxis: 4 }), flip(), shift()],
      placement: "right-start"
    });

    const { getFloatingProps, getItemProps } = useInteractions([
      useRole(context, { role: "menu" }),
      useDismiss(context),
      useListNavigation(context, {
        listRef: listItemsRef,
        activeIndex,
        onNavigate: setActiveIndex,
        focusItemOnOpen: false
      }),
      useTypeahead(context, {
        enabled: open,
        listRef: listContentRef,
        onMatch: setActiveIndex,
        activeIndex
      })
    ]);

    useEffect(() => {
      if (open && refs.reference.current && refs.floating.current) {
        return autoUpdate(
          refs.reference.current,
          refs.floating.current,
          update
        );
      }
    }, [open, update, refs.reference, refs.floating]);

    const mergedReferenceRef = useMemo(() => mergeRefs([ref, reference]), [
      reference,
      ref
    ]);

    useEffect(() => {
      function onContextMenu(e) {
        e.preventDefault();
        mergedReferenceRef({
          getBoundingClientRect() {
            return {
              x: e.clientX,
              y: e.clientY,
              width: 0,
              height: 0,
              top: e.clientY,
              right: e.clientX,
              bottom: e.clientY,
              left: e.clientX
            };
          }
        });
        props.onOpenChange(true);
      }

      document.addEventListener("contextmenu", onContextMenu);
      return () => {
        document.removeEventListener("contextmenu", onContextMenu);
      };
    }, [mergedReferenceRef]);

    useLayoutEffect(() => {
      if (open) {
        refs.floating.current?.focus();
      }
    }, [open, refs.floating]);

    return (
      <FloatingPortal>
        {open && (
          <FloatingOverlay lockScroll>
            <FloatingFocusManager context={context} preventTabbing>
              <div
                {...getFloatingProps({
                  className: "ContextMenu",
                  ref: floating,
                  style: {
                    position: strategy,
                    top: y ?? "",
                    left: x ?? ""
                  }
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
    );
  }
);
