// DrawingModeSelector.tsx
import React from "react"
import {
  // Scale3d,
  Slash,
  Dot,
  Hexagon,
  RectangleHorizontal,
  Circle,
  Pencil,
  Spline,
  MoveUpRight,
  MoveDiagonal,
  Type,
  MousePointer2,
} from "lucide-react"

interface DrawingModeSelectorProps {
  drawingMode: string
  setDrawingMode: (mode: string) => void
}

const DrawingModeSelector: React.FC<DrawingModeSelectorProps> = ({
  drawingMode,
  setDrawingMode,
}) => {
  const modes = [
    {
      mode: "line",
      icon: Slash, //process.env.PUBLIC_URL + "/undo.png",
      description: "Draw a line",
    },
    // {
    //   mode: "singlearrowhead",
    //   icon: MoveUpRight,
    //   description: "Draw a single arrowhead",
    // },
    // {
    //   mode: "doublearrowhead",
    //   icon: MoveDiagonal,
    //   description: "Draw a double arrowhead",
    // },
    { mode: "point", icon: Dot, description: "Draw a point" },
    // { mode: "polygon", icon: Hexagon, description: "Draw a polygon" },
    // {
    //   mode: "rect",
    //   icon: RectangleHorizontal,
    //   description: "Draw a rectangle",
    // },
    //{ mode: "circle", icon: Circle, description: "Draw a circle" },
    { mode: "freedraw", icon: Pencil, description: "Free draw" },
    {
      mode: "coordinate",
      icon: process.env.PUBLIC_URL + "/coordicon.svg",
      description: "Draw coordinates",
    },
    // { mode: "curve", icon: Spline, description: "Draw a curve" },

    { mode: "text", icon: Type, description: "Add text" },
    // {
    //   mode: "transform",
    //   icon: MousePointer2,
    //   description: "Select & move shapes",
    // },
  ]

  return (
    <div>
      <div style={{ display: "flex", gap: "1px", flexWrap: "wrap" }}>
        {modes.map(({ mode, icon: Icon, description }) => (
          <button
            key={mode}
            type="button"
            onClick={() => setDrawingMode(mode)}
            title={description}
            style={{
              backgroundColor:
                drawingMode === mode ? "rgb(187, 182, 182)" : "white",
              border: "0px solid black",
              margin: "0px",
              padding: "5px",
              cursor: "pointer",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "20%",
            }}
          >
            {typeof Icon === "string" ? (
              <img
                src={Icon}
                alt={mode}
                style={{ width: "24px", height: "24px" }}
              />
            ) : (
              <Icon style={{ width: "24px", height: "24px" }} />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DrawingModeSelector
