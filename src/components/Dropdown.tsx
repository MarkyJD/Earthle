/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  Icon: React.ComponentType;
  title?: string;
}

export default function Dropdown({ children, Icon, title }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex items-center rounded  text-3xl p-1 hover:bg-stone-200 dark:hover:bg-stone-700"
      >
        <h2 className="text-lg font-bold">{title}</h2>
        <Icon />
      </button>
      {isOpen && (
        <>
          <div className="z-50 w-4 h-4 rotate-45 border-t-2 border-l-2 bg-stone-100 dark:bg-stone-800 border-stone-500 dark:border-stone-400  absolute right-2 mt-1" />
          <div className=" w-36 z-40 border-2 border-stone-500 dark:border-stone-400 bg-stone-100 dark:bg-stone-800 absolute flex flex-col py-3 rounded-md mt-3 -right-2">
            {children &&
              // @ts-ignore
              children.map((child: any, index: any) => (
                <button
                  className="w-full h-12 hover:bg-stone-200 dark:hover:bg-stone-700 font-bold"
                  onClick={() => setIsOpen(false)}
                  type="button"
                  key={index}
                >
                  {child}
                </button>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

Dropdown.defaultProps = {
  title: '',
};
