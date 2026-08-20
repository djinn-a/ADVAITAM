import { Mail, MapPin, Phone } from "lucide-react";
import { FiYoutube, FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink px-6 pt-12 pb-8 sm:px-10 text-ivory">
      <div className="mx-auto max-w-[1400px]">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* Column 1: Brand & Social */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-display text-3xl text-brass tracking-wider">
                ADVAITAM
              </h3>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.3em] text-brass-soft opacity-80">
                Building Destinations
              </p>
            </div>
            <p className="text-[13px] leading-relaxed text-ivory/70 max-w-xs">
              Building nature-inspired luxury destinations that create lasting value for generations.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Link href="/" className="text-brass transition-colors p-2 rounded-full bg-ivory/5 hover:bg-ivory/10 hover:text-brass-soft">
                <FiInstagram size={18} />
              </Link>
              <Link href="/" className="transition-colors p-2 rounded-full bg-ivory/5 hover:bg-ivory/10 hover:text-brass-soft">
                <FiFacebook size={18} />
              </Link>
              <Link href="/" className="transition-colors p-2 rounded-full bg-ivory/5 hover:bg-ivory/10 hover:text-brass-soft">
                <FiLinkedin size={18} />
              </Link>
              <Link href="/" className="transition-colors p-2 rounded-full bg-ivory/5 hover:bg-ivory/10 hover:text-brass-soft">
                <FiYoutube size={18} />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-brass-soft">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-4 text-[13px] text-ivory/80">
              <li><Link href="/" className="hover:text-brass transition-colors">About Us</Link></li>
              <li><Link href="/" className="hover:text-brass transition-colors">Why Advaitam</Link></li>
              <li><Link href="/" className="hover:text-brass transition-colors">Destination</Link></li>
              <li><Link href="/" className="hover:text-brass transition-colors">Gallery</Link></li>
              <li><Link href="/" className="hover:text-brass transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Projects */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-brass-soft">
              Projects
            </h4>
            <ul className="flex flex-col gap-4 text-[13px] text-ivory/80">
              <li><Link href="/" className="hover:text-brass transition-colors">Advaitam 17</Link></li>
              <li><Link href="/" className="hover:text-brass transition-colors">Advaitam Enclave</Link></li>
              <li><Link href="/" className="hover:text-brass transition-colors">Advaitam Resorts</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-brass-soft">
              Contact
            </h4>
            <ul className="flex flex-col gap-5 text-[13px] text-ivory/80">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-brass mt-0.5" />
                <a href="tel:+919999999999" className="hover:text-brass transition-colors">
                  +91 9999 999 999
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-brass mt-0.5" />
                <a href="mailto:info@advaitam.com" className="hover:text-brass transition-colors">
                  info@advaitam.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brass mt-0.5" />
                <span className="leading-relaxed">
                  Jim Corbett,<br />Uttarakhand
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-6 text-[11px] text-ivory/50 md:flex-row md:gap-0">
          <p>© 2024 Advaitam. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-ivory transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/" className="hover:text-ivory transition-colors">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
