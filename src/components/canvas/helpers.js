//import { downloadCallback, downloadCallback4Json, logCanvasData, save2Storage  } from "helpers";
// import { useRef } from "react"
// import { fabric } from "fabric"

// export const downloadCallback = () => {
//   if (canvasInstance.current && backgroundCanvasInstance.current) {
//     const tempCanvas = document.createElement("canvas")
//     tempCanvas.width = canvasWidth
//     tempCanvas.height = canvasHeight
//     const tempContext = tempCanvas.getContext("2d")

//     if (tempContext) {
//       // Draw background canvas onto temp canvas
//       if (backgroundCanvasRef.current) {
//         tempContext.drawImage(backgroundCanvasRef.current, 0, 0)
//       }

//       if (canvasRef.current) {
//         tempContext.drawImage(canvasRef.current, 0, 0)
//       }

//       // Export temp canvas as image
//       const dataURL = tempCanvas.toDataURL("image/png")
//       const link = document.createElement("a")
//       link.href = dataURL
//       link.download = "canvas.png"
//       link.click()
//     }
//   }
// }

// export const downloadCallback4Json = () => {
//   if (canvasInstance.current && backgroundCanvasInstance.current) {
//     const canvasData = []

//     // Collect background canvas data if needed (assuming backgroundCanvasRef contains objects or path data)
//     if (backgroundCanvasRef.current) {
//       // Add your logic to extract background drawing data from the background canvas
//       // For example, you might use canvasInstance's `toJSON()` or any specific method for extracting the data
//       const backgroundData = backgroundCanvasInstance.current.toJSON() // assuming using fabric.js or similar
//       canvasData.push({ background: backgroundData })
//     }

//     // Collect main canvas data
//     if (canvasRef.current) {
//       // Assuming canvasInstance is the main drawing canvas, and you want to export its data
//       const mainCanvasData = canvasInstance.current.toJSON() // Example if using fabric.js
//       canvasData.push({ mainCanvas: mainCanvasData })
//     }

//     //// Convert the canvas data to JSON
//     const jsonBlob = new Blob([JSON.stringify(canvasData)], {
//       type: "application/json",
//     })
//     //// Create a link element to trigger the download
//     const link = document.createElement("a")
//     link.href = URL.createObjectURL(jsonBlob)
//     link.download = "canvasData.json"
//     link.click()
//   }
// }

// export const logCanvasData = () => {
//   if (canvasInstance.current && backgroundCanvasInstance.current) {
//     const canvasData = []

//     // Collect background canvas data if needed
//     if (backgroundCanvasInstance.current) {
//       const backgroundData = backgroundCanvasInstance.current.toJSON() // Assuming Fabric.js
//       canvasData.push({ background: backgroundData })
//     }

//     // Collect main canvas data
//     if (canvasInstance.current) {
//       const mainCanvasData = canvasInstance.current.toJSON() // Assuming Fabric.js
//       canvasData.push({ mainCanvas: mainCanvasData })
//     }

//     //// Log the canvas data to the console
//     // console.log( "Combined Canvas Data in DrawableCanvas.tsx:",         JSON.stringify(canvasData, null, 2)      );
//   } else {
//     console.error("Canvas instances not found.")
//   }
// }

// export const save2Storage = () => {
//   if (canvasInstance.current && backgroundCanvasInstance.current) {
//     //if (canvasInstance.current) {
//     const canvasData = [];

//     // Collect background canvas data if needed
//     if (backgroundCanvasInstance.current) {
//       const backgroundData = backgroundCanvasInstance.current.toJSON(); // Assuming Fabric.js
//       canvasData.push({ background: backgroundData });
//     }

//     // Collect main canvas data
//     if (canvasInstance.current) {
//       const mainCanvasData = canvasInstance.current.toJSON(); // Assuming Fabric.js
//       canvasData.push({ mainCanvas: mainCanvasData });
//     }

//     // Save the canvas data to localStorage
//     try {
//       //localStorage.setItem("canvasData", JSON.stringify(canvasData));
//       setCurrentState(canvasData);
//       console.log(
//         "Canvas data saved to localStorage and/or currentState in DrawableCanvas.tsx: ",
//         canvasData
//       );
//     } catch (e) {
//       console.error("Error saving canvas data to localStorage:", e);
//     }
//   } else {
//     console.error("Canvas instances not found.");
//   }
// };

// export const retrieveAndLogImageAsJson = () => {
//   // Retrieve the image data URL from localStorage
//   const imageDataURL = localStorage.getItem("canvasImage-4") // replace with your image key

//   if (!imageDataURL) {
//     console.error("Image not found in localStorage")
//     return
//   }

//   // Create an Image object
//   const image = new Image()

//   // Load the image from the data URL
//   image.onload = () => {
//     // Create a canvas to draw the image
//     const canvas = document.createElement("canvas")
//     const ctx = canvas.getContext("2d")

//     if (!ctx) {
//       console.error("Failed to get 2D context")
//       return
//     }

//     // Set canvas size based on the image
//     canvas.width = image.width
//     canvas.height = image.height

//     // Draw the image on the canvas
//     ctx.drawImage(image, 0, 0)

//     // Convert canvas to a data URL (or you could use .toBlob() if needed)
//     const jsonImageData = {
//       imageDataURL: canvas.toDataURL("image/png"), // This is the Base64-encoded image data
//       width: canvas.width,
//       height: canvas.height,
//     }

//     // Log the JSON object that represents the image
//     console.log("Image in JSON format:", JSON.stringify(jsonImageData))
//   }

//   // Set the source of the image to the data URL from localStorage
//   image.src = imageDataURL
// }
