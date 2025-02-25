//DrawableCanvas.tsx
//"use client";
import React, { useEffect, useRef } from "react"
import { fabric } from "fabric"
import CanvasToolbar from "./CanvasToolbar"
import { useCanvasState } from "./DrawableCanvasState"
import { tools, FabricTool } from "./lib"
// import {
//   downloadCallback,
//   //downloadCallback4Json,
//   //logCanvasData,
// } from "./helpers"
import { customBackground2, customBackground3 } from "./constants"
//import { useCanvasStore } from "./useCanvasStore"
const backgroundlist = [customBackground2, customBackground3]

const customBackground = backgroundlist[0] // select the desired background

export interface ComponentArgs {
  AssessName: string
  index: number
  fillColor: string
  strokeWidth: number
  strokeColor: string
  backgroundColor: string
  backgroundImageURL: string
  canvasWidth: number
  canvasHeight: number
  drawingMode: string
  initialDrawing: Object
  displayToolbar: boolean
  displayRadius: number
  scaleFactors: number[]
  nextButtonClicked: boolean
}

const DrawableCanvas = ({
  AssessName,
  index,
  fillColor,
  strokeWidth,
  strokeColor,
  backgroundColor,
  backgroundImageURL,
  canvasWidth,
  canvasHeight,
  drawingMode,
  initialDrawing,
  displayToolbar,
  displayRadius,
  scaleFactors,
  nextButtonClicked,
}: ComponentArgs) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null)
  const canvasInstance = useRef<fabric.Canvas | null>(null)
  const backgroundCanvasInstance = useRef<fabric.StaticCanvas | null>(null)

  const {
    canvasState: {
      action: { shouldReloadCanvas },
      currentState,
      initialState,
    },
    saveState,
    undo,
    redo,
    canUndo,
    canRedo,
    resetState,
  } = useCanvasState()

  // const setCurrentState = useCanvasStore(
  //   (state: { setCurrentState: (state: any) => void }) => state.setCurrentState
  // )

  useEffect(() => {
    if (canvasRef.current) {
      canvasInstance.current = new fabric.Canvas(canvasRef.current, {
        enableRetinaScaling: false,
      })

      // Load initial drawing only once
      canvasInstance.current.loadFromJSON(initialDrawing, () => {
        canvasInstance.current?.renderAll()
        resetState(initialDrawing)
      })
    }

    if (backgroundCanvasRef.current) {
      backgroundCanvasInstance.current = new fabric.StaticCanvas(
        backgroundCanvasRef.current,
        {
          enableRetinaScaling: false,
        }
      )

      const group = customBackground(canvasWidth, canvasHeight, scaleFactors)

      backgroundCanvasInstance.current.add(group)
      backgroundCanvasInstance.current.renderAll()
    }

    // // Disable context menu on right-click
    const canvasElement = canvasRef.current
    if (canvasElement) {
      canvasElement.addEventListener("contextmenu", (e) => {
        e.preventDefault()
      })
    }

    return () => {
      if (canvasElement) {
        canvasElement.removeEventListener("contextmenu", (e) => {
          e.preventDefault()
        })
      }
      canvasInstance.current?.dispose()
      backgroundCanvasInstance.current?.dispose()
    }
  }, [resetState]) //[resetState])

  useEffect(() => {
    if (backgroundCanvasInstance.current && backgroundImageURL) {
      const bgImage = new Image()
      bgImage.onload = function () {
        backgroundCanvasInstance.current?.getContext().drawImage(bgImage, 0, 0)
      }
      bgImage.src = backgroundImageURL
    }
  }, [backgroundImageURL])

  useEffect(() => {
    if (canvasInstance.current && shouldReloadCanvas) {
      canvasInstance.current.loadFromJSON(currentState, () => {
        canvasInstance.current?.renderAll()
      })
    }
  }, [shouldReloadCanvas, currentState])

  useEffect(() => {
    if (canvasInstance.current) {
      const selectedTool = new tools[drawingMode](
        canvasInstance.current
      ) as FabricTool
      const cleanupToolEvents = selectedTool.configureCanvas({
        fillColor: fillColor,
        strokeWidth: strokeWidth,
        strokeColor: strokeColor,
        displayRadius: displayRadius,
        scaleFactors: scaleFactors,
        canvasHeight: canvasHeight,
        canvasWidth: canvasWidth,
      })

      const handleMouseUp = () => {
        const canvasJSON = canvasInstance.current?.toJSON()
        if (canvasJSON) {
          saveState(canvasJSON)
        }
      }

      canvasInstance.current.on("mouse:up", handleMouseUp)
      canvasInstance.current.on("mouse:dblclick", handleMouseUp)

      return () => {
        cleanupToolEvents()
        canvasInstance.current?.off("mouse:up", handleMouseUp)
        canvasInstance.current?.off("mouse:dblclick", handleMouseUp)
      }
    }
  }, [
    strokeWidth,
    strokeColor,
    displayRadius,
    fillColor,
    drawingMode,
    scaleFactors,
    canvasHeight,
    canvasWidth,
    saveState,
  ])

  useEffect(() => {
    if (canvasInstance.current) {
      const savedDrawing = localStorage.getItem(
        `${AssessName}-canvasDrawing-${index}`
      )
      if (savedDrawing) {
        const parsedDrawing = JSON.parse(savedDrawing)
        if (canvasRef.current) {
          // Clear the canvas before loading the saved drawing
          //canvasInstance.current.clear()

          // Ensure the canvas is properly loaded from L-Storage.
          canvasInstance.current?.loadFromJSON(parsedDrawing, () => {
            canvasInstance.current?.renderAll()
          })
          console.log(
            `Canvas data loaded from localStorage for index ${index}:`,
            savedDrawing
          )
        }
      }
    }
  }, [canvasInstance.current, index, AssessName]) // Load the drawing whenever the `index` and canvasInstance.current changes

  // Save the current drawing to L-Storage whenever the canvas state changes
  useEffect(() => {
    console.log(
      `value of nextButtonClicked in DrawableCanvas.tsx is:' ${nextButtonClicked}`
    )
    //if (nextButtonClicked && canvasInstance.current) {
    if (canvasInstance.current) {
      const saveToLocalStorage = () => {
        const canvasData = canvasInstance.current
          ? canvasInstance.current.toJSON()
          : null
        if (canvasData) {
          localStorage.setItem(
            `${AssessName}-canvasDrawing-${index}`,
            JSON.stringify(canvasData)
          )
          console.log(
            `Canvasdrawing as .Json saved to localStorage for index ${AssessName}-${index}, in DrawableCanvas.tsx using useEffect.`
          )
        }
      }

      canvasInstance.current.on("object:added", saveToLocalStorage)

      return () => {
        canvasInstance.current?.off("object:added", saveToLocalStorage)
      }
    }
  }, [canvasInstance.current, index, AssessName]) // Monitor the index for changes

  const downloadCallback = () => {
    if (canvasInstance.current && backgroundCanvasInstance.current) {
      const tempCanvas = document.createElement("canvas")
      tempCanvas.width = canvasWidth
      tempCanvas.height = canvasHeight
      const tempContext = tempCanvas.getContext("2d")

      if (tempContext) {
        // Draw background canvas onto temp canvas
        if (backgroundCanvasRef.current) {
          tempContext.drawImage(backgroundCanvasRef.current, 0, 0)
        }

        if (canvasRef.current) {
          tempContext.drawImage(canvasRef.current, 0, 0)
        }

        // Export temp canvas as image
        const dataURL = tempCanvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.href = dataURL
        link.download = "canvas.png"
        link.click()
      }
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          backgroundColor: "rgba(248, 243, 243, 0.1)", //"rgba(255, 0, 0, 0.1)",
        }}
      >
        <canvas
          id={`backgroundimage-canvas-${index}`}
          ref={backgroundCanvasRef}
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          border: "1px solid black",
        }}
      >
        <canvas
          id={`canvas-${index}`}
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="border border-lightgrey"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {displayToolbar && (
          <CanvasToolbar
            topPosition={0}
            leftPosition={canvasWidth + 5}
            downloadCallback={downloadCallback}
            //downloadCallback2={downloadCallback4Json}
            //downloadCallback3={logCanvasData}
            saveCallback={() => {}} //{save2Storage}
            canUndo={canUndo}
            canRedo={canRedo}
            undoCallback={undo}
            redoCallback={redo}
            resetCallback={() => {
              //resetState(initialState);
              const userConfirmed = window.confirm(
                "Are you sure you want to clear the canvas? This action cannot be undone."
              )
              if (userConfirmed) {
                resetState(initialState)
                //console.log("Canvas has been reset.");
              } else {
                //console.log("Canvas reset canceled.");
              }
            }}
          />
        )}
      </div>
    </div>
  )
}

export default DrawableCanvas
