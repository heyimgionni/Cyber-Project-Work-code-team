import gsap from "gsap";

const master = gsap.timeline();
const preloaderText = document.querySelector(".preloader__text span");
const preloaderBg = document.querySelector(".preloader__bg");

const setInitialValues = () => {
  gsap.set(preloaderText, {
    y: 100,
  });
};

const handleAnimationPreloader = () => {
  const tl = gsap.timeline();

  tl.to(preloaderText, {
    y: 0,
    delay: 0.3,
  })
    .to(preloaderText, {
      y: -100,
      delay: 0.3,
    })
    .to(
      preloaderBg,
      {
        xPercent: -100,
        duration: 2,
        ease: "power4.inOut",
      },
      "<"
    );

  return tl;
};

master.add(setInitialValues()).add(handleAnimationPreloader());
