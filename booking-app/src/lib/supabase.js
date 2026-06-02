import { createClient } from '@supabase/supabase-js'

// 从 .env 读取（本地开发请复制 .env.example → .env 并填入真实值）
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_KEY — copy .env.example to .env')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
