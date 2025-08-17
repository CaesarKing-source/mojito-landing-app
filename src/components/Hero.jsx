import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive'

const Hero = () => {
  const videoRef = useRef();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText('.title', { type: 'chars, words'});
    const paraSplit = new SplitText('.subtitle', { type: 'lines'});

    heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));
    gsap.from(heroSplit.chars, {
        y: 100,
        duration: 1.5,
        delay: 0.5,
        stagger: 0.1,
        opacity: 0,
        ease: 'expo.out'
    });

    gsap.from(paraSplit.lines, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        delay: 1.2,
        stagger: 0.02,
        ease: 'expo.out'
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#hero',
            start: 'top 50%',
            end: 'bottom top',
            scrub: 2,
        }
    })

    tl.to('.left-leaf', {y: -200}, 0);
    tl.to('.right-leaf', { y: 200}, 0);

    const startValue = isMobile ? "top 50%" : "center 60%";
	const endValue = isMobile ? "120% top" : "bottom top";

    let tl2 = gsap.timeline({
        scrollTrigger: {
           trigger: "video",
           start: startValue,
           end: endValue,
           scrub: true,
           pin: true,
        },
       });
       
       videoRef.current.onloadedmetadata = () => {
        tl2.to(videoRef.current, {
           currentTime: videoRef.current.duration,
        });
       };
  }, []);
  return (
    <>
    <section id='hero' className='noisy'>
        <h1 className='title'>MOJITO</h1>
        <img src="/images/hero-left-leaf.png" alt="left-leaf" className='left-leaf' />
        <img src="/images/hero-right-leaf.png" alt="right-leaf" className='right-leaf' />

        <div className="body">
            <div className="content">
                <div className="space-y-5 hidden md:block">
                    <p>Cool . Crisp . Classic</p>
                    <p className="subtitle">Sip the spirit <br /> of summer</p>
                </div>

                <div className="view-cocktails">
                    <p className="subtitle">
                        Every cocktail on our menu is a blend of premium ingredients,
                        creative flair, and timeless recipes — designed to delight your
                        senses.
                    </p>
                    <a href="#cocktails">View cocktails</a>
			    </div>
            </div>
        </div>
    </section>
    
    <div className="video absolute inset-0">
        <video src='/videos/input.mp4' muted playsInline preload='auto' ref={videoRef} />
    </div>
    </>
  )
}

export default Hero
