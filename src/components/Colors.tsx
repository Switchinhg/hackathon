import React, { useEffect, useState } from 'react'

export default function Colors({drawColor}:any) {
    const [selectedColor, setSelectedColor] = useState('#000000')
    const [colorInput, setColorInput] = useState('')
     const preDefinedColors = [
        {name:'white', hex:'#FFFFFF'},
        {name:'black', hex:'#000000'},
        {name:'red', hex:'#FF0000'},
        {name:'IndianRed', hex:'IndianRed'},
        {name:'yellow', hex:'#FFE500'},
        {name:'lime', hex:'#8FFF00'},
        {name:'cyan', hex:'cyan'},
        {name:'DeepSkyBlue', hex:'DeepSkyBlue'},
        {name:'blue', hex:'#000AFF'},
        {name:'purple', hex:'#5200FF'},
        {name:'pink', hex:'#AD00FF'},
        {name:'Fuchsia', hex:'Fuchsia'},
        {name:'Khaki', hex:'Khaki'},
        {name:'orange', hex:'#FFB800'},
        {name:'green', hex:'#29A927'},
        {name:'choose', hex:''},
     ]

     useEffect(() => {
    }, [selectedColor])

     const selectColor = (colorHex:string) =>{
        
        drawColor(colorHex)

        setSelectedColor(colorHex)
     }


  return (
    <div className='colorsBG' >
        {preDefinedColors.map(color=>
        <div key={color.name} onClick={()=>selectColor(color.hex)} className={` ${selectedColor === color.hex? 'selected ': 'bxsh'}`}>
            {color.name === 'choose'?
                <input  onChange={e =>{ setColorInput(e.target.value), selectColor(e.target.value)}} className='input' type="color" name="" id="" value={colorInput} />
            :
                <div style={{width:'20px',height:'20px', backgroundColor:color.hex}}></div>
                
        }
        </div>
            )}
    </div>
  )
}
