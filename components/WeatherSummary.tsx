import Image from 'next/image';

type WeatherSummaryProps = {
  temp: number;
  summary: string;
  location: string;
  sunrise: string;
  sunset: string;
};

export const WeatherSummary = ({
  temp,
  summary,
  location,
  sunrise,
  sunset,
}: WeatherSummaryProps) => (
  <section className="flex items-center justify-center flex-col">
    <div className="pt-8 text-3xl">
      <Image src="/location.png" alt="location" width="32" height="32" />
      <span>{location}</span>
    </div>
    <div className="pt-2 text-7xl">{`${temp}°`}</div>
    <div className="weather">{summary}</div>
    <div className="bottom-details">
      <div className="column feels">
        <i className="bx bxs-thermometer"></i>
        <div className="details">
          <div className="temp">
            <span className="numb-2">{sunrise}</span>
          </div>
        </div>
      </div>
      <div className="column humidity">
        <i className="bx bxs-droplet-half"></i>
        <div className="details">
          <span>{sunset}</span>
        </div>
      </div>
    </div>
  </section>
);
