// ES6
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import './styles.css';



const ReactDraggableAPI = () => {
  return (
    <div className='main'>
        <div className='draggableParentContainer'>
            <Draggable bounds="parent">
                <div className='draggable'>I can now be moved around!</div>
            </Draggable>
            
            
        </div> 
    </div>
  )
}

export default ReactDraggableAPI