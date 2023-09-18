import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

import React,{useState,useRef, useEffect} from 'react'
import Colors from './Colors'
import Options from './Options';

export default function Application() {

    /* Convex */
    const coords = useMutation(api.coordenates.makeLine);
    const getLine = useQuery(api.coordenates.getLine);

  const [color,setColor] = useState('black')
  const [canvasCTX, setCanvasCTX] = useState (null);
  const [size, setSize] = useState(5)
const [mouseData, setMouseData] = useState({ x: 0, y: 0 });

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

  useEffect(()=>{
    Draw2(getLine)
  },[getLine])
  const Draw2 = async (e:any) => {
    // if (e.buttons != 1) return; // The left mouse button should be pressed
   const ctx:any = canvasCTX; // Our saved context
   ctx.beginPath(); // Start the line
   setMouseData({
     x: e.x0,
     y: e.y0,
   });
   ctx.moveTo(mouseData.x, mouseData.y); // Move the line to the saved mouse location
   ctx.lineTo(e.x1, e.y1); // Again draw a line to the mouse postion
   ctx.strokeStyle = color; // Set the color as the saved state
   ctx.lineWidth = size; // Set the size to the saved state
   // Set the line cap to round
   ctx.lineCap = "round";
   ctx.stroke(); // Draw it!
  //  coords({width:size, color:color, x0:mouseData.x, y0:mouseData.y, x1:e.nativeEvent.offsetX, y1:e.nativeEvent.offsetY})
   // width, color,x0,y0,x1,y1
 }; 



  const SetPos = (e:any) => {
  if(!canvasCTX) return;
    setMouseData({
        x: e.mouseX, // Mouse X position
        y: e.mouseY, // Mouse Y position
    });
};

 const Draw = async (e:any) => {
   if (e.buttons != 1) return; // The left mouse button should be pressed
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
  console.log(mouseData)
  coords({width:size, color:color, x0:Number(mouseData.x), y0:Number(mouseData.y), x1:e.nativeEvent.offsetX, y1:e.nativeEvent.offsetY})

  // width, color,x0,y0,x1,y1
}; 


  return (
    <>
    <div className='d-flex flex-column align-items-center justify-content-center app-bg'>
      <div className='colorsAndMore d-flex '>
        <Colors drawColor={drawColor} />
        <Options/>
      </div>
      <canvas
        ref={canvasRef}
        onMouseEnter={(e) => SetPos(e)}
        onMouseMove={(e) => {SetPos(e);Draw(e)}}
        onMouseDown={(e) => SetPos(e)}
        id="drawing" className=' canvas-bg' style={{width:'90vw',height:'calc(100vh - 200px)'}}></canvas>
    </div>
    </>
  )
}
