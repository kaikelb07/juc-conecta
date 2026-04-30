import Image from "next/image"
import { LinkCard } from "@/components/link-card"

const links = [
  {
    title: "TikTok",
    description: "Siga-nos no TikTok",
    url: "https://www.tiktok.com/@jucsms2007?_r=1&_t=ZS-93cjQuiAefK",
    icon: "tiktok",
  },
  {
    title: "Instagram",
    description: "Acompanhe no Instagram",
    url: "https://www.instagram.com/jucjovensunidosemcristo2007/",
    icon: "instagram",
  },
  {
    title: "Facebook",
    description: "Curta nossa página",
    url: "https://www.facebook.com/juc2007/#",
    icon: "facebook",
  },
  {
    title: "Paróquia São Mateus",
    description: "Conheça nossa paróquia",
    url: "https://bio.site/paroquiasaomateus",
    icon: "church",
  },
  {
    title: "Spotify",
    description: "Escute a nossa playlist",
    url: "https://open.spotify.com/playlist/1XLR6xM5aRQV3EeepsTKCS?si=bbbee38c80ca4b62",
    icon: "spotify",
  },
  {
    title: "Nossa Localização",
    description: "Venha nos visitar",
    url: "https://maps.app.goo.gl/UQ4Bi8yHkEj95iRg7",
    icon: "location",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border-4 border-secondary/30 rounded-full" />
        <div className="absolute top-32 right-20 w-48 h-48 border-4 border-secondary/20 rounded-full" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 border-4 border-secondary/25 rounded-full" />
        <div className="absolute -bottom-10 right-10 w-56 h-56 border-4 border-secondary/30 rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 py-12 md:py-16">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <Image
            src="/images/logo.png"
            alt="Juc.Conecta - Marketing Católico"
            width={280}
            height={280}
            className="w-56 h-56 md:w-72 md:h-72 object-contain drop-shadow-lg"
            priority
          />
        </div>

        {/* Tagline */}
        <p className="text-primary font-medium text-lg md:text-xl mb-10 text-center text-balance">
          Jovens Unidos em Cristo
        </p>

        {/* Links */}
        <div className="w-full max-w-md space-y-4">
          {links.map((link, index) => (
            <LinkCard
              key={link.title}
              title={link.title}
              description={link.description}
              url={link.url}
              icon={link.icon}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-primary/70 text-sm">
            © {new Date().getFullYear()} Juc.Conecta - Marketing Católico
          </p>
        </footer>
      </div>
    </main>
  )
}
