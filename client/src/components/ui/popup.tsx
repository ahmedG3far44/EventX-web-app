import { useEffect, useState, type ReactNode } from "react";
import { Card } from "./card";
import { X } from "lucide-react";

const Popup = ({ children, open }: { children: ReactNode; open: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <>
      {isOpen && (
        <div className="min-h-screen w-full fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg p-5 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={18} className="text-gray-500" />
            </button>
            {children}
          </Card>
        </div>
      )}
    </>
  );
};

export default Popup;
