// Themed photography (Unsplash). Swap each URL for your own photos, ideally in /public.
const u = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const photos = {
  // F1 / racing grandstand sunset
  track: u("photo-1571826856387-b633b9ebd93d", 900),
  // Charminar archway, Hyderabad
  arch: u("photo-1572435555646-7ad9a149ad91", 900),
  // Auto rickshaw / street scene
  street: u("photo-1590050752117-238cb0fb12b1", 500),
  // Cozy desk setup with laptop & stickers
  desk: u("photo-1602409202922-63b07e8dc61c", 900),
  // Pink bougainvillea flowers
  flower: u("photo-1621151426120-54f14ddd34da", 500),
  // Car side mirror sunset
  mirror: u("photo-1613464789351-24b80d158795", 800),
  // Palm trees / coastal road
  palms: u("photo-1507525428034-b723cf961d3e", 700),
};
