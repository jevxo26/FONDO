"use client";

type Variant = "admin" | "vendor" | "rider" | "kitchen";

const iconSets: Record<Variant, string[][][]> = {
  admin: [
    [["path", "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"], ["path", "M7 2v20"], ["path", "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"]],
    [["path", "M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"], ["path", "M6 17h12"]],
    [["path", "M12 10h.01"], ["path", "M12 14h.01"], ["path", "M12 6h.01"], ["path", "M16 10h.01"], ["path", "M16 14h.01"], ["path", "M16 6h.01"], ["path", "M8 10h.01"], ["path", "M8 14h.01"], ["path", "M8 6h.01"], ["path", "M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"], ["rect", "4 2 16 20 2"]],
    [["path", "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"], ["path", "M16 3.128a4 4 0 0 1 0 7.744"], ["path", "M22 21v-2a4 4 0 0 0-3-3.87"], ["circle", "9 7 4"]],
  ],
  vendor: [
    [["path", "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"], ["path", "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"], ["path", "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"]],
    [["path", "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"], ["path", "M12 22V12"], ["polyline", "3.29 7 12 12 20.71 7"], ["path", "m7.5 4.27 9 5.15"]],
    [["path", "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"], ["path", "M15 18H9"], ["path", "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"], ["circle", "17 18 2"], ["circle", "7 18 2"]],
    [["rect", "8 2 8 4 1 1"], ["path", "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"], ["path", "M12 11h4"], ["path", "M12 16h4"], ["path", "M8 11h.01"], ["path", "M8 16h.01"]],
  ],
  rider: [
    [["circle", "18.5 17.5 3.5"], ["circle", "5.5 17.5 3.5"], ["circle", "15 5 1"], ["path", "M12 17.5V14l-3-3 4-3 2 3h2"]],
    [["path", "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"], ["circle", "12 10 3"]],
    [["circle", "12 12 10"], ["path", "M12 6v6l4 2"]],
    [["polygon", "3 11 22 2 13 21 11 13 3 11"]],
  ],
  kitchen: [
    [["path", "M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"], ["path", "M6 17h12"]],
    [["path", "M2 12h20"], ["path", "M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"], ["path", "m4 8 16-4"], ["path", "m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"]],
    [["line", "10 2 14 2"], ["line", "12 14 15 11"], ["circle", "12 14 8"]],
    [["rect", "8 2 8 4 1 1"], ["path", "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"], ["path", "M12 11h4"], ["path", "M12 16h4"], ["path", "M8 11h.01"], ["path", "M8 16h.01"]],
  ],
};

function renderIcon(paths: string[][], index: number) {
  const positions = [
    { x: 10, y: 6, rot: -5 },
    { x: 105, y: 5, rot: 10 },
    { x: 8, y: 70, rot: -8 },
    { x: 103, y: 69, rot: 6 },
    { x: 48, y: 138, rot: -12 },
    { x: 145, y: 136, rot: 8 },
  ];
  const pos = positions[index % positions.length];
  return (
    <g key={index} transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.rot})`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((p, i) => {
        const [tag, ...rest] = p;
        const attrStr = rest.join(" ");
        if (tag === "path") return <path key={i} d={attrStr} />;
        if (tag === "circle") {
          const [cx, cy, r] = attrStr.split(" ");
          return <circle key={i} cx={cx} cy={cy} r={r} />;
        }
        if (tag === "rect") {
          const [x, y, w, h, ...rx] = attrStr.split(" ");
          const props: Record<string, string> = { x, y, width: w, height: h };
          if (rx.length) props.rx = rx[0];
          return <rect key={i} {...props} />;
        }
        if (tag === "polyline") return <polyline key={i} points={attrStr} />;
        if (tag === "polygon") return <polygon key={i} points={attrStr} />;
        if (tag === "line") {
          const [x1, y1, x2, y2] = attrStr.split(" ");
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        }
        return null;
      })}
    </g>
  );
}

export function DashboardBgPattern({ variant = "admin" }: { variant?: Variant }) {
  const icons = iconSets[variant];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.08]">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <pattern id="food-pattern" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
            {[0, 1, 2, 3, 4, 5].map((i) => renderIcon(icons[i % icons.length], i))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#food-pattern)" />
      </svg>
    </div>
  );
}