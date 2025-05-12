"use client";

import Slider from "react-slick";
import Image from "next/image";
import { FaNewspaper } from "react-icons/fa";

const news = [
    {
        title: "🎬 GTA 6 Official Release Date Confirmed for May 26, 2026",
        link: "#",
        image: "/gta6.png",
    },
    {
        title: "🔥 Hades II Now in Early Access — Players Say It's a Masterpiece",
        link: "#",
        image: "/hades2.jpg",
    },
    {
        title: "🧩 Elden Ring Modding Scene Shaken by New Anti-Cheat Update",
        link: "#",
        image: "/eldenring.png",
    },
    {
        title: "😬 Will Fallout 5 Come Out Before Elder Scrolls 6?",
        link: "#",
        image: "/fallout5.jpg",
    },
    {
        title: "🥳 Gears of War coming to PS5 with 4K Remaster",
        link: "#",
        image: "/gears2.jpg",
    }
];

export default function GameNewsCarousel() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <div className="bg-[#1a1c2c] border border-gray-600 text-white rounded-md shadow-md p-4">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
                <FaNewspaper className="text-yellow-400" />
                Game News
            </h2>
            <Slider {...settings}>
                {news.map((item, index) => (
                    <div key={index} className="relative ">
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={800}
                            height={250}
                            className="w-full rounded-md object-contain h-[250px] bg-no-repeat bg-center object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 rounded-b-md">
                            <a href={item.link} className="hover:underline">
                                <h3 className="text-white text-lg font-semibold">{item.title}</h3>
                            </a>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
