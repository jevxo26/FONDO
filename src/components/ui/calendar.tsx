import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      data-slot="calendar"
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        root: "relative w-fit",
        months: "flex flex-wrap gap-4 max-w-fit",
        month: "flex flex-col",
        month_caption: "flex items-center justify-center h-9 font-medium text-sm",
        caption_label: "inline-flex items-center whitespace-nowrap",
        nav: "absolute top-0 right-0 flex items-center h-9",
        button_previous: "inline-flex items-center justify-center size-7 rounded-md hover:bg-muted transition-colors disabled:pointer-events-none disabled:opacity-50",
        button_next: "inline-flex items-center justify-center size-7 rounded-md hover:bg-muted transition-colors disabled:pointer-events-none disabled:opacity-50",
        month_grid: "border-collapse w-full",
        weekdays: "flex",
        weekday: "w-9 text-xs font-medium text-muted-foreground/70 text-center pb-2 pt-1",
        week: "flex w-full mt-1",
        day: "size-9 text-center text-sm p-0 relative",
        day_button: "inline-flex items-center justify-center size-9 rounded-md hover:bg-muted hover:text-foreground transition-colors aria-selected:bg-primary aria-selected:text-primary-foreground aria-selected:hover:bg-primary aria-selected:hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        selected: "font-semibold",
        today: "text-primary font-semibold",
        outside: "opacity-50",
        disabled: "opacity-50 pointer-events-none",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          ),
      }}
      {...props}
    />
  );
}

export { Calendar };
