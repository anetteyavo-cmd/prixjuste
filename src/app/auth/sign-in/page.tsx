"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SignInPage() {
  const router = useRouter();
  const { signIn, user, loading } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Rediriger si déjà connecté
  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setError("Email ou mot de passe incorrect");
        } else if (error.message.includes("Email not confirmed")) {
          setError("Veuillez confirmer votre email avant de vous connecter");
        } else {
          setError(error.message);
        }
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
      
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
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Connexion</h1>
            <p className="text-gray-500 mt-2">Accédez à votre compte PrixJuste</p>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Message de succès */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-sm text-green-600">Connexion réussie ! Redirection...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#0F2A44] focus:ring-2 focus:ring-[#0F2A44]/20 transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#0F2A44] focus:ring-2 focus:ring-[#0F2A44]/20 transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0F2A44] focus:ring-[#0F2A44]" />
                <span className="text-sm text-gray-600">Se souvenir de moi</span>
              </label>
              <button type="button" className="text-sm text-[#0F2A44] hover:underline">
                Mot de passe oublié ?
              </button>
            </div>

            <Button 
              type="submit" 
              fullWidth 
              size="lg" 
              isLoading={isLoading}
              rightIcon={!isLoading ? <ArrowRight size={18} /> : undefined}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Pas encore de compte ?{" "}
            <Link href="/auth/sign-up" className="text-[#0F2A44] font-medium hover:underline">
              Créer un compte
            </Link>
          </p>
        </Card>

        <p className="mt-8 text-center text-sm text-white/60">
          En vous connectant, vous acceptez nos conditions d utilisation
        </p>
      </div>
    </div>
  );
}
