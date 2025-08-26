import React, { useState, useEffect } from 'react';
import { CheckCircle, Home, Download, Share, Copy, Clock } from 'lucide-react';

// shadcn UI components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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

  // Mock payment details - in real app, this would come from props or API
  const paymentDetails: PaymentDetails = {
    transactionId: 'TXN-2024-08-25-001',
    amount: 99.99,
    currency: 'USD',
    paymentMethod: 'Credit Card (**** 4242)',
    date: new Date().toLocaleString(),
    description: 'Premium Subscription Plan',
    merchantName: 'Your Company Name'
  };

  // Countdown timer effect
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
    // Simulate redirect to home page
    setTimeout(() => {
      alert('Redirecting to home page... (This is just a demo)');
      console.log('Redirecting to home page');
      // In a real app, you would use router.push('/') or window.location.href = '/'
    }, 500);
  };

  const handleGoHome = () => {
    setIsRedirecting(true);
    handleRedirect();
  };

  const handleDownloadReceipt = () => {
    // Simulate receipt download
    console.log('Downloading receipt for transaction:', paymentDetails.transactionId);
    alert('Receipt download started! (This is just a demo)');
  };

  const handleShareReceipt = () => {
    // Simulate sharing
    console.log('Sharing receipt');
    alert('Share functionality would open here! (This is just a demo)');
  };

  const handleCopyTransactionId = async () => {
    try {
      await navigator.clipboard.writeText(paymentDetails.transactionId);
      alert('Transaction ID copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy transaction ID:', err);
      alert('Transaction ID: ' + paymentDetails.transactionId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-6">
        {/* Success Card */}
        <Card className="text-center shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-green-600 mb-2">
              Payment Successful!
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Thank you for your payment. Your transaction has been completed successfully.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Payment Amount */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {paymentDetails.currency} {paymentDetails.amount.toFixed(2)}
              </div>
              <div className="text-gray-600">
                {paymentDetails.description}
              </div>
            </div>

            {/* Transaction Details */}
            <div className="space-y-4 text-left">
              <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Transaction ID</div>
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
                    <div className="text-sm font-medium text-gray-500">Payment Method</div>
                    <div className="text-sm text-gray-900">{paymentDetails.paymentMethod}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Date & Time</div>
                    <div className="text-sm text-gray-900">{paymentDetails.date}</div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-500">Merchant</div>
                    <div className="text-sm text-gray-900">{paymentDetails.merchantName}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Status: Completed
                </Badge>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={handleGoHome}
                disabled={isRedirecting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Home className="mr-2 h-4 w-4" />
                {isRedirecting ? 'Redirecting...' : 'Go to Home'}
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

            {/* Auto-redirect Notice */}
            {!isRedirecting && countdown > 0 && (
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>
                  Automatically redirecting to home page in{' '}
                  <span className="font-semibold text-blue-600">{countdown}</span>{' '}
                  {countdown === 1 ? 'second' : 'seconds'}
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

        {/* Additional Information */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h4 className="font-semibold text-blue-900">What's Next?</h4>
              <p className="text-sm text-blue-700">
                You will receive a confirmation email shortly. If you have any questions about your purchase, 
                please contact our support team at support@company.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;