import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: import.meta.env.VITE_SUPABASE_HOST,
  database: 'postgres',
  password: import.meta.env.VITE_SUPABASE_PASSWORD,
  port: import.meta.env.VITE_SUPABASE_PORT,
});

/*module.exports = {
  query: (text, params, callback) => {
    const start = Date.now()
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start
      console.log('executed query', { text, duration, rows: res.rowCount })
      callback(err, res)
    })
  },
}*/