import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, BookmarkPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export function BlogPost() {
  const { id } = useParams();

  // This would typically come from an API or CMS
  const post = {
    id: 'introducing-mira',
    title: 'Introducing MiRA: The Future of Personal AI Assistance',
    content: `
      <p>In the evolving landscape of artificial intelligence, the quest to develop personal assistants that seamlessly integrate into our daily lives has been relentless. Today, we are proud to introduce <strong>MiRA</strong> (Mindful Intelligent Responsive Assistant), a groundbreaking AI-powered personal assistant designed to revolutionize personal development and community engagement.</p>

      <h2 id="overview">Overview</h2>
      <p><strong>MiRA</strong> leverages state-of-the-art machine learning algorithms and a robust collective intelligence framework to provide a personalized, adaptive, and insightful experience. By synthesizing individual data with community-driven insights, MiRA offers a unique blend of personal growth support and societal well-being facilitation.</p>

      <h2 id="research-foundations">Research Foundations</h2>
      <p>The development of MiRA is rooted in extensive research across multiple disciplines, including artificial intelligence, behavioral science, and human-computer interaction. Our team has collaborated with leading experts to ensure that MiRA not only understands user behavior but also anticipates needs and adapts to changing circumstances.</p>

      <h3 id="ai-and-ml">Artificial Intelligence and Machine Learning</h3>
      <p>At the core of MiRA is a suite of advanced AI models trained on diverse datasets to recognize patterns, predict future behaviors, and generate actionable insights. These models employ deep learning techniques and reinforcement learning to continuously improve MiRA's performance and personalization capabilities.</p>

      <h3 id="behavioral-science">Behavioral Science Integration</h3>
      <p>Understanding human behavior is pivotal for effective personal assistance. MiRA integrates principles from behavioral science to foster habit formation, goal setting, and stress management. By analyzing user interactions and feedback, MiRA provides tailored strategies that promote sustained personal growth.</p>

      <h3 id="hci">Human-Computer Interaction</h3>
      <p>The user interface of MiRA is designed with a focus on accessibility and intuitiveness. Employing adaptive interfaces that respond to the user's cognitive and emotional states, MiRA ensures that interactions are both engaging and supportive.</p>

      <h2 id="key-features">Key Features</h2>
      <h3 id="predictive-intelligence">Predictive Intelligence</h3>
      <p>MiRA's predictive intelligence harnesses historical data and real-time inputs to forecast potential challenges and opportunities in various aspects of life, including career progression, financial planning, and health management. This foresight enables users to make informed decisions proactively.</p>
      <p><strong>Case Study:</strong> A user aiming to advance their career can receive timely recommendations on skill development courses, networking opportunities, and optimal times to apply for new positions based on industry trends and personal performance metrics.</p>

      <h3 id="adaptive-interface">Adaptive Interface</h3>
      <p>The adaptive interface of MiRA utilizes biofeedback from wearable devices to assess the user's current mental state. This real-time analysis allows MiRA to adjust its interactions, presenting information in a manner that aligns with the user's focus and stress levels.</p>
      <p><strong>Example:</strong> During periods of high stress, MiRA can simplify notifications and provide calming suggestions to help the user regain composure.</p>

      <h3 id="dynamic-habit-formation">Dynamic Habit Formation</h3>
      <p>MiRA employs evidence-based techniques to assist users in building and maintaining positive habits. Through personalized goal setting, progress tracking, and motivational incentives, MiRA fosters an environment conducive to continuous personal development.</p>
      <p><strong>Implementation:</strong> Users can set specific, measurable goals, such as daily exercise or reading, and receive reminders and encouragement to stay on track. Gamification elements, such as achievement badges and progress charts, enhance engagement and motivation.</p>

      <h3 id="collective-intelligence">Collective Intelligence Platform</h3>
      <p>MiRA's Collective Intelligence Platform aggregates anonymized data from its user base to identify common challenges and generate community-driven solutions. This collaborative approach not only benefits individual users but also contributes to broader societal advancements.</p>
      <p><strong>Impact:</strong> Insights derived from collective data can inform public health initiatives, educational programs, and environmental sustainability efforts, demonstrating MiRA's role in fostering a more informed and proactive community.</p>

      <h2 id="data-privacy">Data Privacy and Security</h2>
      <p>We recognize that privacy and security are paramount in today's digital age. MiRA employs end-to-end encryption and stringent data protection protocols to ensure that user information remains confidential and secure. Users have full control over their data, with the ability to customize privacy settings and manage data sharing preferences.</p>
      <p>Compliance with global data protection regulations, such as GDPR and CCPA, underscores our commitment to ethical data practices and user trust.</p>

      <h2 id="integration">Integration with Existing Ecosystems</h2>
      <p>MiRA seamlessly integrates with a wide array of devices and platforms, including smartphones, wearables, and smart home technologies. This interoperability ensures that MiRA can access comprehensive data streams to enhance its functionality and provide a unified user experience.</p>
      <p>Supported platforms include iOS, Android, Apple Watch, Fitbit, and Garmin, among others, allowing users to leverage their existing technology investments while benefiting from MiRA's advanced capabilities.</p>

      <h2 id="beta-program">Beta Program and Community Involvement</h2>
      <p>As we approach the official launch, we are excited to invite users to join our beta program. Beta participants will have the opportunity to interact with MiRA firsthand, providing valuable feedback that will shape the final product. Early adopters will also enjoy exclusive benefits, such as discounted premium features and access to special events.</p>
      <p><strong>Join the Waitlist:</strong> By signing up for our waitlist, users can secure their spot in the beta program and receive updates on MiRA's development and launch timeline.</p>

      <h2 id="testimonials">Testimonials</h2>
      <p>"MiRA has transformed the way I manage my daily tasks and long-term goals. The predictive insights are incredibly accurate, and the adaptive interface makes using the app a delight." – <em>Alex P., Beta Tester</em></p>
      <p>"The community insights feature connected me with resources I never would have found on my own. It's like having a personal coach and a supportive community all in one place." – <em>Jamie L., Early Adopter</em></p>

      <h2 id="future-directions">Future Directions</h2>
      <p>Looking ahead, MiRA is committed to continuous innovation and expansion. Our roadmap includes the development of additional features such as:</p>
      <ul>
        <li><strong>Advanced Analytics:</strong> Providing deeper insights into personal progress and community trends through customizable reports.</li>
        <li><strong>Expanded Device Compatibility:</strong> Integrating with more wearable devices and smart home technologies to enhance data collection and user interaction.</li>
        <li><strong>Community Events:</strong> Hosting virtual workshops, seminars, and collaborative projects led by experts in various fields.</li>
      </ul>
      <p>These developments aim to further empower users and strengthen the communal aspect of MiRA, fostering an environment of shared growth and collective well-being.</p>

      <h2 id="conclusion">Conclusion</h2>
      <p><strong>MiRA</strong> stands at the forefront of personal AI assistance, embodying the fusion of advanced technology and human-centric design. By offering a personalized, adaptive, and community-driven experience, MiRA not only supports individual growth but also contributes to the collective good.</p>
      <p>We invite you to embark on this journey with us. Join our waitlist, participate in the beta program, and be a part of shaping the future of personal AI assistance.</p>
      <p><em>The future is here with MiRA.</em></p>
    `,
    date: '2024-03-15',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
    category: 'Announcement',
    author: {
      name: 'MiRA Team',
      avatar: 'https://res.cloudinary.com/dqqcrectu/image/upload/w_64,h_64,c_fit/v1732630705/ddjmifzziuj0efljb25r.jpg',
      role: 'Product Team'
    }
  };

  // Split the content into sections based on <h2> tags for slide-like navigation
  const sections = post.content.split(/<\/h2>/i).map((section, index) => {
    if (index === 0) return null; // Skip content before the first <h2>
    return (
      <motion.section 
        key={index} 
        className="snap-start flex flex-col items-center justify-center min-h-screen px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div dangerouslySetInnerHTML={{ __html: section + '</h2>' }} className="prose prose-invert prose-violet max-w-none font-sans" />
      </motion.section>
    );
  }).filter(Boolean); // Remove null entries

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 overflow-x-hidden">
      {/* Gradient Orb */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 rounded-full blur-[120px] animate-pulse opacity-50" />
      </div>

      <article className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog Link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center text-zinc-400 hover:text-violet-400 transition-colors mb-8 font-sans"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          {/* Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-8"
          >
            <span className="text-sm font-medium text-violet-400 font-sans">{post.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent mt-2 mb-6 font-heading">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full border-2 border-violet-500/20"
                />
                <div>
                  <p className="font-medium text-zinc-200 font-sans">{post.author.name}</p>
                  <p className="text-sm text-zinc-500 font-sans">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-zinc-400">
                <button className="hover:text-violet-400 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="hover:text-violet-400 transition-colors">
                  <BookmarkPlus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Meta Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card flex items-center justify-between text-sm text-zinc-400 mb-8 font-sans"
          >
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {post.readTime}
            </div>
          </motion.div>

          {/* Featured Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="card p-0 overflow-hidden mb-8 rounded-2xl"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Content as Slide Sections */}
          <div className="snap-y snap-mandatory overflow-scroll h-[80vh] scroll-smooth">
            {sections}
          </div>

          {/* Share Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center mt-12"
          >
            <h3 className="text-xl font-semibold mb-4 gradient-text font-heading">Share this article</h3>
            <div className="flex justify-center space-x-4">
              <button className="neon-button">
                <Share2 className="w-5 h-5 text-zinc-400 hover:text-violet-400" />
              </button>
              <button className="neon-button">
                <BookmarkPlus className="w-5 h-5 text-zinc-400 hover:text-violet-400" />
              </button>
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
}
