import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
        className,
      )}
      {...props}
    >
      {children}
      <span className="relative h-4 w-4 shrink-0" aria-hidden="true">
        <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-current" />
        <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-current transition-transform duration-300 ease-out group-data-[state=open]:rotate-90" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  // forceMount keeps the content in the DOM even when the item is collapsed,
  // so SSR/prerendered HTML includes the answer text for crawlers and
  // non-rendering fetchers (Claude.ai, social bots). The explicit
  // data-[state=closed]:h-0 pins the initial closed height to 0 so real
  // users never see a flash-of-open-content before JS hydrates — the
  // open/close animation still plays over it on state change.
  <AccordionPrimitive.Content
    ref={ref}
    forceMount
    className="overflow-hidden text-sm transition-all data-[state=closed]:h-0 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
