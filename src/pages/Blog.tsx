import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/shared/PageHeader';
import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  author?: {
    name: string;
    avatar: string;
  };
}

const blogPosts: BlogPost[] = [
  {
    id: 'introducing-mira',
    title: 'Introducing MiRA: The Future of Personal AI Assistance',
    excerpt: "Today, we are excited to announce MiRA, an innovative AI assistant that adapts to your unique needs and helps you navigate life's complexities.",
    date: '2024-03-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    author: {
      name: 'MiRA Team',
      avatar: 'https://res.cloudinary.com/dqqcrectu/image/upload/w_400,h_400,c_fit/v1732630705/ddjmifzziuj0efljb25r.jpg'

    }
  },
  {
    id: 'ai-revolution',
    title: 'The AI Revolution in Personal Development',
    excerpt: 'Discover how artificial intelligence is transforming the way we approach personal growth and development.',
    date: '2024-03-10',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop',
    author: {
      name: 'Abhisek Kumar Jha',
      avatar: 'https://res.cloudinary.com/dqqcrectu/image/upload/w_400,h_400,c_fit/v1732631277/kp2srxaugtxqhvvyxetb.jpg'
    }
  }
];

export default function Blog() {
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
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent mb-4 font-sans">
            Latest Updates
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-sans">
            Stay informed about MiRA's development and AI innovations
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-violet-500/50 transition-all group"
            >
              <Link to={`/blog/${post.id}`} className="relative">
                <img 
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  src={post.image} 
                  alt="" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent" />
              </Link>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-1">
                  <Link to={`/blog/${post.id}`} className="block mt-2">
                    <h2 className="text-2xl font-semibold text-zinc-200 mb-3 group-hover:text-violet-400 transition-colors font-sans">
                      {post.title}
                    </h2>
                    <p className="text-zinc-400 font-sans">{post.excerpt}</p>
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <img 
                      className="h-10 w-10 rounded-full" 
                      src={post.author?.avatar} 
                      alt={post.author?.name} 
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-zinc-300 font-sans">
                      {post.author?.name}
                    </p>
                    <div className="flex space-x-1 text-sm text-zinc-500 font-sans">
                      <time dateTime={post.date}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}