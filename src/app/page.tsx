"use client";
import { useEffect } from "react";
import {
  GuessedLetters,
  HangmanDrawing,
  Keyboard,
} from "@/components/pages/home/client";
import { generateRandomWord } from "@/lib/utils/generate-random-word";
import { dispatch } from "@/client/store";
import { sethangman } from "@/client/store/slices/client-slice";

export default function Home() {
  useEffect(() => {
    dispatch(sethangman({ word: generateRandomWord() }));
  }, []);

  return (
    <main>
      <section>
        <div className="max-w-maxi mx-auto py-6 flex items-center justify-center">
          <HangmanDrawing />
        </div>
      </section>
      <section>
        <div className="max-w-maxi mx-auto py-6">
          <div className="flex gap-3 items-center justify-center">
            <GuessedLetters />
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-3xl mx-auto py-6">
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(60px,_1fr))] gap-3">
            <Keyboard />
          </div>
        </div>
      </section>
    </main>
  );
}
