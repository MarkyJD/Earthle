import { useEffect, useRef, useState } from 'react';

export default function HowToPlayModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Check if clicked outside of search to automatically close
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the search is open and the clicked target is not within the search,
      // then close the search
      if (
        isOpen &&
        modalRef &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="hover:underline decoration-2 decoration-sky-700 text-sm font-bold"
        onClick={() => setIsOpen(!isOpen)}
      >
        How to Play
      </button>

      {isOpen && (
        <div className="fixed inset-0 py-20 px-2 z-10 flex items-center justify-center dark:bg-black/30 bg-black/50">
          <div
            ref={modalRef}
            className="bg-stone-100 rounded shadow-md w-full h-full max-w-screen-md border-2 border-sky-700 p-5 "
          >
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="transition font-bold text-sm border-2 hover:bg-sky-700 hover:text-stone-100 border-sky-700 px-3 py-2 rounded-md text-sky-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
