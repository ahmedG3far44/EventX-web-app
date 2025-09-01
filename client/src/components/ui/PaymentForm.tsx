import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock } from "lucide-react";
import { useBookingTickets } from "@/contexts/BookingTicketsProvider";
import { useEvents } from "@/contexts/EventsProvider";
import { Navigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

// const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export interface PaymentFormData {
  paymentMethod: "card" | "paypal";
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

const PaymentForm = ({ eventId }: { eventId: string }) => {
  const { events, eventDetails } = useEvents();
  console.log(eventId);
  console.log(eventDetails);
  const { totalTicketsPrice, selectedSeats, handleTickets } =
    useBookingTickets();

  console.log(totalTicketsPrice);
  const [loading, setLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [paymentDetails, setPaymentInfo] = useState<PaymentFormData>({
    paymentMethod: "card",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
      console.log("PaymentForm Debug Info:");
      console.log("eventId:", eventId);
      console.log("events length:", events?.length);
      console.log("selectedSeats:", selectedSeats);
      console.log("totalPrice:", totalTicketsPrice);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading payment details...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }


  if (!eventId) {
    console.error("No eventId found in URL params");
    return <Navigate to="/events" replace />;
  }

  if (!eventDetails) {
    console.error("Events not loaded yet");
    return <Navigate to="/events" replace />;
  }


  if (!selectedSeats || selectedSeats.length === 0) {
    console.error("No seats selected, redirecting to event page");
    return <Navigate to={`/event/${eventId}`} replace />;
  }

  if (totalTicketsPrice === 0) {
    console.error("Total price is 0, redirecting to event page");
    return <Navigate to={`/event/${eventId}`} replace />;
  }

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setPaymentInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCardNumberChange = (value: string) => {
    // Format card number with spaces every 4 digits
    const formattedValue = value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
      .slice(0, 19);
    handleInputChange("cardNumber", formattedValue);
  };

  const handleExpiryDateChange = (value: string) => {
    // Format expiry date as MM/YY
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .slice(0, 5);
    handleInputChange("expiryDate", formattedValue);
  };

  const handleCvcChange = (value: string) => {
    // Limit CVC to 3-4 digits
    const formattedValue = value.replace(/\D/g, "").slice(0, 4);
    handleInputChange("cvc", formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log("Payment data:", paymentDetails);

      const result = await handleTickets(paymentDetails);

      console.log(result);

      // Reset form
      setPaymentInfo({
        paymentMethod: "card",
        cardName: "",
        cardNumber: "",
        expiryDate: "",
        cvc: "",
      });

      // TODO: Navigate to success page
      // navigate('/payment-success');
    } catch (error) {
      console.error("Payment error:", (error as Error).message);
      // TODO: Show error message to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Payment Amount:
            <span className="mx-4 font-bold text-green-500">
              ${totalTicketsPrice}
            </span>
          </CardTitle>
          <CardDescription className="text-center">
            Complete your purchase for
          </CardDescription>
          <CardDescription className="text-center text-sm">
            Selected seats: {selectedSeats.length} seat
            {selectedSeats.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Method Selection */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Payment Method</Label>
              <RadioGroup
                value={paymentDetails.paymentMethod}
                onValueChange={(value: "card" | "paypal") =>
                  handleInputChange("paymentMethod", value)
                }
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="card"
                    id="card"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    Credit Card
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="paypal"
                    id="paypal"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="paypal"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    PayPal
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {paymentDetails.paymentMethod === "card" && (
              <div className="space-y-4">
                {/* Card Name */}
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={paymentDetails.cardName}
                    onChange={(e) =>
                      handleInputChange("cardName", e.target.value)
                    }
                    required
                    className="focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Card Number */}
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    maxLength={19}
                    required
                    className="focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Expiry Date and CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => handleExpiryDateChange(e.target.value)}
                      maxLength={5}
                      required
                      className="focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      value={paymentDetails.cvc}
                      onChange={(e) => handleCvcChange(e.target.value)}
                      maxLength={4}
                      required
                      className="focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentDetails.paymentMethod === "paypal" && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  You will be redirected to PayPal to complete your payment
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 h-12 text-lg font-semibold disabled:bg-zinc-500 disabled:cursor-not-allowed"
              size="lg"
            >
              <Lock className="mr-2 h-4 w-4" />
              {loading ? "Processing payment..." : `Pay $${totalTicketsPrice}`}
            </Button>

            {/* Security Notice */}
            <div className="text-center text-sm text-muted-foreground">
              <p>Your payment details are encrypted and secure</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentForm;
