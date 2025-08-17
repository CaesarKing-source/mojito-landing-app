import React from "react";
import { cocktailLists, mockTailLists } from "../contants";
import { useGSAP } from "@gsap/react";
import { SplitText } from 'gsap/all'
import gsap from "gsap";

const Cocktails = () => {
  useGSAP(() => {
    const lineSplit = new SplitText('.featured-drinks li', { type: 'lines'});
    const textTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#cocktails",
            start: "top 20%",
            end: "bottom bottom",
            scrub: 2
        }
    });

    const parallaxTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".list",
            start: "top 20%",
            end: "bottom 80%",
            scrub: 2
        }
    });

    textTimeline.from(lineSplit.lines, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.06
    })

    parallaxTimeline.from('#c-left-leaf', {
        x: -100,
        y: 100,
    });

    parallaxTimeline.from('#c-right-leaf', {
        x: 100,
        y: 100,
    });
  }, []);
  
  return (
    <section id="cocktails" className="noisy">
      <img
        src="/images/cocktail-left-leaf.png"
        alt="left-leaf"
        id="c-left-leaf"
      />
      <img
        src="/images/cocktail-right-leaf.png"
        alt="left-leaf"
        id="c-right-leaf"
      />

      <div className="list">
        <div className="popular">
          <h2>Most popular cocktails:</h2>

          <ul className="featured-drinks">
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="loved">
          <h2>Most loved mocktails:</h2>

          <ul className="featured-drinks">
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;
