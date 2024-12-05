import "./index.css"
import Canvas from "./Canvas"
import data from "./data"
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingRef = useRef(null);
  const growingSpan = useRef(null);
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  },[])
  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) =>{
        if (!prevShowCanvas) {
          gsap.to("body", {
            backgroundColor: "#fd2c2a", 
            duration: 1.2,
            color: "black",
          })
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          })
          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all"
              })
            }
          })
        } else {
          gsap.to("body", {
            backgroundColor: "#000",
            duration: 1.2, 
            color: "#fff",
          })
        }
        return !prevShowCanvas;
      });
    }
    const headingElement = headingRef.current;
    headingElement.addEventListener('click', handleClick);
    return () => {
      headingElement.removeEventListener('click', handleClick);
    }
  }, [])
  return <>
  <span className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5" ref={growingSpan}></span>
  <div className="w-full relative font-[Helvetica_Now_Display]">
    {showCanvas && data[0].map((canvasdets, canvasIndex) => {
        return <Canvas details={canvasdets} />
    })}
    
    <div className="w-full  z-[1] relative">
      <nav className="w-full  z-50 mb-10 ">
        <div className="max-w-9xl mx-[20px] px-4">
          <div className="flex items-center justify-between h-16">
            <div className=" text-xl font-regular">
              ThirtySixStudio
            </div>
            <div className="flex space-x-8">
              {["Home", "About", "Projects", "Contact"].map((link, index) => (
                <a 
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md  hover:text-gray-300 transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div className="textcontainer tracking-tight w-full px-[20%] h-[65vh]">
        <div className="text w-[45%]  ">
                <h3 className="text-4xl leading-[1.2]">
                At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.
                </h3>
                <p className="text-md w-full mt-10 font-thin">
                  We're a boutique production studio focused on design, motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.
                </p>
                <p className="text-md w-full mt-10 font-thin">
                  Scroll
                </p>
        </div>
      </div>

      <div 
        className="w-full overflow-hidden"
        onMouseEnter={(e) => {
          const cursor = document.createElement('div');
          cursor.style.width = '0px';
          cursor.style.height = '0px';
          cursor.style.backgroundColor = showCanvas ? '#ffffff' : '#fd2c2a';
          cursor.style.borderRadius = '50%';
          cursor.style.position = 'fixed';
          cursor.style.pointerEvents = 'none';
          cursor.style.zIndex = '9999';
          cursor.style.transition = 'width 0.3s, height 0.3s';
          cursor.style.transform = 'translate(-50%, -50%)';
          document.body.appendChild(cursor);
          cursor.offsetHeight;
          cursor.style.width = '50px';
          cursor.style.height = '50px';
          const moveHandler = (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
          };
          document.addEventListener('mousemove', moveHandler);
          e.currentTarget.onmouseleave = () => {
            cursor.style.width = '0px';
            cursor.style.height = '0px';
            setTimeout(() => {
              document.removeEventListener('mousemove', moveHandler);
              cursor.remove();
            }, 300);
          };
        }}
        style={{cursor: 'none'}}
      >
              <h1 ref={headingRef} className="text-[15.5rem] font-thin tracking-tight leading-none text-center">
                Thirtysixstudio
              </h1>
      </div>
    </div>
  </div>

  <div className=" mt-32 px-10 relative">
    {showCanvas && data[0].map((canvasdets, canvasIndex) => {
        return <Canvas details={canvasdets} />
    })} 

    <div className="z-[1] relative">
    <h1 className="text-8xl tracking-tight">About the brand</h1>
    <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis beatae asperiores et, dolore, officia fuga provident possimus quis dolores iusto tempore iste, laudantium magnam libero vel voluptas quo id vitae facere? Aliquam, voluptas nulla. Repellat natus, vel nulla eos molestiae at optio qui omnis provident laborum, reiciendis, possimus sequi ea.</p>
    <div className="w-full flex justify-center">
    <img className="w-[80%] mt-10 shadow-xl shadow-black/30 blur-[100px] absolute -z-10" src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400" alt="" />
    <img className="w-[80%] mt-10 relative" src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400" alt="" />
    </div>
    </div>
  </div>
  </>
}

export default App