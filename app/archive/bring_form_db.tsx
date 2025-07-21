'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/dbconnect/route';

export default function GalleryUrl() {
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
    <div>
      <h1>Gallery Images from Table</h1>
      {imageUrls.length === 0 ? (
        <p>Loading images...</p>
      ) : (
        <div>
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Image ${index + 1}`} width={300} />
          ))}
        </div>
      )}
    </div>
  );
}