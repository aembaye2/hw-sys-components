//type of questions: "mc-quest", "float-num-quest" , "one-line-text-quest", "manylines-text-quest", "graphing-quest"

// import { saveAs } from "file-saver"
// import html2pdf from "html2pdf.js"
import { fabric } from "fabric"
import placeholderDrawing from "./placeholderImage"

function createTemporaryCanvasAndConvert() {
  // Create a temporary canvas element programmatically
  const canvasElement = document.createElement("canvas")
  canvasElement.id = "canvas" // Set id as canvas
  canvasElement.width = 500 // Set canvas width
  canvasElement.height = 500 // Set canvas height
  document.body.appendChild(canvasElement) // Add the canvas to the DOM

  // Initialize the Fabric.js canvas
  const canvas = new fabric.Canvas("canvas")

  // Parse and add the drawing objects from the placeholderDrawing
  placeholderDrawing.objects.forEach((obj) => {
    if (obj.type === "line") {
      const line = new fabric.Line([obj.x1, obj.y1, obj.x2, obj.y2], {
        left: obj.left,
        top: obj.top,
        fill: obj.fill,
        stroke: obj.stroke,
        strokeWidth: obj.strokeWidth,
        angle: obj.angle,
        opacity: obj.opacity,
        scaleX: obj.scaleX,
        scaleY: obj.scaleY,
        flipX: obj.flipX,
        flipY: obj.flipY,
      })
      canvas.add(line)
    }
  })

  // After adding objects, convert the canvas to a PNG image in base64
  const base64Png = canvas.toDataURL({
    format: "png",
    quality: 1,
  })

  console.log(base64Png) // This will log the Base64 PNG string

  // Clean up the canvas after use
  //document.body.removeChild(canvasElement) // Optionally remove the canvas after use

  return base64Png
}

// Call the function and get the Base64 PNG
// createTemporaryCanvasAndConvert()

export const handleGeneratePDF = async (
  e,
  questions,
  userAnswers,
  fullname,
  quizName
) => {
  e.preventDefault()

  const userInputData = questions.map((question, index) => ({
    ...question,
    "user-answer": userAnswers[index] || "",
  }))

  let htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .question { margin-bottom: 20px; }
          .answer { margin-top: 10px; white-space: pre-wrap; }
          .manylines-text-quest { height: 200px; overflow: hidden; }
          .graphing-quest { margin-top: 10px; }
          .graphing-quest img { width: 150px; height: 150px; } /* Adjust the size of the embedded graph */
          .ref-info-img img { width: 100%; height: 50%; } /* Adjust the size of the embedded graph */
          .ref-name { margin-bottom: 20px; }
        </style>
      </head>
      <body>
       <h3 style="text-align: center;">Pdf Report for ${quizName}</h3>
        <h1>Full Name: ${fullname}</h1>
  `

  userInputData.forEach((question, index) => {
    let refName = question.Ref[3]
    let imgSrc = process.env.PUBLIC_URL + "/" + question.Ref[1]
    if (refName) {
      htmlContent += `<div style="font-size: 24px; font-weight: bold;">
        ${refName}
      </div>
      `
    }
    if (imgSrc) {
      htmlContent += `<div class="ref-info-img "><img src="${imgSrc}" alt="info" /></div>`
    }
    htmlContent += `
      <div class="question">
        <p>${index + 1}. ${question.question}</p>
    `

    if (question.qtype === "mc-quest") {
      question.options.forEach((option) => {
        htmlContent += `<p>${option}</p>`
      })
    }

    if (question.qtype === "manylines-text-quest") {
      let answerText = `<strong>Answer:</strong> ${question["user-answer"]}`
      answerText = answerText.replace(/\s\s+/g, " ")

      if (answerText.length < 1000) {
        answerText = answerText.padEnd(1000, " ")
      } else if (answerText.length > 1000) {
        answerText = answerText.substring(0, 1000) + "..."
      }
      htmlContent += `<div class="answer manylines-text-quest">${answerText}</div>`
    } else if (question.qtype === "graphing-quest") {
      const combinedCanvasImage = localStorage.getItem(
        `${quizName}-canvasImage-${index}`
      )
      htmlContent += `<div ><strong>Answer:</strong></div>`
      if (combinedCanvasImage) {
        htmlContent += `<div class="answer graphing-quest"><img src="${combinedCanvasImage}" alt="Graphing Answer" /></div>`
      } else {
        // Convert placeholderDrawing to an image
        const placeholderImage = createTemporaryCanvasAndConvert()
        htmlContent += `<div class="answer graphing-quest"><img src="${placeholderImage}" alt="Graphing Answer" /></div>`
      }
    } else {
      htmlContent += `<div class="answer"> <strong>Answer:</strong> ${question["user-answer"]}</div>`
    }

    htmlContent += `</div>`
  })

  htmlContent += `
      </body>
    </html>
  `

  // Dynamically import html2pdf.js on the client side
  if (typeof window !== "undefined") {
    const html2pdf = (await import("html2pdf.js")).default

    // Convert HTML to PDF
    const opt = {
      margin: 1,
      filename: `MyPdfReport4${quizName}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }

    html2pdf().from(htmlContent).set(opt).save()
  }
}
