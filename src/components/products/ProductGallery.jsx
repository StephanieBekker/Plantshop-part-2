"use client";

// Only image selection needs client state; the product data arrives through props.

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images, name }) {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="plant-gallery">
      <div className="plant-gallery-main">
        <Image
          className="plant-main-image"
          src={images[imageIndex]}
          alt={name}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </div>

      {images.length > 1 && (
        <div className="plant-thumbnails" aria-label="Product images">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Show image ${index + 1} of ${name}`}
              aria-pressed={imageIndex === index}
              onClick={() => setImageIndex(index)}
            >
              <Image src={image} alt="" width={60} height={80} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
