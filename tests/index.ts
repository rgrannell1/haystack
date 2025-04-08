import type { Optional, Photo, PhotoView } from "./types.ts";
import { Photo, Photos } from "./content.ts";
import { HaystackSearchEngine } from "../index.ts";

const photoAccessors = {
  species: (photo: Photo): Optional<string> => {
    return photo.species;
  },
  wildlife: (photo: Photo): Optional<string> => {
    return photo.wildlife;
  },
  hasWater: (photo: Photo): Optional<string> => {
    return photo.hasWater;
  },
  rating: (photo: Photo): Optional<string> => {
    return photo.rating;
  },
  aperture: (photo: Photo): Optional<string> => {
    return photo.aperture;
  },
  iso: (photo: Photo): Optional<string> => {
    return photo.iso;
  },
  camera: (photo: Photo): Optional<string> => {
    return photo.camera;
  },
  style: (photo: Photo): Optional<string> => {
    return photo.style;
  },
  season: (photo: Photo): Optional<string> => {
    const date = photo.date;
    if (!date) return undefined;
    const month = date.getMonth();
    if (month < 3) return "Winter";
    if (month < 6) return "Spring";
    if (month < 9) return "Summer";
    return "Autumn";
  },
};

const indices = [];

for (const photo of Photos()) {
  for (const [key, accessor] of Object.entries(accessors)) {
    console.log(key, accessor(photo));
  }
}
