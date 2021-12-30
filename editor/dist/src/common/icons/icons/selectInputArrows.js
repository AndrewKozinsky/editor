import React from 'react';
// Стрелочки выпадающего списка
export default function SelectInputArrows() {
    return (React.createElement("g", { strokeWidth: "1.4", fill: "none", fillRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("polyline", { points: "1 4 4 1 7 4" }),
        React.createElement("polyline", { transform: "translate(4, 11.5) scale(1, -1) translate(-4, -11.5) ", points: "1 13 4 10 7 13" })));
}
//# sourceMappingURL=selectInputArrows.js.map