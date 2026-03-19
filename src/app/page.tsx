import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
          Arrivo &nbsp;
          <code className="font-bold">v1.0 (BETA)</code>
        </p>
      </div>

      <div className="relative flex flex-col place-items-center gap-12 mt-20">
        <div className="text-center">
          <h1 className="text-6xl font-black text-blue-900 mb-4 tracking-tighter">ARRIVO</h1>
          <p className="text-slate-500 font-medium text-lg max-w-md">
            Tu pasaporte a una nueva vida. Trámites de extranjería sin fricciones.
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-8 py-4 bg-blue-900 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/10"
          >
            Entrar al Portal
          </Link>
          <Link
            href="/register"
            className="px-8 py-4 bg-white text-blue-900 border border-slate-200 rounded-2xl font-bold uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            Registrarme
          </Link>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left mt-24 gap-4">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            NIE / TIE <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">Solicitud y renovación automatizada.</p>
        </div>
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Arraigo <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">Social, Laboral y Para la Formación.</p>
        </div>
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Nacionalidad <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">Gestión de expedientes con IA.</p>
        </div>
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Vigilancia <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">Alertas del BOE al minuto.</p>
        </div>
      </div>
    </main>
  );
}
