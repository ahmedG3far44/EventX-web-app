import PaymentForm from "@/components/ui/PaymentForm";
import { useParams } from "react-router-dom";

const PaymentPage = () => {
  const { eventId } = useParams();
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <PaymentForm eventId={eventId as string} />
    </div>
  );
};

export default PaymentPage;
