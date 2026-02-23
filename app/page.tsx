import { getProfiles } from "./hooks/mutation";
import Landing from "./components/home/landing";
import AppNavbar from "./components/app-navbar";

export default async function Home() {
  const { data } = await getProfiles();

  return (
    <div className="relative min-h-screen w-full font-sans bg-background text-foreground">
      {/* gradient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 15% 20%, hsla(0, 100%, 30%, 0.22) 0%, transparent 65%),
            radial-gradient(ellipse 65% 55% at 85% 10%, hsla(48, 100%, 50%, 0.18) 0%, transparent 60%),
            radial-gradient(ellipse 55% 65% at 50% 95%, hsla(0, 100%, 30%, 0.12) 0%, transparent 65%)
          `,
        }}
      />

      {/* navbar */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <AppNavbar />
      </div>

      <Landing profile={data} />
    </div>
  );
}
