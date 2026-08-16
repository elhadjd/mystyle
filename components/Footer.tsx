import Link from "next/link";
import Image from "next/image";
import { brand, navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[rgba(28,16,12,0.04)]">
      <div className="container-page section-pad grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/logo/mystyle.svg"
            alt="MyStyle"
            width={160}
            height={42}
            className="mb-4 h-10 w-auto"
          />
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-muted">
            {brand.tagline}. Um espaço para celebrar tranças africanas, cuidados
            capilares e a beleza de cada mulher.
          </p>
          <a
            href={`https://wa.me/${brand.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-copper mt-6"
          >
            WhatsApp
          </a>
        </div>

        <div>
          <h2 className="font-display mb-4 text-lg font-semibold">Navegação</h2>
          <ul className="space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted transition hover:text-espresso">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/agendar" className="text-muted transition hover:text-espresso">
                Agendar
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display mb-4 text-lg font-semibold">Visite</h2>
          <p className="text-muted">{brand.address}</p>
          <p className="mt-3 text-muted">{brand.phone}</p>
          <p className="text-muted">{brand.email}</p>
          <p className="mt-3 text-muted">{brand.instagram}</p>
          <ul className="mt-4 space-y-1.5 text-sm text-muted">
            {brand.hours.map((h) => (
              <li key={h.day}>
                <span className="text-espresso/80">{h.day}:</span> {h.time}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="container-page flex flex-col gap-2 py-5 text-sm text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} MyStyle. Todos os direitos reservados.</p>
          <p>Beleza com identidade · São Paulo</p>
        </div>
      </div>
    </footer>
  );
}
