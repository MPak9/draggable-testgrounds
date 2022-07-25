import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';

function App() {

  const screenRef = useRef();

  //For Mouse position
  const [screenRect, setScreenRect] = useState([0,0]);
  const [elemRect, setElemRect ] = useState([0,0,0,0,0,0,0,0]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const leftTop = { position:'absolute', left:`${x}px`, top:`${y}px` }
  const rightTop = { position:'absolute', right:`${x}px`, top:`${y}px` }
  const leftBottom = { position:'absolute', left:`${x}px`, bottom:`${y}px` }
  const rightBottom = { position:'absolute', right:`${x}px`, bottom:`${y}px` }
  let positionStyle = leftTop;

  useEffect(()=>{
    console.log(positionStyle);
  },positionStyle)

  //Handle mouse position where the context menu will appear
  const handleDrag = (e) => {
    e.preventDefault();
    //Screen Boundaries
    let screen = screenRef.current.getBoundingClientRect();
    setScreenRect([screen.bottom, screen.top]);

    //Element Data
    let rect = e.currentTarget.getBoundingClientRect();
    setElemRect([
      rect.height,
      rect.width, 
      rect.x, 
      rect.y, 
      rect.top,
      rect.bottom, 
      rect.left, 
      rect.right]);

    let x = e.clientX;
    let y = e.clientY;
    // if(rect.bottom >= screenRect[0]) y -= (rect.bottom - screenRect[0]);
    // if(rect.top <= screenRect[1]) y += screenRect[1] - rect.top;
    
    setX(x);
    setY(y);
    
  }

  const handleDragStart = (e)=> {
    var dragImg = new Image(0,0);
    dragImg.src =
    `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`
    e.dataTransfer.setDragImage(dragImg, 0, 0);

    let rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX;
    let y = e.clientY;

    const xLeft =  Math.abs(x-Math.abs(rect.left));
    const xRight =  Math.abs( x-Math.abs(rect.right));
    const yTop =  Math.abs(y-Math.abs(rect.top));
    const yBottom = Math.abs(y-Math.abs(rect.bottom));
    
    if((xLeft < xRight) && (yTop < yBottom)) positionStyle = leftTop;
    if((xLeft > xRight) && (yTop < yBottom)) positionStyle = rightTop;
    if((xLeft < xRight) && (yTop > yBottom)) positionStyle = leftBottom;
    if((xLeft > xRight) && (yTop > yBottom)) positionStyle = rightBottom;


  }

    //Handle mouse position where the context menu will appear
    const handleDragEnd = (e) => {
      setX(elemRect[6]);
      setY(elemRect[4]);
      
    }


  return (
    <div className="App" ref={screenRef} >
      <header className="App-header">
        <p>
          x: {x}, y: {y}
        </p>
        <p>
          Element x: {elemRect[2]}, Element y: {elemRect[3]}
        </p>
        <p>
          Element Height: {elemRect[0]}, Element Width: {elemRect[1]}
        </p>
        <p>
          Element Top: {elemRect[4]}, Element Bottom: {elemRect[5]}
        </p>
        <p>
          Element left: {elemRect[6]}, Element right: {elemRect[7]}
        </p>
        <p>
          Rect Top: {screenRect[1]}, Rect Bottom: {screenRect[0]}
        </p>
      </header>
      <img src={logo} className="App-logo" alt="logo" onClick={()=>console.log("click")} draggable onDragStart={(e)=>handleDragStart(e)} onDrag={(e)=> handleDrag(e)} 
      onDragEnd ={(e)=>handleDragEnd(e)}
      style={positionStyle}
      />
    </div>
  );
}

export default App;
