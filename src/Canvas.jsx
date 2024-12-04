import { useEffect, useRef } from "react"
import canvasImage from "./canvasImage"

function Canvas() {
  const [index, setIndex] = useState({value:0})
  const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.src = canvasImage[18]
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height; 
          ctx.drawImage(img, 0, 0)
        }
    })
  return (
    <canvas ref={canvasRef} id="canvas" className="w-[18rem] h-[18rem]"></canvas>
  )
}

export default Canvas