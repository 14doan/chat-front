import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import './SidebarChat.css';

function SidebarChat({ id, name }) {
  return (
    <Link to={`roomid/${id}`} className="link">
      <div className="sidebarChat">
        <Avatar />
        <div className="sidebarChat__info">
          <h3>{name === 'thaicos' ? 'Thai Room' : 'Viet Room'}</h3>
          <p>Click to enter</p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
