import React,{useState} from 'react'

export default function Options({chooseTool,chooseSize}:any) {
  const [selected,setSelected]= useState('brush')

  const changeTool = (tool:string) =>{
    chooseTool(tool)
    setSelected(tool)
  }
  const changeSize = (e:any) =>{
    chooseSize(e.target.value)
    
  }
  return (
    <div className='d-flex flex-column gap-2 align-items-center px-2 py-5 gap-4'>
      <div onClick={()=>{changeTool('brush')}} className={`p-2 border rounded tools ${selected==='brush'?'selectioned':''}`}><img style={{height:'20px'}} src={'/imgs/pencil.png'}/> Brush</div>
      <div onClick={()=>changeTool('eraser')} className={`p-2 border rounded tools ${selected==='eraser'?'selectioned':''}`}><img style={{height:'20px'}} src={'/imgs/eraser.png'}/> Eraser</div>
      <div onChange={(e)=>changeSize(e)} className="p-2   rounded tools "><input type="range" min='1' max='30' defaultValue={1}/></div>
    </div>
  )
}
