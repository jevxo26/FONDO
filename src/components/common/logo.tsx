import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  textSize?: string;
  textClassName?: string;
  subtitle?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  imageBoxClassName?: string;
  hideTextOnCollapse?: boolean;
  textOnly?: boolean;
  noLink?: boolean;
}

export function Logo({
  size = 38,
  textSize = "text-2xl",
  textClassName,
  subtitle,
  href = "/",
  onClick,
  className,
  imageBoxClassName,
  hideTextOnCollapse = false,
  textOnly = false,
  noLink = false,
}: LogoProps) {
  const inner = (
    <>
      {!textOnly &&
        (imageBoxClassName ? (
          <div
            className={cn(
              "flex shrink-0 items-center justify-center overflow-hidden rounded-lg",
              imageBoxClassName,
            )}
          >
            <Image
              src="/images/logo.png"
              alt="FONDO logo"
              width={size}
              height={size}
              className="size-full object-cover"
            />
          </div>
        ) : (
          <Image
            src="/images/logo.png"
            alt="FONDO logo"
            width={size}
            height={size}
            className="shrink-0 rounded-lg"
          />
        ))}
      <span
        className={cn(
          "flex flex-col leading-tight",
          hideTextOnCollapse && "group-data-[collapsible=icon]:hidden",
        )}
      >
        <span
          className={cn(
            "font-heading font-bold tracking-tight text-primary",
            textSize,
            textClassName,
          )}
        >
          FONDO
        </span>
        {subtitle && (
          <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            {subtitle}
          </span>
        )}
      </span>
    </>
  );

  if (href && !noLink) {
    return (
      <Link href={href} onClick={onClick} className={cn("flex items-center gap-2", className)}>
        {inner}
      </Link>
    );
  }

  return <div className={cn("flex items-center gap-2", className)}>{inner}</div>;
}
