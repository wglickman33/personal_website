// testimonials.ts
export interface Testimonial {
    name: string;
    title: string;
    content: string;
    image?: string;
  }
  
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      title: "Product Manager at TechCorp",
      content: "William brought our product vision to life with his exceptional UI design skills. His ability to understand complex user flows and translate them into intuitive interfaces was invaluable. Beyond his technical skills, his communication and collaboration made the entire process smooth.",
      image: "/assets/images/testimonials/sarah.jpg"
    },
    {
      name: "Michael Chen",
      title: "CTO at DataViz Inc.",
      content: "We hired William to develop an interactive dashboard for our data visualization platform. His expertise in React and D3.js was exactly what we needed. He delivered a solution that exceeded our expectations in both functionality and aesthetics. I highly recommend him for any data-heavy application development.",
      image: "/assets/images/testimonials/michael.jpg"
    },
    {
      name: "Elena Rodriguez",
      title: "Research Director at NeuralLab",
      content: "William's background in neuroscience combined with his software engineering skills made him the perfect fit for our neural interface project. He quickly grasped the scientific concepts and implemented them in an accessible application that our researchers love using. His work has significantly accelerated our research timeline.",
      image: "/assets/images/testimonials/elena.jpg"
    },
    {
      name: "James Wilson",
      title: "Startup Founder",
      content: "As a non-technical founder, I was looking for someone who could take my idea and turn it into reality. William not only built the application but also provided valuable insights on user experience and market positioning. He's more than a developer; he's a true partner in bringing ideas to life.",
      image: "/assets/images/testimonials/james.jpg"
    }
  ];
  
  export default testimonials;