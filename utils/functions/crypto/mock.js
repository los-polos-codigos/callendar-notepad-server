export const mock_object = {
  phone: String(792507113),
  name: "Mateusz",
  surrname: "Myśliwiec",
  subscription: {
    active: true,
    type: "standard",
    date_start: new Date(),
    date_end: new Date(),
  },
};
export const mock_array = [
  1,
  "2",
  new Date(),
  {
    phone: String(792507113),
    name: "Mateusz",
    surrname: "Myśliwiec",
    subscription: {
      active: true,
      type: "standard",
      date_start: new Date(),
      date_end: new Date(),
    },
  },
  [{ t: "test", t2: 234 }, "test", 123],
];
export const mock_string = "test";
