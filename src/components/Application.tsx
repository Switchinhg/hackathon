import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

import React,{useState,useRef, useEffect} from 'react'
import Colors from './Colors'
import Options from './Options';

export default function Application() {

    /* Convex */
    const coords = useMutation(api.coordenates.makeLine);
    const getLine = useQuery(api.coordenates.getLine);
    // const getCanvasDraw = useQuery(api.coordenates.getCanvasDraw);


  const [color,setColor] = useState('black')
  const [canvasCTX, setCanvasCTX] = useState (null);
  const [size, setSize] = useState(5)
  const [mouseData, setMouseData] = useState({ x: 0, y: 0 });
  const [prevMouseData, setPrevMouseData] = useState({ x: 0, y: 0 });
  const [tool,setTool] = useState('brush')

  const [user,setUser] = useState('Santiago')


  const canvasRef = useRef(null);

  const drawColor = (colors:string) =>{
    setColor(colors)
  }
  const chooseTool = (tools:string) =>{
    setTool(tools)
  }
  const chooseSize = (sizes:number) =>{
    setSize(sizes)
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

  const Draw2 = async (e2:any) => {
    let e = e2[0]
    if(e.author === user)return 
    // if (e.buttons != 1) return; // The left mouse button should be pressed
   const ctx:any = canvasCTX; // Our saved context
   ctx.beginPath(); // Start the line
      console.log(e)
   if(e.tool == 'brush'){
    ctx.lineWidth = e.width;
    ctx.strokeStyle = e.color;
  }else if(e.tool == 'eraser'){
    ctx.lineWidth = 20;
    ctx.strokeStyle = 'white';
  }
   ctx.moveTo(e.x0, e.y0);
   ctx.lineTo(e.x1, e.y1);
   
  //  ctx.strokeStyle = e.color; // Set the color as the saved state
  //  ctx.lineWidth = e.width; // Set the size to the saved state
   // Set the line cap to round
   ctx.lineCap = "round";
   ctx.stroke(); // Draw it!
 }; 



  const SetPos = (e:any) => {
  if(!canvasCTX) return;
    setMouseData({
        x: e.mouseX, // Mouse X position
        y: e.mouseY, // Mouse Y position
    });
    setPrevMouseData({
      x: e.nativeEvent.offsetX, // Mouse X position
      y: e.nativeEvent.offsetY, // Mouse Y position
  });
};


  const Draw = async (e:any) => {
   if (e.buttons != 1 ) return; // The left mouse button should be pressed
  const ctx:any = canvasCTX; // Our saved context
      setMouseData({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });

    ctx.beginPath();
      setMouseData({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
    if(tool === 'brush'){
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
    }else if(tool === 'eraser'){
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
    }else if (tool === 'fill'){
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath()
    }
    ctx.moveTo(mouseData.x, mouseData.y);
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.lineCap = "round";
    ctx.stroke();

 

   coords({author:user,tool:tool,width:Number(size), color:color, x0:Number(mouseData.x), y0:Number(mouseData.y), x1:e.nativeEvent.offsetX, y1:e.nativeEvent.offsetY})

}; 

const change = (text:any)=>{
  // console.log(text)
  setUser(text.target.value)
}

const saveImg = () =>{
  const canvas:any = canvasRef.current;
  const link = document.createElement("a");
  link.download = `${Date.now()}.jpg`;
  link.href = canvas.toDataURL();
  link.click();
}



  return (
    <>
    <div className='d-flex  align-items-center justify-content-center app-bg '>
      <div className='colorsAndMore d-flex py-4'>
        <Colors drawColor={drawColor} chooseTool={chooseTool} />
        <div className="flex-grow-1">
          <Options chooseTool={chooseTool} chooseSize={chooseSize}/>
        </div>
        <input type="text" onChange={change} name="" id="" value={user} />
        <button className="btn btn-outline-" onClick={saveImg}>Save Image</button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseEnter={(e) => SetPos(e)}
        onMouseMove={(e) => {SetPos(e);Draw(e)}}
        onMouseDown={(e) => {SetPos(e);}}
        id="drawing" className=' canvas-bg' style={{width:'1000px',height:'561px'}}></canvas>
    </div>
    </>
  )
}
