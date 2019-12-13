import React, {FunctionComponent, useState, ReactNode} from 'react';
import ClickOutsideListener from './ClickOutsideListener';
import { Link } from 'react-router-dom';
import './Dropdown.css';

interface DropdownProps {
  contents: ReactNode,
}

interface ControlledDropdownProps extends DropdownProps {
  isOpen: boolean,
  onClose: () => unknown,
  onContainerClick?: () => unknown,
}

export const DropdownLink: FunctionComponent<{to: string}> = ({to, children}) => (
  <Link className="dropdown-link" to={to}>
    {children}
  </Link>
);

export const ControlledDropdown: FunctionComponent<ControlledDropdownProps> = 
({children, onContainerClick, onClose, isOpen, contents}) => {
  // TODO: Make it so that the dropdown doesn't always trigger on onClose on
  // any part of the window click. That's bad.
  return (
    <ClickOutsideListener
      className={`dropdown-wrapper${isOpen ? ' dropdown-open' : ''}` } 
      onClickOutside={onClose}
    >
      <div className="dropdown-child-container" onClick={onContainerClick}>
        {children}
      </div>
      {isOpen && (
        <div className='dropdown'>
          {contents}
        </div>
        )
      }
    </ClickOutsideListener>
  );
}

const Dropdown: FunctionComponent<DropdownProps> = props => {
  const [isOpen, setOpen] = useState(false);
  return (
    <ControlledDropdown 
      isOpen={isOpen}
      onClose={() => {
        console.log('onclose');
        setOpen(false)
      }}
      contents={props.contents}
      onContainerClick={() => {
        console.log('beet ' + isOpen);
        setOpen(!isOpen);
      }}
    >
      {props.children}
    </ControlledDropdown>
  )
};

  export default Dropdown;
