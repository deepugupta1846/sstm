import { Bounce } from "react-toastify";

export const Day = [
  {
    id: 0,
    name: "Monday",
  },
  {
    id: 1,
    name: "Tuesday",
  },
  {
    id: 2,
    name: "Wednesday",
  },
  {
    id: 3,
    name: "Thursday",
  },
  {
    id: 4,
    name: "Friday",
  },
  {
    id: 5,
    name: "Saturday",
  },
  {
    id: 6,
    name: "Sunday",
  },
];

const months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const getDate = (fulldate) => {
  if (!fulldate) {
    return "-- -- ----";
  }
  let date = "";

  const d = new Date(fulldate);
  date = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} `;
  return date;
};

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const captilizeText = (text) => {
  const words = text.split("_");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1) + " ";
  }

  words.join(" ");
  return words;
};

export const toastProps = {
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Bounce,
};
