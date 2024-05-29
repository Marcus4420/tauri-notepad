'use client'
import { useEffect, useRef, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri'

export default function Home() {
  const [writtenCode, setWrittenCode] = useState('');
  const [compiledCode, setCompiledCode] = useState('');
  useEffect(() => {
    console.log(writtenCode);
  }, [writtenCode]);


  const handleSave = () => {
    invoke<string>('save_document', { text: writtenCode })
    .then(result => console.log(result))
    .catch(console.error)
  }

  const handleRun = () => {
    invoke<string>('run_javascript', { text: writtenCode })
    .then(result => setCompiledCode(result))
    .catch(console.error)
  }


  return (
    <main className="h-screen bg-stone-900 px-4">
      <nav className="flex">
        <div className="flex justify-between text-white p-4">
          <button className="hover:bg-stone-800 p-2">New</button>
          <button className="hover:bg-stone-800 p-2">Open</button>
          <button className="hover:bg-stone-800 p-2" onClick={handleSave}>Save</button>
          <button className="hover:bg-stone-800 p-2" onClick={handleRun}>Run</button>
        </div>
      </nav>
      <section id="main-content" className="grid gap-4 grid-cols-3 grid-rows-1 bg-stone-900 text-white m-0 p-0 h-64">
        <section id="files" className="row-span-3">
          <ul className="list-none p-0 m-0">
            <li className="hover:bg-stone-800 p-2">File 1</li>
            <li className="hover:bg-stone-800 p-2">File 2</li>
          </ul>
        </section>
          <textarea className="border-2 border-black bg-black text-white resize-none row-span-3 col-span-2" value={writtenCode}
      onChange={e => setWrittenCode(e.target.value)} />
      </section>
      <section id="console">
        <textarea value={compiledCode} className="border-2 border-black bg-black text-white resize-none h-32 w-full mt-12" disabled/>
      </section>
    </main>
  )
}
