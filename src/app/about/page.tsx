// src/app/about/page.tsx
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const team = [
  { name: 'Marco Conti', role: 'Executive Chef', initials: 'MC', bio: '25 years in Michelin-starred kitchens across Paris, Tokyo & New York.' },
  { name: 'Elena Larsson', role: 'Pastry Chef', initials: 'EL', bio: 'World Pastry Champion 2019. Creates desserts that are pure theatre.' },
  { name: 'Raj Bhatia', role: 'Head Sommelier', initials: 'RB', bio: 'MW certified. Curates a cellar of 800+ labels from 32 countries.' },
  { name: 'Aisha Santos', role: 'Restaurant Manager', initials: 'AS', bio: 'Brings warmth and precision to every guest interaction since 2015.' },
]

const stats = [
  { value: '12+', label: 'Years of Excellence' },
  { value: '3', label: 'Michelin Stars' },
  { value: '48', label: 'Team Members' },
  { value: '12K+', label: 'Guests Served' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* Hero */}
        <section className="min-h-[60vh] flex items-center bg-savoria-bg2 border-b border-gold/10 px-4 sm:px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-xs tracking-widest uppercase text-gold mb-4">Our Story</p>
            <h1 className="font-display text-5xl sm:text-6xl font-bold leading-tight mb-6">
              Passion on Every <em className="text-gold not-italic">Plate</em>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl">
              Since 2012, Savoria has been a sanctuary for food lovers — a place where art, culture, and gastronomy converge into a singular, unforgettable experience.
            </p>
          </div>
        </section>

        {/* Mission + Stats */}
        <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-widest uppercase text-gold mb-3">Our Mission</p>
              <h2 className="font-display text-4xl font-bold mb-5">Redefining Fine Dining</h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent mb-6" />
              <p className="text-white/60 leading-relaxed mb-5">
                We believe that food is the most intimate form of art. Every dish we create is a conversation between the chef and the guest — a story told through texture, flavor, and presentation.
              </p>
              <p className="text-white/60 leading-relaxed">
                Our commitment to sustainability means working exclusively with local farmers, minimizing waste, and crafting menus that celebrate the season.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map(s => (
                <div key={s.label} className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-6 text-center hover:border-gold/25 transition-colors">
                  <div className="font-display text-4xl font-bold text-gold mb-2">{s.value}</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-4 sm:px-6 bg-savoria-bg2 border-y border-gold/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs tracking-widest uppercase text-gold mb-3">Meet the Team</p>
              <h2 className="font-display text-4xl font-bold">The Minds Behind the Magic</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map(member => (
                <div key={member.name} className="bg-savoria-bg3 border border-gold/10 rounded-2xl p-6 text-center hover:border-gold/25 hover:-translate-y-1 transition-all">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-light mx-auto mb-4 flex items-center justify-center text-black font-display text-xl font-bold">
                    {member.initials}
                  </div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-gold text-xs mb-3">{member.role}</p>
                  <p className="text-white/40 text-xs leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
