// import * as flsFunctions from "./vendor/functions.js";
// import { throttle } from "./vendor/throttle.js";
// import Swiper, { Navigation } from "swiper";
// import Inputmask from "inputmask";

isWebp();

if (navigator.userAgent.indexOf("Firefox") >= 0) {
	var elms = document.querySelectorAll("link[rel=preload][as=style]");
	for (let i = 0; i < elms.length; i++) {
		elms[i].rel = "stylesheet";
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const body = document.querySelector("body");

	const menu = body.querySelector(".js--menu");

	if (menu) {
		const menuClose = menu.querySelector(".js--menu-close-button");
		const menuOpen = body.querySelector(".js--menu-open-button");
		const menuOverflow = body.querySelector(".js--menu-overflow");

		const openMenu = () => {
			menu.classList.remove("is-hidden");
			menu.classList.add("is-open");

			if (menuOverflow) {
				menuOverflow.classList.remove("is-hidden");
				menuOverflow.classList.add("is-open");
			}
		};

		const closeMenu = () => {
			menu.classList.remove("is-open");
			menu.classList.add("is-hidden");

			if (menuOverflow) {
				menuOverflow.classList.remove("is-open");
				menuOverflow.classList.add("is-hidden");
			}
		};

		if (menuOpen) {
			menuOpen.addEventListener("click", openMenu);
		}

		if (menuClose) {
			menuClose.addEventListener("click", closeMenu);
		}

		if (menuOverflow) {
			menuOverflow.addEventListener("click", closeMenu);
		}

		menu.querySelectorAll(".js--menu-link").forEach((link) => {
			link.addEventListener("click", (event) => {
				const href = link.getAttribute("href");
				const target =
					href && href.length > 1
						? document.querySelector(href)
						: null;

				if (!target) {
					return;
				}

				event.preventDefault();
				closeMenu();
				target.scrollIntoView({ behavior: "smooth" });
				history.pushState(null, "", href);
			});
		});
	}

	const equipmentImgSliderEl = body.querySelector(
		".js--equipment-img-slider",
	);
	const equipmentParamsSliderEl = body.querySelector(
		".js--equipment-perams-slider",
	);
	const equipmentMobileSliderEl = body.querySelector(
		".js--equipment-mobile-slider",
	);
	const equipmentPaginationEl = body.querySelector(
		".js--equipment-pagination",
	);
	const equipmentTabletQuery = window.matchMedia("(max-width: 1023px)");
	let equipmentImgSlider;
	let equipmentParamsSlider;
	let equipmentMobileSlider;

	const equipmentPagination = {
		el: equipmentPaginationEl,
		clickable: true,
		bulletClass: "equipment-pagination__bullet",
		bulletActiveClass: "is-active",
	};
	const equipmentNavigation = {
		prevEl: ".js--equipment-prev",
		nextEl: ".js--equipment-next",
	};

	const destroyEquipmentSlider = (slider) => {
		if (slider && !slider.destroyed) {
			slider.destroy(true, true);
		}
	};

	const initEquipmentSliders = () => {
		destroyEquipmentSlider(equipmentImgSlider);
		destroyEquipmentSlider(equipmentParamsSlider);
		destroyEquipmentSlider(equipmentMobileSlider);
		equipmentImgSlider = null;
		equipmentParamsSlider = null;
		equipmentMobileSlider = null;

		if (equipmentTabletQuery.matches && equipmentMobileSliderEl) {
			equipmentMobileSlider = new Swiper(equipmentMobileSliderEl, {
				initialSlide: 1,
				spaceBetween: 8,
				navigation: equipmentNavigation,
				pagination: equipmentPagination,
			});
			return;
		}

		if (!equipmentImgSliderEl) {
			return;
		}

		equipmentImgSlider = new Swiper(equipmentImgSliderEl, {
			effect: "cards",
			grabCursor: true,
			initialSlide: 1,
			cardsEffect: {
				rotate: false,
				slideShadows: false,
				perSlideOffset: 22,
			},
			navigation: equipmentNavigation,
		});

		if (!equipmentParamsSliderEl) {
			return;
		}

		equipmentParamsSlider = new Swiper(equipmentParamsSliderEl, {
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
			allowTouchMove: false,
			initialSlide: 1,
			pagination: equipmentPagination,
		});

		equipmentImgSlider.on("slideChange", function () {
			if (
				equipmentParamsSlider.activeIndex !==
				equipmentImgSlider.activeIndex
			) {
				equipmentParamsSlider.slideTo(equipmentImgSlider.activeIndex);
			}
		});

		equipmentParamsSlider.on("slideChange", function () {
			if (
				equipmentImgSlider.activeIndex !==
				equipmentParamsSlider.activeIndex
			) {
				equipmentImgSlider.slideTo(equipmentParamsSlider.activeIndex);
			}
		});
	};

	initEquipmentSliders();
	equipmentTabletQuery.addEventListener("change", initEquipmentSliders);
});

function isWebp() {
	function testWebP(callback) {
		var webP = new Image();

		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};

		webP.src =
			"data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {
		if (support == true) {
			document.querySelector("body").classList.add("webp");
		} else {
			document.querySelector("body").classList.add("no-webp");
		}
	});
}
