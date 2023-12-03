import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";
import { truncate } from "@/utilities/utils";
import React from "react";

interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<"nav"> {
  segments: {
    title: string;
    href: string;
  }[];
  separator?: React.ComponentType<{ className?: string }>;
  truncationLength?: number;
}

export function Breadcrumbs({
  segments,
  separator,
  truncationLength = 0,
  className,
  ...props
}: BreadcrumbsProps) {
  const SeparatorIcon = separator ?? BsChevronRight;
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <nav
      aria-label="breadcrumbs"
      className={classNames(
        "flex w-full items-center overflow-auto text-sm font-medium",
        className as string
      )}
      {...props}
    >
      {segments.map((segment, index) => {
        const isLastSegment = index === segments.length - 1;

        return (
          <React.Fragment key={segment.href}>
            <span
              aria-current={isLastSegment ? "page" : undefined}
              className={classNames(
                "relative truncate transition-colors hover:text-black",
                isLastSegment
                  ? " font-semibold"
                  : "text-gray-500"
              )}
            >
              {truncationLength > 0 && segment.title
                ? truncate(segment.title, truncationLength)
                : segment.title}
              {!isLastSegment && (
                <Link href={segment.href} className="absolute inset-0"></Link>
              )}
            </span>
            {!isLastSegment && (
              <SeparatorIcon className="mx-2 h-4 w-4" aria-hidden="true" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
