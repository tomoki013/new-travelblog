// app/loading-showcase/page.tsx など

import { LoadingAnimation } from "@/components/featured/LoadingAnimation/LoadingAnimation";

export default function LoadingShowcase() {
  const allVariants = [
    "mapRoute",
    "flippingJournal",
    "compass",
    "cameraAperture",
    "passportStamp",
    "airplaneWindow",
    "luggageCarousel",
    "splitFlap",
    "floatingLanterns",
    "backpack",
    "boardingPass",
    "postcard",
    "dayNightCycle",
    "landmark",
    "polaroid",
    "noodles",
    "treasureChest",
    "messageInABottle",
  ] as const;

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold mb-16">Loading Animations</h1>
      <div className="w-full max-w-7xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-20 gap-x-8">
        {allVariants.map((variant, index) => (
          <div
            key={variant}
            className="flex flex-col items-center gap-4 bg-white p-4 rounded-md"
          >
            <h2 className="font-bold text-sm text-center capitalize text-foreground">
              {index + 1}. {variant.replace(/([A-Z])/g, " $1")}
            </h2>
            <div className="h-36 w-full flex items-center justify-center">
              <LoadingAnimation variant={variant} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
