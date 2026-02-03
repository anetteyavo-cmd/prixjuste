"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones, Building2, CheckCircle, Sparkles } from "lucide-react";

const contactMethods = [
  { icon: MessageCircle, title: "WhatsApp", value: "+225 07 00 00 00 00", link: "https://wa.me/2250700000000", color: "bg-green-50 text-green-600" },
  { icon: Mail, title: "Email", value: "contact@prixjuste.ci", link: "mailto:contact@prixjuste.ci", color: "bg-blue-50 text-blue-600" },
  { icon: Phone, title: "Téléphone", value: "+225 27 00 00 00 00", link: "tel:+2252700000000", color: "bg-purple-50 text-purple-600" },
  { icon: MapPin, title: "Adresse", value: "Cocody, Abidjan, CI", link: "#map", color: "bg-red-50 text-red-600" },
];

const faqs = [
  { q: "Quel est le délai de réponse ?", a: "Nous répondons généralement sous 24h ouvrées." },
  { q: "Puis-je visiter vos bureaux ?", a: "Oui, sur rendez-vous du lundi au vendredi." },
  { q: "Comment devenir partenaire ?", a: "Contactez-nous via le formulaire en sélectionnant 'Partenariat'." },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8">
            <ArrowLeft size={20} /> Retour
          </Link>
          <Badge className="mb-4"><Sparkles size={14} className="mr-1" /> Support</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Une question, une suggestion ou besoin d'aide ? Notre équipe est là pour vous.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Methods */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contactMethods.map((method, i) => (
            <a key={i} href={method.link} target={method.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
              <Card hover className="text-center py-6">
                <div className={`w-14 h-14 mx-auto rounded-2xl ${method.color} flex items-center justify-center mb-4`}>
                  <method.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900">{method.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{method.value}</p>
              </Card>
            </a>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <Card className="p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Message envoyé !</h2>
                  <p className="text-gray-600 mb-6">Nous vous répondrons dans les plus brefs délais.</p>
                  <Button onClick={() => { setIsSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); }}>
                    Envoyer un autre message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Envoyez-nous un message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input label="Nom complet *" name="name" placeholder="Jean Kouadio" value={formData.name} onChange={handleChange} required />
                      <Input label="Email *" name="email" type="email" placeholder="jean@exemple.com" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input label="Téléphone" name="phone" type="tel" placeholder="+225 07 00 00 00 00" value={formData.phone} onChange={handleChange} />
                      <Select label="Sujet *" name="subject" value={formData.subject} onChange={handleChange} required options={[
                        { value: "", label: "Sélectionnez un sujet" },
                        { value: "general", label: "Question générale" },
                        { value: "support", label: "Support technique" },
                        { value: "billing", label: "Facturation" },
                        { value: "partnership", label: "Partenariat" },
                        { value: "press", label: "Presse / Média" },
                        { value: "other", label: "Autre" },
                      ]} />
                    </div>
                    <Textarea label="Message *" name="message" placeholder="Décrivez votre demande en détail..." value={formData.message} onChange={handleChange} required />
                    <Button type="submit" fullWidth size="lg" isLoading={isSubmitting} rightIcon={<Send size={18} />}>
                      Envoyer le message
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hours */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0F2A44]/10 text-[#0F2A44] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900">Horaires</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Lundi - Vendredi</span><span className="font-medium">8h - 18h</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Samedi</span><span className="font-medium">9h - 13h</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Dimanche</span><span className="text-gray-400">Fermé</span></div>
              </div>
            </Card>

            {/* WhatsApp CTA */}
            <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-8 h-8" />
                <div>
                  <h3 className="font-semibold">Besoin d'aide rapide ?</h3>
                  <p className="text-sm text-white/80">Réponse en moins de 5 min</p>
                </div>
              </div>
              <a href="https://wa.me/2250700000000" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-white text-green-600 hover:bg-white/90">
                  Discuter sur WhatsApp
                </Button>
              </a>
            </Card>

            {/* FAQ */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Questions fréquentes</h3>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i}>
                    <p className="font-medium text-gray-900 text-sm">{faq.q}</p>
                    <p className="text-sm text-gray-500 mt-1">{faq.a}</p>
                  </div>
                ))}
              </div>
              <Link href="/help" className="block mt-4">
                <Button variant="outline" fullWidth size="sm">Voir toutes les FAQ</Button>
              </Link>
            </Card>
          </div>
        </div>

        {/* Map */}
        <div id="map" className="mt-12">
          <Card className="overflow-hidden">
            <div className="aspect-[21/9] bg-gray-200 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.5234567890123!2d-3.9876543210987654!3d5.345678901234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjAnNDQuNCJOIDPCsDU5JzE1LjYiVw!5e0!3m2!1sfr!2sci!4v1234567890123!5m2!1sfr!2sci"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[#0F2A44] mx-auto mb-2" />
                  <p className="font-medium text-gray-900">Cocody, Abidjan</p>
                  <p className="text-sm text-gray-500">Côte d'Ivoire</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
