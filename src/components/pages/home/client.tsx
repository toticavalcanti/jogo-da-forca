'use client';

import { dispatch, useAppSelector } from '@/client/store';
import { sethangman } from '@/client/store/slices/client-slice';
import { cn } from '@/lib/utils/cn';
import { generateRandomWord } from '@/lib/utils/generate-random-word';
import { Fragment, MouseEvent, useEffect } from 'react';

const HEAD = (
  <div key={'head'} className='w-[70px] h-[70px] rounded-full border-[10px] border-muted-foreground absolute top-[49px] right-[-30px] z-10' />
);

const BODY = <div key={'body'} className='w-[10px] h-[100px] bg-muted-foreground absolute top-[118px] right-0' />;

const RIGHT_ARM = (
  <div key={'right_arm'} className='w-[100px] h-[10px] bg-muted-foreground absolute top-[150px] right-[-100px] rotate-[-30deg] origin-bottom-left' />
);

const LEFT_ARM = (
  <div key={'left_arm'} className='w-[100px] h-[10px] bg-muted-foreground absolute top-[150px] right-[10px] rotate-[30deg] origin-bottom-right' />
);

const RIGHT_LEG = (
  <div key={'right_leg'} className='w-[100px] h-[10px] bg-muted-foreground absolute top-[210px] right-[-90px] rotate-[60deg] origin-bottom-left' />
);

const LEFT_LEG = (
  <div key={'left_leg'} className='w-[100px] h-[10px] bg-muted-foreground absolute top-[210px] right-0 rotate-[-60deg] origin-bottom-right' />
);

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

const useResult = () => {
  const { guessedLetters, word } = useAppSelector((state) => state.clientSlice.hangman);
  const incorrectLetters = guessedLetters.filter((letter) => !word?.includes(letter));
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = word?.every((letter) => guessedLetters.includes(letter));

  return { incorrectLetters, isLoser, isWinner };
};

export function HangmanDrawing() {
  const { guessedLetters } = useAppSelector((state) => state.clientSlice.hangman);
  const { incorrectLetters } = useResult();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      if (guessedLetters.includes(key.toLowerCase())) return;
      e.preventDefault();
      dispatch(sethangman({ guessedLetters: [...guessedLetters, key.toLowerCase()] }));
    };

    document.addEventListener('keypress', handler);
    return () => document.removeEventListener('keypress', handler);
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== 'Enter') return;
      e.preventDefault();
      dispatch(sethangman({ guessedLetters: [], word: generateRandomWord() }));
    };
    document.addEventListener('keypress', handler);
    return () => document.removeEventListener('keypress', handler);
  }, []);

  return (
    <div className='relative'>
      {BODY_PARTS.slice(0, incorrectLetters.length)}
      {/* Top Bar and Pillar */}
      <div className='w-[10px] h-[50px] bg-muted-foreground absolute top-0 right-0 rounded-t-md rounded-b-sm' />
      <div className='w-[200px] h-[10px] bg-muted-foreground ml-[120px] rounded-t-md' />
      <div className='w-[10px] h-[400px] bg-muted-foreground ml-[120px]' />
      <div className='w-[250px] h-[10px] bg-muted-foreground rounded-t-md' />
    </div>
  );
}

export function GuessedLetters() {
  const { guessedLetters, word } = useAppSelector((state) => state.clientSlice.hangman);
  const { isLoser, isWinner } = useResult();

  if (!word) return null;

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='flex justify-center gap-2'>
        {word.map((letter, index) => (
          <span key={index} className={cn(`border-b-4 ${guessedLetters.includes(letter) && 'border-b-foreground'}`)}>
            <span
              className={`uppercase font-semibold text-2xl ${guessedLetters.includes(letter) || isLoser ? 'visible' : 'invisible'} ${
                !guessedLetters.includes(letter) && isLoser ? 'text-destructive' : 'text-foreground'
              }`}
            >
              {letter}
            </span>
          </span>
        ))}
      </div>

      {(isWinner || isLoser) && (
        <div className='mt-4 text-center'>
          <p className={`text-xl font-bold ${isWinner ? 'text-green-600' : 'text-red-600'}`}>
            {isWinner ? '🎉 Parabéns! Você venceu!' : '💀 Você perdeu!'}
          </p>
          {isLoser && word && (
            <p className='text-muted-foreground mt-2'>
              A palavra era: <span className='font-bold'>{word.join('').toUpperCase()}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const KEYS = 'abcdefghijklmnopqrstuvwxyz'.split('');

export function Keyboard() {
  const { guessedLetters, word } = useAppSelector((state) => state.clientSlice.hangman);
  const { isLoser, isWinner } = useResult();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const letter = (e.target as HTMLButtonElement).innerText;
    dispatch(sethangman({ guessedLetters: [...guessedLetters, letter.toLowerCase()] }));
  }

  return (
    <Fragment>
      {KEYS.map((letter, index) => (
        <button
          key={index}
          onClick={handleClick}
          type='button'
          className={cn(
            `uppercase border-2 rounded-xl aspect-square font-semibold text-muted-foreground hover:bg-muted duration-200 disabled:opacity-50 disabled:hover:bg-transparent ${
              word?.includes(letter) && guessedLetters.includes(letter) && 'bg-primary text-muted opacity-60 disabled:hover:bg-primary'
            }`
          )}
          disabled={
            (word?.includes(letter) && guessedLetters.includes(letter)) ||
            guessedLetters.includes(letter) ||
            isLoser ||
            isWinner
          }
        >
          {letter}
        </button>
      ))}
    </Fragment>
  );
}
