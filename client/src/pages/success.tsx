import React, { useState, useEffect } from "react";
import { CheckCircle, Home, Download, Share, Copy, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useBookingTickets } from "@/contexts/BookingTicketsProvider";
import { Navigate, useNavigate } from "react-router-dom";

interface PaymentDetails {
  transactionId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  date: string;
  description: string;
  merchantName: string;
}

const PaymentSuccessPage: React.FC = () => {
  const [countdown, setCountdown] = useState<number>(10);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const { totalTicketsPrice } = useBookingTickets();
  const paymentDetails: PaymentDetails = {
    transactionId: "TXN-2024-08-25-001",
    amount: totalTicketsPrice,
    currency: "USD",
    paymentMethod: "Credit Card (**** 4242)",
    date: new Date().toLocaleString(),
    description: "Premium Subscription Plan",
    merchantName: "Your Company Name",
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (countdown > 0 && !isRedirecting) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !isRedirecting) {
      handleRedirect();
    }
  }, [countdown, isRedirecting]);

  const handleRedirect = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  if (totalTicketsPrice === 0) {
    return <Navigate to={"/"} />;
  }
  const handleGoHome = () => {
    setIsRedirecting(true);
    handleRedirect();
  };

  const handleDownloadReceipt = () => {
    console.log(
      "Downloading receipt for transaction:",
      paymentDetails.transactionId
    );
    alert("Receipt download started! (This is just a demo)");
  };

  const handleShareReceipt = () => {
    alert("Share functionality would open here! (This is just a demo)");
  };

  const handleCopyTransactionId = async () => {
    try {
      await navigator.clipboard.writeText(paymentDetails.transactionId);
      alert("Transaction ID copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy transaction ID:", err);
      alert("Transaction ID: " + paymentDetails.transactionId);
    }
  };

  return (
    <div className="overflow-hidden  flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-6">
        <Card className="text-center shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex justify-center mb-2">
              <div className="rounded-full bg-green-100 p-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-xl font-bold text-green-600 mb-2">
              Payment Successful!
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Thank you for your payment. Your transaction has been completed
              successfully.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="text-xl font-bold text-gray-900 ">
                {paymentDetails.currency} {paymentDetails.amount.toFixed(2)}
              </div>
            </div>
            <div className="space-y-4 text-left">
              <h3 className="text-lg font-semibold text-gray-900">
                Transaction Details
              </h3>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-500">
                      Transaction ID
                    </div>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {paymentDetails.transactionId}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyTransactionId}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-500">
                      Payment Method
                    </div>
                    <div className="text-sm text-gray-900">
                      {paymentDetails.paymentMethod}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-500">
                      Date & Time
                    </div>
                    <div className="text-sm text-gray-900">
                      {paymentDetails.date}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-500">
                      Merchant
                    </div>
                    <div className="text-sm text-gray-900">
                      {paymentDetails.merchantName}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-start pt-4">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Status: Completed
                </Badge>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-4">
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={handleGoHome}
                disabled={isRedirecting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Home className="mr-2 h-4 w-4" />
                {isRedirecting ? "Redirecting..." : "Go to Home"}
              </Button>

              <Button
                variant="outline"
                onClick={handleDownloadReceipt}
                disabled={isRedirecting}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>

              <Button
                variant="outline"
                onClick={handleShareReceipt}
                disabled={isRedirecting}
              >
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>

            <Separator />
            {!isRedirecting && countdown > 0 && (
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>
                  Automatically redirecting to home page in{" "}
                  <span className="font-semibold text-blue-600">
                    {countdown}
                  </span>{" "}
                  {countdown === 1 ? "second" : "seconds"}
                </span>
              </div>
            )}

            {isRedirecting && (
              <div className="flex items-center justify-center space-x-2 text-sm text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>Redirecting to home page...</span>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
