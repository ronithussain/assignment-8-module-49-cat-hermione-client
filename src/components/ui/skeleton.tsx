import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted dark:bg-gray-700",
  {
    variants: {
      variant: {
        default: "h-4 w-32",
        text: "h-4 w-full",
        circle: "h-8 w-8 rounded-full",
        square: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({
  className,
  variant,
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Skeleton, skeletonVariants };
