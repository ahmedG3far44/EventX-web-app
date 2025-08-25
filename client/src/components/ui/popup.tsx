import { useState, type ReactNode } from "react";
import { Card } from "./card";
import { LucideX } from "lucide-react";

const Popup = ({ children, open }: { children: ReactNode; open: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  return (
    <>
      {isOpen && (
        <div className="min-h-screen w-full fixed left-0 top-0 z-50 bg-black/90 flex items-center justify-center">
          <Card className="w-[500px] p-4 rounded-md shadow-2xl">
            <LucideX onClick={() => setIsOpen(false)} size={20} />
            {children}
          </Card>
        </div>
      )}
    </>
  );
};

export default Popup;
