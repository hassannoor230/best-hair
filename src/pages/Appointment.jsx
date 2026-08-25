import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, CreditCard, Landmark, LockKeyhole, Scissors, UserRound } from "lucide-react";
import { apiClient } from "../lib/apiClient";

const services = [
  { id: "haircut", name: "Classic Haircut", price: 500, duration: "30 min", detail: "A tailored cut with a polished finish." },
  { id: "beard", name: "Beard Grooming", price: 300, duration: "20 min", detail: "Expert shaping, trim, and clean lines." },
  { id: "styling", name: "Hair Styling", price: 700, duration: "40 min", detail: "A refined look for any occasion." },
  { id: "treatment", name: "Hair Treatment", price: 1000, duration: "45 min", detail: "Deep conditioning and scalp care." },
];

const steps = ["Service", "Date", "Time", "Details", "Confirm"];
const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"];

const Appointment = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ service: "", date: "", time: "", name: "", phone: "", email: "", note: "", payment: "cash" });
  const selectedService = useMemo(() => services.find((service) => service.id === form.service), [form.service]);
  const today = new Date().toISOString().split("T")[0];

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const canContinue = () => {
    if (step === 1) return Boolean(form.service);
    if (step === 2) return Boolean(form.date);
    if (step === 3) return Boolean(form.time);
    if (step === 4) return Boolean(form.name.trim() && form.phone.trim());
    return true;
  };
  const continueBooking = () => { if (canContinue()) setStep((current) => Math.min(current + 1, 5)); };

  const handleConfirmBooking = async () => {
    setError("");
    setLoading(true);
    try {
      const payload = {
        customerName: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        service: selectedService?.name || "",
        preferredDate: new Date(form.date).toISOString(),
        preferredTime: form.time,
        message: form.note.trim(),
      };
      await apiClient.post("/appointments", payload);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <section className="min-h-[75vh] bg-background flex items-center py-20 px-5">
      <div className="luxury-card max-w-2xl w-full mx-auto text-center p-10 md:p-16">
        <div className="w-16 h-16 bg-accent text-primary rounded-full mx-auto flex items-center justify-center mb-7"><Check className="w-8 h-8" /></div>
        <p className="eyebrow mb-4">Booking request received</p><h1 className="section-title">Your chair is reserved.</h1>
        <p className="text-muted text-lg leading-relaxed mb-8">Thank you, {form.name}. We will contact you shortly to confirm your appointment for {selectedService?.name}.</p>
        <Link to="/" className="btn-primary">Return home</Link>
      </div>
    </section>
  );

  return (
    <div className="bg-background min-h-screen py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Link to="/services" className="inline-flex items-center text-primary hover:text-accent transition-colors text-sm font-semibold mb-10"><ArrowLeft className="w-4 h-4 mr-2" /> Back to services</Link>
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">
          <main className="bg-white border border-[#e8e0d5] p-6 sm:p-10 md:p-12">
            <p className="eyebrow mb-4">Reserve your chair</p><h1 className="font-heading text-4xl md:text-5xl text-primary mb-8">A better appointment.</h1>
            <div className="mb-10"><div className="flex justify-between items-center mb-3"><span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Step {step} of 5</span><span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{steps[step - 1]}</span></div><div className="grid grid-cols-5 gap-2">{steps.map((item, index) => <div key={item} className={`h-1 ${index < step ? "bg-accent" : "bg-[#e8e0d5]"}`} />)}</div><div className="hidden sm:grid grid-cols-5 mt-3 text-[10px] uppercase tracking-[0.12em] text-muted">{steps.map((item, index) => <span key={item} className={index + 1 === step ? "text-primary font-bold" : ""}>{item}</span>)}</div></div>

            {step === 1 && <section><h2 className="font-heading text-3xl text-primary mb-2">Choose your service</h2><p className="text-muted mb-7">Select the experience you would like to reserve.</p><div className="grid sm:grid-cols-2 gap-4">{services.map((service) => <button type="button" key={service.id} onClick={() => update("service", service.id)} className={`text-left p-6 border transition-all ${form.service === service.id ? "border-accent bg-[#fbf7ef] shadow-[0_8px_24px_rgba(43,34,25,.08)]" : "border-[#e8e0d5] hover:border-accent/60"}`}><div className="flex justify-between gap-3"><Scissors className="w-5 h-5 text-accent" /><span className={`w-5 h-5 rounded-full border flex items-center justify-center ${form.service === service.id ? "border-accent bg-accent" : "border-[#c9beb0]"}`}>{form.service === service.id && <Check className="w-3 h-3 text-primary" />}</span></div><h3 className="font-heading text-xl text-primary mt-8 mb-2">{service.name}</h3><p className="text-sm text-muted leading-relaxed mb-5">{service.detail}</p><p className="text-accent font-bold">Rs. {service.price} <span className="text-muted font-normal text-xs ml-2">{service.duration}</span></p></button>)}</div></section>}
            {step === 2 && <section><h2 className="font-heading text-3xl text-primary mb-2">Choose a date</h2><p className="text-muted mb-7">We are open every day from 10:00 AM to 1:00 AM.</p><label className="block max-w-md"><span className="text-sm font-semibold text-primary mb-2 block">Preferred date</span><div className="relative"><CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent pointer-events-none" /><input value={form.date} min={today} onChange={(event) => update("date", event.target.value)} type="date" className="w-full border border-[#ded5c9] px-12 py-4 text-primary focus:outline-none focus:border-accent" /></div></label></section>}
            {step === 3 && <section><h2 className="font-heading text-3xl text-primary mb-2">Choose a time</h2><p className="text-muted mb-7">Available times for {form.date || "your selected date"}.</p><div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{timeSlots.map((time) => <button type="button" key={time} onClick={() => update("time", time)} className={`py-4 border text-sm font-semibold transition-colors ${form.time === time ? "bg-primary text-white border-primary" : "border-[#ded5c9] text-primary hover:border-accent"}`}><Clock3 className="inline-block w-4 h-4 mr-2 text-accent" />{time}</button>)}</div></section>}
            {step === 4 && <section><h2 className="font-heading text-3xl text-primary mb-2">Your details</h2><p className="text-muted mb-7">So we can confirm your appointment with you.</p><div className="grid sm:grid-cols-2 gap-5"><label className="sm:col-span-2"><span className="text-sm font-semibold text-primary mb-2 block">Full name *</span><input value={form.name} onChange={(event) => update("name", event.target.value)} className="w-full border border-[#ded5c9] px-4 py-3.5 focus:outline-none focus:border-accent" placeholder="Your full name" /></label><label><span className="text-sm font-semibold text-primary mb-2 block">Phone number *</span><input value={form.phone} onChange={(event) => update("phone", event.target.value)} type="tel" className="w-full border border-[#ded5c9] px-4 py-3.5 focus:outline-none focus:border-accent" placeholder="03XX XXX XXXX" /></label><label><span className="text-sm font-semibold text-primary mb-2 block">Email address</span><input value={form.email} onChange={(event) => update("email", event.target.value)} type="email" className="w-full border border-[#ded5c9] px-4 py-3.5 focus:outline-none focus:border-accent" placeholder="you@example.com" /></label><label className="sm:col-span-2"><span className="text-sm font-semibold text-primary mb-2 block">Special request <span className="text-muted font-normal">(optional)</span></span><textarea value={form.note} onChange={(event) => update("note", event.target.value)} rows="4" className="w-full border border-[#ded5c9] px-4 py-3.5 focus:outline-none focus:border-accent resize-none" placeholder="Tell us anything that will help us prepare for your visit." /></label></div></section>}
            {step === 5 && <section><h2 className="font-heading text-3xl text-primary mb-2">Confirm your booking</h2><p className="text-muted mb-7">Choose how you would like to pay at the salon.</p><div className="grid sm:grid-cols-2 gap-4 mb-8">{[["cash", Landmark, "Pay at salon", "Cash payment when you arrive."], ["card", CreditCard, "Card payment", "Debit or credit card at the salon."]].map(([id, Icon, title, text]) => <button type="button" key={id} onClick={() => update("payment", id)} className={`text-left p-6 border ${form.payment === id ? "border-accent bg-[#fbf7ef]" : "border-[#e8e0d5]"}`}><Icon className="w-6 h-6 text-accent mb-7" /><h3 className="font-heading text-xl text-primary mb-2">{title}</h3><p className="text-sm text-muted">{text}</p></button>)}</div>{error && <p className="text-red-500 text-sm mb-4">{error}</p>}<div className="flex items-center gap-3 text-sm text-muted"><LockKeyhole className="w-4 h-4 text-accent" />Your request is reviewed before any payment is taken.</div></section>}

            <div className="flex items-center justify-between gap-4 border-t border-[#e8e0d5] mt-10 pt-7"><button type="button" onClick={() => setStep((current) => Math.max(current - 1, 1))} disabled={step === 1} className="text-sm font-semibold text-primary disabled:opacity-30">Back</button>{step < 5 ? <button type="button" onClick={continueBooking} disabled={!canContinue()} className="btn-primary disabled:opacity-40">Continue <ArrowRight className="w-4 h-4 ml-2" /></button> : <button type="button" onClick={handleConfirmBooking} disabled={loading} className="btn-primary disabled:opacity-40">{loading ? "Booking..." : "Confirm booking"}{!loading && <Check className="w-4 h-4 ml-2" />}</button>}</div>
          </main>
          <aside className="bg-primary text-white p-7 sm:p-8 lg:sticky lg:top-24"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-6">Your appointment</p>{selectedService ? <><h2 className="font-heading text-3xl mb-2">{selectedService.name}</h2><p className="text-white/60 text-sm mb-7">{selectedService.duration} &bull; Rs. {selectedService.price}</p></> : <p className="text-white/60 leading-relaxed mb-8">Your selected service and appointment details will appear here.</p>}<div className="space-y-5 border-t border-white/15 pt-6 text-sm">{[["Date", form.date], ["Time", form.time], ["Guest", form.name], ["Payment", form.payment === "cash" ? "Pay at salon" : "Card payment"]].map(([label, value]) => <div key={label} className="flex justify-between gap-4"><span className="text-white/50">{label}</span><span className="text-right font-medium">{value || "—"}</span></div>)}</div><div className="border-t border-white/15 mt-7 pt-6 flex justify-between items-center"><span className="text-white/60 text-sm">Total</span><span className="font-heading text-3xl text-accent">Rs. {selectedService?.price || "—"}</span></div></aside>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
