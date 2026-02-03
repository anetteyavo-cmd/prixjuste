import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour l'utilisateur
export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  city: string | null;
  created_at: string;
  updated_at: string;
}

// Fonctions d'authentification
export const authHelpers = {
  // Inscription
  async signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    return { data, error };
  },

  // Connexion
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Déconnexion
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Récupérer l'utilisateur actuel
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Récupérer la session
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  // Mettre à jour le profil
  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  // Récupérer le profil
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },
};
