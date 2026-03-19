"use client";

import { useState } from "react";

export default function TimeCalculator() {
  const [baseTime, setBaseTime] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [mode, setMode] = useState<"add" | "subtract">("add");

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [d1h, setD1h] = useState("");
  const [d1m, setD1m] = useState("");
  const [d2h, setD2h] = useState("");
  const [d2m, setD2m] = useState("");
  const [durationMode, setDurationMode] = useState<"add" | "subtract">("add");

  const calculate = () => {
    if (!baseTime) return "--:--";

    const [bh, bm] = baseTime.split(":").map(Number);
    let total = bh * 60 + bm;

    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const delta = h * 60 + m;

    if (mode === "add") {
      total += delta;
    } else {
      total -= delta;
    }

    total = ((total % (24 * 60)) + (24 * 60)) % (24 * 60);

    const resultH = Math.floor(total / 60);
    const resultM = total % 60;

    return `${String(resultH).padStart(2, "0")}:${String(resultM).padStart(2, "0")}`;
  };

  const calculateDiff = () => {
    if (!start || !end) return "--:--";

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    let startMin = sh * 60 + sm;
    let endMin = eh * 60 + em;

    if (endMin < startMin) {
      endMin += 24 * 60;
    }

    const diff = endMin - startMin;

    const h = Math.floor(diff / 60);
    const m = diff % 60;

    return `${h}h ${m}m`;
  };

  const calculateDuration = () => {
    const h1 = parseInt(d1h) || 0;
    const m1 = parseInt(d1m) || 0;
    const h2 = parseInt(d2h) || 0;
    const m2 = parseInt(d2m) || 0;

    let total1 = h1 * 60 + m1;
    let total2 = h2 * 60 + m2;

    let result =
      durationMode === "add"
        ? total1 + total2
        : total1 - total2;

    if (result < 0) result = 0;

    const h = Math.floor(result / 60);
    const m = result % 60;

    return `${h}h ${m}m`;
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-800 p-6 rounded-2xl shadow-xl space-y-8">

        <h1 className="text-2xl font-bold text-center">
          ⏱️ Time Calculator
        </h1>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center">Add / Subtract Time</h2>

          <input
            type="time"
            value={baseTime}
            onChange={(e) => setBaseTime(e.target.value)}
            className="w-full p-2 rounded bg-zinc-700 outline-none"
            step="60"
            lang="it-IT"
          />

          <div className="flex gap-2">
            <button
              onClick={() => setMode("add")}
              className={`flex-1 p-2 rounded ${mode === "add" ? "bg-green-600" : "bg-zinc-700"}`}
            >
              + Add
            </button>
            <button
              onClick={() => setMode("subtract")}
              className={`flex-1 p-2 rounded ${mode === "subtract" ? "bg-red-600" : "bg-zinc-700"}`}
            >
              - Subtract
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full p-2 rounded bg-zinc-700 outline-none"
            />
            <input
              type="number"
              placeholder="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="w-full p-2 rounded bg-zinc-700 outline-none"
            />
          </div>

          <div className="text-center">
            <p className="text-sm text-zinc-400">Result</p>
            <p className="text-3xl font-bold">{calculate()}</p>
          </div>
        </div>

        <div className="border-t border-zinc-700"></div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center">Time Difference</h2>

          <div className="flex gap-2">
            <input
              type="time"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full p-2 rounded bg-zinc-700 outline-none"
              step="60"
              lang="it-IT"
            />
            <input
              type="time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full p-2 rounded bg-zinc-700 outline-none"
              step="60"
              lang="it-IT"
            />
          </div>

          <div className="text-center">
            <p className="text-sm text-zinc-400">Difference</p>
            <p className="text-2xl font-bold">{calculateDiff()}</p>
          </div>
        </div>

        <div className="border-t border-zinc-700"></div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center">Duration Calculator</h2>

          <div className="flex gap-2">
            <button
              onClick={() => setDurationMode("add")}
              className={`flex-1 p-2 rounded ${durationMode === "add" ? "bg-green-600" : "bg-zinc-700"}`}
            >
              + Add
            </button>
            <button
              onClick={() => setDurationMode("subtract")}
              className={`flex-1 p-2 rounded ${durationMode === "subtract" ? "bg-red-600" : "bg-zinc-700"}`}
            >
              - Subtract
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Hours"
              value={d1h}
              onChange={(e) => setD1h(e.target.value)}
              className="w-full p-2 rounded bg-zinc-700 outline-none"
            />
            <input
              type="number"
              placeholder="Minutes"
              value={d1m}
              onChange={(e) => setD1m(e.target.value)}
              className="w-full p-2 rounded bg-zinc-700 outline-none"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Hours"
              value={d2h}
              onChange={(e) => setD2h(e.target.value)}
              className="w-full p-2 rounded bg-zinc-700 outline-none"
            />
            <input
              type="number"
              placeholder="Minutes"
              value={d2m}
              onChange={(e) => setD2m(e.target.value)}
              className="w-full p-2 rounded bg-zinc-700 outline-none"
            />
          </div>

          <div className="text-center">
            <p className="text-sm text-zinc-400">Result</p>
            <p className="text-2xl font-bold">{calculateDuration()}</p>
          </div>
        </div>

      </div>
    </div>
  );
}