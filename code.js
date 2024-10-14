$(document).ready(function () {
  $(".learn_more_wrap").hover(
    function () {
      // On mouse enter
      $(this).closest(".learn_more_wrap").addClass("is-hover"); // Add class to main div
      $(this).find("*").addClass("is-hover"); // Add class to all children
    },
    function () {
      // On mouse leave
      $(this).closest(".learn_more_wrap").removeClass("is-hover"); // Remove class from main div
      $(this).find("*").removeClass("is-hover"); // Remove class from all children
    }
  );
});

////////////////////////////////////////////////////////////
// Preloader

let customEase =
  "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1";

let counter = {
  value: 0,
};

let loaderDuration = 7;

if (sessionStorage.getItem("visited") !== null) {
  loaderDuration = 2;
  counter = {
    value: 75,
  };
}

sessionStorage.setItem("visited", "true");

function updateLoaderText() {
  let progress = Math.round(counter.value);
  $(".preloader_text").text(progress + "%");
}

function endLoaderAnimation() {
  $(".trigger").click();
}

let tl = gsap.timeline({ onComplete: endLoaderAnimation });
tl.to(counter, {
  onUpdate: updateLoaderText,
  value: 100,
  duration: loaderDuration,
  ease: CustomEase.create("custom", customEase),
});
tl.to(
  ".hero_preload_progress",
  {
    width: "100%",
    duration: loaderDuration,
    ease: CustomEase.create("custom", customEase),
  },
  0
);

////////////////////////////////////////////////////////////
// Mega Menu

const tabs = document.querySelectorAll(".menu_link");
const dropdowns = document.querySelectorAll(".nav_menu_display");
const body = document.body;
const menuBackground = document.querySelector(".menu_background");
const navContain = document.querySelector(".nav_contain");
const navButtonMenu = document.querySelector(".nav_button_menu");
const navMenuWrap = document.querySelector(".nav_menu_wrap");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    const targetDropdown = document.getElementById(
      `dropdown-${tab.dataset.tab}`
    );
    const menuLinkUnderline = tab.querySelector(".menu_link_underline");
    const menuIcon = tab.querySelector(".menu_icon");

    // Remove "is-current" class
    tabs.forEach((otherTab, otherIndex) => {
      if (otherIndex !== index) {
        const otherMenuLinkUnderline = otherTab.querySelector(
          ".menu_link_underline"
        );
        const otherMenuIcon = otherTab.querySelector(".menu_icon");
        otherMenuLinkUnderline.classList.remove("is-current");
        otherMenuIcon.classList.remove("is-current");
      }
    });

    // Close all dropdowns
    dropdowns.forEach((dropdown) => {
      if (dropdown !== targetDropdown) {
        gsap.to(dropdown, {
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.3,
        });
        dropdown.style.display = "none";
      }
    });

    // Toggle the clicked dropdown
    if (
      targetDropdown.style.display === "none" ||
      !targetDropdown.style.display
    ) {
      targetDropdown.style.display = "block";
      gsap.fromTo(
        targetDropdown,
        { opacity: 0 },
        { opacity: 1, ease: "power2.inOut", duration: 0.3 }
      );

      if (
        menuBackground.style.display === "none" ||
        !menuBackground.style.display
      ) {
        menuBackground.style.display = "block";
        gsap.fromTo(
          menuBackground,
          { opacity: 0 },
          { opacity: 1, ease: "power2.inOut", duration: 0.3 }
        );
      }

      navContain.classList.add("is-menu-open");
      gsap.to(navContain, {
        backgroundColor: "rgba(255, 255, 255, 1)",
        duration: 0.3,
      });

      menuLinkUnderline.classList.add("is-current");
      menuIcon.classList.add("is-current");
    } else {
      closeDropdown(targetDropdown);
    }
  });
});

// Function to close the dropdown
function closeDropdown(targetDropdown) {
  gsap.to(targetDropdown, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.inOut",
    onComplete: () => {
      targetDropdown.style.display = "none";
      gsap.to(menuBackground, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          menuBackground.style.display = "none";
        },
      });

      tabs.forEach((tab) => {
        const linkUnderline = tab.querySelector(".menu_link_underline");
        const icon = tab.querySelector(".menu_icon");
        if (linkUnderline) {
          linkUnderline.classList.remove("is-current");
        }
        if (icon) {
          icon.classList.remove("is-current");
        }
        if (navContain) {
          navContain.classList.remove("is-menu-open");
          gsap.to(navContain, {
            backgroundColor: "rgba(255, 255, 255, 0)",
            duration: 0.3,
          }); // Reset background color
        }
      });
    },
  });
}

menuBackground.addEventListener("click", () => {
  dropdowns.forEach((dropdown) => {
    closeDropdown(dropdown);
  });
});

// Hide menu on scroll
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const currentScrollTop =
    window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollTop > lastScrollTop) {
    dropdowns.forEach((dropdown) => {
      closeDropdown(dropdown);
    });
  }
  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
});

////////////////////////////////////////////////////////////
// Mega Menu - mobile toggle

navButtonMenu.addEventListener("click", () => {
  if (navMenuWrap.style.display === "flex") {
    navMenuWrap.style.display = "none"; //
    body.style.overflow = "auto";

    // Close all dropdowns and remove the combo class
    dropdowns.forEach((dropdown) => {
      closeDropdown(dropdown);
    });

    // Remove the combo class from navContain
    if (navContain.classList.contains("is-menu-open")) {
      navContain.classList.remove("is-menu-open");
    }
  } else {
    navMenuWrap.style.display = "flex";
    body.style.overflow = "hidden";
  }
});

////////////////////////////////////////////////////////////
// Footer Menu - mobile
const footerLinkWraps = document.querySelectorAll(".footer_link_wrap");

footerLinkWraps.forEach((item) => {
  const header = item.querySelector(".footer_subheading_wrap");
  const content = item.querySelector(".footer_link_list");
  const footerIcon = item.querySelector(".footer_icon"); // Assuming this is the icon element

  header.addEventListener("click", () => {
    // Check if the clicked item is currently open
    const isOpen = content.style.display === "flex";

    // Close all other items first
    footerLinkWraps.forEach((otherItem) => {
      if (otherItem !== item) {
        const otherContent = otherItem.querySelector(".footer_link_list");
        const otherFooterIcon = otherItem.querySelector(".footer_icon"); // Get the footer icon of the other item
        if (otherContent.style.display === "flex") {
          gsap.to(otherContent, {
            height: 0,
            ease: "power2.inOut",
            duration: 0.3,
            onComplete: () => {
              otherContent.style.display = "none"; // Hide after animation
              otherFooterIcon.classList.remove("is-current"); // Remove is-current class
            },
          });
        }
      }
    });

    // Toggle the state of the clicked item
    if (isOpen) {
      footerIcon.classList.remove("is-current"); // Remove is-current class
      gsap.to(content, {
        height: 0,
        ease: "power2.inOut",
        duration: 0.3,
        onComplete: () => {
          content.style.display = "none"; // Hide after animation
        },
      });
    } else {
      const height = content.scrollHeight; // Get the height of the content
      content.style.display = "flex"; // Show as flex
      content.style.height = "0"; // Reset height to 0 for animation
      gsap.to(content, {
        height: height,
        ease: "power2.inOut",
        duration: 0.3,
        onStart: () => {
          content.style.height = "0";
          content.style.display = "none";
        },
        onComplete: () => {
          content.style.display = "flex";
          content.style.height = "auto";
        },
      });
      gsap.to(content, {
        opacity: 1,
        ease: "power2.inOut",
        delay: 0.3, // Delay the opacity animation by 0.3 seconds
        duration: 0.3,
      });
      footerIcon.classList.add("is-current"); // Add is-current class to the current footer icon
    }
  });
});

////////////////////////////////////////////////////////////
// Custom Cursor

$(document).on("mousemove", function () {
  $(".cursor_dot").removeClass("hide");
});
$(".slider_btn")
  .on("mouseenter", function () {
    $(".cursor_dot").addClass("show");
  })
  .on("mouseleave", function () {
    $(".cursor_dot").removeClass("show");
  });

////////////////////////////////////////////////////////////
// Span visual

$(".span_wrap").each(function (index) {
  let relatedEl = $(".span_element").eq(index);
  relatedEl.appendTo($(this));
});

////////////////////////////////////////////////////////////
// Uscases Card

$(".ucases_card").each(function (index) {
  let bgPanel = $(this).children().eq(1);
  let fgPanel = $(this).children().eq(0);

  let tl = gsap.timeline({
    paused: true,
    defaults: { duration: 0.5, ease: "power2.inOut" },
  });
  tl.fromTo(
    fgPanel,
    { clipPath: "circle(0% at 90% 75%)" },
    { clipPath: "circle(130% at 90% 75%)" }
  );

  $(this).on("mouseenter", function () {
    tl.play();
  });
  $(this).on("mouseleave", function () {
    tl.reverse();
  });
});


////////////////////////////////////////////////////////////
// number of items in collection

$(document).ready(function () {
  // get the amount (length) of ".cms-job-counter" classes
  // and set that amount as a variable called jobcounter
  const jobcounter = $(".articles_cms_item").length;

  // find the class ".hack3-jobs-amount"
  // and insert the jobcounter variable as text
  $(".cat_span").text(jobcounter);
});

////////////////////////////////////////////////////////////
// visual slider

$(".visual_layout, .cs_slider_layout").each(function () {
  let childArrow = $(this).find(".slider_btn, .cs_slider_button");
  let childItems = $(this).find(".slider_cms_item, .cs_cms_item").hide();
  let childDots = $(this).find(".slider_dot_item");
  let totalSlides = childItems.length;
  let activeIndex = 0;

  childItems.first().css("display", "grid");
  gsap.set(childDots.eq(0).find(".slider_dot_line"), { x: "0%" });

  // DOT LINES
  let tl2 = gsap.timeline({ repeat: -1 });
  childDots.each(function (index) {
    tl2.addLabel(`step${index}`);
    tl2.to($(this).find(".slider_dot_line"), {
      // width: "100%",
      scaleX: "1.0",
      ease: "none",
      duration: 5,
      onComplete: () => {
        goNext(index + 1);
      },
    });
  });

  // MAIN SLIDER CODE
  function moveSlide(nextIndex, forwards) {
    let tl3 = gsap.timeline();
    tl3.set(childDots.eq(nextIndex).find(".slider_dot_line"), { x: "0%" });
    tl3.fromTo(
      childDots.eq(activeIndex).find(".slider_dot_line"),
      { x: "0%" },
      { x: "100%" }
    );

    tl2.seek(`step${nextIndex}`);

    let titleFrom = -100;
    let titleDelay = "<";
    if (forwards) {
      titleFrom = 100;
      titleDelay = "<50%";
    }
    //
    childItems.hide();
    let prevItem = childItems.eq(activeIndex).css("display", "grid");
    let nextItem = childItems.eq(nextIndex).css("display", "grid");
    let tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.inOut" } });
    if (forwards) {
      tl.fromTo(nextItem, { opacity: 0 }, { opacity: 1 });
      tl.fromTo(prevItem, { opacity: 1 }, { opacity: 0 }, "<");
    } else {
      tl.fromTo(nextItem, { opacity: 0 }, { opacity: 1 });
      tl.fromTo(prevItem, { opacity: 1 }, { opacity: 0 }, "<");
    }
    tl.fromTo(
      nextItem.find(".slider_cms_title .char"),
      { yPercent: titleFrom },
      { yPercent: 0, duration: 0.5, stagger: { amount: 0.5 } },
      titleDelay
    );

    activeIndex = nextIndex;
  }

  // ARROWS
  function goNext(num) {
    let nextIndex = num;
    if (nextIndex > totalSlides - 1) nextIndex = 0;
    moveSlide(nextIndex, true);
  }
  // go next
  childArrow.filter(".is-next").on("click", function () {
    goNext(activeIndex + 1);
  });
  // go prev
  childArrow.filter(".is-prev").on("click", function () {
    let nextIndex = activeIndex - 1;
    if (nextIndex < 0) nextIndex = totalSlides - 1;
    moveSlide(nextIndex, false);
  });

  // CLICK OF DOTS
  childDots.on("click", function () {
    let dotIndex = $(this).index();
    if (activeIndex > dotIndex) {
      moveSlide(dotIndex, false);
    } else if (activeIndex < dotIndex) {
      moveSlide(dotIndex, true);
    }
  });
});




// MARQUEE POWER-UP
window.addEventListener("DOMContentLoaded", (event) => {
  // attribute value checker
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
    if (attrVal === "true" && defaultValType === "boolean") return true;
    if (attrVal === "false" && defaultValType === "boolean") return false;
    if (isNaN(attrVal) && defaultValType === "string") return attrVal;
    if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
    return defaultVal;
  }
  // marquee component
  $("[tr-marquee-element='component']").each(function (index) {
    let componentEl = $(this),
      panelEl = componentEl.find("[tr-marquee-element='panel']"),
      triggerHoverEl = componentEl.find("[tr-marquee-element='triggerhover']"),
      triggerClickEl = componentEl.find("[tr-marquee-element='triggerclick']");
    let speedSetting = attr(100, componentEl.attr("tr-marquee-speed")),
      verticalSetting = attr(false, componentEl.attr("tr-marquee-vertical")),
      reverseSetting = attr(false, componentEl.attr("tr-marquee-reverse")),
      scrollDirectionSetting = attr(false, componentEl.attr("tr-marquee-scrolldirection")),
      scrollScrubSetting = attr(false, componentEl.attr("tr-marquee-scrollscrub")),
      moveDistanceSetting = -100,
      timeScaleSetting = 1,
      pausedStateSetting = false;
    if (reverseSetting) moveDistanceSetting = 100;
    let marqueeTimeline = gsap.timeline({ repeat: -1, onReverseComplete: () => marqueeTimeline.progress(1) });
    if (verticalSetting) {
      speedSetting = panelEl.first().height() / speedSetting;
      marqueeTimeline.fromTo(panelEl, { yPercent: 0 }, { yPercent: moveDistanceSetting, ease: "none", duration: speedSetting });
    } else {
      speedSetting = panelEl.first().width() / speedSetting;
      marqueeTimeline.fromTo(panelEl, { xPercent: 0 }, { xPercent: moveDistanceSetting, ease: "none", duration: speedSetting });
    }
    let scrubObject = { value: 1 };
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (!pausedStateSetting) {
          if (scrollDirectionSetting && timeScaleSetting !== self.direction) {
            timeScaleSetting = self.direction;
            marqueeTimeline.timeScale(self.direction);
          }
          if (scrollScrubSetting) {
            let v = self.getVelocity() * 0.006;
            v = gsap.utils.clamp(-60, 60, v);
            let scrubTimeline = gsap.timeline({ onUpdate: () => marqueeTimeline.timeScale(scrubObject.value) });
            scrubTimeline.fromTo(scrubObject, { value: v }, { value: timeScaleSetting, duration: 0.5 });
          }
        }
      }
    });
    function pauseMarquee(isPausing) {
      pausedStateSetting = isPausing;
      let pauseObject = { value: 1 };
      let pauseTimeline = gsap.timeline({ onUpdate: () => marqueeTimeline.timeScale(pauseObject.value) });
      if (isPausing) {
        pauseTimeline.fromTo(pauseObject, { value: timeScaleSetting }, { value: 0, duration: 0.5 });
        triggerClickEl.addClass("is-paused");
      } else {
        pauseTimeline.fromTo(pauseObject, { value: 0 }, { value: timeScaleSetting, duration: 0.5 });
        triggerClickEl.removeClass("is-paused");
      }
    }
    if (window.matchMedia("(pointer: fine)").matches) {
      triggerHoverEl.on("mouseenter", () => pauseMarquee(true));
      triggerHoverEl.on("mouseleave", () => pauseMarquee(false));
    }
    triggerClickEl.on("click", function () {
      !$(this).hasClass("is-paused") ? pauseMarquee(true) : pauseMarquee(false);
    });
  });
});


// scroll animation

$("[tr-scroll-toggle='component']").each(function (index) {
  // get elements
  let component = $(this);
  let lists = component.find("[tr-scroll-toggle='list']");
  // set item total
  let itemTotal = lists.first().children().length;
  component.find("[tr-scroll-toggle='number-total']").text(itemTotal);
  // create trigger divs & spacer
  let firstTrigger = component.find("[tr-scroll-toggle='trigger']").first();
  for (let i = 1; i < itemTotal; i++) {
    firstTrigger.clone().appendTo(component);
  }
  let triggers = component.find("[tr-scroll-toggle='trigger']");
  firstTrigger.css("margin-top", "-100vh");
  let trSpacer = $(
    "<div class='tr-scroll-toggle-spacer' style='width: 100%; height: 100vh;'></div>"
  )
    .hide()
    .appendTo(component);
  // check for min width
  let minWidth = 0;
  let trMinWidth = component.attr("tr-min-width");
  if (trMinWidth !== undefined && trMinWidth !== false) {
    minWidth = +trMinWidth;
  }
  // main breakpoint
  gsap.matchMedia().add(`(min-width: ${minWidth}px)`, () => {
    // show spacer
    trSpacer.show();
    // switch which item is active
    function makeItemActive(activeIndex) {
      component
        .find("[tr-scroll-toggle='transform-y']")
        .css("transform", `translateY(${activeIndex * -100}%)`);
      component
        .find("[tr-scroll-toggle='transform-x']")
        .css("transform", `translateX(${activeIndex * -100}%)`);
      component
        .find("[tr-scroll-toggle='number-current']")
        .text(activeIndex + 1);
      lists.each(function (index) {
        $(this).children().removeClass("is-active");
        $(this).children().eq(activeIndex).addClass("is-active");
      });
    }
    makeItemActive(0);
    // scroll to trigger div on click of anchor
    let anchorLinks = component.find("[tr-anchors]").children();
    anchorLinks.on("click", function () {
      let myIndex = $(this).index();
      let scrollDistance =
        triggers.eq(myIndex).offset().top + triggers.eq(myIndex).height() - 1;
      $("html, body").animate({ scrollTop: scrollDistance });
    });
    // triggers timeline
    triggers.each(function (index) {
      let triggerIndex = index;
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: "top top",
          end: "bottom top",
          scrub: true,
          onToggle: ({ self, isActive }) => {
            if (isActive) {
              makeItemActive(triggerIndex);
            }
          },
        },
        defaults: {
          ease: "none",
        },
      });
      lists.each(function () {
        let childItem = $(this).children().eq(triggerIndex);
        tl.to(
          childItem.find("[tr-item-animation='scale-to-1']"),
          { scale: 1 },
          0
        );
        tl.from(
          childItem.find("[tr-item-animation='scale-from-1']"),
          { scale: 1 },
          0
        );
        tl.to(
          childItem.find("[tr-item-animation='progress-horizontal']"),
          { width: "100%" },
          0
        );
        tl.fromTo(
          childItem.find("[tr-item-animation='progress-vertical']"),
          { height: "0%" },
          { height: "100%" },
          0
        );
        tl.to(
          childItem.find("[tr-item-animation='rotate-to-0']"),
          { rotation: 0 },
          0
        );
        tl.from(
          childItem.find("[tr-item-animation='rotate-from-0']"),
          { rotation: 0 },
          0
        );
      });
    });
    // component timeline
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: component,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      defaults: {
        ease: "none",
      },
    });
    tl.to(
      component.find("[tr-section-animation='scale-to-1']"),
      { scale: 1 },
      0
    );
    tl.from(
      component.find("[tr-section-animation='scale-from-1']"),
      { scale: 1 },
      0
    );
    tl.to(
      component.find("[tr-section-animation='progress-horizontal']"),
      { width: "100%" },
      0
    );
    tl.fromTo(
      component.find("[tr-section-animation='progress-vertical']"),
      { height: "0%" },
      { height: "100%" },
      0
    );

    tl.to(
      component.find("[tr-section-animation='rotate-to-0']"),
      { rotation: 0 },
      0
    );
    tl.from(
      component.find("[tr-section-animation='rotate-from-0']"),
      { rotation: 0 },
      0
    );
    // optional scroll snapping
    if (component.attr("tr-scroll-snap") === "true") {
      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: component,
          start: "top top",
          end: "bottom bottom",
          snap: {
            snapTo: "labelsDirectional",
            duration: { min: 0.01, max: 0.2 },
            delay: 0.0001,
            ease: "power1.out",
          },
        },
      });
      triggers.each(function (index) {
        tl2.to($(this), { scale: 1, duration: 1 });
        tl2.addLabel("trigger" + index);
      });
    }
    // smaller screen sizes
    return () => {
      trSpacer.hide();
      component
        .find("[tr-scroll-toggle='transform-y']")
        .css("transform", "translateY(0%)");
      component
        .find("[tr-scroll-toggle='transform-x']")
        .css("transform", "translateX(0%)");
      lists.each(function (index) {
        $(this).children().removeClass("is-active");
      });
    };
  });
});
