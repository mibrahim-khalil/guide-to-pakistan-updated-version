import React from "react";

export default function Section({
  title,
  description,
  left,
  right,
  header,
  children,

  className = "",
  headerClassName = "",
  bodyClassName = "",

  style = {},
  headerStyle = {},
  bodyStyle = {},

  ...rest
}) {
  const shouldRenderHeader =
    header !== undefined ||
    title !== undefined ||
    description !== undefined ||
    left !== undefined ||
    right !== undefined;

  return (
    <section
      className={`w-full ${className}`}
      style={{
        background: "transparent",
        ...style,
      }}
      {...rest}
    >
      {shouldRenderHeader && (
        <div
          className={`flex items-start justify-between gap-4 ${headerClassName}`}
          style={{
            background: "transparent",
            ...headerStyle,
          }}
        >
          {header !== undefined ? (
            header
          ) : (
            <>
              <div className="min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  {title !== undefined && (
                    <div
                      className="inline-flex items-center rounded-full px-4 py-2 border"
                      style={{
                        background: "var(--gti-heading-pill-bg)",
                        borderColor: "var(--gti-heading-pill-border)",
                        boxShadow: "var(--gti-heading-pill-shadow)",
                      }}
                    >
                      <h2 className="text-white font-semibold text-base sm:text-lg leading-tight">
                        {title}
                      </h2>
                    </div>
                  )}

                  {left !== undefined && <div>{left}</div>}
                </div>

                {description !== undefined && (
                  <p
                    className="mt-2 text-sm"
                    style={{ color: "var(--gti-text-muted)" }}
                  >
                    {description}
                  </p>
                )}
              </div>

              {right !== undefined && <div className="shrink-0">{right}</div>}
            </>
          )}
        </div>
      )}

      <div
        className={`mt-4 ${bodyClassName}`}
        style={{
          background: "transparent",
          ...bodyStyle,
        }}
      >
        {children}
      </div>
    </section>
  );
}