import { Reveal } from "@/components/reveal"
import { Star } from "lucide-react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

const FALLBACK_MEDIA: Record<string, { video?: string; poster: string }> = {
  "Miss Sofi": { video: "/miss-sofi.mp4", poster: "/images/miss-sofi-thumb.png" },
  "Miss Ruth": { video: "/miss-ruth.mp4", poster: "/images/miss-ruth-thumb.png" },
  "Miss Mica": { poster: "/images/miss-mica-thumb.png" },
  "Miss Reni": { poster: "/images/miss-reni-thumb.png" },
}

export async function TeachersSection() {
  const { data } = await supabase
    .from("teachers")
    .select("name, bio, image_url, video_url")
    .eq("active", true)
    .eq("role", "teacher")
    .order("created_at", { ascending: true })

  const teachers = (data ?? []).map((t) => {
    const fallback = FALLBACK_MEDIA[t.name as string] ?? { poster: "" }
    return {
      name: t.name as string,
      bio: (t.bio as string) ?? "",
      video: (t.video_url as string | null) ?? fallback.video,
      poster: (t.image_url as string | null) ?? fallback.poster,
    }
  })

  return (
    <section id="profes" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">
              Nuestro equipo
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground text-balance">
              Conocé a nuestros profes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Docentes bilingües certificadas, apasionadas por enseñar a niños y adolescentes.
            </p>
          </div>
        </Reveal>

        {/* Teachers grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {teachers.map((teacher, index) => (
            <Reveal key={teacher.name} delay={index * 100}>
              <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                {teacher.video ? (
                  <div className="bg-black">
                    <video
                      className="w-full h-auto block"
                      controls
                      preload="metadata"
                      playsInline
                      poster={teacher.poster}
                    >
                      <source src={teacher.video} type="video/mp4" />
                    </video>
                  </div>
                ) : teacher.poster ? (
                  <div className="relative w-full aspect-square">
                    <Image
                      src={teacher.poster}
                      alt={teacher.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-accent/20 flex items-center justify-center">
                    <Star className="w-12 h-12 text-accent-foreground/20" fill="currentColor" />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent">
                      <Star className="w-4 h-4 text-accent-foreground" fill="currentColor" />
                    </div>
                    <h3 className="text-xl font-extrabold text-foreground">{teacher.name}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">{teacher.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
