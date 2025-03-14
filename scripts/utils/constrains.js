// guardare come funziona regex ( regular expression ) su MDM docs
const costrains = [
  { regex: /[A-Z]/, message: "At least 1 uppercase character [A-Z]" },
  { regex: /[a-z]/, message: "At least 1 lowercase character [a-z]" },
  { regex: /[\d]/, message: "At least 1 digit [0-9]" },
  {
    regex: /[!@#$%^&*(),.?":{}|<>]/,
    message: "At least 1 special character",
  },
  { regex: /.{8,}/, message: "At least 8 characters" },
  { regex: /.{1,64}/, message: "At most 64 characters" },
];

export default costrains;
