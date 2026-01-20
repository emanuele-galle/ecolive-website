module.exports = {
  apps: [
    {
      name: 'ecolive-website',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      instances: 'max', // Cluster mode - usa tutti i core
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Logs a stdout (Docker li cattura)
      out_file: '/dev/stdout',
      error_file: '/dev/stderr',
      merge_logs: true,
      max_memory_restart: '1G',
      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
    },
  ],
}
