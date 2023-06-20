import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const PopupComponent = ({content}) => {
  return (
<Popup trigger={<button> Trigger</button>} position="right center">
    <div>{content}</div>
  </Popup>
  )
}

export default PopupComponent