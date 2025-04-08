import { useState, useRef, useEffect } from 'react';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    variant?: 'default' | 'danger';
  }[];
  align?: 'left' | 'right';
}

const DropdownMenu = ({ trigger, items, align = 'right' }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>
      
      {isOpen && (
        <div 
          className={`absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          <div 
            className="absolute -top-2 right-3 w-3 h-3 rotate-45 bg-white"
            style={{ display: align === 'right' ? 'block' : 'none' }}
          ></div>
          <div 
            className="absolute -top-2 left-3 w-3 h-3 rotate-45 bg-white"
            style={{ display: align === 'left' ? 'block' : 'none' }}
          ></div>
          
          <div className="py-1 relative z-10 bg-white rounded-md">
            {items.map((item, index) => (
              <button
                key={index}
                className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                  item.variant === 'danger' 
                    ? 'text-red-600 hover:bg-red-50' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handleItemClick(item.onClick)}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
