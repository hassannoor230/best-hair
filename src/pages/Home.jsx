import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Scissors, Sparkles, Clock3, ShieldCheck, Gem, MapPin, CalendarDays, Quote, Star, ChevronRight } from "lucide-react";

const services = [
  { title: "Classic Haircut", text: "A timeless cut, tailored precisely to your features and style.", price: "Rs. 500", time: "30 min", Icon: Scissors },
  { title: "Beard Grooming", text: "Clean lines and expert shaping for a sharp, confident finish.", price: "Rs. 300", time: "20 min", Icon: Sparkles },
  { title: "Hair Styling", text: "Polished styling for occasions that deserve your best look.", price: "Rs. 700", time: "40 min", Icon: Clock3 },
];

const Home = () => (
  <div>
    <section className="relative min-h-[720px] h-[calc(100vh-104px)] flex items-center overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=2200&q=90')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/20" />
      <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-10 text-white">
        <p className="eyebrow mb-7">Crafted for the modern gentleman</p>
        <h1 className="font-heading font-semibold text-6xl md:text-8xl max-w-3xl leading-[0.93] mb-7">Leave ordinary<br /><em className="text-accent">behind.</em></h1>
        <p className="text-base md:text-lg text-white/75 mb-10 max-w-xl leading-relaxed">Precision cuts and exceptional grooming in a space designed for your best self.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/appointment" className="btn-primary">Reserve your chair <ArrowUpRight className="w-4 h-4 ml-2" /></Link>
          <Link to="/services" className="btn-secondary border-white/60 text-white hover:bg-white">Explore services</Link>
        </div>
      </div>
    </section>
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12"><div><p className="eyebrow mb-4">The signature edit</p><h2 className="section-title !mb-0">Grooming, refined.</h2></div><Link to="/services" className="text-primary font-semibold border-b border-accent pb-2 hover:text-accent transition-colors">View all services</Link></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ title, text, price, time, Icon }) => <div key={title} className="luxury-card p-8 hover:-translate-y-1 transition-transform duration-300"><Icon className="w-5 h-5 text-accent mb-8" /><h3 className="font-heading font-semibold text-2xl text-primary mb-3">{title}</h3><p className="text-muted mb-7 leading-relaxed">{text}</p><span className="text-accent font-bold">{price}</span><span className="text-sm text-muted ml-3">{time}</span></div>)}
        </div>
      </div>
    </section>
    <section className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
        <div className="relative min-h-[460px]">
          <img src="https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=1200&q=85" alt="Luxury salon interior" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute -bottom-7 -right-3 sm:-right-7 bg-primary text-white p-7 sm:p-9 max-w-[245px]">
            <p className="font-heading text-4xl text-accent mb-2">10 AM</p><p className="text-xs uppercase tracking-[0.15em] text-white/70">to 1 AM<br />Open every day</p>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-5">The Best Hair standard</p>
          <h2 className="section-title">Made for the moments that matter.</h2>
          <p className="text-muted leading-relaxed text-lg mb-9">Every appointment is time set aside for you. From the consultation to the finishing detail, our team combines technique, quality products, and genuine attention.</p>
          <div className="space-y-6">
            <div className="flex gap-5"><ShieldCheck className="w-6 h-6 text-accent shrink-0 mt-1" /><div><h3 className="font-heading text-xl text-primary mb-1">Precision, always</h3><p className="text-muted text-sm leading-relaxed">A considered consultation and a result that is distinctly yours.</p></div></div>
            <div className="flex gap-5"><Gem className="w-6 h-6 text-accent shrink-0 mt-1" /><div><h3 className="font-heading text-xl text-primary mb-1">An elevated experience</h3><p className="text-muted text-sm leading-relaxed">A calm, polished space where quality is felt in every detail.</p></div></div>
          </div>
        </div>
      </div>
    </section>
    <section className="py-24 bg-[#ebe4da]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16"><p className="eyebrow mb-4">Your appointment</p><h2 className="section-title">Simple from start to finish.</h2></div>
        <div className="grid md:grid-cols-3 gap-10 md:gap-0">
          {[
            ["01", CalendarDays, "Choose your service", "Pick the cut, grooming, or styling session you need."],
            ["02", Clock3, "Select your time", "Tell us the day and time that works best for you."],
            ["03", MapPin, "Enjoy the experience", "We will confirm your visit and have your chair ready."],
          ].map(([number, Icon, title, text], index) => <div key={number} className={`relative px-2 md:px-10 ${index < 2 ? "md:border-r md:border-primary/15" : ""}`}><p className="font-heading text-5xl text-accent/70 mb-7">{number}</p><Icon className="w-5 h-5 text-primary mb-5" /><h3 className="font-heading text-2xl text-primary mb-3">{title}</h3><p className="text-muted leading-relaxed">{text}</p></div>)}
        </div>
      </div>
    </section>
    <section className="bg-primary py-24 md:py-32 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 grid lg:grid-cols-[1.1fr_.9fr] gap-14 items-center">
        <div>
          <p className="eyebrow mb-5">A better kind of routine</p>
          <h2 className="font-heading text-5xl md:text-6xl leading-[1.05] mb-7">The art of looking <em className="text-accent">effortless.</em></h2>
          <p className="text-white/65 text-lg leading-relaxed max-w-xl mb-9">Great grooming should feel like a ritual, not a chore. Settle in, switch off, and leave feeling unmistakably put together.</p>
          <Link to="/about" className="inline-flex items-center text-accent font-semibold uppercase text-xs tracking-[0.16em] border-b border-accent pb-2 hover:text-white hover:border-white transition-colors">Our story <ChevronRight className="w-4 h-4 ml-2" /></Link>
        </div>
        <div className="grid grid-cols-2 border border-white/15">
          <div className="p-7 sm:p-10 border-r border-b border-white/15"><p className="font-heading text-5xl text-accent mb-2">7</p><p className="text-[11px] uppercase tracking-[0.16em] text-white/60 leading-relaxed">Days open<br />each week</p></div>
          <div className="p-7 sm:p-10 border-b border-white/15"><p className="font-heading text-5xl text-accent mb-2">01</p><p className="text-[11px] uppercase tracking-[0.16em] text-white/60 leading-relaxed">Focus on you,<br />every visit</p></div>
          <div className="p-7 sm:p-10 border-r border-white/15"><p className="font-heading text-5xl text-accent mb-2">∞</p><p className="text-[11px] uppercase tracking-[0.16em] text-white/60 leading-relaxed">Personal style,<br />always evolving</p></div>
          <div className="p-7 sm:p-10"><p className="font-heading text-5xl text-accent mb-2">100%</p><p className="text-[11px] uppercase tracking-[0.16em] text-white/60 leading-relaxed">Attention to<br />the details</p></div>
        </div>
      </div>
    </section>
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-12 lg:gap-24 items-start">
          <div><p className="eyebrow mb-5">Words from our chair</p><h2 className="section-title">Confidence, in their words.</h2><div className="flex gap-1 mt-7">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 text-accent fill-accent" />)}</div><p className="text-sm text-muted mt-3">Trusted by clients across Gujranwala.</p></div>
          <div className="luxury-card p-9 md:p-12 relative"><Quote className="w-10 h-10 text-accent/50 mb-7" /><blockquote className="font-heading text-3xl md:text-4xl leading-[1.28] text-primary mb-8">“The attention to detail is on another level. I walked out looking sharp and feeling genuinely looked after.”</blockquote><div className="flex items-center justify-between border-t border-[#e8e0d5] pt-6"><div><p className="font-semibold text-primary">Ali R.</p><p className="text-xs uppercase tracking-[0.13em] text-muted mt-1">Regular client</p></div><p className="font-heading text-2xl text-accent">BH</p></div></div>
        </div>
      </div>
    </section>
    <section className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10"><div className="flex items-end justify-between mb-10"><div><p className="eyebrow mb-4">The lookbook</p><h2 className="section-title !mb-0">Details in focus.</h2></div><Link to="/gallery" className="hidden sm:inline-flex text-primary font-semibold border-b border-accent pb-2">View gallery</Link></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {["photo-1599351431202-1e0f0137899a", "photo-1521119989659-a83eee488004", "photo-1503951914875-452162b0f3f1", "photo-1585747860715-2ba37e788b70"].map((id, i) => <div key={id} className={`overflow-hidden ${i === 1 ? "mt-8" : i === 2 ? "mt-4" : ""}`}><img src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=85`} alt="Best Hair salon lookbook" className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700" /></div>)}
        </div>
      </div>
    </section>
    <section className="py-24 bg-accent text-primary text-center"><div className="max-w-2xl mx-auto px-5"><p className="text-xs uppercase tracking-[0.22em] font-bold mb-5">Your chair is waiting</p><h2 className="font-heading text-5xl md:text-6xl leading-[1.05] mb-7">Ready for your best look?</h2><p className="text-primary/75 mb-9 text-lg">Reserve a time that works for you and let the details take care of themselves.</p><Link to="/appointment" className="inline-flex items-center bg-primary text-white px-7 py-4 uppercase text-xs tracking-[0.16em] font-semibold hover:bg-secondary transition-colors">Book an appointment <ArrowUpRight className="w-4 h-4 ml-2" /></Link></div></section>
    <section className="py-24 bg-primary text-white text-center"><div className="max-w-2xl mx-auto px-5"><p className="eyebrow mb-4">Find your ritual</p><h2 className="font-heading text-5xl md:text-6xl mb-10">Visit the salon.</h2><p className="text-white/70 mb-2">Plot 480 B, Block B, Satellite Town, Gujranwala, Punjab, Pakistan</p><a href="tel:+923006442344" className="block text-accent text-xl font-semibold mb-3">+92 300 6442344</a><p className="text-white/60">Open daily: 10:00 AM – 1:00 AM</p></div></section>
  </div>
);

export default Home;
