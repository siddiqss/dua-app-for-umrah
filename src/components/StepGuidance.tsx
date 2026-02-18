"use client";

interface StepGuidanceProps {
  category: string;
}

const DEFAULT_NOTES = [
  "Keep moving with the crowd calmly and avoid pushing.",
  "Read what is easy for you if you forget exact wording.",
  "Pause and make personal dua whenever space allows.",
];

const CATEGORY_NOTES: Record<string, string[]> = {
  ihram: [
    "Confirm intention before crossing Miqat.",
    "Keep reciting Talbiyah frequently.",
    "Avoid forbidden actions of Ihram.",
  ],
  tawaf: [
    "Start each circuit from the Black Stone line.",
    "Move counter-clockwise and avoid harming others.",
    "Between Yemeni Corner and Black Stone, recite Quran 2:201.",
  ],
  sai: [
    "Complete 7 laps between Safa and Marwa in order.",
    "Men walk briskly only in the green-light zone.",
    "Use this time for continuous dhikr and dua.",
  ],
  arafah: [
    "Stay within Arafah boundaries until sunset.",
    "After Dhuhr/Asr, spend most time in dua.",
    "Raise hands and face Qiblah as much as possible.",
  ],
  rami: [
    "Throw 7 pebbles at each required Jamrah only.",
    "Say 'Allahu Akbar' with each throw.",
    "If crowds are heavy, return at a safer time window.",
  ],
};

export default function StepGuidance({ category }: StepGuidanceProps) {
  const notes = CATEGORY_NOTES[category] || DEFAULT_NOTES;

  return (
    <section className="mx-auto w-full max-w-xl px-4 pt-4">
      <div className="ui-card-soft">
        <p className="ui-section-title">Pilgrim Guidance</p>
        <ul className="mt-2 space-y-2">
          {notes.map((note) => (
            <li key={note} className="text-sm leading-relaxed text-muted">
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
