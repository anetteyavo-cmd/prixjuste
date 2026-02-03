"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Mail, Lock, User, AlertCircle, CheckCircle, Phone } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, user, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Rediriger si déjà connecté
  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Veuillez remplir tous les champs obligatoires");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signUp(formData.email, formData.password, formData.fullName);
      
      if (error) {
        if (error.message.includes("already registered")) {
          setError("Cet email est déjà utilisé");
        } else {
          setError(error.message);
        }
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      // Note: Supabase envoie un email de confirmation par défaut
      // L'utilisateur doit confirmer son email avant de se connecter
      
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F2A44] via-[#1F3A5F] to-[#0F2A44]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F2A44] via-[#1F3A5F] to-[#0F2A44] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-[#0F2A44] font-bold text-2xl">P</span>
          </div>
          <span className="text-2xl font-bold text-white">PrixJuste</span>
        </Link>

        <Card className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Créer un compte</h1>
            <p className="text-gray-500 mt-2">Rejoignez PrixJuste gratuitement</p>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Message de succès */}
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Compte créé !</h2>
              <p className="text-gray-600 mb-6">
                Un email de confirmation a été envoyé à <strong>{formData.email}</strong>. 
                Veuillez cliquer sur le lien dans l email pour activer votre compte.
              </p>
              <Link href="/auth/sign-in">
                <Button fullWidth>Aller à la connexion</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Jean Kouadio"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#0F2A44] focus:ring-2 focus:ring-[#0F2A44]/20 transition-all"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="jean@exemple.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#0F2A44] focus:ring-2 focus:ring-[#0F2A44]/20 transition-all"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone (optionnel)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+225 07 00 00 00 00"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#0F2A44] focus:ring-2 focus:ring-[#0F2A44]/20 transition-all"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Minimum 6 caractères"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#0F2A44] focus:ring-2 focus:ring-[#0F2A44]/20 transition-all"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Répétez le mot de passe"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#0F2A44] focus:ring-2 focus:ring-[#0F2A44]/20 transition-all"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  id="terms"
                  required
                  className="w-4 h-4 mt-1 rounded border-gray-300 text-[#0F2A44] focus:ring-[#0F2A44]" 
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  J accepte les <Link href="/terms" className="text-[#0F2A44] hover:underline">conditions d utilisation</Link> et la <Link href="/privacy" className="text-[#0F2A44] hover:underline">politique de confidentialité</Link>
                </label>
              </div>

              <Button 
                type="submit" 
                fullWidth 
                size="lg" 
                isLoading={isLoading}
                rightIcon={!isLoading ? <ArrowRight size={18} /> : undefined}
              >
                {isLoading ? "Création..." : "Créer mon compte"}
              </Button>
            </form>
          )}

          {!success && (
            <p className="mt-6 text-center text-sm text-gray-500">
              Déjà un compte ?{" "}
              <Link href="/auth/sign-in" className="text-[#0F2A44] font-medium hover:underline">
                Se connecter
              </Link>
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
