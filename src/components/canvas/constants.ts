import { fabric } from "fabric"

//// other drawing:
export function customBackground2(
  canvasWidth: any,
  canvasHeight: any,
  scaleFactors: any
) {
  const objects = []
  const rect = new fabric.Rect({
    //scaleFactors = [xlim, ylim, bottom_margin, left_margin, top_margin, right_margin]
    left: scaleFactors[3], //0.12 * canvasWidth, // Adjusted from 0.1 to 0.12
    top: scaleFactors[4], //0.05 * canvasHeight
    fill: "transparent",
    stroke: "black",
    width: canvasWidth - scaleFactors[3] - scaleFactors[5], //0.83 * canvasWidth, // Adjusted width to maintain the same right edge
    height: canvasHeight - scaleFactors[2] - scaleFactors[4], // 0.8 * canvasHeight,
    selectable: false,
    evented: false,
    hasControls: false,
    lockMovementX: true,
    lockMovementY: true,
    lockRotation: true,
  })
  objects.push(rect)

  const rectLeft = scaleFactors[3]
  const rectTop = scaleFactors[4]
  const rectWidth = canvasWidth - scaleFactors[3] - scaleFactors[5] // Adjusted width to maintain the same right edge
  const rectHeight = canvasHeight - scaleFactors[2] - scaleFactors[4]

  //// Add tick marks, numbers, and lines to the left side
  for (let i = 0; i <= 10; i++) {
    const y = rectTop + (i * rectHeight) / 10
    const tick = new fabric.Line([rectLeft - 5, y, rectLeft, y], {
      stroke: "black",
      selectable: false,
      evented: false,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
    })
    const text = new fabric.Text(
      (scaleFactors[1] - (i * scaleFactors[1]) / 10).toString(),
      {
        left: rectLeft - 35,
        top: y - 10,
        fontSize: 20,
        fill: "black",
        selectable: false,
        evented: false,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
      }
    )
    const hLine = new fabric.Line([rectLeft, y, rectLeft + rectWidth, y], {
      stroke: "lightgray",
      selectable: false,
      evented: false,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
    })
    //objects.push(tick, text, hLine);
    objects.push(tick, hLine)
  }

  // Add tick marks, numbers, and lines to the bottom side
  for (let i = 0; i <= 10; i++) {
    const x = rectLeft + (i * rectWidth) / 10
    const tick = new fabric.Line(
      [x, rectTop + rectHeight, x, rectTop + rectHeight + 5],
      {
        stroke: "black",
        selectable: false,
        evented: false,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
      }
    )
    const text = new fabric.Text(((i * scaleFactors[0]) / 10).toString(), {
      left: x - 7,
      top: rectTop + rectHeight + 10,
      fontSize: 20,
      fill: "black",
      selectable: false,
      evented: false,
      hasControls: false,
    })
    const vLine = new fabric.Line([x, rectTop, x, rectTop + rectHeight], {
      stroke: "lightgray",
      selectable: false,
      evented: false,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
    })
    //objects.push(tick, text, vLine);
    objects.push(tick, vLine)
  }

  //// Add x-axis title
  //   const xAxisTitle = new fabric.Text("Quantity, Q", {
  //     left: rectLeft + rectWidth / 2,
  //     top: rectTop + rectHeight + 40,
  //     fontSize: 24,
  //     fontStyle: "italic", // Set text to italics
  //     fill: "black",
  //     originX: "center",
  //     selectable: false,
  //     evented: false,
  //     hasControls: false,
  //     lockMovementX: true,
  //     lockMovementY: true,
  //     lockRotation: true,
  //   });
  //   objects.push(xAxisTitle);

  //// Add y-axis title
  //   const yAxisTitle = new fabric.Text("Price, P", {
  //     left: rectLeft - 65, // Adjusted for more space
  //     top: rectTop + rectHeight / 2,
  //     fontSize: 24,
  //     fontStyle: "italic", // Set text to italics
  //     fill: "black",
  //     originX: "center",
  //     originY: "center",
  //     angle: -90,
  //     selectable: false,
  //     evented: false,
  //     hasControls: false,
  //     lockMovementX: true,
  //     lockMovementY: true,
  //     lockRotation: true,
  //   });
  // objects.push(yAxisTitle);
  //// Move the first element (rect) to the last position (when rectangle is drawn first, it is overlapped by others)
  const firstElement = objects.shift()
  objects.push(firstElement)

  // Change the color of the rectangle
  if (firstElement instanceof fabric.Rect) {
    firstElement.set({ fill: "" }) // Change 'blue' to any color you want
  }

  const filteredObjects = objects.filter(
    (obj): obj is fabric.Object => obj !== undefined
  )

  const group = new fabric.Group(filteredObjects, {
    selectable: false,
    evented: false,
    hasControls: false,
    lockMovementX: true,
    lockMovementY: true,
    lockRotation: true,
  })

  return group

  //   canvas.add(group);
  //   canvas.renderAll();
}

//// other drawing:
export function customBackground3(
  canvasWidth: any,
  canvasHeight: any,
  scaleFactors: any
) {
  const objects = []
  const rect = new fabric.Rect({
    //scaleFactors = [xlim, ylim, bottom_margin, left_margin, top_margin, right_margin]
    left: scaleFactors[3], //0.12 * canvasWidth, // Adjusted from 0.1 to 0.12
    top: scaleFactors[4], //0.05 * canvasHeight
    fill: "transparent",
    stroke: "black",
    width: canvasWidth - scaleFactors[3] - scaleFactors[5], //0.83 * canvasWidth, // Adjusted width to maintain the same right edge
    height: canvasHeight - scaleFactors[2] - scaleFactors[4], // 0.8 * canvasHeight,
    selectable: false,
    evented: false,
    hasControls: false,
    lockMovementX: true,
    lockMovementY: true,
    lockRotation: true,
  })
  objects.push(rect)

  const rectLeft = scaleFactors[3]
  const rectTop = scaleFactors[4]
  const rectWidth = canvasWidth - scaleFactors[3] - scaleFactors[5] // Adjusted width to maintain the same right edge
  const rectHeight = canvasHeight - scaleFactors[2] - scaleFactors[4]

  //// Add tick marks, numbers, and lines to the left side
  for (let i = 0; i <= 10; i++) {
    const y = rectTop + (i * rectHeight) / 10
    const tick = new fabric.Line([rectLeft - 5, y, rectLeft, y], {
      stroke: "black",
      selectable: false,
      evented: false,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
    })
    const text = new fabric.Text(
      (scaleFactors[1] - (i * scaleFactors[1]) / 10).toString(),
      {
        left: rectLeft - 35,
        top: y - 10,
        fontSize: 20,
        fill: "black",
        selectable: false,
        evented: false,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
      }
    )
    const hLine = new fabric.Line([rectLeft, y, rectLeft + rectWidth, y], {
      stroke: "lightgray",
      selectable: false,
      evented: false,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
    })
    objects.push(tick, text, hLine)
  }

  // Add tick marks, numbers, and lines to the bottom side
  for (let i = 0; i <= 10; i++) {
    const x = rectLeft + (i * rectWidth) / 10
    const tick = new fabric.Line(
      [x, rectTop + rectHeight, x, rectTop + rectHeight + 5],
      {
        stroke: "black",
        selectable: false,
        evented: false,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
      }
    )
    const text = new fabric.Text(((i * scaleFactors[0]) / 10).toString(), {
      left: x - 7,
      top: rectTop + rectHeight + 10,
      fontSize: 20,
      fill: "black",
      selectable: false,
      evented: false,
      hasControls: false,
    })
    const vLine = new fabric.Line([x, rectTop, x, rectTop + rectHeight], {
      stroke: "lightgray",
      selectable: false,
      evented: false,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
    })
    objects.push(tick, text, vLine)
  }

  //// Add x-axis title
  //   const xAxisTitle = new fabric.Text("Quantity, Q", {
  //     left: rectLeft + rectWidth / 2,
  //     top: rectTop + rectHeight + 40,
  //     fontSize: 24,
  //     fontStyle: "italic", // Set text to italics
  //     fill: "black",
  //     originX: "center",
  //     selectable: false,
  //     evented: false,
  //     hasControls: false,
  //     lockMovementX: true,
  //     lockMovementY: true,
  //     lockRotation: true,
  //   });
  //   objects.push(xAxisTitle);

  //// Add y-axis title
  //   const yAxisTitle = new fabric.Text("Price, P", {
  //     left: rectLeft - 65, // Adjusted for more space
  //     top: rectTop + rectHeight / 2,
  //     fontSize: 24,
  //     fontStyle: "italic", // Set text to italics
  //     fill: "black",
  //     originX: "center",
  //     originY: "center",
  //     angle: -90,
  //     selectable: false,
  //     evented: false,
  //     hasControls: false,
  //     lockMovementX: true,
  //     lockMovementY: true,
  //     lockRotation: true,
  //   });
  // objects.push(yAxisTitle);
  //// Move the first element (rect) to the last position (when rectangle is drawn first, it is overlapped by others)
  const firstElement = objects.shift()
  objects.push(firstElement)

  // Change the color of the rectangle
  if (firstElement instanceof fabric.Rect) {
    firstElement.set({ fill: "" }) // Change 'blue' to any color you want
  }

  const filteredObjects = objects.filter(
    (obj): obj is fabric.Object => obj !== undefined
  )

  const group = new fabric.Group(filteredObjects, {
    selectable: false,
    evented: false,
    hasControls: false,
    lockMovementX: true,
    lockMovementY: true,
    lockRotation: true,
  })

  return group

  //   canvas.add(group);
  //   canvas.renderAll();
}
