const originOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173", "https://reliable-churros-048f84.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default originOptions;
