import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthProvider";
import { useState, type ChangeEvent } from "react";

const LoginPage = () => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const { isLoading } = useAuth();
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      <Card>
        <form
          onSubmit={() => {}}
          className="p-4 flex flex-col justify-start items-start gap-2 min-w-[400px] max-w-1/2  rounded-2xl"
        >
          <input
            onChange={handleChangeInput}
            placeholder="enter your email"
            className="p-2 border rounded-md bg-zinc-100 w-full"
            name="email"
            type="email"
          />
          <input
            onChange={handleChangeInput}
            placeholder="enter your password"
            className="p-2 border rounded-md bg-zinc-100 w-full"
            name="password"
            type="password"
          />
          <div className="flex items-center gap-2 p-2">
            <input type="checkbox" name="" id="check" />
            <label htmlFor="check">I accept terms & conditions</label>
          </div>
          <input
            className="p-2 border rounded-md bg-zinc-100 w-full"
            type="submit"
            value={isLoading ? "submitting" : "login"}
          />
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
