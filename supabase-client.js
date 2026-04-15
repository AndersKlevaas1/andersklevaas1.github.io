// Supabase client — bruker offisiell SDK lastet via CDN i index.html
// window.supabase må være tilgjengelig (fra @supabase/supabase-js@2)

const SUPABASE_URL = 'https://ozsgwukldmqbfhxdpdzx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_GRRhBtzNw0Ipo9blIp-Dvw_JGyHk9wA';

// Lag klient. window.supabase er SDK-global, vi lagrer vår instans som window.sb.
window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

console.log('✅ supabase-client.js lastet');
