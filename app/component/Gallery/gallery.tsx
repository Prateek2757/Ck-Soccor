"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/dbconnect/route';
export default function Gallery() {
  // const images = [
  //     "https://assets.aceternity.com/animated-modal.png",
  //     "https://assets.aceternity.com/animated-testimonials.webp",
  //     "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
  //     "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://plus.unsplash.com/premium_photo-1661881970542-8447015772e8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://plus.unsplash.com/premium_photo-1684888759266-ce3768052c80?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   "https://images.unsplash.com/photo-1632072820781-79f3a064f640?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   "https://assets.aceternit.com/flip-text.png",

  //   "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
  //   "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1429&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   "https://images.unsplash.com/photo-1504305754058-2f08ccd89a0a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   "https://plus.unsplash.com/premium_photo-1664304736989-96fc282fc672?q=80&w=1378&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   "https://images.unsplash.com/photo-1517769798-ff41bc33467e?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   "https://assets.aceternity.com/hover-border-gradient.png",
  //   "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
  //   "https://images.unsplash.com/photo-1570498839593-e565b39455fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   "https://images.unsplash.com/photo-1511426463457-0571e247d816?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
  //   "https://assets.aceternity.com/multi-step-loader.png",
  //   "https://assets.aceternity.com/vortex.png",
  //   "https://assets.aceternity.com/wobble-card.png",
  //   "https://assets.aceternity.com/world-map.webp",
  // ];
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  
    useEffect(() => {
      const fetchImagesFromTable = async () => {
        // Fetch image_path values from gallery_images table
        const { data, error } = await supabase
          .from('gallery_images')
          .select('image_path');
  
        if (error) {
          console.error('Error fetching images from table:', error.message);
          return;
        }
  
        if (data) {
          const urls = data.map((record) => {
            const { publicUrl } = supabase
              .storage
              .from('gallery-images')
              .getPublicUrl(record.image_path).data;
  
            return publicUrl;
          });
  
          setImageUrls(urls);
        }
      };
  
      fetchImagesFromTable();
    }, []);
  return (
    <div id="gallery" className="min-h-screen bg-black">
        <h1 className="text-white font-extrabold text-4xl  mb-3 text-center">Gallery</h1>
    <div className="mx-auto  max-w rounded-3xl bg-gray-950/5 p-3 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
      <ThreeDMarquee images={imageUrls} />
    </div>
        </div>
  );
}
