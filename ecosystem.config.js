module.exports = {
  apps: [
    {
      name: "dinnermix",
      script: "./node_modules/next/dist/bin/next",
      args: "start",
      exp_backoff_restart_delay: 100, // optional, adjust as needed
      watch: true, // optional, adjust as needed
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
