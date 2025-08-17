import React from 'react'
import { navLinks } from '../contants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Navbar = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: 'nav',
            start: 'bottom top',
        }
    });

    tl.fromTo('nav', { background: 'transparent'}, {
        background: '#00000050',
        backgroundFilter: 'blur(40px)',
        duration: 0.5,
        ease: 'power1.inOut'
    })
  }, [])
  return (
    <nav>
      <div style={{ padding: '20px'}}>
        <a href="#home" className='flex items-center gap-2'>
            <img src="/images/logo.png" alt="logo" />
            <p>Velvet Pour</p>
        </a>
        <ul>
            { navLinks.map((link, index) => {
                return <li key={index}>
                    <a href={link.id}>{link.title}</a>
                </li>
            })}
        </ul>
      </div>    
    </nav>
  )
}

export default Navbar
