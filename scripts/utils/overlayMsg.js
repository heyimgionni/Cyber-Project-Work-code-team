import gsap from "gsap";

const handleOverlayAnimation = (item) => {
  gsap.set(item, { display: "none", y: -100 });
  const tl = gsap.timeline();
  tl.to(item, {
    display: "block",
    opacity: 1,
    y: 0,
  }).to(item, {
    delay: 2,
    y: -100,
    opacity: 0,
    display: "none",
  });
};

export default handleOverlayAnimation;
