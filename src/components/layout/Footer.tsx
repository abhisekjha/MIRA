import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container mx-auto px-6 py-12 border-t border-moonlitSilver/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-auroraBlue font-semibold mb-4">Product</h3>
          <div className="flex flex-col space-y-2">
            <Link to="/features" className="text-moonlitSilver hover:text-solarPurple transition-colors">Features</Link>
            <Link to="/about" className="text-moonlitSilver hover:text-solarPurple transition-colors">About</Link>
            <Link to="/blog" className="text-moonlitSilver hover:text-solarPurple transition-colors">Blog</Link>
          </div>
        </div>
        <div>
          <h3 className="text-auroraBlue font-semibold mb-4">Company</h3>
          <div className="flex flex-col space-y-2">
            <Link to="/about" className="text-moonlitSilver hover:text-solarPurple transition-colors">About Us</Link>
            <Link to="/blog" className="text-moonlitSilver hover:text-solarPurple transition-colors">Blog</Link>
            <Link to="/waitlist" className="text-moonlitSilver hover:text-solarPurple transition-colors">Join Waitlist</Link>
          </div>
        </div>
        <div>
          <h3 className="text-auroraBlue font-semibold mb-4">Legal</h3>
          <div className="flex flex-col space-y-2">
            <Link to="/privacy" className="text-moonlitSilver hover:text-solarPurple transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-moonlitSilver hover:text-solarPurple transition-colors">Terms of Service</Link>
          </div>
        </div>
        <div>
          <h3 className="text-auroraBlue font-semibold mb-4">Newsletter</h3>
          <p className="text-moonlitSilver mb-4">Stay updated with our latest features and releases.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-mistGray/50 border border-moonlitSilver/10 rounded-lg px-4 py-2 text-moonlitSilver flex-1 focus:outline-none focus:border-solarPurple"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-aurora-glow hover:animate-glow rounded-lg text-lunarWhite transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="text-center text-moonlitSilver/50 pt-8 border-t border-moonlitSilver/10">
        <p>© {currentYear} MiRA. All rights reserved.</p>
      </div>
    </footer>
  );
}