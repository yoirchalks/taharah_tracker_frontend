export default interface HebcalZmain {
  date: string;
  location: {
    title: string;
    city: string;
    tzid: string;
    latitude: number;
    longitude: number;
    cc: string;
    country: string;
    admin1: string;
    ascciName: string;
    geo: string;
    geoNameId: number;
  };
  times: {
    chatzotNight: string;
    alotHaShachar: string;
    misheyakir: string;
    misheyakirMachmir: string;
    dawn: string;
    sunrise: string;
    sofZmanShmaMGA19Point8: string;
    sofZmanShmaMGA: string;
    sofZmanShma: string;
    sofZmanTfillaMGA19Point8: string;
    sofZmanTfillaMGA16Point1: string;
    sofZmanTfillaMGA: string;
    sofZmanTfilla: string;
    chatzot: string;
    minchaGedola: string;
    minchaGedolaMGA: string;
    minchaKetana: string;
    minchaKetanaMGA: string;
    plagHaMincha: string;
    sunset: string;
    beinHaShmashos: string;
    dusk: string;
    tzeit7083deg: string;
    tzeit85deg: string;
    tzeit42min: string;
    tzeit50min: string;
    tzeit72min: string;
  };
}
