'use client'

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

export default function Greet() {
  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    invoke<string>('greet', { name: 'Uknown' })
      .then(result => setGreeting(result))
      .catch(console.error)
  }, [])
  const handleOnChangeForGreet = (event: String) => {
    invoke<string>('greet', { name: event })
      .then(result => setGreeting(result))
      .catch(console.error)
  }

  // Necessary because we will have to use Greet as a component later.
  return (
    <>
      <input type="text" className='' onChange={event => handleOnChangeForGreet(event.target.value)}/>
    </>
  );
}
