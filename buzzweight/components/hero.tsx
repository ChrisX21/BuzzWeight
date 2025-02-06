import NextLogo from "./next-logo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-foreground mb-10">BuzzWeight</h1>
        <h2 className="text-5xl font-bold text-foreground mt-4">
          Your Custom Sensor Data Platform
        </h2>
        <p className="text-xl text-muted-foreground mt-2">
          Easily track and manage weight, temperature, and humidity sensor data
          in real-time.
        </p>
      </div>
    </div>
  );
}
