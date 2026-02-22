import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Martini, 
  Wine, 
  BookOpen, 
  Quote, 
  Mail, 
  X, 
  Menu, 
  CheckCircle2,
  GlassWater
} from 'lucide-react';

// --- Components ---

const Section = ({ children, className = "", id = "" }: { children: ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-20 px-6 md:px-12 lg:px-24 ${className}`}>
    {children}
  </section>
);

const Button = ({ children, primary = false, onClick, href }: { children: ReactNode, primary?: boolean, onClick?: () => void, href?: string }) => {
  const baseClass = "inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded-sm";
  const styles = primary 
    ? "bg-amber-600 text-black hover:bg-amber-500 hover:shadow-[0_0_20px_rgba(217,119,6,0.4)]" 
    : "border border-zinc-700 text-zinc-400 hover:border-amber-600 hover:text-amber-500 bg-transparent";

  if (href) {
    return <a href={href} className={`${baseClass} ${styles}`}>{children}</a>;
  }
  return <button onClick={onClick} className={`${baseClass} ${styles}`}>{children}</button>;
};

const Card = ({ title, description, icon: Icon, delay }: { title: string, description: string, icon: any, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-zinc-900/50 border border-zinc-800 p-8 hover:border-amber-900/50 transition-colors group"
  >
    <div className="mb-6 text-zinc-500 group-hover:text-amber-600 transition-colors">
      <Icon size={32} strokeWidth={1.5} />
    </div>
    <h4 className="text-xl font-bold text-zinc-100 mb-4 font-serif tracking-wide">{title}</h4>
    <p className="text-zinc-400 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: "O mne", href: "#about" },
    { name: "Služby", href: "#services" },
    { name: "Názory", href: "#testimonials" },
    { name: "Kontakt", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold tracking-tighter text-zinc-100 font-serif">
          CYNICKÝ<span className="text-amber-600">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {links.map(link => (
            <a key={link.name} href={link.href} className="text-sm uppercase tracking-widest text-zinc-400 hover:text-amber-500 transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-zinc-100" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950 border-b border-zinc-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {links.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-serif text-zinc-300 hover:text-amber-500"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const validate = () => {
    const newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Meno je povinné (ako sprepitné).";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email je povinný (kam mám poslať faktúru?).";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Tento email vyzerá vymyslene.";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Napíšte mi niečo (nie román).";
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = "To je všetko? Skúste aspoň 10 znakov.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Správa odoslaná. Možno si ju prečítam.");
      setFormData({ name: '', email: '', message: '' });
      setErrors({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-200 font-sans selection:bg-amber-900 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-zinc-800/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-amber-600 font-bold tracking-[0.2em] uppercase text-sm mb-6"
          >
            Master Bartender & Professional Cynic
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-zinc-100 mb-8 leading-[0.9] tracking-tight font-serif"
          >
            Váš večierok bude <br className="hidden md:block" />
            <span className="text-amber-700 italic">tragédia</span>.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Pokiaľ neprídem ja. Vy máte alkohol, ja mám talent a nulovú toleranciu k zlým drinkom. 
            Nesnažte sa to robiť sami, dopadne to zle.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Button primary href="#contact">Zachráňte svoj večer</Button>
            <Button href="#services">Čo vlastne robím?</Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" className="bg-zinc-900/30 border-y border-zinc-900">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-900/20 to-zinc-900/20 rounded-sm blur-lg opacity-0 group-hover:opacity-100 transition duration-700"></div>
            <div className="aspect-[3/4] bg-zinc-900 rounded-sm overflow-hidden relative flex items-center justify-center border border-zinc-800 group-hover:border-amber-900/50 transition-colors duration-500">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950"></div>
              
              {/* Logo Graphic */}
              <div className="relative z-10 border-y-2 border-zinc-700 py-12 px-6 bg-zinc-950/80 backdrop-blur-sm text-center transform group-hover:scale-105 transition-transform duration-700 max-w-[80%]">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-950 px-4 text-amber-600">
                    <Martini size={32} strokeWidth={1.5} />
                 </div>

                 <h2 className="text-5xl md:text-6xl font-serif font-bold text-zinc-100 tracking-tighter leading-none mb-4 mt-2">
                   ROBIN
                 </h2>
                 
                 <div className="h-px w-full bg-zinc-800 mb-4"></div>

                 <h3 className="text-lg md:text-xl font-sans font-bold text-zinc-400 tracking-[0.2em] uppercase leading-tight">
                   Behind<br/>The Bar
                 </h3>
                 
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-zinc-950 px-3 text-zinc-600 text-[10px] uppercase tracking-widest border border-zinc-800">
                    Est. 2009
                 </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-amber-600 text-black p-6 max-w-xs hidden md:block shadow-xl shadow-black/50">
              <p className="font-bold font-serif text-lg italic">"Mojito bez ľadu je zločin proti ľudskosti."</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-4">Kto vám bude nalievať</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-6 font-serif">Nie som študent na brigáde.</h3>
            <div className="space-y-6 text-zinc-400 leading-relaxed">
              <p>
                Volám sa Robin. Miešam drinky dlhšie, než vy viete, čo je to Old Fashioned. 
                Nie som tu na to, aby som počúval vaše životné príbehy, ale aby som vám nalial niečo, 
                po čom budú znesiteľnejšie.
              </p>
              <p>
                Moje remeslo beriem smrteľne vážne. Ak hľadáte niekoho, kto vám do ginu s tonikom 
                hodí dáždniček a prskavku, ste na zlej adrese. Ak chcete zažiť, ako má chutiť 
                skutočný cocktail, možno sa dohodneme.
              </p>
              <ul className="space-y-3 mt-8">
                {[
                  "Hotelová akadémia (papier mám, zvyšok je talent)",
                  "2022: Finalista Pilsner Urquell Master Bartender (viem čapovať, zmierte sa s tým)",
                  "2023: Certifikovaný Výčapný expert (oficiálne potvrdené, že to robím dobre)",
                  "2025: Finalista World Class (svetová špička, žiadna okresná súťaž)",
                  "Vysoká škola života (naučila ma trpezlivosti s vami)"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-zinc-300">
                    <CheckCircle2 className="text-amber-600 mr-3" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Services Section */}
      <Section id="services">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-4 drop-shadow-[0_0_8px_rgba(217,119,6,0.4)]">Portfólio</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-6 font-serif drop-shadow-[0_4px_15px_rgba(180,83,9,0.4)]">Moje Služby</h3>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Ponúkam len to, čo viem robiť dokonale. Ostatné nechávam amatérom.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card 
              title="Prémiový Catering"
              description="Vy dodáte ľudí s pochybným vkusom, ja dodám drinky, na ktoré nezabudnú. Alebo zabudnú, ak si ich dajú veľa. Kompletný servis, vlastný bar, žiadne starosti pre vás."
              icon={Martini}
              delay={0}
            />
            <Card 
              title="Školenia Personálu"
              description="Odnaučím váš personál robiť hanbu vášmu podniku. Naučím ich rozdiel medzi whisky a bourbonom a možno aj to, ako sa usmievať (aj keď to sám nerobím)."
              icon={Wine}
              delay={0.2}
            />
            <Card 
              title="E-booky & Recepty"
              description="Kúpte si môj návod, ak si naivne myslíte, že si doma namiešate dobrý drink sami. Obsahuje tajné triky, ktoré aj tak pokazíte, ale aspoň to skúsite."
              icon={BookOpen}
              delay={0.4}
            />
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section id="testimonials" className="bg-zinc-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-4">Referencie</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-6 font-serif">Čo o mne hovoria</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-zinc-950 p-8 border border-zinc-800 relative"
            >
              <Quote className="absolute top-4 right-4 text-zinc-800" size={48} />
              <p className="text-zinc-300 italic mb-6 relative z-10">
                "Konečne barman, ktorý sa so mnou nehádal, len mi nalial to najlepšie, čo som kedy pil. 
                Aj keď sa na mňa pozeral ako na idiota, keď som si pýtal slamku."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-zinc-800 rounded-full mr-4 overflow-hidden">
                   <img src="https://picsum.photos/seed/user1/100/100" className="w-full h-full object-cover" alt="User" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="text-zinc-100 font-bold text-sm">Náhodný opilec s peniazmi</p>
                  <p className="text-zinc-600 text-xs uppercase tracking-wider">VIP Klient</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-950 p-8 border border-zinc-800 relative"
            >
              <Quote className="absolute top-4 right-4 text-zinc-800" size={48} />
              <p className="text-zinc-300 italic mb-6 relative z-10">
                "Objednali sme si ho na firemnú akciu. Šéf bol nadšený, kolegyne očarené jeho cynizmom 
                a ja som si konečne dal poriadny Negroni. Stálo to za každé euro."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-zinc-800 rounded-full mr-4 overflow-hidden">
                   <img src="https://picsum.photos/seed/user2/100/100" className="w-full h-full object-cover" alt="User" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="text-zinc-100 font-bold text-sm">Jana z HR</p>
                  <p className="text-zinc-600 text-xs uppercase tracking-wider">Korporátna obeť</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <div className="max-w-5xl mx-auto bg-zinc-900 border border-zinc-800 p-8 md:p-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-4">Kontakt</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-6 font-serif">Máte budget? <br/>Máte termín?</h3>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                Píšte, len ak to myslíte vážne. Ak chcete zľavu, choďte do supermarketu pre krabicové víno. 
                Môj kalendár sa plní rýchlejšie, než vaša trpezlivosť.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="text-amber-600 mt-1 mr-4" />
                  <div>
                    <p className="text-zinc-500 text-sm uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:neotravuj@cynickybarman.sk" className="text-xl text-zinc-200 hover:text-amber-500 transition-colors">neotravuj@cynickybarman.sk</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <GlassWater className="text-amber-600 mt-1 mr-4" />
                  <div>
                    <p className="text-zinc-500 text-sm uppercase tracking-wider mb-1">Lokalita</p>
                    <p className="text-xl text-zinc-200">Kdekoľvek, kde zaplatia cestu.</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Vaše Meno</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full bg-zinc-950 border p-4 text-zinc-200 focus:outline-none transition-colors ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-zinc-800 focus:border-amber-600'}`}
                  placeholder="Jozef Mak" 
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full bg-zinc-950 border p-4 text-zinc-200 focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-zinc-800 focus:border-amber-600'}`}
                  placeholder="jozef@priklad.sk" 
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">O čo ide?</label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`w-full bg-zinc-950 border p-4 text-zinc-200 focus:outline-none transition-colors ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-zinc-800 focus:border-amber-600'}`}
                  placeholder="Chcem catering na svadbu, ale nechcem aby to bola nuda..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <Button primary>Odoslať dopyt</Button>
            </form>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-zinc-950 py-12 border-t border-zinc-900 text-center">
        <p className="text-zinc-600 text-sm">
          &copy; {new Date().getFullYear()} Cynický Barman. Všetky práva vyhradené. 
          <span className="block mt-2 text-zinc-700 text-xs">Pite zodpovedne, nechcem vás zbierať zo zeme.</span>
        </p>
      </footer>
    </div>
  );
}
