import { useState, useEffect } from "react";
import { X, Copy, Check, Shield, User } from "lucide-react";

const DEMO_CREDENTIALS_KEY = "eventx_demo_credentials_dismissed";

const demoCredentials = [
  {
    role: "Admin",
    email: "admin@eventx.com",
    password: "Admin@123",
    icon: Shield,
    color: "bg-blue-500",
    badge: "bg-blue-100 text-blue-800",
  },
  {
    role: "User",
    email: "user@eventx.com",
    password: "User@123",
    icon: User,
    color: "bg-green-500",
    badge: "bg-green-100 text-green-800",
  },
];

const DemoCredentialsPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const dismissed = localStorage.getItem(DEMO_CREDENTIALS_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(DEMO_CREDENTIALS_KEY, "true");
  };

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // ignore
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-5 border-b">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Demo Credentials</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Use these accounts to test the app
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {demoCredentials.map((cred, index) => {
            const Icon = cred.icon;
            return (
              <div key={cred.role} className="border rounded-xl overflow-hidden">
                <div className={`${cred.color} px-4 py-2 flex items-center gap-2`}>
                  <Icon className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold text-white">{cred.role}</span>
                  <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${cred.badge}`}>
                    {cred.role === "Admin" ? "Full Access" : "Limited Access"}
                  </span>
                </div>
                <div className="p-4 space-y-3 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Email:</span>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-white px-2 py-1 rounded border">
                        {cred.email}
                      </code>
                      <button
                        onClick={() => handleCopy(cred.email, index * 2)}
                        className="p-1.5 hover:bg-white rounded-md transition-colors border"
                        title="Copy email"
                      >
                        {copiedIndex === index * 2 ? (
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Password:</span>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-white px-2 py-1 rounded border">
                        {cred.password}
                      </code>
                      <button
                        onClick={() => handleCopy(cred.password, index * 2 + 1)}
                        className="p-1.5 hover:bg-white rounded-md transition-colors border"
                        title="Copy password"
                      >
                        {copiedIndex === index * 2 + 1 ? (
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-5 pb-5">
          <button
            onClick={handleDismiss}
            className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
          >
            Got it, start testing
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoCredentialsPopup;