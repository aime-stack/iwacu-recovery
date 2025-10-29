"use client";

export default function GalleryPage() {
  // TODO: Fetch from actual API
  type GalleryImage = {
    id: string | number;
    url: string;
    caption: string;
  };

  const images: GalleryImage[] = [];

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-600 mt-2">Manage gallery images</p>
        </div>
        <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
          Upload Image
        </button>
      </div>

      {images.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-600">No images found.</p>
          <p className="text-sm text-gray-500 mt-2">
            Upload images to build your gallery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((image: GalleryImage) => (
            <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img src={image.url} alt={image.caption} className="w-full h-48 object-cover" />
              <div className="p-4">
                <p className="text-sm text-gray-600">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

