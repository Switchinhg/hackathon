import React,{useState,useRef, useEffect} from 'react'
import Colors from './Colors'

export default function Application() {

  const [color,setColor] = useState('DeepSkyBlue')
  const [canvasCTX, setCanvasCTX] = useState (null);
  const [size, setSize] = useState(10)
  const canvasRef = useRef(null);

  const drawColor = (colors:string) =>{
    setColor(colors)
  }

  useEffect(() => {
    const canvas:any = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasCTX(ctx);
  },[canvasRef])

  const SetPos = (e:any) => {
  if(!canvasCTX) return;
  const canvas:any = canvasRef.current;
  const canvasRect = canvas.getBoundingClientRect();

  const mouseX = e.clientX - canvasRect.left;
  const mouseY = e.clientY - canvasRect.top;
    setMouseData({
        x: e.mouseX, // Mouse X position
        y: e.mouseY, // Mouse Y position
    });
};
const Draw = (e:any) => {
  if (e.buttons !== 1) return; // The left mouse button should be pressed
  const ctx:any = canvasCTX; // Our saved context
  ctx.beginPath(); // Start the line
  setMouseData({
    x: e.nativeEvent.offsetX,
    y: e.nativeEvent.offsetY,
  });
  ctx.moveTo(mouseData.x, mouseData.y); // Move the line to the saved mouse location
  ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); // Again draw a line to the mouse postion
  ctx.strokeStyle = color; // Set the color as the saved state
  ctx.lineWidth = size; // Set the size to the saved state
  // Set the line cap to round
  ctx.lineCap = "round";
  ctx.stroke(); // Draw it!
};
const [mouseData, setMouseData] = useState({ x: 0, y: 0 });


  return (
    <>
    <div className='d-flex flex-column align-items-center justify-content-center'>
      <Colors drawColor={drawColor} />
      <canvas
        ref={canvasRef}
        onMouseEnter={(e) => SetPos(e)}
        onMouseMove={(e) => {SetPos(e);Draw(e)}}
        onMouseDown={(e) => SetPos(e)}
        id="drawing" className='border' style={{width:'90vw',height:'calc(100vh - 200px)'}}></canvas>
    </div>
    </>
  )
}
