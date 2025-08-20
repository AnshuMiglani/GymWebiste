import {React,useState} from 'react'
import { Helmet } from 'react-helmet';
import Navbar from './Navbar.js';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './fit-maker-website.css';
import { Link } from 'react-router-dom';
import Tools from './pages/Tools.js';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';



const faqs = [
  {
    question: "What Is FitMaker And How Can It Help Me Reach My Fitness Goals?",
    answer:
      "FitMaker is an online fitness platform that offers personalized workout plans, expert coaching, and comprehensive nutritional guidance. Whether you're looking to lose weight, build muscle, or simply stay fit, our tailored programs and community support will help you achieve your fitness goals.",
  },
  {
    question: "How Do I Get Started With A Workout Plan On FitMaker?",
    answer: "You can start by signing up, completing your profile, and choosing a plan that fits your goals.",
  },
  {
    question: "What Is Included In The Custom Plan?",
    answer: "Custom plans include personalized workouts, meal suggestions, and access to coach support.",
  },
  {
    question: "Can I Change My Plan After Signing Up?",
    answer: "Yes, you can modify your goals and update your plan anytime through your dashboard.",
  },
  {
    question: "What Kind Of Support Can I Expect From My Trainer?",
    answer: "Expect one-on-one guidance, performance tracking, form correction, and nutritional advice.",
  },
];
const FitMakerWebsite = (props) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };


  return (
    <div className="fit-maker-website-container">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <div className="fit-maker-website-fit-maker-website">
        <Navbar presentab="Home"/>
        <section className="text-white py-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 gap-10">
        
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Achive Your <span className="text-red-500">FITNESS GOALS</span> <br />
            With <span className="text-white">MakeFit</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Join The Fitmaker Community And Transform Your Fitness Journey. Our Expert Learning And
            Personalized Programs Are Designed To Help You Achieve Your Goals And Exceed Your Expectations.
            Ready To Make A Change?
          </p>

          <div className="flex flex-wrap justify-center lg:justify-center gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold ">
              Start Your Journey
            </button>
          <Link to='/ai'> <button className="border border-orange-400 hover:bg-orange-600 hover:text-white text-orange-400 px-6 py-3 rounded-full font-semibold">
              Explore Our Ai
            </button></Link> 
          </div>
        </div>
        <div className="relative lg:w-1/2">
          <img
            src={require("../external/ellipse73115-l3v7-600h.png")}
            alt="Fit Guy"
            style={{zIndex:"1"}}
            className="w-full "
          />
          <img
            src={require("../external/muscularman1.png")}
            alt="Fit Guy"
            style={{zIndex:"0"}}
            className="absolute bottom-1 left-3"
          />
          <img
            src={require("../external/ellipse10415-qzjs-200h.png")}
            alt="Fit Guy"
            style={{top:"-75px",left:"30px"}}
            className="absolute"
          />
          <img
            src={require("../external/ellipse11416-2kb4-200h.png")}
            alt="Fit Guy"
            style={{bottom:"-50px",right:"12px"}}
            className="absolute"
          />

          
          <div className="absolute top-11 left-2 bg-black/70 text-white text-sm px-3 py-1 rounded-md ">+80 Coaches</div>
          <div className="absolute top-7 right-2 bg-black/70 text-white text-sm px-3 py-1 rounded-md">+1300 Reviews</div>
          <div className="absolute bottom-3 left-2 bg-black/70 text-white text-sm px-3 py-1 rounded-md">+1000 Videos</div>
          <div className="absolute bottom-11 right-2 bg-black/70 text-white text-sm px-3 py-1 rounded-md">+1500 Trainers</div>
        </div>
      </div>
      <div className='muscleiconcontainer'></div>
      <Link to="/ai"><img className='muscleaiicon' src={require("../external/muscle.png")} alt="abc"></img></Link>
      
      <div className="border-t border-gray-700 mt-16 pt-10 px-6">
        <div className="flex items-center justify-center max-w-12xl mx-auto sm:grid-cols-3 lg:grid-cols-5 gap-11 text-center">
          <div className=''>
            <p className="text-3xl font-bold text-red-500">96%</p>
            <p className="text-sm text-gray-300">Client Satisfaction</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-400">+5</p>
            <p className="text-sm text-gray-300">Years Of Experience</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-red-500">+800</p>
            <p className="text-sm text-gray-300">Active Members</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-400">24/7</p>
            <p className="text-sm text-gray-300">Support Available</p>
          </div>
        </div>
      </div>
    </section>

    <Tools/>
    <section class="bg-gradient-to-b from-black via-[#0a0a0a] to-black py-16 px-4 text-white text-center">
  <h2 class="text-4xl font-bold mb-4">
    <span class="text-white">Our </span><span class="text-red-600">Services</span>
  </h2>
  <p class="text-gray-300 max-w-3xl mx-auto mb-10 text-sm md:text-base">
    At this part you can easily access all of our services. Take a look at them and chose which ever you want.
  </p>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="relative rounded-xl overflow-hidden shadow-lg group">
      <img src={require("../external/Frame 314 1.png")} class="w-full h-[400px] object-cover" alt="Losing Weight"/>
      <div class="absolute inset-0 bg-black/20 group-hover:bg-opacity-80 transition-all p-6 flex flex-col justify-end text-left">
        <h3 class="text-red-600 text-lg font-extrabold uppercase">Losing Weight</h3>
        <p class="text-sm text-white font-medium mb-2">Click to join our losing weight plans</p>
        <p class="text-xs text-gray-300 mb-3">
          Achieve sustainable weight loss with our customized programs designed to help you burn fat and build a healthy, leaner body.
        </p>
        <a href="/" class="text-sm text-white hover:text-red-400 underline underline-offset-4">Learn More →</a>
      </div>
    </div>

    <div class="relative rounded-xl overflow-hidden shadow-lg group">
      <img src={require("../external/Frame 314 2.png")} class="w-full h-[400px] object-cover" alt="Building Muscle"/>
      <div class="absolute inset-0 bg-black/20 group-hover:bg-opacity-80 transition-all p-6 flex flex-col justify-end text-left">
        <h3 class="text-red-600 text-lg font-extrabold uppercase">Building Muscle</h3>
        <p class="text-sm text-white font-medium mb-2">Click to join our building muscle plans</p>
        <p class="text-xs text-gray-300 mb-3">
          Build strength and define your muscles with tailored programs. Gain lean mass and track your growth efficiently.
        </p>
        <a href="/" class="text-sm text-white hover:text-red-400 underline underline-offset-4">Learn More →</a>
      </div>
    </div>

    <div class="relative rounded-xl overflow-hidden shadow-lg group">
      <img src={require("../external/Frame 314 3.png")} class="w-full h-[400px] object-cover" alt="Training in Home"/>
      <div class="absolute inset-0 bg-black/20 group-hover:bg-opacity-80 transition-all p-6 flex flex-col justify-end text-left">
        <h3 class="text-red-600 text-lg font-extrabold uppercase">Training In Home</h3>
        <p class="text-sm text-white font-medium mb-2">Click to see our ultimate home plans</p>
        <p class="text-xs text-gray-300 mb-3">
          Train from home with effective routines. Minimal equipment, maximum results. Stay consistent and strong.
        </p>
        <a href="/" class="text-sm text-white hover:text-red-400 underline underline-offset-4">Learn More →</a>
      </div>
    </div>

    <div class="relative rounded-xl overflow-hidden shadow-lg group">
      <img src={require("../external/Frame 314 4.png")} class="w-full h-[400px] object-cover" alt="Gym Plan"/>
      <div class="absolute inset-0 bg-black/20 group-hover:bg-opacity-80 transition-all p-6 flex flex-col justify-end text-left">
        <h3 class="text-red-600 text-lg font-extrabold uppercase">Gym Plan</h3>
        <p class="text-sm text-white font-medium mb-2">Click, enter your details, get your plan</p>
        <p class="text-xs text-gray-300 mb-3">
          Get a custom gym plan with structured workouts and proper guidance toward your fitness goals.
        </p>
        <a href="/" class="text-sm text-white hover:text-red-400 underline underline-offset-4">Learn More →</a>
      </div>
    </div>
  </div>
</section>
<section className="w-full bg-black py-16 px-4 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-10">FAQ</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={activeIndex === index ?{border:"1px solid #fb2c36"}:{border: "1px solid #ff8904"}}
              className={`rounded-md overflow-hidden transition-all duration-300`}
            >
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center text-lg font-medium bg-transparent focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span>
                  {activeIndex === index ? (
                    <FaChevronUp className="text-red-500" />
                  ) : (
                    <FaChevronDown className="text-orange-400" />
                  )}
                </span>
              </button>
              <div
                className={`px-6 text-sm text-gray-300 transition-all duration-500 ease-in-out ${
                  activeIndex === index
                    ? "max-h-[300px] py-4 opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
      <footer className="bg-[#0e0e0e] text-gray-300 pt-16 pb-10 px-4 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold text-white">
            Make<span className="text-red-600">Fit</span>
          </h1>
          <p className="text-sm leading-relaxed">
            Transform Your Body with MakeFit, Your Trusted Partner in Fitness.
            With Over <span className="text-red-500 font-semibold">5 Years</span> of Experience, We Offer Expert Coaching,
            Tailored Workout Plans, and Comprehensive Nutritional Guidance.{' '}
            <span className="text-blue-400 underline">Join Our Community</span> and Start Your Journey Towards a Healthier, Stronger You.
          </p>
          <div className="flex gap-4 text-white text-xl">
            <FaFacebook />
            <FaInstagram />
            <FaXTwitter />
            <FaYoutube />
          </div>
        </div>

        <div>
          <h3 className="text-red-500 font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Our Services</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Testimonial</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h3 className="text-red-500 font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>Fitness Tools</li>
            <li>Workout Videos</li>
            <li>Nutrition Guides</li>
            <li>FAQ</li>
            <li>Success Stories</li>
            <li>Membership</li>
          </ul>
        </div>
        <div>
          <h3 className="text-red-500 font-semibold mb-3">Programs</h3>
          <ul className="space-y-2 text-sm">
            <li>Weight Loss</li>
            <li>Building Muscles</li>
            <li>Home Workout</li>
            <li>Gym Plan</li>
            <li>Our Plans</li>
            <li>Fitness Group</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-red-500 font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Gurugram, India</li>
            <li>📞 1234-56789</li>
            <li>📧 MakeFitAll@Gmail.Com</li>
          </ul>
        </div>
      </div>
    </footer>
            </div>
  );
}

export default FitMakerWebsite;
