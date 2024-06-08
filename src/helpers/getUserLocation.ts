export const getUserLocation = async (): Promise<[number, number]> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve([coords.longitude, coords.latitude]),
      (error) => {
        console.log(error);
        alert("Geolocation could not be obtained.");
        reject();
      }
    );
  });
