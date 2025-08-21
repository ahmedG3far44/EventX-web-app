import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SignupPage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card>
        <h1 className=" w-1/2 text-center self-center font-semibold text-2xl text-wrap">
          Welcome Back, create a new account here!
        </h1>
        <form className="w-[600px] flex flex-col justify-center items-center gap-2  p-8">
          <input
            className="inline-flex w-full p-2 rounded-md bg-zinc-100"
            type="text"
            placeholder="name"
          />
          <input
            className="inline-flex w-full p-2 rounded-md bg-zinc-100"
            type="password"
            placeholder="password"
          />
          <input
            className="inline-flex w-full p-2 rounded-md bg-zinc-100"
            type="email"
            placeholder="email"
          />
          <input
            className="inline-flex w-full p-2 rounded-md bg-zinc-100"
            type="number"
            min={13}
            max={120}
            placeholder="age"
          />
          <Button className="w-full mt-4">Signup</Button>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;
