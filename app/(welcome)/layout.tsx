import { Navbar } from "./_components/navbar";

const WelcomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-full bg-soft ">
      <div className="m-auto max-w-6xl">
        <Navbar />
        <main className="pt-32">{children}</main>
      </div>
    </div>
  );
};

export default WelcomeLayout;
