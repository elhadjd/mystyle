import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        Página não encontrada
      </h1>
      <p className="mt-4 max-w-md text-muted">
        Esse caminho não existe no MyStyle. Volte ao início ou agende seu horário.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Ir para o início
        </Link>
        <Link href="/agendar" className="btn btn-secondary">
          Agendar
        </Link>
      </div>
    </div>
  );
}
