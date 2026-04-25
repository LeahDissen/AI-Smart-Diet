import { ChefHat, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-3xl border border-emerald-200/70 bg-white/80 p-6 shadow-[0_12px_35px_-20px_rgba(22,101,52,0.45)] backdrop-blur sm:p-8 lg:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
            <Sparkles className="h-4 w-4" />
            SmartPlate AI
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl lg:text-5xl">
            Build Recipes From What You Already Have
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-emerald-900/80 sm:text-base">
            Drop in your ingredients, choose your dietary goals, and let SmartPlate generate a fresh meal idea
            tailored to your pantry.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <ChefHat className="h-6 w-6 text-emerald-700" />
          <p className="text-sm font-medium text-emerald-800">AI Recipe Generator Dashboard</p>
        </div>
      </div>
    </section>
  );
}
