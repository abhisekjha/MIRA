import React from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { motion } from 'framer-motion';

export function About() {
  const team = [
    {
      name: "Abhisek Kumar Jha",
      role: "CEO & Founder",
      image:"https://res.cloudinary.com/dqqcrectu/image/upload/w_400,h_400,c_fit/v1732631277/kp2srxaugtxqhvvyxetb.jpg",
      bio: "Former Cybersecurity and AI researcher at UTA, passionate about using technology to enhance human potential."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 py-16">
      {/* Gradient Orb */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent mb-4">
            Our Mission
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            We're on a mission to empower individuals to achieve their full potential through intelligent, adaptive technology.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-zinc-400 mb-6"
          >
            At MiRA, we believe that everyone deserves a personal AI assistant that understands their unique needs and helps them navigate life's complexities. Our team of experts in AI, psychology, and human-computer interaction works tirelessly to create technology that adapts to you, not the other way around.
          </motion.p>
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-8 text-center"
        >
          Meet Our Team
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8 justify-center">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-violet-500/50 transition-all text-center group"
            >
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden group-hover:scale-105 transition-transform ">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-zinc-200 mb-1">{member.name}</h3>
              <p className="text-violet-400 mb-2">{member.role}</p>
              <p className="text-zinc-400">{member.bio}</p>
            </motion.div>
          ))}
        </div> 

      </div>
    </div>
  );
}